<script setup lang="ts">
import type { UniItem } from '@delta-comic/model'
import { DcEnvironment, DcToggleIcon } from '@delta-comic/ui'
import { LikeOutlined } from '@vicons/antd'
import { ArrowBackIosRound } from '@vicons/material'

import ButtonPopup from '@/components/ButtonPopup.vue'
import FavouriteSelect from '@/components/FavouriteSelect.vue'
import Settings from '@/components/Settings.vue'
import { translate } from '@/i18n'
import type { BarProps } from '@/view/video'

defineProps<{ args: BarProps; controlsVisible: boolean; title?: string; union?: UniItem }>()
const emit = defineEmits<{ back: []; like: [] }>()
defineSlots<{
  bottomBar(args: BarProps): unknown
  centerBar(args: BarProps): unknown
  content(args: BarProps): unknown
  topBar(args: BarProps): unknown
}>()
</script>

<template>
  <div class="pointer-events-none absolute inset-0 z-10 text-white">
    <div
      class="absolute inset-x-0 top-0 flex h-14 items-center bg-linear-to-b from-black/70 to-transparent px-3 transition-opacity"
      :class="controlsVisible ? 'opacity-100' : 'opacity-0'"
    >
      <NButton
        v-if="args.isFullscreen"
        circle
        quaternary
        class="pointer-events-auto"
        @click="emit('back')"
      >
        <template #icon>
          <NIcon color="white"><ArrowBackIosRound /></NIcon>
        </template>
      </NButton>
      <div class="min-w-0 flex-1 truncate text-[15px]">{{ title }}</div>
      <div class="pointer-events-auto flex items-center gap-4">
        <slot name="topBar" v-bind="args" />
        <DcEnvironment :args="args" name="layout::view::video.top-bar" />
        <DcToggleIcon
          v-if="union"
          :icon="LikeOutlined"
          :model-value="union.isLiked"
          size="23px"
          @click="emit('like')"
        />
        <FavouriteSelect v-if="union" :item="union" plain />
        <ButtonPopup
          body-class="bg-black/85 text-white backdrop-blur"
          placement="right"
          width="min(80vw, 28rem)"
        >
          <template #button>
            <NButton text>
              <span class="text-white">{{ translate('layout.actions.settings') }}</span>
            </NButton>
          </template>
          <Settings />
        </ButtonPopup>
      </div>
    </div>

    <div
      class="pointer-events-auto absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center transition-opacity"
      :class="controlsVisible ? 'opacity-100' : 'opacity-0'"
    >
      <slot name="centerBar" v-bind="args" />
      <DcEnvironment :args="args" name="layout::view::video.center-bar" />
    </div>

    <div
      class="pointer-events-auto absolute right-16 bottom-13 left-3 flex items-center justify-end gap-3 transition-opacity"
      :class="controlsVisible ? 'opacity-100' : 'opacity-0'"
    >
      <slot name="bottomBar" v-bind="args" />
      <DcEnvironment :args="args" name="layout::view::video.bottom-bar" />
    </div>

    <div class="absolute inset-0">
      <slot name="content" v-bind="args" />
      <DcEnvironment :args="args" name="layout::view::video.content" />
    </div>
  </div>
</template>