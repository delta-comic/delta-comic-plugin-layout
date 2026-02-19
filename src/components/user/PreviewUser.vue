<script setup lang="ts">
import type { uni } from '@delta-comic/model'
import { computed, shallowRef } from 'vue'
import { usePluginStore } from '@delta-comic/plugin'
import { DcPopup } from '@delta-comic/ui'

const show = shallowRef(false)
const user = shallowRef<uni.user.User>()

defineExpose({
  show(u: uni.user.User) {
    show.value = true
    user.value = u
  }
})
const pluginStore = usePluginStore()
const Card = computed(() => pluginStore.plugins.get(user.value?.$$plugin ?? '')?.user?.card)
</script>

<template>
  <DcPopup v-model:show="show" overlay position="bottom" round>
    <component :is="Card" :user v-if="user" />
  </DcPopup>
</template>