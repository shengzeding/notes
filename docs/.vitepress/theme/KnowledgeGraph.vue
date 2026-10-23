<script setup lang="ts">
import { computed, reactive, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { withBase } from 'vitepress'
import { data } from './knowledge.data'
import { graphLayout, edgePath, graphBounds } from './graph-layout'
import type { GraphNode } from './graph-layout'
const nodes = reactive(graphLayout(data).nodes)
const edges = graphLayout(data).edges
const byId = new Map(nodes.map(n => [n.id,n]))
const selectedId = ref<string | null>(null)
const selected = computed(() => byId.get(selectedId.value || ''))
const domainFilter = ref('')
const courseFilter = ref('')
const focusedId = ref('')
const query = ref('')
const searchTarget = ref('')
const expanded = ref(false)
const frame = ref<HTMLElement | null>(null)
const svg = ref<SVGSVGElement | null>(null)
const size = reactive({w:1200,h:540})
const view = reactive({x:0,y:0,w:1200,h:540})
const viewBox = computed(() => [view.x,view.y,view.w,view.h].join(' '))
const labelScale = computed(() => Math.min(1,15*view.w/size.w/14))
const color = (id?: string) => data.domains.find(d => d.id === id)?.color || '#777'
const domainName = (id?: string) => data.domains.find(d => d.id === id)?.label || 'Unassigned'
const relationName = (type: string) => ({
  'derivation-uses':'This derivation uses','instance-of':'Is an instance of',
  'equivalent-to':'Is equivalent to','generalizes':'Generalizes',
  'model-complements':'Complements','defined-as':'Is defined as',
  'qualifies':'Qualifies','strengthens':'Strengthens',
  'equivalent-form':'Is an equivalent form of','organizes':'Organizes',
  'shares-encoding-form-with':'Shares an encoding form with',
  'differs-in-connectivity':'Differs in connectivity from'
}[type] || type)
const url = (path: string, anchor?: string) => withBase('/' + path.replace(/\/index\.md$/, '/').replace(/\.md$/, '.html') + (anchor ? '#' + anchor : ''))
const nodeUrl = computed(() => selected.value?.location ? url(selected.value.location.path,selected.value.location.anchor) : selected.value?.path ? url(selected.value.path) : '')
function connected(id: string) { return new Set([id,...edges.filter(e => e.source===id||e.target===id).flatMap(e => [e.source,e.target])]) }
const neighbors = computed(() => connected(selectedId.value || ''))
const visibleNodes = computed(() => {
  let result=nodes.filter(n => (!domainFilter.value||n.domain===domainFilter.value) &&
    (!courseFilter.value||n.id===courseFilter.value||n.courses?.includes(courseFilter.value)))
  if(focusedId.value){const ids=connected(focusedId.value);result=result.filter(n=>ids.has(n.id))}
  return result
})
const visibleIds = computed(() => new Set(visibleNodes.value.map(n=>n.id)))
const visibleEdges = computed(() => edges.filter(e=>visibleIds.value.has(e.source)&&visibleIds.value.has(e.target)))
const related = computed(() => data.relations.filter(r=>r.source===selectedId.value||r.target===selectedId.value))
const members = computed(() => selected.value?.kind==='course' ? nodes.filter(n=>n.courses?.includes(selected.value!.id)) : nodes.filter(n=>selected.value?.courses?.includes(n.id)))
const results = computed(() => {
  const q=query.value.trim().toLocaleLowerCase()
  return q ? nodes.filter(n=>[n.label,...(n.aliases||[])].some(s=>s.toLocaleLowerCase().includes(q))).slice(0,16) : []
})
const dim = (n: GraphNode) => !!selectedId.value && !neighbors.value.has(n.id)
const edgeActive = (e: any) => e.source===selectedId.value||e.target===selectedId.value
const pathFor = (e: any) => edgePath(e,byId.get(e.source)!,byId.get(e.target)!)
const citationText = (count: number) => `Referenced by ${count} other concept${count===1?'':'s'}`
const percent = computed(() => Math.round(size.w/view.w*100))
function fit(list=visibleNodes.value) {
  const b=graphBounds(list), aspect=size.w/size.h
  const w=Math.max(b.w+30,(b.h+30)*aspect,Math.min(600,size.w)),h=w/aspect
  Object.assign(view,{x:b.x+b.w/2-w/2,y:b.y+b.h/2-h/2,w,h})
}
function layoutVisible() {
  const ids=visibleIds.value
  const subset={...data,concepts:data.concepts.filter(c=>ids.has(c.id)).map(c=>({...c,courses:(c.courses||[]).filter(id=>ids.has(id))})),
    courses:data.courses.filter(c=>ids.has(c.id)),relations:data.relations.filter(r=>ids.has(r.source)&&ids.has(r.target))}
  const layout=graphLayout(subset,size.w/size.h)
  for(const n of layout.nodes){const target=byId.get(n.id);if(target){target.x=n.x;target.y=n.y}}
  fit()
}
function filterDomain(id:string){searchTarget.value='';domainFilter.value=id;courseFilter.value='';focusedId.value='';selectedId.value=null;nextTick(layoutVisible)}
function filterCourse(){searchTarget.value='';focusedId.value='';selectedId.value=null;nextTick(layoutVisible)}
function reset(){searchTarget.value='';domainFilter.value='';courseFilter.value='';focusedId.value='';query.value='';selectedId.value=null;nextTick(layoutVisible)}
function choose(id:string){
  searchTarget.value=''
  if(!visibleIds.value.has(id)){domainFilter.value='';courseFilter.value='';focusedId.value='';layoutVisible()}
  selectedId.value=id
}
function reveal(id:string){
  query.value=''
  if(!visibleIds.value.has(id)){domainFilter.value='';courseFilter.value='';focusedId.value='';layoutVisible()}
  choose(id);searchTarget.value=id
  nextTick(()=>fitNeighborhood(id))
}
function fitNeighborhood(id:string){
  const n=byId.get(id)!
  // Search lands on a readable local view, including the node's immediate links.
  fit(nodes.filter(n=>connected(id).has(n.id)))
  if(view.w>size.w*1.3){view.w=size.w*1.3;view.h=view.w*size.h/size.w;view.x=n.x-view.w/2;view.y=n.y-view.h/2}
}
watch(()=>size.w,()=>{if(searchTarget.value)nextTick(()=>fitNeighborhood(searchTarget.value))})
function focusConnections(){
  searchTarget.value=''
  if(!selectedId.value)return
  domainFilter.value='';courseFilter.value='';focusedId.value=selectedId.value
  nextTick(layoutVisible)
}
function zoom(factor:number, px=size.w/2, py=size.h/2){
  searchTarget.value=''
  const w=Math.max(size.w*.25,Math.min(size.w*8,view.w*factor)),ratio=w/view.w
  view.x+=px/size.w*view.w*(1-ratio);view.y+=py/size.h*view.h*(1-ratio);view.w=w;view.h*=ratio
}
function wheel(e:WheelEvent){
  const rect=svg.value!.getBoundingClientRect()
  zoom(Math.exp(Math.max(-100,Math.min(100,e.deltaY))*.003),e.clientX-rect.left,e.clientY-rect.top)
}
function escape(){query.value='';if(expanded.value)expanded.value=false;else selectedId.value=null}
let observer:ResizeObserver|undefined
onMounted(()=>{
  observer=new ResizeObserver(entries=>{
    const rect=entries[0].contentRect
    if(rect.width<1||rect.height<1)return
    const oldAspect=size.w/size.h
    size.w=rect.width;size.h=rect.height
    if(Math.abs(oldAspect-size.w/size.h)>.15||!ready){layoutVisible();ready=true}
    else {const cy=view.y+view.h/2;view.h=view.w*size.h/size.w;view.y=cy-view.h/2}
  })
  observer.observe(frame.value!)
})
onBeforeUnmount(()=>observer?.disconnect())
let ready=false
const pointers=new Map<number,{x:number;y:number}>()
let pinch:{distance:number;x:number;y:number}|null=null
let drag:{id?:string;px:number;py:number;x:number;y:number;moved:boolean;pointer:number}|null=null
let suppressClick=false
function point(e:PointerEvent){const p=svg.value!.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.value!.getScreenCTM()!.inverse())}
function pinchState(){const [a,b]=[...pointers.values()];return{distance:Math.hypot(a.x-b.x,a.y-b.y),x:(a.x+b.x)/2,y:(a.y+b.y)/2}}
function down(e:PointerEvent){
  if(e.button!==0)return
  searchTarget.value=''
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});svg.value!.setPointerCapture(e.pointerId)
  if(pointers.size===2){pinch=pinchState();drag=null;suppressClick=true;return}
  const p=point(e),id=(e.target as Element).closest('[data-node]')?.getAttribute('data-node')||undefined,n=id?byId.get(id):undefined
  suppressClick=false;drag={id,px:e.clientX,py:e.clientY,x:n?n.x-p.x:view.x,y:n?n.y-p.y:view.y,moved:false,pointer:e.pointerId}
}
function move(e:PointerEvent){
  if(!pointers.has(e.pointerId))return
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY})
  if(pinch&&pointers.size===2){const next=pinchState(),r=svg.value!.getBoundingClientRect();zoom(pinch.distance/Math.max(1,next.distance),next.x-r.left,next.y-r.top);view.x-=(next.x-pinch.x)*view.w/size.w;view.y-=(next.y-pinch.y)*view.h/size.h;pinch=next;return}
  if(!drag||drag.pointer!==e.pointerId)return
  if(Math.hypot(e.clientX-drag.px,e.clientY-drag.py)>4)drag.moved=true
  if(!drag.moved)return
  if(drag.id){const p=point(e),n=byId.get(drag.id)!;n.x=p.x+drag.x;n.y=p.y+drag.y}
  else {view.x=drag.x-(e.clientX-drag.px)*view.w/size.w;view.y=drag.y-(e.clientY-drag.py)*view.h/size.h}
}
function up(e:PointerEvent){
  pointers.delete(e.pointerId)
  if(pinch){pinch=null;drag=null;suppressClick=true}
  if(drag&&drag.pointer===e.pointerId){suppressClick=drag.moved;if(!drag.moved){if(drag.id)choose(drag.id);else selectedId.value=null}drag=null}
  if(svg.value?.hasPointerCapture(e.pointerId))svg.value.releasePointerCapture(e.pointerId)
}
function cancel(e:PointerEvent){pointers.delete(e.pointerId);drag=null;pinch=null;suppressClick=true}
</script>

