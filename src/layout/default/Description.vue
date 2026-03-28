<script setup lang="ts">
import type { uni } from '@delta-comic/model'
import { Inject } from '@delta-comic/plugin'
import DOMPurify from 'dompurify'
import { isString } from 'es-toolkit'

const $props = defineProps<{
  union?: uni.item.Item
  page: uni.content.ContentPage
}>()
</script>

<template>
  <DcText
    :text="union.description"
    v-if="isString(union?.description)"
    class="mt-1 justify-start text-xs font-normal text-(--van-text-color-2)"
  >
  </DcText>
  <DcText
    :text="union.description.content"
    v-else-if="union?.description?.type == 'text'"
    class="mt-1 justify-start text-xs font-normal text-(--van-text-color-2)"
  >
  </DcText>
  <div
    v-html="DOMPurify.sanitize(union?.description?.content ?? '')"
    v-else
    class="mt-1 max-w-full justify-start text-xs font-normal text-(--van-text-color-2)"
  ></div>

  <slot name="description" :="{ page, item: union }" />
  <Inject key="layout::layout::default.description" :args="{ page, item: union }" />
</template>