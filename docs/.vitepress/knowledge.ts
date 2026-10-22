import { readFileSync, readdirSync } from 'node:fs'
import { resolve, relative, posix } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createMarkdownRenderer } from 'vitepress'
import matter from 'gray-matter'

const root = fileURLToPath(new URL('../', import.meta.url))
export const registryFile = resolve(root, '.vitepress/knowledge.json')
export function registry() { return JSON.parse(readFileSync(registryFile, 'utf8')) }
export function noteUrl(location: {path: string; anchor: string}) {
  return '/' + location.path.replace(/\.md$/, '.html') + '#' + location.anchor
}
function files(dir = root): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.name.startsWith('.') || e.name === 'public' ? [] :
    e.isDirectory() ? files(resolve(dir, e.name)) :
    e.name.endsWith('.md') ? [resolve(dir, e.name)] : [])
}
function conceptFor(token: any, concepts: any[]) {
  const title = token.attrGet('title') || ''
  if (!title.startsWith('concept:')) return null
  const id = title.slice(8)
  const concept = concepts.find(c => c.id === id)
  if (!concept) throw new Error('Unknown concept: ' + id)
  return concept
}
// Ordinary Markdown links remain readable and navigable outside this website.
export function conceptLinks(md: any) {
  const original = md.renderer.rules.link_open
  md.renderer.rules.link_open = (tokens: any[], i: number, options: any, env: any, self: any) => {
    const token = tokens[i]
    const concept = conceptFor(token, registry().concepts)
    if (concept) {
      token.attrSet('title', concept.label)
      token.attrSet('data-concept', concept.id)
      token.attrJoin('class', 'concept-link')
    }
    return original ? original(tokens, i, options, env, self) : self.renderToken(tokens, i, options)
  }
}
export async function buildKnowledge() {
  const data = registry()
  const ids = new Set<string>()
  const md = await createMarkdownRenderer(root)
  const parsed = new Map<string, any>()
  for (const file of files()) {
    const path = relative(root, file).replaceAll('\\', '/')
    const {content, data: frontmatter} = matter(readFileSync(file, 'utf8'))
    const tokens = md.parse(content, {})
    const anchors = new Set<string>()
    for (const token of tokens) {
      for (const t of [token, ...(token.children || [])]) {
        if (t.type === 'html_block' || t.type === 'html_inline')
          for (const m of t.content.matchAll(/\bid="([^"]+)"/g)) anchors.add(m[1])
      }
    }
    parsed.set(path, {tokens, anchors, title: frontmatter.title || path})
  }
  function checkLocation(loc: any) {
    if (!parsed.get(loc.path)?.anchors.has(loc.anchor))
      throw new Error('Missing knowledge anchor: ' + loc.path + '#' + loc.anchor)
  }
  for (const c of data.concepts) {
    if (ids.has(c.id)) throw new Error('Duplicate concept ID: ' + c.id)
    ids.add(c.id)
    checkLocation(c.location)
  }
  const domainIds = new Set<string>()
  for (const d of data.domains || []) {
    if (domainIds.has(d.id) || !/^#[0-9a-f]{6}$/i.test(d.color)) throw new Error('Invalid graph domain: ' + d.id)
    domainIds.add(d.id)
  }
  const courseIds = new Set<string>()
  for (const c of data.courses || []) {
    if (courseIds.has(c.id) || ids.has(c.id) || !domainIds.has(c.domain) || !parsed.has(c.path))
      throw new Error('Invalid graph course: ' + c.id)
    courseIds.add(c.id)
  }
  for (const c of data.concepts) {
    if (c.domain && !domainIds.has(c.domain)) throw new Error('Unknown concept domain: ' + c.id)
    if ((c.courses || []).some((id: string) => !courseIds.has(id))) throw new Error('Unknown concept course: ' + c.id)
  }
  const mentions: any[] = []
  for (const [path, page] of parsed) {
    let anchor = ''
    let pendingAnchor = false
    let sourceConcept: string | null = null
    let section = page.title
    for (const token of page.tokens) {
      for (const html of [token, ...(token.children || [])].filter(t => t.type === 'html_block' || t.type === 'html_inline')) {
        const match = html.content.match(/\bid="([^"]+)"/)
        if (match) {
          anchor = match[1]
          pendingAnchor = true
          const source = data.concepts.find((c: any) => c.location.path === path && c.location.anchor === anchor)
          if (source) sourceConcept = source.id
        }
      }
      if (token.type === 'heading_open') {
        if (!pendingAnchor) { anchor = ''; sourceConcept = null }
        section = ''
      }
      if (token.type !== 'inline') continue
      if (section === '') section = token.content
      if ((token.children || []).some(t => t.type !== 'html_inline' && t.content.trim())) pendingAnchor = false
      for (const child of token.children || []) {
        if (child.type !== 'link_open') continue
        const concept = conceptFor(child, data.concepts)
        if (!concept) continue
        const href = child.attrGet('href')
        const [file, hash] = href.split('#')
        const targetPath = file.startsWith('/') ? file.slice(1) : posix.normalize(posix.join(posix.dirname(path), file || posix.basename(path)))
        if (targetPath !== concept.location.path || hash !== concept.location.anchor)
          throw new Error('Concept link target disagrees with registry in ' + path + ': ' + href)
        if (!anchor) throw new Error('Add a stable source anchor before concept link in ' + path)
        const mention = {concept:concept.id, sourceConcept, source:{path,anchor}, section, pageTitle:page.title}
        if (!mentions.some(m => m.concept === mention.concept && m.source.path === path && m.source.anchor === anchor)) mentions.push(mention)
      }
    }
  }
  for (const r of data.relations) {
    if (!ids.has(r.source) || !ids.has(r.target)) throw new Error('Unknown relation endpoint')
    if (!['derivation-uses', 'instance-of', 'equivalent-to', 'generalizes', 'model-complements'].includes(r.type))
      throw new Error('Unknown relation type: ' + r.type)
    checkLocation(r.evidence)
    if (!mentions.some(m => m.sourceConcept === r.source && m.concept === r.target &&
      m.source.path === r.evidence.path && m.source.anchor === r.evidence.anchor))
      throw new Error('Relation has no supporting inline citation: ' + r.source + ' → ' + r.target)
  }
  return {...data, mentions}
}
