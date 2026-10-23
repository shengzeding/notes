export function markdownFrom(node: Node): string {
  if (node.nodeType === 3) return node.textContent || ''
  if (!(node instanceof Element) && !(node instanceof DocumentFragment)) return ''
  if (node instanceof Element) {
    if (node.matches('button,script,style,.header-anchor,mjx-assistive-mml')) return ''
    if (node.hasAttribute('data-tex')) {
      const tex = node.getAttribute('data-tex') || ''
      return node.getAttribute('data-display') === 'true' ? `\n\n$$\n${tex.trim()}\n$$\n\n` : `$${tex.trim()}$`
    }
  }
  const value = Array.from(node.childNodes).map(markdownFrom).join('')
  if (!(node instanceof Element)) return value
  if (/^H[1-6]$/.test(node.tagName)) return '\n\n' + '#'.repeat(Number(node.tagName[1])) + ' ' + value.trim() + '\n\n'
  if (node.tagName === 'BR') return '\n'
  if (node.tagName === 'PRE') return '\n\n```\n' + (node.textContent || '').trim() + '\n```\n\n'
  if (node.tagName === 'CODE') return '`' + value + '`'
  if (node.tagName === 'STRONG') return '**' + value + '**'
  if (node.tagName === 'EM') return '*' + value + '*'
  if (node.tagName === 'A') return `[${value}](${node.getAttribute('href') || ''})`
  if (node.tagName === 'LI') return '\n- ' + value.trim()
  if (node.matches('p,div,blockquote,ul,ol,table')) return '\n\n' + value.trim() + '\n\n'
  if (node.tagName === 'TR') return value + '\n'
  if (node.matches('TD,TH')) return value + ' | '
  return value
}

export function expandedMathRange(range: Range): Range {
  const result = range.cloneRange()
  const element = (node: Node) => node instanceof Element ? node : node.parentElement
  const first = element(result.startContainer)?.closest('[data-tex]')
  const last = element(result.endContainer)?.closest('[data-tex]')
  if (first) result.setStartBefore(first)
  if (last) result.setEndAfter(last)
  return result
}

export function cleanFragment(fragment: DocumentFragment): string {
  const root = document.createElement('div')
  root.append(fragment.cloneNode(true))
  root.querySelectorAll('script,style,iframe,object,embed,button,input,textarea,form,.header-anchor').forEach(n => n.remove())
  const prefix = 'pin-' + Math.random().toString(36).slice(2) + '-'
  const ids = new Map<string, string>()
  root.querySelectorAll('[id]').forEach(n => { const id = n.id; ids.set(id, prefix + id); n.id = prefix + id })
  root.querySelectorAll('*').forEach(n => {
    for (const attr of Array.from(n.attributes)) {
      if (/^on/i.test(attr.name) || attr.name === 'srcdoc') n.removeAttribute(attr.name)
      else if (/href|src/i.test(attr.name) && /^\s*(javascript|data):/i.test(attr.value)) n.removeAttribute(attr.name)
      else {
        let value = attr.value.replace(/url\(#([^)]*)\)/g, (match, id) => ids.has(id) ? `url(#${ids.get(id)})` : match)
        if (value.startsWith('#') && ids.has(value.slice(1))) value = '#' + ids.get(value.slice(1))
        n.setAttribute(attr.name, value)
      }
    }
  })
  return root.innerHTML
}

export function searchPassages(sections: {url:string;title:string;heading:string;text:string}[], terms:string[]) {
  const needles = [...new Set(terms.map(t => t.trim().toLocaleLowerCase()).filter(Boolean))]
  if (!needles.length) return []
  return sections.flatMap(section => {
    const body = section.text.toLocaleLowerCase()
    const title = (section.title + ' ' + section.heading).toLocaleLowerCase()
    const matches = needles.map(t => ({ term: t, index: body.indexOf(t) })).filter(m => m.index >= 0)
    const titleMatch = needles.some(t => title.includes(t))
    if (!matches.length && !titleMatch) return []
    const start = Math.max(0, (matches[0]?.index || 0) - 80)
    return [{ ...section, score: matches.length + (titleMatch ? 4 : 0), excerpt: (start ? '…' : '') + section.text.slice(start, start + 240) + (section.text.length > start + 240 ? '…' : '') }]
  }).sort((a,b) => b.score - a.score)
}
