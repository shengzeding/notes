import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, onMounted, onBeforeUnmount, ref } from 'vue'
import CollectionNotes from './CollectionNotes.vue'
import './style.css'

const ReadingLayout = defineComponent({
  setup() {
    const collapsed = ref(false)
    const apply = () => document.documentElement.classList.toggle('notes-sidebar-collapsed', collapsed.value)
    onMounted(() => {
      try { collapsed.value = localStorage.getItem('notes-sidebar-collapsed') === 'true' } catch {}
      apply()
    })
    onBeforeUnmount(() => document.documentElement.classList.remove('notes-sidebar-collapsed'))
    const toggle = () => {
      collapsed.value = !collapsed.value
      apply()
      try { localStorage.setItem('notes-sidebar-collapsed', String(collapsed.value)) } catch {}
    }
    return () => h(DefaultTheme.Layout, null, {
      'layout-top': () => h('button', {
        class: 'sidebar-toggle',
        type: 'button',
        'aria-controls': 'VPSidebarNav',
        'aria-expanded': !collapsed.value,
        onClick: toggle
      }, collapsed.value ? '☰ Show sidebar' : '‹ Hide sidebar')
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
