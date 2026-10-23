export interface GraphNode {
  id: string; label: string; domain?: string; kind: 'course' | 'concept'
  x: number; y: number; radius: number; citationCount: number; path?: string
  location?: {path: string; anchor: string}; courses?: string[]
  lines: string[]; labelWidth: number; aliases?: string[]
}
export interface GraphEdge { source: string; target: string; kind: 'membership' | 'relation'; relation?: any; bend?: number }
export const courseRadius = 18
export const conceptRadius = (count: number) => Math.min(courseRadius * .7, 7 + 1.8 * Math.log2(1 + Math.max(0, count)))

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

// Complete labels take part in layout. They are never discarded to hide collisions.
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
  if (!nodes.length) return {x:0,y:0,w:400,h:300}
  const left = Math.min(...nodes.map(n => n.x - n.radius - 16))
  const top = Math.min(...nodes.map(n => n.y - Math.max(n.radius, n.lines.length * 7.5) - 18))
  const right = Math.max(...nodes.map(n => n.x + n.radius + 12 + n.labelWidth + 16))
  const bottom = Math.max(...nodes.map(n => n.y + Math.max(n.radius, n.lines.length * 7.5) + 18))
  return {x:left,y:top,w:right-left,h:bottom-top}
}

export function graphLayout(data: any, aspect = 2): {nodes: GraphNode[]; edges: GraphEdge[]} {
  const counts = citationCounts(data)
  const nodes: GraphNode[] = [...(data.courses || []).map((c: any) => ({...c,kind:'course'})),
    ...data.concepts.map((c: any) => ({...c,kind:'concept'}))].map(n => {
      const lines = wrapLabel(n.label)
      return {...n,x:0,y:0,citationCount:counts.get(n.id)||0,
        radius:n.kind==='course'?courseRadius:conceptRadius(counts.get(n.id)||0),lines,
        labelWidth:Math.max(...lines.map(s => s.length)) * (n.kind==='course'?8:7)}
    })
  const edges: GraphEdge[] = [
    ...data.concepts.flatMap((c: any) => [...new Set<string>(c.courses || [])].map(target => ({source:c.id,target,kind:'membership' as const}))),
    ...(data.relations || []).map((r: any) => ({source:r.source,target:r.target,kind:'relation' as const,relation:r}))
  ]
  curveEdges(edges)
  const courses = nodes.filter(n => n.kind === 'course')
  const courseById = new Map(courses.map(c => [c.id,c]))
  const home = (n: GraphNode) => n.courses?.find(id => courseById.get(id)?.domain === n.domain) || n.courses?.find(id => courseById.has(id)) || ''
  const domainIds = [...new Set(nodes.map(n => n.domain || 'unassigned'))]
  const adjacent = new Map(nodes.map(n => [n.id, new Set<string>()]))
  for (const e of edges.filter(e => e.kind === 'relation')) {adjacent.get(e.source)?.add(e.target);adjacent.get(e.target)?.add(e.source)}
  // Place related concepts next to each other within their course, retaining one
  // node even when it belongs to several courses. Every membership edge remains.
  function order(group: GraphNode[]) {
    const pending = new Map(group.map(n => [n.id,n])), result: GraphNode[] = []
    function visit(n: GraphNode) {
      if (!pending.delete(n.id)) return
      result.push(n)
      for (const id of adjacent.get(n.id) || []) {const next=pending.get(id);if(next)visit(next)}
    }
    for (const n of [...group].sort((a,b) => b.citationCount-a.citationCount || a.label.localeCompare(b.label))) visit(n)
    return result
  }
  const domains = domainIds.map(domain => {
    const groups: {course?:GraphNode;concepts:GraphNode[]}[] = courses.filter(c => (c.domain||'unassigned')===domain).map(course => ({course,concepts:order(nodes.filter(n => n.kind==='concept' && home(n)===course.id))}))
    const loose = nodes.filter(n => n.kind==='concept' && !home(n) && (n.domain||'unassigned')===domain)
    if(loose.length) groups.push({course:undefined,concepts:order(loose)})
    return {domain,groups}
  }).filter(d => d.groups.length)
  if (!domains.length) return {nodes,edges}
  const pitch = Math.max(185,...nodes.map(n => n.labelWidth+n.radius+28))
  const rowHeight = 48
  const gap = 32, header = 48
  function measure(columns: number[], perRow: number, place=false) {
    let x=0,y=0,rowH=0,width=0
    domains.forEach((domain,i) => {
      if(i && i%perRow===0){y+=rowH+gap;x=0;rowH=0}
      const cols=columns[i]
      const actualCols=Math.max(1,...domain.groups.map(g=>Math.min(cols,Math.max(1,g.concepts.length))))
      const w=actualCols*pitch
      let offsetY=0
      for(const group of domain.groups){
        if(place && group.course){group.course.x=x+18;group.course.y=y+offsetY+20}
        const startY=offsetY+(group.course?header:0)
        let rowY=startY
        for(let first=0;first<group.concepts.length;first+=cols){
          const row=group.concepts.slice(first,first+cols)
          const height=Math.max(rowHeight,...row.map(n=>n.lines.length*16+16))
          if(place)row.forEach((n,j)=>{n.x=x+18+j*pitch;n.y=y+rowY+height/2})
          rowY+=height
        }
        offsetY=rowY+16
      }
      width=Math.max(width,x+w);rowH=Math.max(rowH,offsetY);x+=w+gap
    })
    const height=y+rowH
    return {width,height,score:Math.max(width/Math.max(.35,aspect),height)}
  }
  // Choose a compact 2-D arrangement for this viewport, rather than squeezing
  // every new node into the original fixed strip. No maximum graph extent.
  let best: {columns:number[];perRow:number;score:number}|undefined
  for(let perRow=1;perRow<=domains.length;perRow++){
    const columns=domains.map(()=>2)
    for(let pass=0;pass<3;pass++)for(let i=0;i<domains.length;i++){
      let choice=columns[i],score=measure(columns,perRow).score
      for(let col=1;col<=5;col++){const trial=[...columns];trial[i]=col;const value=measure(trial,perRow).score;if(value<score){score=value;choice=col}}
      columns[i]=choice
    }
    const score=measure(columns,perRow).score
    if(!best||score<best.score)best={columns,perRow,score}
  }
  measure(best!.columns,best!.perRow,true)
  return {nodes,edges}
}
