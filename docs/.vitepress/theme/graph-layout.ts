export interface GraphNode {
  id: string; label: string; domain?: string; kind: 'course' | 'concept'
  x: number; y: number; radius: number; citationCount: number; path?: string
  location?: {path: string; anchor: string}; courses?: string[]
}
export interface GraphEdge { source: string; target: string; kind: 'membership' | 'relation'; relation?: any; bend?: number }
export const courseRadius = 24
export const conceptRadius = (count: number) => Math.min(courseRadius * .7, 9 + 2.4 * Math.log2(1 + Math.max(0, count)))

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
    const offset = group.length === 1 ? 20 : (i - (group.length - 1) / 2) * 64
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

export function visibleGraphLabels(nodes: GraphNode[], width: number, priority = new Set<string>(), stretch = 1, compact = false) {
  if (nodes.length <= 18 && width <= 1050) return new Set(nodes.map(n => n.id))
  const visible = new Set(nodes.filter(n => n.kind === 'course' || priority.has(n.id)).map(n => n.id))
  const budget = Math.max(2, Math.round(18 * (1000 / width) ** 2))
  const bounds = (n: GraphNode) => {
    const font = compact ? (n.kind === 'course' ? 38 : 32) : (n.kind === 'course' ? 20 : 16)
    const scale = Math.max(.5, width / 1000)
    const scaledFont = font * scale
    const half = n.label.length * scaledFont * .28 + 10
    return {left:n.x-half, right:n.x+half, top:n.y*stretch+n.radius+8+20*scale-scaledFont, bottom:n.y*stretch+n.radius+8+(n.kind === 'course' && !compact ? 44 : 25)*scale}
  }
  const occupied = nodes.filter(n => visible.has(n.id)).map(bounds)
  const candidates = nodes.filter(n => !visible.has(n.id)).sort((a,b) => b.citationCount-a.citationCount || a.id.localeCompare(b.id))
  let added = 0
  for (const node of candidates) {
    if (added >= budget) break
    const box = bounds(node)
    if (occupied.some(b => box.left < b.right && box.right > b.left && box.top < b.bottom && box.bottom > b.top)) continue
    if (nodes.some(n => n.id !== node.id && box.left < n.x+n.radius+3 && box.right > n.x-n.radius-3 &&
      box.top < n.y*stretch+n.radius+3 && box.bottom > n.y*stretch-n.radius-3)) continue
    visible.add(node.id); occupied.push(box); added++
  }
  return visible
}

export function graphLayout(data: any): {nodes: GraphNode[]; edges: GraphEdge[]} {
  const counts = citationCounts(data)
  const domains = [...(data.domains || []).map((d: any) => d.id)]
  if ([...data.concepts, ...(data.courses || [])].some((n: any) => !n.domain)) domains.push(undefined)
  const center = (id?: string) => {
    const i = Math.max(0, domains.indexOf(id))
    return {x: 1000 * (i + .5) / Math.max(1, domains.length), y: 280}
  }
  const nodes: GraphNode[] = []
  for (const domain of domains) {
    const group = [...(data.courses || []).filter((c: any) => c.domain === domain).map((c: any) => ({...c,kind:'course'})),
      ...data.concepts.filter((c: any) => c.domain === domain).map((c: any) => ({...c,kind:'concept'}))]
    const c = center(domain)
    const concepts = group.filter(n => n.kind === 'concept')
    group.forEach((n, i) => {
      const inward = c.x <= 500 ? 1 : -1
      const j = concepts.indexOf(n)
      const citationCount = counts.get(n.id) || 0
      nodes.push({...n, citationCount, radius:n.kind === 'course' ? courseRadius : conceptRadius(citationCount),
        x:c.x + (n.kind === 'course' ? -70 * inward : 70 * inward),
        y:n.kind === 'course' ? c.y + i * 70 : 160 + j * (240 / Math.max(1, concepts.length - 1))})
    })
  }
  const edges: GraphEdge[] = [
    ...data.concepts.flatMap((c: any) => (c.courses || []).map((target: string) => ({source:c.id,target,kind:'membership' as const}))),
    ...data.relations.map((r: any) => ({source:r.source,target:r.target,kind:'relation' as const,relation:r}))
  ]
  curveEdges(edges)
  const byId = new Map(nodes.map(n => [n.id,n]))
  // Settle once before display: domain attraction, edge springs and label clearance.
  // Dragging is direct, so the finished reading surface never keeps moving.
  for (let step = 0; step < 180; step++) {
    const forces = new Map(nodes.map(n => {const c=center(n.domain);return [n.id,{x:(c.x-n.x)*.018,y:(c.y-n.y)*.012}]}))
    for (let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j]; const dx=a.x-b.x,dy=a.y-b.y
      const d=Math.max(1,Math.hypot(dx,dy)); const strength=1100/(d*d)+Math.max(0,a.radius+b.radius+14-d)*.3
      forces.get(a.id)!.x+=dx/d*strength; forces.get(a.id)!.y+=dy/d*strength
      forces.get(b.id)!.x-=dx/d*strength; forces.get(b.id)!.y-=dy/d*strength
      if(Math.abs(dx)<210 && Math.abs(dy)<90){
        const push=(90-Math.abs(dy))*.07*(dy>=0?1:-1)
        forces.get(a.id)!.y+=push; forces.get(b.id)!.y-=push
      }
    }
    for(const e of edges){
      const a=byId.get(e.source)!,b=byId.get(e.target)!
      const dx=b.x-a.x,dy=b.y-a.y,d=Math.max(1,Math.hypot(dx,dy))
      const desired=e.kind==='membership'?180:320
      const pull=(d-desired)*(e.kind==='membership'?.018:.008)
      forces.get(a.id)!.x+=dx/d*pull;forces.get(a.id)!.y+=dy/d*pull
      forces.get(b.id)!.x-=dx/d*pull;forces.get(b.id)!.y-=dy/d*pull
    }
    for(const n of nodes){const f=forces.get(n.id)!;n.x=Math.max(125,Math.min(875,n.x+f.x));n.y=Math.max(80,Math.min(440,n.y+f.y))}
  }
  return {nodes,edges}
}