<template>
<div class="knowledge-map" :class="{expanded}" @keydown.esc.stop="escape">
  <header class="graph-heading">
    <div><h1>Knowledge graph</h1><span>{{ data.concepts.length }} concepts · {{ data.courses.length }} courses</span></div>
    <button class="expand-control" :aria-pressed="expanded" @click="expanded=!expanded">{{ expanded?'Exit full window':'Full window ↗' }}</button>
  </header>
  <div class="graph-toolbar">
    <div class="graph-search">
      <input v-model="query" aria-label="Find a concept or course" placeholder="Find a concept or course…" @keydown.enter.prevent="results[0]&&reveal(results[0].id)" />
      <div v-if="query.trim()" class="search-results" aria-label="Search results">
        <button v-for="n in results" :key="n.id" @click="reveal(n.id)">{{ n.label }}<small>{{ n.kind }} · {{ domainName(n.domain) }}</small></button>
        <p v-if="!results.length">No matching concepts or courses.</p>
      </div>
    </div>
    <div class="graph-domains" aria-label="Filter by domain">
      <button :aria-pressed="!domainFilter" @click="filterDomain('')">All</button>
      <button v-for="d in data.domains" :key="d.id" :aria-pressed="domainFilter===d.id" @click="filterDomain(d.id)"><i :style="{background:d.color}"></i>{{ d.label }}</button>
    </div>
    <select v-model="courseFilter" aria-label="Filter by course" @change="filterCourse">
      <option value="">All courses</option>
      <option v-for="c in data.courses.filter(c=>!domainFilter||c.domain===domainFilter)" :key="c.id" :value="c.id">{{ c.label }}</option>
    </select>
  </div>
  <div class="graph-workspace" :class="{'has-detail':!!selected}">
    <div ref="frame" class="graph-canvas">
      <div class="canvas-controls"><button aria-label="Zoom out" @click="zoom(1.2)">−</button><span>{{ percent }}%</span><button aria-label="Zoom in" @click="zoom(1/1.2)">+</button><button @click="fit()">Fit</button><button @click="reset">Reset</button></div>
      <div v-if="domainFilter||courseFilter||focusedId" class="scope-label">{{ visibleNodes.filter(n=>n.kind==='concept').length }} concepts <button @click="reset">Show all ↗</button></div>
      <svg ref="svg" :viewBox="viewBox" tabindex="0" aria-label="Knowledge graph: courses and concepts" @wheel.prevent="wheel"
        @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="cancel"
        @keydown.+.prevent="zoom(1/1.2)" @keydown.-.prevent="zoom(1.2)" @keydown.home.prevent="fit()">
        <defs><marker id="knowledge-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#777" /></marker></defs>
        <g aria-hidden="true"><path v-for="(edge,i) in visibleEdges" :key="i" :d="pathFor(edge)" :class="['graph-edge',edge.kind,{active:edgeActive(edge),dim:selectedId&&!edgeActive(edge)}]" :marker-end="edge.kind==='relation'?'url(#knowledge-arrow)':undefined" /></g>
        <g v-for="node in visibleNodes" :key="node.id" :data-node="node.id" :transform="`translate(${node.x},${node.y})`" role="button" tabindex="0"
          :aria-label="node.label+', '+node.kind+', '+domainName(node.domain)" :aria-pressed="selectedId===node.id" :class="['graph-node',node.kind,{selected:selectedId===node.id,dim:dim(node)}]"
          @click="!suppressClick&&choose(node.id)" @keydown.enter.prevent.stop="choose(node.id)" @keydown.space.prevent.stop="choose(node.id)">
          <title>{{ node.label }} — {{ node.kind==='concept'?citationText(node.citationCount):'Course' }}</title>
          <circle :r="node.radius+8" fill="transparent" />
          <circle class="node-halo" :r="node.radius+5" :stroke="color(node.domain)" />
          <circle :r="node.radius" :fill="color(node.domain)" />
          <text class="node-label" :x="node.radius+9" :style="{fontSize:(node.kind==='course'?15:14)*labelScale+'px'}">
            <tspan v-for="(line,i) in node.lines" :key="i" :x="node.radius+9" :y="(i-(node.lines.length-1)/2)*16*labelScale+5*labelScale">{{ line }}</tspan>
          </text>
        </g>
      </svg>
    </div>
    <section v-if="selected" class="graph-detail" aria-label="Selected node details" aria-live="polite">
      <div class="detail-controls"><button @click="focusConnections">Focus connections</button><button aria-label="Close details" @click="selectedId=null">×</button></div>
      <template v-if="selected">
        <div class="graph-detail-title">
          <div><small>{{ domainName(selected.domain) }} · {{ selected.kind }}</small><h2>{{ selected.label }}</h2></div>
          <a :href="nodeUrl">Open notes ↗</a>
        </div>
        <p v-if="selected.kind==='concept'" class="graph-citation-count">{{ citationText(selected.citationCount) }}.</p>
        <div v-if="members.length" class="graph-members">
          <span>{{ selected.kind==='course'?'Concepts':'Courses' }}</span>
          <button v-for="n in members" :key="n.id" @click="choose(n.id)">{{ n.label }}</button>
        </div>
        <div v-for="(relation,i) in related" :key="i" class="graph-relation-detail">
          <p>
            <button @click="choose(relation.source)">{{ byId.get(relation.source)?.label }}</button>
            <span> — {{ relationName(relation.type).toLowerCase() }} → </span>
            <button @click="choose(relation.target)">{{ byId.get(relation.target)?.label }}</button>
          </p>
          <p class="graph-qualification">{{ relation.note }}</p>
          <a :href="url(relation.evidence.path,relation.evidence.anchor)">Read the passage ↗</a>
        </div>
      </template>
    </section>
  </div>
  <div class="graph-key"><span><i class="key-course"></i>Course <i class="key-concept"></i>Concept</span><span>Drag to pan · Scroll or pinch to zoom · Click to explore</span><a :href="withBase('/guide/concept-links.html')">Add connections ↗</a></div>
