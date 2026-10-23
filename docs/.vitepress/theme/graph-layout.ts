export interface GraphNode {
  id: string; label: string; domain?: string; kind: 'course' | 'concept'
  x: number; y: number; radius: number; citationCount: number; path?: string
  location?: {path: string; anchor: string}; courses?: string[]
  lines: string[]; labelWidth: number; aliases?: string[]
}
export interface GraphEdge { source: string; target: string; kind: 'membership' | 'relation'; relation?: any; bend?: number }
export const courseRadius = 11.5
export const conceptRadius = (count: number) => Math.min(courseRadius * .7, 4.8 + 1.4 * Math.log2(1 + Math.max(0, count)))

// Count distinct registered citing concepts, never passages or course memberships.
export function citationCounts(data: any): Map<string, number> {
  const sources = new Map<string, Set<string>>(data.concepts.map((c: any) => [c.id, new Set<string>()]))
  const add = (source: string, target: string) => {
    if (source !== target && sources.has(source)) sources.get(target)?.add(source)
  }
  for (const m of data.mentions || []) add(m.sourceConcept, m.concept)
  for (const r of data.relations || []) add(r.source, r.target)
  return new Map([...sources].map(([id, ids]) => [id, ids.size]))
}

// Bends use a canonical pair direction, so reverse arrows take separate lanes too.
export function curveEdges(edges: GraphEdge[]) {
  const pairs = new Map<string, GraphEdge[]>()
  for (const edge of edges.filter(e => e.kind === 'relation')) {
    const key = JSON.stringify([edge.source, edge.target].sort())
    if (!pairs.has(key)) pairs.set(key, [])
    pairs.get(key)!.push(edge)
  }
  for (const group of pairs.values()) group.forEach((e, i) => {
    const offset = group.length === 1 ? 8 : (i - (group.length - 1) / 2) * 64
    e.bend = offset * (e.source < e.target ? 1 : -1)
  })
}

export function edgePath(e: GraphEdge, a: GraphNode, b: GraphNode, stretch = 1): string {
  const ax = a.x, ay = a.y * stretch, bx = b.x, by = b.y * stretch
  const dx = bx - ax, dy = by - ay, distance = Math.hypot(dx, dy)
  if (distance < 1) return ''
  const bend = e.kind === 'membership' ? 0 : e.bend || 0
  const cx = (ax + bx) / 2 - dy / distance * bend
  const cy = (ay + by) / 2 + dx / distance * bend
  const startLength = Math.hypot(cx - ax, cy - ay), endLength = Math.hypot(bx - cx, by - cy)
  const start = Math.min(a.radius + 3, startLength * .45), end = Math.min(b.radius + 7, endLength * .45)
  const x1 = ax + (cx - ax) / startLength * start, y1 = ay + (cy - ay) / startLength * start
  const x2 = bx - (bx - cx) / endLength * end, y2 = by - (by - cy) / endLength * end
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

export function wrapLabel(label: string, limit = 23): string[] {
  const lines: string[] = []
  for (const word of label.split(/\s+/)) {
    const last = lines.length - 1
    if (last >= 0 && lines[last].length + word.length + 1 <= limit) lines[last] += ' ' + word
    else lines.push(word)
  }
  return lines.length ? lines : ['']
}
export function graphBounds(nodes: GraphNode[]) {
  if (!nodes.length) return {x:-200,y:-150,w:400,h:300}
  const left=Math.min(...nodes.map(n=>n.x-Math.max(80,n.labelWidth*.6)))
  const right=Math.max(...nodes.map(n=>n.x+Math.max(80,n.labelWidth*.6)))
  const top=Math.min(...nodes.map(n=>n.y-55)),bottom=Math.max(...nodes.map(n=>n.y+55))
  return {x:left,y:top,w:right-left,h:bottom-top}
}
export type ForceOptions = {spacing?:number;distance?:number;aspect?:number}
function hash(id:string) { let h=2166136261;for(const c of id)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0)/4294967296 }

