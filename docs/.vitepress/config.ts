import { defineConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { conceptLinks, buildKnowledge } from './knowledge'
import { collections, scan, sidebarItems } from './catalog'

const notes = scan()
export default defineConfig({
  title: 'Shengze Ding — Notes',
  description: 'Notes on mathematics, mechanics, and machine learning.',
  lang: 'en-US',
  base: '/notes/',
  cleanUrls: false,
  appearance: false,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/notes/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap' }]
  ],
  sitemap: { hostname: 'https://shengzeding.github.io/notes/' },
  markdown: { math: true, lineNumbers: true, config: conceptLinks },
  async buildEnd(site) {
    writeFileSync(join(site.outDir, 'knowledge-graph.json'), JSON.stringify(await buildKnowledge(), null, 2))
  },
  themeConfig: {
    siteTitle: 'SHENGZE DING',
    nav: [
      { text: 'NOTES', link: '/' },
      { text: 'GRAPH', link: '/graph' },
      { text: 'GUIDE', link: '/guide/writing' },
      { text: 'HOME', link: 'https://shengzeding.github.io/', target: '_self' }
    ],
    sidebar: [
      { text: 'Notes', items: [{ text: 'All notes', link: '/' }] },
      ...collections.map(c => ({ text: c.name, collapsed: false, items: [
        { text: 'Overview', link: `/${c.id}/` },
        ...sidebarItems(notes.find(n => n.path === c.id)?.children ?? [])
      ] })),
      { text: 'Writing', items: sidebarItems(notes.find(n => n.path === 'guide')?.children ?? []) }
    ],
    outline: { label: 'On this page', level: [2, 3] },
    search: { provider: 'local', options: {
      miniSearch: { options: {
        tokenize: (text: string) => text.toLowerCase().match(/[\p{Script=Han}]|[\p{L}\p{N}_]+/gu) || []
      } }
    } },
    editLink: { pattern: 'https://github.com/shengzeding/notes/edit/main/docs/:path', text: 'Edit on GitHub' },
    lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },
    socialLinks: [{ icon: 'github', link: 'https://github.com/shengzeding/notes', ariaLabel: 'Source files on GitHub' }],
    footer: { copyright: 'Shengze Ding' }
  }
})
