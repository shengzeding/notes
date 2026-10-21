<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data } from './notes.data'
const props = defineProps({ collection: String })
const notes = computed(() => data.notes.filter(n => n.collection === props.collection))
</script>

<template>
  <ul v-if="notes.length" class="note-list">
    <li v-for="note in notes" :key="note.url">
      <a :href="withBase(note.url)">{{ note.title }}</a>
      <span v-if="note.description" class="note-description">{{ note.description }}</span>
    </li>
  </ul>
  <p v-else class="empty-collection">No notes published yet.</p>
</template>
