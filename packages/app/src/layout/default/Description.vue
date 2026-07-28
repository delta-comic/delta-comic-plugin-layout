<script setup lang="ts">
import type { UniContentPage, UniItem } from '@delta-comic/model'
import { DcEnvironment, DcText } from '@delta-comic/ui'
import DOMPurify from 'dompurify'
import { isString } from 'es-toolkit'
import { computed } from 'vue'

const props = defineProps<{ page: UniContentPage; union?: UniItem }>()
defineSlots<{ description(args: { item?: UniItem; page: UniContentPage }): unknown }>()

const plainText = computed(() => {
  const description = props.union?.description
  if (isString(description)) return description
  return description?.type === 'text' ? description.content : undefined
})
const safeHtml = computed(() => {
  const description = props.union?.description
  return !isString(description) && description?.type === 'html'
    ? DOMPurify.sanitize(description.content)
    : undefined
})
</script>

<template>
  <DcText
    v-if="plainText"
    class="mt-1 justify-start text-xs font-normal text-(--dc-color-text-secondary)"
    :text="plainText"
  />
  <div
    v-else-if="safeHtml"
    class="mt-1 max-w-full text-xs font-normal text-(--dc-color-text-secondary)"
    v-html="safeHtml"
  />

  <slot name="description" :item="union" :page />
  <DcEnvironment :args="{ item: union, page }" name="layout::layout::default.description" />
</template>