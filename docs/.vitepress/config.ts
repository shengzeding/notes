import { defineConfig } from 'vitepress'
import { collections, scan } from './catalog'

const notes = scan()
export default defineConfig({
  title: 'Shengze Ding — Notes',
  description: 'Notes on mathematics, scientific machine learning, and research papers.',
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
  markdown: { math: true, lineNumbers: true },
  themeConfig: {
    siteTitle: 'SHENGZE DING',
    nav: [
      { text: 'NOTES', link: '/' },
      { text: 'GUIDE', link: '/guide/writing' },
      { text: 'HOME', link: 'https://shengzeding.github.io/', target: '_self' }
    ],
    sidebar: [
      { text: 'Notes', items: [{ text: 'All notes', link: '/' }] },
      ...collections.map(c => ({ text: c.name, collapsed: false, items: [
        { text: 'Overview', link: `/${c.id}/` },
        ...notes.filter(n => n.collection === c.id).map(n => ({ text: n.title, link: n.url }))
      ] })),
      { text: 'Writing', items: notes.filter(n => n.collection === 'guide').map(n => ({ text: n.title, link: n.url })) }
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
