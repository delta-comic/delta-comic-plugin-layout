<script setup lang="ts">
import type { UniUser } from '@delta-comic/model'
import { usePluginStore } from '@delta-comic/plugin'
import { computed, shallowRef } from 'vue'

import { translate } from '@/i18n'

const showDrawer = shallowRef(false)
const user = shallowRef<UniUser>()
const pluginStore = usePluginStore()
const card = computed(() =>
  user.value ? pluginStore.plugins.get(user.value.$$plugin)?.model?.user?.card : undefined,
)

defineExpose({
  show(value: UniUser) {
    user.value = value
    showDrawer.value = true
  },
})
</script>

<template>
  <NDrawer v-model:show="showDrawer" height="70vh" placement="bottom">
    <NDrawerContent :native-scrollbar="false">
      <component :is="card" v-if="card && user" :user />
      <div
        v-else
        class="flex h-20 w-full items-center justify-center text-(--dc-color-text-secondary) italic"
      >
        {{ translate('layout.user.previewUnavailable') }}
      </div>
    </NDrawerContent>
  </NDrawer>
</template>