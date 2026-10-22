<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data } from './knowledge.data'
const { page } = useData()
const url = (loc: {path: string; anchor: string}) =>
  withBase('/' + loc.path.replace(/\.md$/, '.html') + '#' + loc.anchor)
const groups = computed(() => data.concepts
  .filter(c => c.location.path === page.value.relativePath)
  .map(c => ({...c, mentions: data.mentions.filter(m => m.concept === c.id && m.source.path !== page.value.relativePath)}))
  .filter(c => c.mentions.length))
const count = computed(() => groups.value.reduce((sum,c) => sum + c.mentions.length, 0))
</script>

<template>
  <details v-if="count" :key="page.relativePath" class="concept-backlinks">
    <summary>Linked mentions <span>{{ count }}</span></summary>
    <div v-for="concept in groups" :key="concept.id" class="concept-backlink-group">
      <a :href="url(concept.location)" class="concept-backlink-name">{{ concept.label }}</a>
      <ul>
        <li v-for="mention in concept.mentions" :key="mention.source.path + '#' + mention.source.anchor">
          <a :href="url(mention.source)">{{ mention.section }}</a>
          <span class="concept-backlink-page">{{ mention.pageTitle }}</span>
        </li>
      </ul>
    </div>
  </details>
</template>
