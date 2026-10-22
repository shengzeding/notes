<script setup lang="ts">
import { computed, reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'
import { data } from './knowledge.data'
import { graphLayout } from './graph-layout'
const initial = graphLayout(data)
const nodes = reactive(initial.nodes)
const edges = initial.edges
const byId = new Map(nodes.map(n => [n.id,n]))
const selectedId = ref<string | null>(null)
const selected = computed(() => nodes.find(n => n.id === selectedId.value))
const domainFilter = ref<string | null>(null)
const view = reactive({x:0,y:0,w:1000,h:560})
const viewBox = computed(() => [view.x,view.y,view.w,view.h].join(' '))
const svg = ref<SVGSVGElement | null>(null)
const compact = ref(false)
const stretch = computed(() => compact.value ? 1.8 : 1)
let media: MediaQueryList | undefined
function resizeGraph() { compact.value=!!media?.matches; Object.assign(view,{x:0,y:0,w:1000,h:compact.value?900:560}) }
onMounted(() => { media=window.matchMedia('(max-width: 640px)');resizeGraph();media.addEventListener('change',resizeGraph) })
onBeforeUnmount(() => media?.removeEventListener('change',resizeGraph))
const color = (domain?: string) => data.domains.find(d => d.id === domain)?.color || '#777'
const domainName = (domain?: string) => data.domains.find(d => d.id === domain)?.label || 'Unassigned'
const relationName = (type: string) => ({
  'derivation-uses':'This derivation uses','instance-of':'Is an instance of',
  'equivalent-to':'Is equivalent to','generalizes':'Generalizes'
}[type] || type)
const url = (path: string, anchor?: string) => withBase('/' + path.replace(/\/index\.md$/, '/').replace(/\.md$/, '.html') + (anchor ? '#' + anchor : ''))
const nodeUrl = computed(() => selected.value?.location
  ? url(selected.value.location.path,selected.value.location.anchor) : selected.value?.path ? url(selected.value.path) : '')
const neighbors = computed(() => new Set(edges.filter(e => e.source===selectedId.value||e.target===selectedId.value).flatMap(e => [e.source,e.target])))
const related = computed(() => data.relations.filter(r=>r.source===selectedId.value||r.target===selectedId.value))
const members = computed(() => selected.value?.kind==='course'
  ? nodes.filter(n=>n.courses?.includes(selected.value!.id))
  : nodes.filter(n=>selected.value?.courses?.includes(n.id)))
const dim = (n: any) => domainFilter.value ? n.domain!==domainFilter.value : selectedId.value ? !neighbors.value.has(n.id)&&n.id!==selectedId.value : false
const edgeDim = (e: any) => selectedId.value
  ? e.source!==selectedId.value && e.target!==selectedId.value
  : domainFilter.value ? byId.get(e.source)?.domain!==domainFilter.value && byId.get(e.target)?.domain!==domainFilter.value : false
function points(e: any) {
  const a=byId.get(e.source)!,b=byId.get(e.target)!
  const dx=b.x-a.x,dy=(b.y-a.y)*stretch.value,d=Math.max(1,Math.hypot(dx,dy))
  return {x1:a.x+dx/d*(a.radius+3),y1:a.y*stretch.value+dy/d*(a.radius+3),
    x2:b.x-dx/d*(b.radius+7),y2:b.y*stretch.value-dy/d*(b.radius+7)}
}
let suppressClick = false
function activate(id: string) { if (!suppressClick) choose(id) }
function choose(id: string) { selectedId.value=id; domainFilter.value=null }
function zoom(factor:number){
  const w=Math.max(300,Math.min(1600,view.w*factor)),ratio=w/view.w
  view.x+=(view.w-w)/2;view.y+=(view.h-view.h*ratio)/2;view.w=w;view.h*=ratio
}
function reset(){
  Object.assign(view,{x:0,y:0,w:1000,h:compact.value?900:560})
  const fresh=graphLayout(data);nodes.forEach((n,i)=>Object.assign(n,{x:fresh.nodes[i].x,y:fresh.nodes[i].y}))
  selectedId.value=null;domainFilter.value=null
}
let drag: {id?:string; px:number; py:number; x:number; y:number; moved:boolean; pointer:number} | null=null
function point(e:PointerEvent){
  const p=svg.value!.createSVGPoint();p.x=e.clientX;p.y=e.clientY
  return p.matrixTransform(svg.value!.getScreenCTM()!.inverse())
}
function down(e:PointerEvent){
  if(e.button!==0) return
  suppressClick=false
  const p=point(e),id=(e.target as Element).closest('[data-node]')?.getAttribute('data-node') || undefined
  const n=id?byId.get(id):undefined
  drag={id,px:e.clientX,py:e.clientY,x:n?n.x-p.x:view.x,y:n?n.y-p.y/stretch.value:view.y,moved:false,pointer:e.pointerId}
  svg.value!.setPointerCapture(e.pointerId)
}
function move(e:PointerEvent){
  if(!drag||drag.pointer!==e.pointerId)return
  if(Math.hypot(e.clientX-drag.px,e.clientY-drag.py)>4)drag.moved=true
  if(!drag.moved)return
  if(drag.id){const p=point(e),n=byId.get(drag.id)!;n.x=p.x+drag.x;n.y=p.y/stretch.value+drag.y}
  else {const scale=view.w/svg.value!.getBoundingClientRect().width;view.x=drag.x-(e.clientX-drag.px)*scale;view.y=drag.y-(e.clientY-drag.py)*scale}
}
function up(e:PointerEvent){
  if(!drag||drag.pointer!==e.pointerId)return
  suppressClick=drag.moved
  if(!drag.moved){if(drag.id)choose(drag.id);else selectedId.value=null}
  drag=null
  if(svg.value?.hasPointerCapture(e.pointerId))svg.value.releasePointerCapture(e.pointerId)
}
</script>

<template>
  <div class="knowledge-map">
    <div class="graph-intro">
      <p>{{ data.concepts.length }} concepts · {{ data.courses.length }} courses. Follow the connections between subjects.</p>
      <a :href="withBase('/guide/concept-links.html')">How to add connections</a>
    </div>
    <div class="graph-toolbar">
      <div class="graph-domains" aria-label="Highlight a domain">
        <button v-for="domain in data.domains" :key="domain.id"
          :aria-pressed="domainFilter===domain.id"
          @click="domainFilter=domainFilter===domain.id?null:domain.id;selectedId=null">
          <span class="domain-dot" :style="{background:domain.color}"></span>{{ domain.label }}
        </button>
      </div>
      <div class="graph-controls" aria-label="Graph controls">
        <button aria-label="Zoom in" @click="zoom(.8)">+</button>
        <button aria-label="Zoom out" @click="zoom(1.25)">−</button>
        <button @click="reset">Reset</button>
      </div>
    </div>
    <div class="graph-canvas">
      <svg ref="svg" :viewBox="viewBox" :style="{aspectRatio: compact ? '1000 / 900' : '1000 / 560'}" aria-label="Knowledge graph: courses and concepts"
        @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="drag=null"
        @keydown.esc="selectedId=null;domainFilter=null">
        <defs>
          <marker id="knowledge-arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/>
          </marker>
        </defs>
        <g aria-hidden="true">
          <line v-for="(edge,i) in edges" :key="i" v-bind="points(edge)"
            :class="['graph-edge',edge.kind,{dim:edgeDim(edge)}]"
            :marker-end="edge.kind==='relation'?'url(#knowledge-arrow)':undefined"/>
        </g>
        <g v-for="node in nodes" :key="node.id" :data-node="node.id"
          :transform="'translate('+node.x+','+(node.y*stretch)+')'" role="button" tabindex="0"
          :aria-label="node.label+', '+node.kind+', '+domainName(node.domain)"
          :aria-pressed="selectedId===node.id"
          :class="['graph-node',node.kind,{selected:selectedId===node.id,dim:dim(node)}]"
          @click="activate(node.id)" @keydown.enter.prevent="choose(node.id)" @keydown.space.prevent="choose(node.id)">
          <circle :r="node.radius+12" fill="transparent" pointer-events="all" />
          <circle class="graph-node-halo" :r="node.radius+8" :stroke="color(node.domain)"/>
          <circle :r="node.radius" :fill="color(node.domain)" />
          <text y="0" :dy="node.radius+28" text-anchor="middle">{{ node.label }}</text>
          <text v-if="node.kind==='course'" class="course-caption" :dy="node.radius+47" text-anchor="middle">COURSE</text>
        </g>
      </svg>
    </div>
    <div class="graph-key">
      <span><i class="key-course"></i> Course</span>
      <span><i class="key-concept"></i> Concept</span>
      <span><i class="key-membership"></i> Course connection</span>
      <span><i class="key-relation"></i> Concept relation →</span>
      <span class="graph-hint">Drag nodes or background. Select a node to explore.</span>
    </div>
    <section class="graph-detail" aria-label="Selected node details" aria-live="polite">
      <template v-if="selected">
        <div class="graph-detail-title">
          <div><small>{{ domainName(selected.domain) }} · {{ selected.kind }}</small><h2>{{ selected.label }}</h2></div>
          <a :href="nodeUrl">Open notes ↗</a>
        </div>
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
      <p v-else class="graph-empty-detail">Select a course or concept to see its connections and open the relevant notes.</p>
    </section>
    <details class="graph-node-list">
      <summary>Browse all nodes</summary>
      <button v-for="node in nodes" :key="node.id" @click="choose(node.id)">{{ node.label }} <small>{{ node.kind }}</small></button>
    </details>
  </div>
</template>

<style scoped>
.graph-intro {display:flex;justify-content:space-between;align-items:baseline;gap:20px;margin-bottom:28px;color:#777;font-size:13px}
.graph-intro p {margin:0}.graph-intro a{white-space:nowrap;color:#555}
.graph-toolbar {display:flex;justify-content:space-between;gap:16px;margin-bottom:12px}
.graph-domains,.graph-controls {display:flex;gap:8px;align-items:center}
.graph-toolbar button {font-size:12px;color:#666;padding:5px 10px;border:1px solid #e8e8e8;border-radius:3px;background:#fff}
.graph-toolbar button:hover,.graph-toolbar button[aria-pressed=true]{border-color:#999;color:#111}
.domain-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px}
.graph-canvas{border:1px solid #ececec;border-radius:3px;background:#fdfdfc;overflow:hidden}
svg{display:block;width:100%;height:auto;aspect-ratio:1000/560;touch-action:none;user-select:none;cursor:grab}
svg:active{cursor:grabbing}
.graph-edge{stroke:#aaa;stroke-width:1.4;transition:opacity .15s}
.graph-edge.membership{stroke:#c0c0ba;stroke-dasharray:4 5;stroke-width:1.2}
.graph-node{cursor:grab;outline:none;transition:opacity .15s}
.graph-node text{font-size:16px;fill:#333;font-family:var(--vp-font-family-base)}
.graph-node.course text{font-size:20px;font-weight:500}
.graph-node .course-caption{font-size:9px!important;letter-spacing:2px;fill:#999;font-weight:400}
.graph-node-halo{fill:none;stroke-width:1.5;opacity:0}
.graph-node:hover .graph-node-halo,.graph-node:focus-visible .graph-node-halo,.graph-node.selected .graph-node-halo{opacity:.6}
.graph-node:focus-visible text{text-decoration:underline}
.dim{opacity:.17}
.graph-key{display:flex;flex-wrap:wrap;gap:10px 22px;font-size:11px;color:#888;padding:14px 0}
.graph-key span{display:inline-flex;align-items:center;gap:6px}
.graph-key i{display:inline-block}
.key-course{width:12px;height:12px;border-radius:50%;background:#aaa}.key-concept{width:6px;height:6px;border-radius:50%;background:#aaa}
.key-membership{width:20px;border-top:1px dashed #aaa}.key-relation{width:20px;border-top:1px solid #888}
.graph-hint{margin-left:auto}
.graph-detail{border-top:1px solid #e8e8e8;margin-top:8px;padding:22px 0;min-height:110px;font-size:13px}
.graph-detail-title{display:flex;justify-content:space-between;align-items:center;gap:20px}
.graph-detail-title small{color:#888;text-transform:capitalize}.graph-detail-title h2{margin:4px 0 10px;padding:0;border:0;font-size:20px}
.graph-detail a{font-size:12px;text-decoration:underline;text-underline-offset:3px}
.graph-members{display:flex;flex-wrap:wrap;gap:8px 18px;margin:8px 0 14px}.graph-members>span{color:#888}
.graph-detail button{color:#333;text-decoration:underline;text-underline-offset:3px}
.graph-relation-detail{padding:10px 0}.graph-relation-detail p{margin:4px 0;line-height:1.6}
.graph-qualification{color:#888;max-width:800px;font-size:12px}
.graph-empty-detail{color:#888;margin:0}
.graph-node-list{font-size:12px;color:#777;margin:10px 0}
.graph-node-list summary{cursor:pointer}
.graph-node-list button{display:block;text-align:left;margin:12px 0;color:#333}
.graph-node-list small{margin-left:8px;color:#888}
@media(max-width:640px){
.graph-node text{font-size:32px}.graph-node.course text{font-size:38px}.graph-node .course-caption{display:none}
.graph-intro{display:block}.graph-intro a{display:inline-block;margin-top:8px}
.graph-toolbar{gap:6px}.graph-domains{gap:3px}.graph-toolbar button{padding:5px 6px;font-size:11px}
.graph-key{gap:8px 14px}.graph-hint{margin-left:0;width:100%}
.graph-detail-title{align-items:flex-start}.graph-detail-title a{white-space:nowrap}
}
@media(prefers-reduced-motion:reduce){.graph-node,.graph-edge{transition:none}}
</style>
