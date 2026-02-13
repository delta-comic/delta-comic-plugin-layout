<script setup lang="ts">
import { uni } from '@delta-comic/model'
import { Global, type Share } from '@delta-comic/plugin'
import { DcPopup, DcToggleIcon } from '@delta-comic/ui'
import { ShareSharp } from '@vicons/material'
import { computed, shallowRef } from 'vue'

const $props = defineProps<{ page: uni.content.ContentPage }>()
const showShare = shallowRef(false)
const methods = computed(() =>
  Array.from(Global.share.entries()).filter(v => v[1].filter($props.page))
)
const handleClick = (method: Share.InitiativeItem) => {
  showShare.value = false
  return method.call($props.page)
}
</script>

<template>
  <DcToggleIcon padding size="27px" :icon="ShareSharp" dis-changed @click="showShare = true">
    分享
  </DcToggleIcon>
  <DcPopup v-model:show="showShare" round position="bottom" class="h-fit bg-(--van-background)!">
    <div class="w-full bg-(--van-background-2) pt-4 pb-1 text-center text-base!">分享该内容</div>
    <div
      class="scrollbar mb-3 flex h-fit w-full gap-1 overflow-x-auto overflow-y-hidden bg-(--van-background-2) px-1 py-5"
    >
      <div
        v-for="method of methods"
        class="flex h-full w-fit flex-col items-center justify-around"
        @click="handleClick(method[1])"
      >
        <ImagedIcon
          :size-spacing="12"
          :icon="method[1].icon"
          :bgColor="method[1].bgColor ?? 'var(--color-gray-200)'"
        />
        <div
          class="van-multi-ellipsis--l2 mt-1 w-18 text-center text-xs! text-wrap text-(--van-text-color-2)!"
        >
          {{ method[1].name }}
        </div>
      </div>
    </div>
    <VanButton block size="large" class="w-full! border-none!" @click="showShare = false"
      >取消</VanButton
    >
  </DcPopup>
</template>