<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useData, useRoute, useRouter, withBase } from 'vitepress'
import { data as knowledge } from './knowledge.data'
import { cleanFragment, expandedMathRange, markdownFrom, searchPassages } from './reading-utils'

const { page } = useData()
const route = useRoute(), router = useRouter()
const menu = ref(false), menuX = ref(0), menuY = ref(0)
const draft = shallowRef<{html:string;markdown:string;context:string;title:string;url:string} | null>(null)
const pins = ref<{id:number;html:string;title:string;url:string}[]>([])
const folded = ref(false), status = ref('')
const pinPanel = ref<HTMLElement | null>(null)
const pinPosition = ref<{x:number;y:number} | null>(null)
const dragging = ref(false)
let pinDrag: {id:number;x:number;y:number;left:number;top:number} | null = null
const pinStyle = computed(()=>pinPosition.value ? {left:pinPosition.value.x+'px',top:pinPosition.value.y+'px',right:'auto',bottom:'auto'} : {})
function movePin(x:number,y:number) {
  const rect=pinPanel.value?.getBoundingClientRect()
  if (!rect) return
  pinPosition.value={x:Math.max(8,Math.min(document.documentElement.clientWidth-rect.width-8,x)),y:Math.max(8,Math.min(innerHeight-rect.height-8,y))}
}
function clampPin() { if(pinPosition.value)movePin(pinPosition.value.x,pinPosition.value.y) }
function startPinDrag(event:PointerEvent) {
  if(event.button!==0||!pinPanel.value)return
  const rect=pinPanel.value.getBoundingClientRect()
  pinDrag={id:event.pointerId,x:event.clientX,y:event.clientY,left:rect.left,top:rect.top}
  dragging.value=true;menu.value=false;equation.value=null
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  event.preventDefault()
}
function dragPin(event:PointerEvent) {
  if(!pinDrag||event.pointerId!==pinDrag.id)return
  movePin(pinDrag.left+event.clientX-pinDrag.x,pinDrag.top+event.clientY-pinDrag.y)
}
function endPinDrag(event:PointerEvent) {
  if(pinDrag?.id!==event.pointerId)return
  pinDrag=null;dragging.value=false
  const handle=event.currentTarget as HTMLElement
  if(handle.hasPointerCapture(event.pointerId))handle.releasePointerCapture(event.pointerId)
}
function nudgePin(event:KeyboardEvent) {
  const directions:Record<string,[number,number]>={ArrowLeft:[-20,0],ArrowRight:[20,0],ArrowUp:[0,-20],ArrowDown:[0,20]}
  const delta=directions[event.key],rect=pinPanel.value?.getBoundingClientRect()
  if(delta&&rect){event.preventDefault();movePin(rect.left+delta[0],rect.top+delta[1])}
}
watch([()=>pins.value.length,folded],()=>nextTick(clampPin))
const equation = shallowRef<HTMLElement | null>(null)
const equationX = ref(0), equationY = ref(0)
const latexFeedback = ref('')
let equationTimer:ReturnType<typeof setTimeout> | undefined
const panel = ref<HTMLDialogElement | null>(null), searchInput = ref<HTMLInputElement | null>(null)
const mode = ref<'copy'|'search'>('copy'), includeSection = ref(false), query = ref('')
const loading = ref(false), error = ref('')
const sections = shallowRef<{url:string;title:string;heading:string;text:string}[]>([])
let pendingIndex: Promise<void> | undefined
let focusBefore: HTMLElement | null = null
type Place = {url:string;y:number;index:number;offset:number;signature:string;title:string}
const place = ref<Place | null>(null)
const blocks = () => Array.from(document.querySelectorAll<HTMLElement>('.VPDoc .vp-doc > div > p, .VPDoc .vp-doc > div > h1, .VPDoc .vp-doc > div > h2, .VPDoc .vp-doc > div > h3, .VPDoc .vp-doc > div > .reading-math, .VPDoc .vp-doc > div > ul, .VPDoc .vp-doc > div > ol'))
const article = () => document.querySelector<HTMLElement>('.VPDoc .vp-doc > div')
function savePlace() {
  if (place.value) return
  const list = blocks(), index = list.findIndex(n => n.getBoundingClientRect().bottom > 110)
  place.value = {url:location.pathname + location.search + location.hash,y:window.scrollY,index,
    offset:index >= 0 ? list[index].getBoundingClientRect().top : 0,
    signature:index >= 0 ? list[index].textContent!.slice(0,100) : '',title:page.value.title || 'Notes'}
  persistPlace()
}
function persistPlace() { try { sessionStorage.setItem('notes-reading-place', JSON.stringify(place.value)) } catch {} }
function dismissPlace() { place.value = null; persistPlace() }
async function returnToReading() {
  const saved = place.value
  if (!saved) return
  try {
    if (new URL(saved.url,location.origin).pathname !== location.pathname) await router.go(saved.url)
    else history.replaceState(history.state, '', saved.url)
    await nextTick()
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
    const list = blocks(), block = list[saved.index]
    window.scrollTo({top: block?.textContent?.startsWith(saved.signature) && saved.signature ? window.scrollY + block.getBoundingClientRect().top - saved.offset : saved.y,behavior:'instant'})
    dismissPlace()
  } catch { status.value = 'Could not return. Please try again.' }
}
function captureLink(event: MouseEvent) {
  if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const target = event.target as Element
  const link = target.closest<HTMLAnchorElement>('a[href]')
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return
  if (!target.closest('.vp-doc,.VPDocAside,.VPLocalNav,.VPLocalSearchBox,.knowledge-map,.reading-search-results')) return
  const url = new URL(link.href, location.href)
  if (url.origin === location.origin && url.pathname.startsWith(withBase('/')) && url.href !== location.href) savePlace()
}
function makeDraft(range:Range) {
  const root = article()
  if (!root) return
  const r = expandedMathRange(range), fragment = r.cloneContents()
  const headings = Array.from(root.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6'))
  const start = r.startContainer.nodeType === 1 ? (r.startContainer.childNodes[r.startOffset] || r.startContainer) : r.startContainer
  const heading = headings.filter(h => h.contains(start) || !!(h.compareDocumentPosition(start) & Node.DOCUMENT_POSITION_FOLLOWING)).at(-1)
  const context = document.createRange()
  if (heading) {
    context.setStartBefore(heading)
    const next = headings.slice(headings.indexOf(heading)+1).find(h => h.tagName <= heading.tagName)
    if (next) context.setEndBefore(next); else context.setEnd(root,root.childNodes.length)
  } else context.selectNodeContents(root)
  const title = (heading ? markdownFrom(heading).trim().replace(/^#+\s*/, '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '') || page.value.title
  const url = new URL(location.href); url.hash = heading?.id || ''
  draft.value = {html:cleanFragment(fragment),markdown:markdownFrom(fragment).replace(/\n{3,}/g,'\n\n').trim(),context:markdownFrom(context.cloneContents()).replace(/\n{3,}/g,'\n\n').trim(),title,url:url.href}
}
function selectionChanged() {
  if (panel.value?.open || document.activeElement?.closest('.reading-tools')) return
  const selection = window.getSelection(), root = article()
  if (!selection?.rangeCount || selection.isCollapsed || !root) { menu.value=false; return }
  const range = selection.getRangeAt(0)
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer) || selection.toString().trim().length < 2) { menu.value=false; return }
  makeDraft(range)
  const rect = range.getBoundingClientRect()
  menuX.value = Math.max(12, Math.min(window.innerWidth - 328, rect.left))
  menuY.value = Math.max(76, Math.min(window.innerHeight - 64, rect.top - 48))
  menu.value = true
  equation.value = null
}
function pinDraft() {
  if (!draft.value) return
  pins.value.push({id:Date.now(),html:draft.value.html,title:draft.value.title,url:draft.value.url})
  if (pins.value.length > 3) { pins.value.shift(); status.value = 'Pinned. The oldest pin was replaced (maximum 3).' }
  else status.value = 'Pinned for reference.'
  folded.value=false; menu.value=false; window.getSelection()?.removeAllRanges()
}
function holdEquation() { clearTimeout(equationTimer) }
function hoverEquation(event: Event) {
  const target = event.target as Element
  clearTimeout(equationTimer)
  if(dragging.value)return
  if (target.closest('.equation-pin')) return
  const el = target.closest<HTMLElement>('.VPDoc .reading-math,.reading-pin-content .reading-math')
  if (!el || menu.value || panel.value?.open) { equationTimer=setTimeout(()=>{equation.value=null},200); return }
  if(equation.value!==el)latexFeedback.value=''
  equation.value=el
  const rect=el.getBoundingClientRect()
  equationX.value=Math.max(12,Math.min(document.documentElement.clientWidth-210,rect.right-198))
  equationY.value=Math.max(64,Math.min(innerHeight-44,rect.top-32))
}
async function copyEquation() {
  const el=equation.value,tex=el?.getAttribute('data-tex')
  if(tex==null)return
  try {await navigator.clipboard.writeText(tex.trim());if(equation.value===el)latexFeedback.value='Copied!';status.value='LaTeX copied.'}
  catch {latexFeedback.value='Copy failed';status.value='Could not access the clipboard.'}
}
function pinEquation() {
  if (!equation.value) return
  const range=document.createRange();range.selectNode(equation.value);makeDraft(range);pinDraft();equation.value=null
}
async function openPanel(value:'copy'|'search') {
  if (!draft.value) return
  focusBefore = document.activeElement as HTMLElement
  mode.value=value;includeSection.value=false;status.value='';error.value=''
  if (value==='search') {
    savePlace()
    query.value=(window.getSelection()?.toString() || draft.value.markdown).trim().slice(0,200)
  }
  menu.value=false;equation.value=null
  await nextTick();panel.value?.showModal()
  if (value==='search') {searchInput.value?.focus();await loadIndex()}
}
function closePanel() { panel.value?.close(); focusBefore?.focus({preventScroll:true}) }
async function loadIndex() {
  if (sections.value.length) return
  loading.value=true;error.value=''
  try {
    pendingIndex ||= import('./reader.data').then(module=>{sections.value=module.data}).catch(e=>{pendingIndex=undefined;throw e})
    await pendingIndex
  } catch { error.value='Could not load notes. Check your connection and retry.' }
  finally { loading.value=false }
}
const aliases = computed(() => {
  const q=query.value.trim().toLocaleLowerCase()
  if (!q) return []
  return [...new Set(knowledge.concepts.filter(c => [c.label,...(c.aliases||[])].some(s=>s.toLocaleLowerCase()===q))
    .flatMap(c=>[c.label,...(c.aliases||[])])).values()].filter(s=>s.toLocaleLowerCase()!==q)
})
const matches = computed(()=>searchPassages(sections.value,[query.value,...aliases.value]))
const copyText = computed(()=>draft.value ? `Source: ${page.value.title} — ${draft.value.title}\n${draft.value.url}\n\n${includeSection.value ? draft.value.context : draft.value.markdown}` : '')
async function copy() {
  try { await navigator.clipboard.writeText(copyText.value);status.value='Copied with LaTeX and source link.' }
  catch { status.value='Clipboard unavailable. Select and copy the text below.' }
}
function onScroll() { menu.value=false;equation.value=null }
function keydown(event:KeyboardEvent) {
  if (event.key==='Enter') captureLink(event as unknown as MouseEvent)
  if (event.altKey && event.key.toLowerCase()==='p' && equation.value) { event.preventDefault();pinEquation();return }
  if (event.key==='Escape' && panel.value?.open) { event.preventDefault();event.stopImmediatePropagation();closePanel() }
  else if (event.key==='Escape' && (menu.value||equation.value)) { event.preventDefault();menu.value=false;equation.value=null }
}
watch(()=>route.path,()=>{menu.value=false;equation.value=null;closePanel()})
onMounted(()=>{
  try {
    const saved=JSON.parse(sessionStorage.getItem('notes-reading-place')||'null')
    if (saved && typeof saved.url==='string' && saved.url.startsWith(withBase('/')) && Number.isFinite(saved.y)) place.value=saved
  } catch {}
  document.addEventListener('selectionchange',selectionChanged)
  document.addEventListener('pointerup',selectionChanged)
  document.addEventListener('click',captureLink,true)
  document.addEventListener('pointerdown',captureLink,true)
  document.addEventListener('pointerover',hoverEquation)
  document.addEventListener('focusin',hoverEquation)
  document.addEventListener('keydown',keydown,true)
  window.addEventListener('scroll',onScroll,{passive:true})
  window.addEventListener('resize',onScroll)
  window.addEventListener('resize',clampPin)
})
onBeforeUnmount(()=>{
  document.removeEventListener('selectionchange',selectionChanged)
  document.removeEventListener('pointerup',selectionChanged)
  document.removeEventListener('click',captureLink,true)
  document.removeEventListener('pointerdown',captureLink,true)
  document.removeEventListener('pointerover',hoverEquation)
  document.removeEventListener('focusin',hoverEquation)
  document.removeEventListener('keydown',keydown,true)
  window.removeEventListener('scroll',onScroll)
  window.removeEventListener('resize',onScroll)
  window.removeEventListener('resize',clampPin)
  clearTimeout(equationTimer)
})
</script>

<template>
  <div class="reading-tools">
    <div v-if="menu" class="reading-selection" role="toolbar" aria-label="Selected text actions" :style="{left:menuX+'px',top:menuY+'px'}" @mousedown.prevent>
      <button @click="pinDraft">Pin</button>
      <button @click="openPanel('copy')">Copy for discussion</button>
      <button @click="openPanel('search')">Find in notes</button>
    </div>
    <div v-if="equation" class="equation-pin" role="toolbar" aria-label="Formula actions" :style="{left:equationX+'px',top:equationY+'px'}" @pointerenter="holdEquation">
      <button v-if="equation.closest('.VPDoc')" @click="pinEquation">Pin formula</button>
      <button @click="copyEquation">{{ latexFeedback || 'Copy LaTeX' }}</button>
    </div>
    <div v-if="place" class="reading-return">
      <button :title="'Return to '+place.title" @click="returnToReading">↩ Return to reading</button>
      <button aria-label="Dismiss reading position" @click="dismissPlace">×</button>
    </div>
    <aside v-if="pins.length" ref="pinPanel" class="reading-pins" :class="{'is-dragging':dragging}" :style="pinStyle" aria-label="Pinned reference">
      <header>
        <button class="pin-drag-handle" aria-label="Move pinned reference" title="Drag to move · Arrow keys to adjust" @pointerdown="startPinDrag" @pointermove="dragPin" @pointerup="endPinDrag" @pointercancel="endPinDrag" @lostpointercapture="pinDrag=null;dragging=false" @keydown="nudgePin">⠿ Pinned reference <span>{{ pins.length }}</span></button>
        <button class="pin-collapse" :aria-label="folded?'Expand pinned references':'Collapse pinned references'" :aria-expanded="!folded" @click="folded=!folded">{{ folded?'⌄':'⌃' }}</button>
      </header>
      <div v-show="!folded" class="reading-pin-list">
        <section v-for="pin in pins" :key="pin.id" class="reading-pin">
          <div class="reading-pin-heading"><a :href="pin.url">{{ pin.title }}</a><button aria-label="Unpin reference" @click="pins=pins.filter(p=>p.id!==pin.id)">×</button></div>
          <div class="vp-doc reading-pin-content" v-html="pin.html"></div>
        </section>
      </div>
    </aside>
    <dialog ref="panel" class="reading-dialog" :aria-label="mode==='copy'?'Copy for discussion':'Find in notes'" @click="($event.target===panel)&&closePanel()" @cancel.prevent="closePanel">
      <div class="reading-dialog-body">
        <header><h2>{{ mode==='copy'?'Copy for discussion':'Find in notes' }}</h2><button aria-label="Close reading tool" @click="closePanel">×</button></header>
        <template v-if="mode==='copy'">
          <p>Keep the original LaTeX and a link to this section.</p>
          <label class="reading-context"><input v-model="includeSection" type="checkbox" /> Include the whole current section</label>
          <textarea :value="copyText" aria-label="Discussion text" readonly spellcheck="false"></textarea>
          <footer><span role="status">{{ status }}</span><button class="reading-copy" @click="copy">Copy text</button></footer>
        </template>
        <template v-else>
          <input ref="searchInput" v-model="query" class="reading-query" type="search" aria-label="Search all notes" placeholder="Find a word or phrase…" maxlength="200" />
          <p v-if="aliases.length" class="reading-aliases">Also searching: {{ aliases.join(' · ') }}</p>
          <p v-if="loading" role="status">Loading notes…</p>
          <p v-else-if="error" role="alert">{{ error }} <button @click="loadIndex">Retry</button></p>
          <template v-else>
            <p role="status">{{ matches.length }} matching passages{{ matches.length>50?' · Showing the first 50':'' }}</p>
            <div class="reading-search-results">
              <a v-for="match in matches.slice(0,50)" :key="match.url" :href="withBase(match.url)" @click="closePanel">
                <small>{{ match.title }}</small><strong>{{ match.heading }}</strong><span>{{ match.excerpt }}</span>
              </a>
              <p v-if="query.trim()&&!matches.length">No passages found. Try a shorter phrase or another name.</p>
            </div>
          </template>
        </template>
      </div>
    </dialog>
    <span class="reading-announcement" role="status">{{ panel?.open?'':status }}</span>
  </div>
</template>

<style>
.reading-tools{font-family:var(--vp-font-family-base);color:#333;font-size:13px;line-height:1.5}
.reading-tools button{cursor:pointer}.reading-tools button:focus-visible,.reading-tools a:focus-visible{outline:2px solid #777;outline-offset:3px}
.reading-selection,.equation-pin,.reading-return,.reading-pins{position:fixed;background:#fff;border:1px solid #ddd;border-radius:5px;box-shadow:0 3px 15px #0000000c;z-index:90}
.reading-selection{display:flex;padding:4px;max-width:calc(100vw - 24px)}
.reading-selection button{padding:7px 9px;font-size:12px;white-space:nowrap;border-radius:3px}.reading-selection button:hover{background:#f3f3f1}
.equation-pin{display:flex;padding:3px;font-size:11px;color:#555;z-index:95;gap:2px}.equation-pin button{padding:4px 7px;white-space:nowrap;border-radius:3px}.equation-pin button:hover{background:#f3f3f1}
.reading-return{left:20px;bottom:20px;display:flex;align-items:center}.reading-return button{padding:9px 12px}.reading-return button+button{padding-left:0;color:#888}
.reading-pins{right:18px;top:100px;width:340px;max-width:calc(100vw - 36px);z-index:85}
.reading-pins header{display:flex;align-items:center;padding:5px 8px;gap:6px}.reading-pins header button{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#666;padding:5px 4px}.reading-pins header .pin-drag-handle{flex:1;cursor:grab;touch-action:none;user-select:none;gap:12px}.reading-pins.is-dragging .pin-drag-handle{cursor:grabbing}.reading-pins header .pin-collapse{padding:5px 8px}.reading-pins header span{color:#999}
.reading-pin-list{max-height:65dvh;overflow:auto;overscroll-behavior:contain}
.reading-pin{padding:12px 14px 16px;border-top:1px solid #eee}.reading-pin-heading{display:flex;gap:12px;align-items:start;justify-content:space-between;font-size:11px;color:#777;margin-bottom:10px}.reading-pin-heading a{overflow-wrap:anywhere}.reading-pin-heading button{font-size:18px;line-height:1}
.reading-pin-content{font-size:14px!important;line-height:1.7;overflow:auto;max-height:45dvh}.reading-pin-content p{font-size:14px!important;margin:8px 0!important}.reading-pin-content mjx-container{font-size:100%!important}.reading-pin-content mjx-container[display="true"]>svg{max-width:100%;height:auto}.reading-pin-content h1,.reading-pin-content h2,.reading-pin-content h3{font-size:16px!important;margin:8px 0!important;padding:0!important}
.reading-dialog{position:fixed;margin:auto;padding:0;width:680px;max-width:calc(100vw - 24px);max-height:85dvh;border:1px solid #ddd;border-radius:7px;color:#333;background:#fff;box-shadow:0 12px 50px #0002;font-family:var(--vp-font-family-base)}
.reading-dialog::backdrop{background:#0004}.reading-dialog-body{padding:22px}.reading-dialog header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:18px}.reading-dialog h2{font-size:19px;font-weight:500;margin:0}.reading-dialog header button{font-size:24px;line-height:1;padding:4px}.reading-dialog p{font-size:12px;color:#777;margin:10px 0}.reading-context{display:flex;gap:8px;align-items:center;font-size:13px;margin:14px 0}.reading-context input{accent-color:#555}
.reading-dialog textarea{display:block;width:100%;height:38dvh;min-height:160px;padding:12px;border:1px solid #ddd;border-radius:3px;background:#fafaf9;font:12px/1.7 ui-monospace,monospace;resize:vertical;white-space:pre-wrap}.reading-dialog footer{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:14px;font-size:12px}.reading-copy{padding:8px 14px;background:#333;color:#fff;border-radius:3px;white-space:nowrap}
.reading-query{width:100%;padding:10px 12px;border:1px solid #ccc;border-radius:3px;font:inherit}.reading-search-results{max-height:55dvh;overflow:auto;overscroll-behavior:contain}.reading-search-results a{display:block;padding:13px 4px;border-bottom:1px solid #eee;color:#333;text-decoration:none}.reading-search-results a:hover{background:#fafaf8}.reading-search-results small{display:block;color:#888;font-size:11px}.reading-search-results strong{display:block;font-size:14px;font-weight:500;margin:3px 0 6px}.reading-search-results span{display:block;font-size:12px;color:#777;line-height:1.6;overflow-wrap:anywhere}
.reading-announcement{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
@media(max-width:760px){.reading-pins{top:auto;bottom:72px;right:12px;max-width:calc(100vw - 24px)}.reading-pin-list{max-height:32dvh}.reading-pin-content{max-height:24dvh}.reading-dialog-body{padding:16px}.reading-return{left:12px;bottom:14px}.reading-selection button{font-size:11px;padding:7px 8px}}
</style>