</div>
</template>

<style scoped>
.knowledge-map{color:#333;--graph-bg:#fdfdfc}
.graph-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:14px}
.graph-heading>div{display:flex;align-items:baseline;gap:18px;flex-wrap:wrap}
.graph-heading h1{font-size:24px!important;letter-spacing:-.4px;line-height:1.3;margin:0!important;font-weight:500}
.graph-heading span{color:#888;font-size:12px}
button,input,select{font-family:inherit;font-size:12px}
button{cursor:pointer}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #777;outline-offset:3px}
.expand-control{color:#666;white-space:nowrap}
.graph-toolbar{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
.graph-search{position:relative;flex:1;min-width:180px;max-width:320px}
.graph-search input{width:100%;border:1px solid #ddd;border-radius:3px;padding:8px 10px;background:white}
.search-results{position:absolute;top:100%;left:0;right:0;max-height:340px;overflow:auto;border:1px solid #ddd;background:#fff;z-index:20;box-shadow:0 4px 14px #0000000a}
.search-results button{display:block;width:100%;text-align:left;padding:10px 12px;border-bottom:1px solid #eee;line-height:1.5}
.search-results button:hover{background:#f4f4f2}.search-results small{display:block;color:#888;font-size:10px}.search-results p{padding:12px;font-size:12px}
.graph-domains{display:flex;align-items:center;gap:3px;flex-wrap:wrap}
.graph-domains button{padding:6px 9px;color:#777;border-bottom:1px solid transparent;white-space:nowrap}
.graph-domains button[aria-pressed=true]{color:#111;border-color:#777}
.graph-domains i{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px}
.graph-toolbar select{margin-left:auto;max-width:200px;border:1px solid #ddd;background:white;padding:8px 10px;border-radius:3px}
.graph-workspace{display:flex;height:calc(100dvh - 190px);min-height:440px;border:1px solid #e5e5e2;border-radius:3px;overflow:hidden}
.graph-canvas{position:relative;background:var(--graph-bg);flex:1;min-width:0;min-height:0}
svg{display:block;width:100%;height:100%;touch-action:none;user-select:none;cursor:grab}svg:active{cursor:grabbing}
.canvas-controls{position:absolute;right:12px;top:12px;z-index:2;display:flex;align-items:center;gap:2px;background:#ffffffed;border:1px solid #e5e5e2;border-radius:3px}
.canvas-controls button{padding:5px 9px;color:#555}.canvas-controls button:hover{background:#eee}.canvas-controls span{font-size:10px;color:#999;min-width:32px;text-align:center}
.scope-label{position:absolute;bottom:10px;left:12px;color:#777;font-size:11px;background:#ffffffeb;padding:3px 7px;z-index:2}.scope-label button{margin-left:10px;color:#333;font-size:11px;text-decoration:underline}
.graph-edge{fill:none;stroke:#777;stroke-width:1;opacity:.3;pointer-events:none;vector-effect:non-scaling-stroke}
.graph-edge.membership{stroke-dasharray:3 5;opacity:.1}.graph-edge.active{opacity:.9;stroke-width:1.4}.graph-edge.dim{opacity:.035}
.graph-node{cursor:pointer;outline:none}.graph-node.dim{opacity:.22}.graph-node:hover,.graph-node:focus-visible{opacity:1}
.node-label{font-family:var(--vp-font-family-base);fill:#333;paint-order:stroke;stroke:var(--graph-bg);stroke-width:4px;stroke-linejoin:round;pointer-events:all}
.graph-node.course .node-label{font-weight:600;fill:#222}.graph-node.selected .node-label{font-weight:600}
.node-halo{fill:none;opacity:0;stroke-width:1.2}.graph-node:hover .node-halo,.graph-node:focus-visible .node-halo,.graph-node.selected .node-halo{opacity:.8}
.graph-node:focus-visible .node-label{text-decoration:underline}
.graph-detail{width:300px;flex-shrink:0;padding:16px 20px;background:#fff;border-left:1px solid #e5e5e2;overflow:auto;font-size:13px}
.detail-controls{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;color:#777}.detail-controls>button:last-child{font-size:22px;padding:0 4px}
.graph-detail-title small{color:#888;text-transform:capitalize;font-size:11px}.graph-detail-title h2{font-size:19px;line-height:1.4;border:0;padding:0;margin:6px 0 12px}
.graph-detail a{font-size:12px;text-decoration:underline;text-underline-offset:3px}
.graph-citation-count{color:#888;font-size:11px;margin:12px 0}
.graph-members{display:flex;flex-wrap:wrap;gap:6px 12px;padding:14px 0;border-top:1px solid #eee;margin-top:16px}.graph-members>span{width:100%;color:#888;font-size:11px}
.graph-detail button{text-align:left;line-height:1.6}.graph-members button,.graph-relation-detail button{text-decoration:underline;text-underline-offset:3px}
.graph-relation-detail{padding:12px 0;border-top:1px solid #eee}.graph-relation-detail p{margin:0 0 8px;line-height:1.6;font-size:12px}.graph-relation-detail span{color:#888}.graph-relation-detail .graph-qualification{color:#888;font-size:11px;line-height:1.7}
.graph-key{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 0;color:#888;font-size:11px}.graph-key>span:first-child{display:flex;align-items:center;gap:6px}.graph-key a{color:#777;font-size:11px}
.graph-key i{display:inline-block;border-radius:50%;background:#999}.key-course{width:10px;height:10px}.key-concept{width:5px;height:5px;margin-left:8px}
.expanded{position:fixed;inset:0;z-index:200;background:#fff;padding:18px 24px;display:flex;flex-direction:column}.expanded .graph-workspace{height:auto;flex:1;min-height:0}.expanded .graph-key{padding-bottom:0}
@media(max-width:760px){
.graph-heading h1{font-size:20px!important}.graph-heading>div{gap:3px;display:flex;flex-direction:column}.graph-heading span{font-size:10px}
.graph-toolbar{gap:8px}.graph-search{max-width:none;flex:1}.graph-toolbar select{max-width:155px;margin-left:0}.graph-domains{order:3;width:100%}.graph-domains button{font-size:11px;padding:4px 7px}
.graph-workspace{height:calc(100dvh - 240px);min-height:400px;position:relative}.graph-detail{position:absolute;bottom:0;left:0;right:0;width:100%;max-height:48%;border-left:0;border-top:1px solid #ddd;z-index:5;padding:12px 18px}.detail-controls{margin-bottom:8px}
.graph-key{flex-wrap:wrap;font-size:10px}.graph-key>span:nth-child(2){display:none}.expanded{padding:12px}.expanded .graph-workspace{min-height:0}
}
</style>
