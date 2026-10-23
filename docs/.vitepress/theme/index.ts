import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { defineComponent, h, onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
import CollectionNotes from './CollectionNotes.vue'
import ConceptReferences from './ConceptReferences.vue'
import ReadingTools from './ReadingTools.vue'
import './style.css'

const ReadingLayout = defineComponent({
  setup() {
    const { frontmatter } = useData()
    const collapsed = ref(false)
    const route = useRoute()
    const focused = ref(false)
    const revealed = ref(false)
    const focusButton = ref<HTMLButtonElement | null>(null)
    const exitButton = ref<HTMLButtonElement | null>(null)
    let transitioning = false
    let viewTransition: { skipTransition: () => void; finished: Promise<void> } | undefined
    const setFocus = (value: boolean, restoreFocus = true) => {
      viewTransition?.skipTransition()
      const update = async () => {
        focused.value = value
        revealed.value = false
        document.documentElement.classList.toggle('notes-focus', value)
        document.documentElement.classList.remove('notes-nav-revealed')
        await nextTick()
        if (restoreFocus) (value ? exitButton.value : focusButton.value)?.focus({ preventScroll: true })
      }
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const doc = document as Document & {
        startViewTransition?: (update: () => Promise<void>) => {
          skipTransition: () => void; finished: Promise<void>
        }
      }
      if (restoreFocus && !reduceMotion && doc.startViewTransition) {
        transitioning = true
        document.documentElement.classList.add('notes-focus-switching')
        const current = doc.startViewTransition(update)
        viewTransition = current
        void current.finished.catch(() => {}).finally(() => {
          if (viewTransition === current) {
            transitioning = false
            document.documentElement.classList.remove('notes-focus-switching')
            viewTransition = undefined
          }
        })
      } else {
        transitioning = false
        document.documentElement.classList.remove('notes-focus-switching')
        void update().then(() => {
          if (restoreFocus && !reduceMotion) {
            document.querySelector('.VPContent')?.animate(
              [{ opacity: 0 }, { opacity: 1 }],
              { duration: 200, easing: 'ease-out' }
            )
          }
        })
      }
    }
    const pointerMove = (event: PointerEvent) => {
      if (transitioning || !focused.value || event.pointerType === 'touch') return
      const height = document.querySelector('.VPNavBar')?.getBoundingClientRect().height ?? 58
      revealed.value = event.clientY <= (revealed.value ? height : 12)
      document.documentElement.classList.toggle('notes-nav-revealed', revealed.value)
    }
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && focused.value && !event.defaultPrevented &&
          !document.querySelector('[role="dialog"], .VPLocalSearchBox')) {
        setFocus(false)
      }
    }
    watch(() => route.path, () => { if (focused.value) setFocus(false, false) })
    const apply = () => document.documentElement.classList.toggle('notes-sidebar-collapsed', collapsed.value)
    onMounted(() => {
      try { collapsed.value = localStorage.getItem('notes-sidebar-collapsed') === 'true' } catch {}
      apply()
      document.addEventListener('pointermove', pointerMove, { passive: true })
      document.addEventListener('keydown', keydown)
    })
    onBeforeUnmount(() => {
      viewTransition?.skipTransition()
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('keydown', keydown)
      document.documentElement.classList.remove('notes-sidebar-collapsed', 'notes-focus', 'notes-nav-revealed', 'notes-focus-switching')
    })
    const toggle = () => {
      collapsed.value = !collapsed.value
      apply()
      try { localStorage.setItem('notes-sidebar-collapsed', String(collapsed.value)) } catch {}
    }
    return () => h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(ConceptReferences),
      'nav-bar-content-before': () => frontmatter.value.sidebar === false ? null : [h('button', {
        class: 'sidebar-toggle',
        type: 'button',
        'aria-controls': 'VPSidebarNav',
        'aria-expanded': !collapsed.value,
        onClick: toggle
      }, collapsed.value ? '☰ Show sidebar' : '‹ Hide sidebar'),
        h('button', {
          ref: focusButton,
          class: 'focus-toggle',
          type: 'button',
          'aria-pressed': focused.value,
          title: 'Hide navigation for focused reading',
          onClick: () => setFocus(!focused.value)
        }, focused.value ? 'Exit focus' : 'Focus')
      ],
      'layout-bottom': () => [h(ReadingTools), focused.value ? h('button', {
        ref: exitButton,
        class: 'focus-exit',
        type: 'button',
        title: 'Exit focus mode (Esc)',
        'aria-label': 'Exit focus mode (Esc)',
        onClick: () => setFocus(false)
      }, '↗ Exit focus') : null]
    })
  }
})

export default {
  extends: DefaultTheme,
  Layout: ReadingLayout,
  enhanceApp({ app }) {
    app.component('CollectionNotes', CollectionNotes)
  }
}
