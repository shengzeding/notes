export interface GraphNode {
  id: string; label: string; domain?: string; kind: 'course' | 'concept'
  x: number; y: number; radius: number; path?: string
  location?: {path: string; anchor: string}; courses?: string[]
}
export interface GraphEdge { source: string; target: string; kind: 'membership' | 'relation'; relation?: any }
export function graphLayout(data: any): {nodes: GraphNode[]; edges: GraphEdge[]} {
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
      nodes.push({...n, radius:n.kind === 'course' ? 24 : 9,
        x:c.x + (n.kind === 'course' ? -70 * inward : 70 * inward),
        y:n.kind === 'course' ? c.y + i * 70 : 160 + j * (240 / Math.max(1, concepts.length - 1))})
    })
  }
  const edges: GraphEdge[] = [
    ...data.concepts.flatMap((c: any) => (c.courses || []).map((target: string) => ({source:c.id,target,kind:'membership' as const}))),
    ...data.relations.map((r: any) => ({source:r.source,target:r.target,kind:'relation' as const,relation:r}))
  ]
  const byId = new Map(nodes.map(n => [n.id,n]))
  // Settle once before display: domain attraction, edge springs and label clearance.
  // Dragging is direct, so the finished reading surface never keeps moving.
  for (let step = 0; step < 180; step++) {
    const forces = new Map(nodes.map(n => {const c=center(n.domain);return [n.id,{x:(c.x-n.x)*.018,y:(c.y-n.y)*.012}]}))
    for (let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j]; const dx=a.x-b.x,dy=a.y-b.y
      const d=Math.max(1,Math.hypot(dx,dy)); const strength=1100/(d*d)
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
