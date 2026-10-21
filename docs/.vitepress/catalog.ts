import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

export const docsRoot = fileURLToPath(new URL('../', import.meta.url))
export const collections = [
  { id: 'math', name: 'Mathematics', description: 'Mathematical foundations.' },
  { id: 'numerical-methods', name: 'Numerical Methods', description: '' },
  { id: 'mechanics', name: 'Mechanics', description: 'Foundations of mechanics, fluid mechanics, and computational fluid dynamics.' },
  { id: 'machine-learning', name: 'Machine Learning', description: 'Machine learning foundations, statistical learning, and neural networks.' }
]

export interface NoteNode {
  title: string
  description: string
  path: string
  url?: string
  order: number
  children?: NoteNode[]
}

function metadata(file: string, fallback: string) {
  const { data, content } = existsSync(file) ? matter(readFileSync(file, 'utf8')) : { data: {}, content: '' }
  if (data.order !== undefined && (typeof data.order !== 'number' || !Number.isFinite(data.order))) {
    throw new Error(`Invalid order in ${file}: use a finite number, such as 10.`)
  }
  return {
    title: typeof data.title === 'string' ? data.title : content.match(/^# (.+)$/m)?.[1] ?? fallback,
    description: typeof data.description === 'string' ? data.description : '',
    order: data.order ?? Number.MAX_SAFE_INTEGER
  }
}

// Files and folders share one ordering at every level. Folder metadata lives in index.md.
export function scan(folder = docsRoot): NoteNode[] {
  if (!existsSync(folder)) return []
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry): NoteNode[] => {
    if (entry.name.startsWith('.') || entry.name === 'public' || entry.name === 'index.md') return []
    const file = join(folder, entry.name)
    const path = relative(docsRoot, file).replaceAll('\\', '/').replace(/\.md$/, '')
    if (entry.isDirectory()) {
      const index = join(file, 'index.md')
      const children = scan(file)
      if (!existsSync(index) && !children.length) return []
      return [{ ...metadata(index, entry.name.replaceAll('-', ' ')), path,
        ...(existsSync(index) ? { url: '/' + path + '/' } : {}), children }]
    }
    if (!entry.isFile() || !entry.name.endsWith('.md')) return []
    return [{ ...metadata(file, entry.name.replace(/\.md$/, '')), path, url: '/' + path + '.html' }]
  }).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'en') || a.path.localeCompare(b.path, 'en'))
}

export function sidebarItems(nodes: NoteNode[]): any[] {
  return nodes.map(node => ({ text: node.title, ...(node.url ? { link: node.url } : {}),
    ...(node.children?.length ? { collapsed: true, items: sidebarItems(node.children) } : {}) }))
}

export function folderContents(nodes = scan()): Record<string, NoteNode[]> {
  return Object.assign({}, ...nodes.filter(n => n.children).map(n => ({
    [n.path]: n.children, ...folderContents(n.children)
  })))
}
