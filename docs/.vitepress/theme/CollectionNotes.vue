<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data } from './notes.data'
import type { NoteNode } from '../catalog'
const props = defineProps<{ collection?: string; items?: NoteNode[] }>()
const notes = computed(() => props.items ?? data.folders[props.collection ?? ''] ?? [])
</script>

<template>
  <ul v-if="notes.length" class="note-list">
    <li v-for="note in notes" :key="note.path">
      <a v-if="note.url" :href="withBase(note.url)">{{ note.title }}</a>
      <span v-else>{{ note.title }}</span>
      <span v-if="note.description" class="note-description">{{ note.description }}</span>
      <CollectionNotes v-if="note.children?.length" :items="note.children" />
    </li>
  </ul>
  <p v-else class="empty-collection">No notes published yet.</p>
</template>