// Only circles and connections participate in the physics. Text is positioned
// separately, so long titles cannot turn the network into rows or columns.
export function createGraphSimulation(nodes:GraphNode[], edges:GraphEdge[], options:ForceOptions={}) {
  const spacing=options.spacing||1,distance=options.distance||1,aspect=Math.max(.7,Math.min(2.3,options.aspect||1.8))
  const byId=new Map(nodes.map(n=>[n.id,n])),velocity=new Map(nodes.map(n=>[n.id,{x:0,y:0}]))
  const domains=[...new Set(nodes.map(n=>n.domain))]
  const anchors=new Map(domains.map((id,i)=>{const a=-Math.PI+i*2*Math.PI/domains.length;return[id,{x:Math.cos(a)*190*aspect*spacing,y:Math.sin(a)*(aspect<1?250/aspect:125/Math.sqrt(aspect))*spacing}]}))
  const links=edges.map(e=>({e,a:byId.get(e.source),b:byId.get(e.target)})).filter(l=>l.a&&l.b)
  return {
    tick(alpha=1,fixed?:{id:string;x:number;y:number}){
      const force=new Map(nodes.map(n=>{
        const a=anchors.get(n.domain)!
        return[n.id,{x:-n.x*(.003/aspect)+(a.x-n.x)*.006,y:-n.y*(.005*aspect)+(a.y-n.y)*.007}]
      }))
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j]
        let dx=a.x-b.x,dy=a.y-b.y
        if(Math.abs(dx)+Math.abs(dy)<.001){dx=(hash(a.id)-.5)*.1||.01;dy=.1}
        const d=Math.max(.1,Math.hypot(dx,dy))
        const clearance=(a.radius+b.radius+48)*spacing
        const push=2200*spacing*spacing/(d*d+200)+Math.max(0,clearance-d)*.22
        const fx=dx/d*push,fy=dy/d*push
        force.get(a.id)!.x+=fx;force.get(a.id)!.y+=fy;force.get(b.id)!.x-=fx;force.get(b.id)!.y-=fy
      }
      for(const {e,a,b} of links){
        const dx=b!.x-a!.x,dy=b!.y-a!.y,d=Math.max(1,Math.hypot(dx,dy))
        const target=(e.kind==='membership'?155:115)*distance
        const strength=e.kind==='membership'?.012:(a!.domain===b!.domain?.022:.012)
        const pull=(d-target)*strength
        force.get(a!.id)!.x+=dx/d*pull;force.get(a!.id)!.y+=dy/d*pull
        force.get(b!.id)!.x-=dx/d*pull;force.get(b!.id)!.y-=dy/d*pull
      }
      for(const n of nodes.filter(n=>n.kind==='course')){
        const members=links.filter(l=>l.e.kind==='membership'&&l.b!.id===n.id).map(l=>l.a!)
        if(members.length<3)continue
        force.get(n.id)!.x+=(members.reduce((s,m)=>s+m.x,0)/members.length-n.x)*.06
        force.get(n.id)!.y+=(members.reduce((s,m)=>s+m.y,0)/members.length-n.y)*.06
      }
      let energy=0
      for(const n of nodes){
        const v=velocity.get(n.id)!,f=force.get(n.id)!
        if(fixed?.id===n.id){n.x=fixed.x;n.y=fixed.y;v.x=0;v.y=0;continue}
        v.x=(v.x+f.x*alpha)*.72;v.y=(v.y+f.y*alpha)*.72
        const speed=Math.hypot(v.x,v.y),limit=speed>10?10/speed:1
        n.x+=v.x*limit;n.y+=v.y*limit;energy+=speed
      }
      return energy
    }
  }
}

