<script setup lang="ts">
import { SharedFunction } from '@delta-comic/core'
import type { uni } from '@delta-comic/model'

defineProps<{
  union?: uni.item.Item
}>()
</script>

<template>
  <div
    class="flex w-full flex-col"
    v-for="[name, categories] of Object.entries(
      Object.groupBy(union?.categories ?? [], v => v.group)
    )"
  >
    <NDivider class="my-1! text-xs! text-(--van-gray-7)! **:font-light!" title-placement="left">
      {{ name }}
    </NDivider>
    <div class="flex flex-wrap gap-2.5 *:px-3! **:text-xs!">
      <NButton
        tertiary
        round
        type="tertiary"
        size="small"
        v-for="category of categories
          ?.toSorted((a, b) => b.name.length - a.name.length)
          .filter(Boolean)"
        @click="
          SharedFunction.call(
            'routeToSearch',
            category.search.keyword,
            [category.$$plugin, category.search.source],
            category.search.sort
          )
        "
      >
        {{ category.name }}
      </NButton>
    </div>
  </div>
</template>