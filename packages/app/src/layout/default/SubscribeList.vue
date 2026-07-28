<script setup lang="ts">
import type { UniContentPage, UniItem } from '@delta-comic/model'
import { NDrawer, NDrawerContent } from 'naive-ui'
import { shallowRef } from 'vue'

import { translate } from '@/i18n'

import SubscribeRow from './SubscribeRow.vue'

defineProps<{ page: UniContentPage; union?: UniItem }>()
defineSlots<{
  subscribeRow(args: {
    author: UniItem['author'][number]
    isSubscribe: boolean
    page: UniContentPage
    type: 'common' | 'small'
  }): unknown
}>()
const showDetails = shallowRef(false)
</script>

<template>
  <button
    v-if="(union?.author.length ?? 0) > 1"
    class="relative mt-3 flex w-full dc-haptics-feedback items-center border-0 bg-transparent pb-2 text-(--dc-color-text)"
    type="button"
    @click="showDetails = true"
  >
    <span class="ml-3 font-bold">{{ translate('layout.author.team') }}</span>
    <span class="absolute right-3 text-(--dc-color-text-secondary)">
      {{ translate('layout.author.count', { count: union?.author.length ?? 0 }) }}
    </span>
  </button>
  <NDrawer v-model:show="showDetails" height="70vh" placement="bottom">
    <NDrawerContent :native-scrollbar="false" :title="translate('layout.author.team')">
      <SubscribeRow
        v-for="author of union?.author"
        :key="`${author.$$plugin}:${author.label}`"
        :author
        class="dc-hairline-bottom py-2"
        :page
      >
        <template #subscribe-row="args"><slot name="subscribeRow" v-bind="args" /></template>
      </SubscribeRow>
    </NDrawerContent>
  </NDrawer>

  <div class="dc-scrollbar-hidden flex items-center overflow-x-auto text-nowrap" @click.stop>
    <SubscribeRow v-if="union?.author.length === 1" :author="union.author[0]" class="mt-3" :page>
      <template #subscribe-row="args"><slot name="subscribeRow" v-bind="args" /></template>
    </SubscribeRow>
    <div v-else class="flex gap-3 overflow-x-auto" @click.stop>
      <SubscribeRow
        v-for="author of union?.author"
        :key="`${author.$$plugin}:${author.label}`"
        :author
        is-small
        :page
      >
        <template #subscribe-row="args"><slot name="subscribeRow" v-bind="args" /></template>
      </SubscribeRow>
    </div>
  </div>
</template>