export function graphLayout(data:any,aspect=1.8,options:ForceOptions={}):{nodes:GraphNode[];edges:GraphEdge[]} {
  const counts=citationCounts(data)
  const nodes:GraphNode[]=[...(data.courses||[]).map((c:any)=>({...c,kind:'course'})),...data.concepts.map((c:any)=>({...c,kind:'concept'}))].map(n=>{
    const lines=wrapLabel(n.label)
    return {...n,x:0,y:0,citationCount:counts.get(n.id)||0,radius:n.kind==='course'?courseRadius:conceptRadius(counts.get(n.id)||0),lines,labelWidth:Math.max(...lines.map(s=>s.length))*6.4}
  })
  const edges:GraphEdge[]=[...data.concepts.flatMap((c:any)=>[...new Set<string>(c.courses||[])].map(target=>({source:c.id,target,kind:'membership' as const}))),
    ...(data.relations||[]).map((r:any)=>({source:r.source,target:r.target,kind:'relation' as const,relation:r}))]
  curveEdges(edges)
  const domains=[...new Set(nodes.map(n=>n.domain))]
  for(const n of nodes){
    const angle=-Math.PI+domains.indexOf(n.domain)*Math.PI*2/Math.max(1,domains.length)
    const phase=hash(n.id)*Math.PI*2,radius=50+Math.sqrt(hash(n.id+'radius'))*150
    n.x=Math.cos(angle)*210*Math.sqrt(aspect)+Math.cos(phase)*radius
    n.y=Math.sin(angle)*210/Math.sqrt(aspect)+Math.sin(phase)*radius
  }
  const simulation=createGraphSimulation(nodes,edges,{...options,aspect})
  for(let i=0;i<420;i++)simulation.tick(Math.max(.15,1-i/470))
  return{nodes,edges}
}

export interface LabelPlacement {x:number;y:number;lines:string[];width:number;height:number;hidden:boolean}
// Resolve text in screen space around each dot, without moving the graph itself.
export function placeGraphLabels(nodes:GraphNode[],view:{x:number;y:number;w:number;h:number},width:number,font=12):Map<string,LabelPlacement>{
  const unit=view.w/Math.max(1,width),height=view.h/unit
  const screen=nodes.map(n=>({n,x:(n.x-view.x)/unit,y:(n.y-view.y)/unit,r:n.radius/unit}))
  const occupied:{x:number;y:number;w:number;h:number}[]=[]
  const result=new Map<string,LabelPlacement>()
  const overlap=(a:any,b:any)=>Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y))
  for(const {n,x,y,r} of [...screen].sort((a,b)=>Number(b.n.kind==='course')-Number(a.n.kind==='course')||b.n.citationCount-a.n.citationCount||a.n.id.localeCompare(b.n.id))){
    const w=n.labelWidth*font/12+8,h=n.lines.length*(font+3)+4,gap=r+6
    const positions=[0,14,28].flatMap(extra=>{const gap=r+6+extra;return[{x:x+gap,y:y-h/2},{x:x-w-gap,y:y-h/2},{x:x-w/2,y:y+gap},{x:x-w/2,y:y-gap-h},
      {x:x+gap,y:y+gap},{x:x-w-gap,y:y+gap},{x:x+gap,y:y-h-gap},{x:x-w-gap,y:y-h-gap}]})
    let best=positions[0],score=Infinity
    positions.forEach((candidate,i)=>{
      const p={...candidate}
      if(x>=0&&x<=width&&y>=0&&y<=height){p.x=Math.max(8,Math.min(width-w-8,p.x));p.y=Math.max(8,Math.min(height-h-8,p.y))}
      const box={...p,w,h}
      const clip=Math.max(0,-p.x)+Math.max(0,p.x+w-width)+Math.max(0,-p.y)+Math.max(0,p.y+h-height)
      const collisions=occupied.reduce((s,b)=>s+overlap(box,b),0)+screen.reduce((s,d)=>s+overlap(box,{x:d.x-d.r-3,y:d.y-d.r-3,w:2*d.r+6,h:2*d.r+6}),0)
      const value=collisions*10+clip*20+i*1.5
      if(value<score){score=value;best=p}
    })
    const hidden=n.kind!=='course'&&(score>200||unit>2&&n.citationCount<2)
    if(!hidden)occupied.push({...best,w,h})
    result.set(n.id,{x:best.x*unit+view.x-n.x,y:(best.y+font+1)*unit+view.y-n.y,lines:n.lines,width:w*unit,height:h*unit,hidden})
  }
  return result
}
