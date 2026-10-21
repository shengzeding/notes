import DefaultTheme from 'vitepress/theme'
import CollectionNotes from './CollectionNotes.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CollectionNotes', CollectionNotes)
  }
}
