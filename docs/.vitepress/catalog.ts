import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

export const docsRoot = fileURLToPath(new URL('../', import.meta.url))
export const collections = [
  { id: 'math', name: 'Mathematics & methods', description: 'Mathematical foundations, derivations, and numerical methods.' },
  { id: 'scientific-ml', name: 'Scientific machine learning', description: 'Physics-based models, machine learning, and differentiable simulation.' },
  { id: 'papers', name: 'Paper notes', description: 'Reading notes, key ideas, and open questions.' }
]

export function scan(folder = docsRoot): any[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.') || entry.name === 'public') return []
    const path = join(folder, entry.name)
    if (entry.isDirectory()) return scan(path)
    if (!entry.name.endsWith('.md') || entry.name === 'index.md') return []
    const source = readFileSync(path, 'utf8')
    const route = relative(docsRoot, path).replaceAll('\\', '/').replace(/\.md$/, '')
    const title = source.match(/^# (.+)$/m)?.[1] ?? entry.name.replace('.md', '')
    const description = source.match(/^description:\s*["']?(.*?)["']?\s*$/m)?.[1] ?? ''
    return [{ title, description, url: '/' + route + '.html', collection: route.split('/')[0] }]
  }).sort((a, b) => a.title.localeCompare(b.title, 'en'))
}
