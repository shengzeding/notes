<script setup lang="ts">
import { computed, reactive, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { withBase } from 'vitepress'
import { data } from './knowledge.data'
import { graphLayout, edgePath, graphBounds, createGraphSimulation, placeGraphLabels } from './graph-layout'
import type { GraphNode } from './graph-layout'
const initial = graphLayout(data)
const nodes = reactive(initial.nodes)
const edges = initial.edges
const byId = new Map(nodes.map(n => [n.id,n]))
const selectedId = ref<string | null>(null)
const hoveredId = ref('')
const activeId = computed(()=>hoveredId.value||selectedId.value||'')
const settingsOpen = ref(false)
const showLabels = ref(false)
const textSize = ref(12)
const spacing = ref(1)
const linkDistance = ref(1)
const selected = computed(() => byId.get(selectedId.value || ''))
const domainFilter = ref('')
const courseFilters = ref<string[]>([])
const coursePickerOpen = ref(false)
const coursePicker = ref<HTMLElement | null>(null)
const coursePickerButton = ref<HTMLButtonElement | null>(null)
const availableCourses = computed(()=>data.courses.filter(c=>!domainFilter.value||c.domain===domainFilter.value))
const courseFilterLabel = computed(()=>!courseFilters.value.length ? 'All courses' : courseFilters.value.length===1 ? data.courses.find(c=>c.id===courseFilters.value[0])?.label : `${courseFilters.value.length} courses`)
function closeCoursePicker(){coursePickerOpen.value=false;coursePickerButton.value?.focus()}
function outsideCoursePicker(event:PointerEvent){if(!coursePicker.value?.contains(event.target as Node))coursePickerOpen.value=false}
function leaveCoursePicker(event:FocusEvent){if(!coursePicker.value?.contains(event.relatedTarget as Node|null))coursePickerOpen.value=false}
const focusedId = ref('')
const query = ref('')
const searchTarget = ref('')
const expanded = ref(false)
const frame = ref<HTMLElement | null>(null)
const svg = ref<SVGSVGElement | null>(null)
const size = reactive({w:1200,h:540})
const view = reactive({x:0,y:0,w:1200,h:540})
const viewBox = computed(() => [view.x,view.y,view.w,view.h].join(' '))
const unit = computed(()=>view.w/size.w)
const labels = computed(()=>placeGraphLabels(visibleNodes.value,view,size.w,textSize.value))
const labelOpacity = computed(()=>Math.min(1,Math.max(.18,size.w/view.w*1.1)))
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
const neighbors = computed(() => connected(activeId.value))
const visibleNodes = computed(() => {
  let result=nodes.filter(n => (!domainFilter.value||n.domain===domainFilter.value) &&
    (!courseFilters.value.length||courseFilters.value.includes(n.id)||n.courses?.some(id=>courseFilters.value.includes(id))))
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
const dim = (n: GraphNode) => !!activeId.value && !neighbors.value.has(n.id)
const edgeActive = (e: any) => e.source===activeId.value||e.target===activeId.value
const pathFor = (e: any) => edgePath(e,byId.get(e.source)!,byId.get(e.target)!)
const citationText = (count: number) => `Referenced by ${count} other concept${count===1?'':'s'}`
const percent = computed(() => Math.round(size.w/view.w*100))
function fit(list=visibleNodes.value) {
  const b=graphBounds(list), aspect=size.w/size.h
  const w=Math.max(b.w+30,(b.h+30)*aspect,Math.min(600,size.w)),h=w/aspect
  Object.assign(view,{x:b.x+b.w/2-w/2,y:b.y+b.h/2-h/2,w,h})
}
function layoutVisible() {
  stopSimulation();hoveredId.value=''
  const ids=visibleIds.value
  const subset={...data,concepts:data.concepts.filter(c=>ids.has(c.id)).map(c=>({...c,courses:(c.courses||[]).filter(id=>ids.has(id))})),
    courses:data.courses.filter(c=>ids.has(c.id)),relations:data.relations.filter(r=>ids.has(r.source)&&ids.has(r.target))}
  const layout=graphLayout(subset,size.w/size.h,{spacing:spacing.value,distance:linkDistance.value})
  for(const n of layout.nodes){const target=byId.get(n.id);if(target){target.x=n.x;target.y=n.y}}
  simulation=createGraphSimulation(visibleNodes.value,visibleEdges.value,{spacing:spacing.value,distance:linkDistance.value,aspect:size.w/size.h})
  fit()
}
function filterDomain(id:string){searchTarget.value='';domainFilter.value=id;courseFilters.value=[];focusedId.value='';selectedId.value=null;nextTick(layoutVisible)}
function filterCourses(){searchTarget.value='';focusedId.value='';selectedId.value=null;nextTick(layoutVisible)}
function reset(){coursePickerOpen.value=false;searchTarget.value='';domainFilter.value='';courseFilters.value=[];focusedId.value='';query.value='';selectedId.value=null;nextTick(layoutVisible)}
function choose(id:string){
  searchTarget.value=''
  if(!visibleIds.value.has(id)){domainFilter.value='';courseFilters.value=[];focusedId.value='';layoutVisible()}
  selectedId.value=id
}
function reveal(id:string){
  query.value=''
  if(!visibleIds.value.has(id)){domainFilter.value='';courseFilters.value=[];focusedId.value='';layoutVisible()}
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
  domainFilter.value='';courseFilters.value=[];focusedId.value=selectedId.value
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
function escape(){query.value='';hoveredId.value='';settingsOpen.value=false;if(expanded.value)expanded.value=false;else selectedId.value=null}
function toggleExpanded(){expanded.value=!expanded.value;nextTick(()=>fit())}
let simulation:ReturnType<typeof createGraphSimulation>|undefined
let animation=0,heat=0,fixed:{id:string;x:number;y:number}|undefined
function stopSimulation(){if(animation)cancelAnimationFrame(animation);animation=0;fixed=undefined;heat=0}
function animate(){
  heat=fixed ? .5 : heat*.96
  simulation?.tick(heat,fixed)
  if(heat>.005)animation=requestAnimationFrame(animate);else animation=0
}
function warm(){heat=.5;if(!animation)animation=requestAnimationFrame(animate)}
let observer:ResizeObserver|undefined
onMounted(()=>{
  document.addEventListener('pointerdown',outsideCoursePicker)
  observer=new ResizeObserver(entries=>{
    const rect=entries[0].contentRect
    if(rect.width<1||rect.height<1)return
    const scale=view.w/size.w,cx=view.x+view.w/2,cy=view.y+view.h/2
    size.w=rect.width;size.h=rect.height
    if(!ready){layoutVisible();ready=true}
    else {view.w=scale*size.w;view.h=scale*size.h;view.x=cx-view.w/2;view.y=cy-view.h/2
      const n=selected.value,margin=70*scale
      if(n){view.x=Math.min(n.x-margin,Math.max(n.x+margin-view.w,view.x));view.y=Math.min(n.y-margin,Math.max(n.y+margin-view.h,view.y))}
    }
  })
  observer.observe(frame.value!)
})
onBeforeUnmount(()=>{observer?.disconnect();stopSimulation();document.removeEventListener('pointerdown',outsideCoursePicker)})
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
  if(pointers.size===2){fixed=undefined;pinch=pinchState();drag=null;suppressClick=true;return}
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
  if(drag.id){const p=point(e),n=byId.get(drag.id)!;n.x=p.x+drag.x;n.y=p.y+drag.y;fixed={id:n.id,x:n.x,y:n.y};warm()}
  else {view.x=drag.x-(e.clientX-drag.px)*view.w/size.w;view.y=drag.y-(e.clientY-drag.py)*view.h/size.h}
}
function up(e:PointerEvent){
  fixed=undefined
  pointers.delete(e.pointerId)
  if(pinch){pinch=null;drag=null;suppressClick=true}
  if(drag&&drag.pointer===e.pointerId){suppressClick=drag.moved;if(!drag.moved){if(drag.id)choose(drag.id);else selectedId.value=null}drag=null}
  if(svg.value?.hasPointerCapture(e.pointerId))svg.value.releasePointerCapture(e.pointerId)
}
function cancel(e:PointerEvent){fixed=undefined;pointers.delete(e.pointerId);drag=null;pinch=null;suppressClick=true}
</script>

<template>
<div class="knowledge-map" :class="{expanded}" @keydown.esc.stop="escape">
  <header class="graph-heading">
    <div><h1>Knowledge graph</h1><span>{{ data.concepts.length }} concepts · {{ data.courses.length }} courses</span></div>
    <button class="expand-control" :aria-pressed="expanded" @click="toggleExpanded">{{ expanded?'Exit full window':'Full window ↗' }}</button>
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
    <div ref="coursePicker" class="course-picker" @focusout="leaveCoursePicker" @keydown.esc.stop.prevent="closeCoursePicker">
      <button ref="coursePickerButton" class="course-picker-toggle" aria-label="Filter by courses" :aria-expanded="coursePickerOpen" aria-controls="course-options" @click="coursePickerOpen=!coursePickerOpen">
        <span>{{ courseFilterLabel }}</span><span aria-hidden="true">⌄</span>
      </button>
      <div v-if="coursePickerOpen" id="course-options" class="course-options" role="group" aria-label="Choose courses">
        <div class="course-options-heading"><span>Choose courses</span><button @click="courseFilters=[];filterCourses()">Show all</button></div>
        <div class="course-options-list">
          <label v-for="c in availableCourses" :key="c.id"><input v-model="courseFilters" type="checkbox" :value="c.id" @change="filterCourses" /><span>{{ c.label }}</span></label>
        </div>
      </div>
    </div>
  </div>
  <div class="graph-workspace" :class="{'has-detail':!!selected}">
    <div ref="frame" class="graph-canvas">
      <div class="canvas-controls"><button aria-label="Zoom out" @click="zoom(1.2)">−</button><span>{{ percent }}%</span><button aria-label="Zoom in" @click="zoom(1/1.2)">+</button><button @click="fit()">Fit</button><button @click="reset">Reset</button><button :aria-expanded="settingsOpen" @click="settingsOpen=!settingsOpen">Display</button></div>
      <div v-if="settingsOpen" class="graph-settings">
        <label class="label-toggle"><span>Show all labels</span><input v-model="showLabels" type="checkbox" /></label>
        <label><span>Text size <small>{{ textSize }} px</small></span><input v-model.number="textSize" aria-label="Text size" type="range" min="10" max="16" step="1" /></label>
        <label><span>Repel strength</span><input v-model.number="spacing" aria-label="Repel strength" type="range" min="0.7" max="1.6" step="0.1" @change="layoutVisible" /></label>
        <label><span>Link distance</span><input v-model.number="linkDistance" aria-label="Link distance" type="range" min="0.7" max="1.6" step="0.1" @change="layoutVisible" /></label>
      </div>
      <div v-if="domainFilter||courseFilters.length||focusedId" class="scope-label">{{ visibleNodes.filter(n=>n.kind==='concept').length }} concepts <button @click="reset">Show all ↗</button></div>
      <svg ref="svg" :viewBox="viewBox" tabindex="0" aria-label="Knowledge graph: courses and concepts" @wheel.prevent="wheel"
        @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="cancel"
        @keydown.+.prevent="zoom(1/1.2)" @keydown.-.prevent="zoom(1.2)" @keydown.home.prevent="fit()" @keydown.left.prevent="view.x-=40*unit" @keydown.right.prevent="view.x+=40*unit" @keydown.up.prevent="view.y-=40*unit" @keydown.down.prevent="view.y+=40*unit">
        <defs><marker id="knowledge-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#777" /></marker></defs>
        <g aria-hidden="true"><path v-for="(edge,i) in visibleEdges" :key="i" :d="pathFor(edge)" :class="['graph-edge',edge.kind,{active:edgeActive(edge),dim:activeId&&!edgeActive(edge)}]" :marker-end="edge.kind==='relation'&&edgeActive(edge)?'url(#knowledge-arrow)':undefined" /></g>
        <g v-for="node in visibleNodes" :key="node.id" :data-node="node.id" :transform="`translate(${node.x},${node.y})`" role="button" tabindex="0"
          :aria-label="node.label+', '+node.kind+', '+domainName(node.domain)" :aria-pressed="selectedId===node.id" :class="['graph-node',node.kind,{selected:activeId===node.id,dim:dim(node)}]"
          @mouseenter="hoveredId=node.id" @mouseleave="hoveredId=''" @focus="hoveredId=node.id" @blur="hoveredId=''" @click="!suppressClick&&choose(node.id)" @keydown.enter.prevent.stop="choose(node.id)" @keydown.space.prevent.stop="choose(node.id)">
          <title>{{ node.label }} — {{ node.kind==='concept'?citationText(node.citationCount):'Course' }}</title>
          <circle :r="node.radius+8" fill="transparent" />
          <circle class="node-halo" :r="node.radius+5" :stroke="color(node.domain)" />
          <circle :r="node.radius" :fill="color(node.domain)" />
          <text v-if="showLabels||!labels.get(node.id)?.hidden||neighbors.has(node.id)&&activeId" class="node-label" :opacity="activeId?1:labelOpacity" :style="{fontSize:textSize*unit+'px',strokeWidth:3.5*unit+'px'}">
            <tspan v-for="(line,i) in node.lines" :key="i" :x="labels.get(node.id)?.x" :y="(labels.get(node.id)?.y||0)+i*(textSize+3)*unit">{{ line }}</tspan>
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
  <div class="graph-key"><span><i class="key-course"></i>Course <i class="key-concept"></i>Concept</span><span>Drag nodes or pan · Scroll to zoom · Hover to trace links</span><a :href="withBase('/guide/concept-links.html')">Add connections ↗</a></div>
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
.course-picker{position:relative;margin-left:auto;max-width:220px;min-width:145px}
.course-picker-toggle{display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;border:1px solid #ddd;background:#fff;padding:8px 10px;border-radius:3px;text-align:left;line-height:22px}
.course-picker-toggle>span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.course-picker-toggle>span:last-child{color:#888}
.course-options{position:absolute;top:calc(100% + 6px);right:0;width:260px;max-width:calc(100vw - 24px);border:1px solid #ddd;border-radius:3px;background:#fff;z-index:20;box-shadow:0 4px 14px #0000000a}
.course-options-heading{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid #eee;font-size:11px;color:#888}
.course-options-heading button{color:#555;font-size:11px;text-decoration:underline;text-underline-offset:3px}
.course-options-list{max-height:min(300px,50dvh);overflow:auto;padding:4px 0}
.course-options-list label{display:flex;align-items:center;gap:10px;padding:9px 12px;font-size:12px;line-height:1.5;cursor:pointer}
.course-options-list label:hover{background:#f6f6f4}.course-options-list input{accent-color:#555;width:14px;height:14px;flex-shrink:0;margin:0}

.graph-workspace{display:flex;height:calc(100dvh - 190px);min-height:440px;border:1px solid #e5e5e2;border-radius:3px;overflow:hidden}
.graph-canvas{position:relative;background:var(--graph-bg);flex:1;min-width:0;min-height:0}
svg{display:block;width:100%;height:100%;touch-action:none;user-select:none;cursor:grab}svg:active{cursor:grabbing}
.canvas-controls{position:absolute;right:12px;top:12px;z-index:2;display:flex;align-items:center;gap:2px;background:#ffffffed;border:1px solid #e5e5e2;border-radius:3px}
.canvas-controls button{padding:5px 9px;color:#555}.canvas-controls button:hover{background:#eee}.canvas-controls span{font-size:10px;color:#999;min-width:32px;text-align:center}
.scope-label{position:absolute;bottom:10px;left:12px;color:#777;font-size:11px;background:#ffffffeb;padding:3px 7px;z-index:2}.scope-label button{margin-left:10px;color:#333;font-size:11px;text-decoration:underline}
.graph-edge{fill:none;stroke:#999;stroke-width:.8;opacity:.6;pointer-events:none;vector-effect:non-scaling-stroke}
.graph-edge.membership{opacity:.38;stroke-width:.7}.graph-edge.active{opacity:.85;stroke:#777;stroke-width:1.1}.graph-edge.dim{opacity:.07}
.graph-node{cursor:pointer;outline:none}.graph-node.dim{opacity:.16}.graph-node:hover,.graph-node:focus-visible{opacity:1}
.node-label{font-family:var(--vp-font-family-base);fill:#555;paint-order:stroke;stroke:var(--graph-bg);stroke-width:4px;stroke-linejoin:round;pointer-events:all}
.graph-node.course .node-label{font-weight:600;fill:#444}.graph-node.selected .node-label{font-weight:600}
.node-halo{fill:none;opacity:0;stroke-width:1.2}.graph-node:hover .node-halo,.graph-node:focus-visible .node-halo,.graph-node.selected .node-halo{opacity:.8}
.graph-node:focus-visible .node-label{text-decoration:underline}
.graph-settings{position:absolute;right:12px;top:54px;z-index:8;width:210px;padding:14px 16px;background:#fff;border:1px solid #ddd;border-radius:4px;box-shadow:0 4px 16px #00000008;font-size:12px}
.graph-settings label{display:block;margin-top:12px}.graph-settings label:first-child{margin-top:0}.graph-settings label>span{display:flex;justify-content:space-between}.graph-settings small{color:#999}.graph-settings input[type=range]{display:block;width:100%;margin-top:6px;accent-color:#777}.graph-settings .label-toggle{display:flex;justify-content:space-between;gap:12px}.graph-settings input[type=checkbox]{accent-color:#777}
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
.graph-toolbar{gap:8px}.graph-search{max-width:none;flex:1}.course-picker{max-width:155px;min-width:120px;margin-left:0}.graph-domains{order:3;width:100%}.graph-domains button{font-size:11px;padding:4px 7px}
.graph-workspace{height:calc(100dvh - 240px);min-height:400px;position:relative}.graph-detail{position:absolute;bottom:0;left:0;right:0;width:100%;max-height:48%;border-left:0;border-top:1px solid #ddd;z-index:5;padding:12px 18px}.detail-controls{margin-bottom:8px}
.graph-key{flex-wrap:wrap;font-size:10px}.graph-key>span:nth-child(2){display:none}.expanded{padding:12px}.expanded .graph-workspace{min-height:0}
}
</style>
