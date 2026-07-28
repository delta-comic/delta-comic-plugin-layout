<script setup lang="ts">
import type { UniItem } from '@delta-comic/model'
import { SharedFunction } from '@delta-comic/utils'
import { computed } from 'vue'

const props = defineProps<{ union?: UniItem }>()
const categoryGroups = computed(() => {
  const groups = new Map<string, UniItem['categories']>()
  for (const category of props.union?.categories ?? []) {
    const group = groups.get(category.group) ?? []
    group.push(category)
    groups.set(category.group, group)
  }
  return [...groups.entries()].map(([name, categories]) => ({
    categories: [...categories].sort((left, right) => right.name.length - left.name.length),
    name,
  }))
})

const openCategory = (category: UniItem['categories'][number]) =>
  SharedFunction.call(
    'routeToSearch',
    category.search.keyword,
    [category.$$plugin, category.search.source],
    category.search.sort,
  )
</script>

<template>
  <div v-for="group of categoryGroups" :key="group.name" class="flex w-full flex-col">
    <NDivider class="my-1! text-xs! text-(--dc-gray-7)!" title-placement="left">
      {{ group.name }}
    </NDivider>
    <div class="flex flex-wrap gap-2.5">
      <NButton
        v-for="category of group.categories"
        :key="`${category.$$plugin}:${category.name}`"
        round
        size="small"
        tertiary
        @click="openCategory(category)"
      >
        {{ category.name }}
      </NButton>
    </div>
  </div>
</template>