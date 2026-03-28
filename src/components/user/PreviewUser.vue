<script setup lang="ts">
import type { uni } from '@delta-comic/model'
import { usePluginStore } from '@delta-comic/plugin'
import { DcPopup } from '@delta-comic/ui'
import { computed, shallowRef } from 'vue'

const show = shallowRef(false)
const user = shallowRef<uni.user.User>()

defineExpose({
  show(u: uni.user.User) {
    show.value = true
    user.value = u
  }
})
const pluginStore = usePluginStore()
const Card = computed(() =>
  user.value ? pluginStore.plugins.get(user.value.$$plugin)?.user?.card : undefined
)
</script>

<template>
  <DcPopup v-model:show="show" overlay position="bottom" round>
    <component :is="Card" :user v-if="user" />
    <div v-else class="w-full h-20 flex items-center justify-center italic">
      没有提供的用户显示卡片
    </div>
  </DcPopup>
</template>