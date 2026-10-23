// Preserve the original TeX for selection, discussion copies, and pinned equations.
export function readingMath(md: any) {
  for (const type of ['math_inline', 'math_block']) {
    const render = md.renderer.rules[type]
    if (!render) continue
    md.renderer.rules[type] = (tokens: any[], i: number, ...args: any[]) => {
      const tag = type === 'math_block' ? 'div' : 'span'
      const tex = md.utils.escapeHtml(tokens[i].content)
      return `<${tag} class="reading-math"${type === 'math_block' ? ' tabindex="0" aria-label="Formula" aria-keyshortcuts="Alt+P"' : ''} data-tex="${tex}" data-display="${type === 'math_block'}">${render(tokens, i, ...args)}</${tag}>`
    }
  }
}
