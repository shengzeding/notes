import { createContentLoader, createMarkdownRenderer } from 'vitepress'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

export default createContentLoader('**/*.md', {
  includeSrc: true,
  async transform(pages) {
    const md = await createMarkdownRenderer(fileURLToPath(new URL('../../', import.meta.url)), { math: true })
    const sections: { url: string; title: string; heading: string; text: string }[] = []
    for (const page of pages) {
      if (page.frontmatter.layout === 'home' || page.url.endsWith('/graph.html') || page.url.startsWith('/guide/')) continue
      const source = matter(page.src || '').content
      const lines = source.split('\n')
      const tokens = md.parse(source, {})
      const headings = tokens.flatMap((t, i) => t.type === 'heading_open' && t.map ? [{
        line: t.map[0], end: t.map[1], id: t.attrGet('id'), text: tokens[i + 1].content
      }] : [])
      const title = page.frontmatter.title || headings[0]?.text || page.url
      const starts = [{ line: 0, end: 0, id: '', text: title }, ...headings]
      for (let i = 0; i < starts.length; i++) {
        const part = starts[i]
        const text = lines.slice(part.end, starts[i + 1]?.line ?? lines.length).join('\n')
          .replace(/\$\$[\s\S]*?\$\$/g, ' [equation] ').replace(/<[^>]+>/g, '').replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
          .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\s+/g, ' ').trim()
        if (text) sections.push({ url: page.url + (part.id ? '#' + part.id : ''), title, heading: part.text, text })
      }
    }
    return sections
  }
})
