<script setup lang="ts">
import { useFullscreen } from '@delta-comic/core'
import { usePreventBack } from '@delta-comic/ui'
import { ArrowBackRound, FullscreenRound, PlayArrowRound } from '@vicons/material'
import type { NScrollbar } from 'naive-ui'
import { computed, ref } from 'vue'
defineProps<{
  isScrolled: boolean
  scrollbar: InstanceType<typeof NScrollbar> | null
}>()

const fullscreen = useFullscreen()
const isFullscreen = computed({
  get: () => fullscreen.isFullscreen.value,
  set: isFull => (isFull ? fullscreen.entry() : fullscreen.exit())
})
usePreventBack(isFullscreen, ref(true))

defineSlots<{
  view(): any
}>()
</script>

<template>
  <div class="relative flex h-[30vh] justify-center bg-black text-white">
    <div
      class="pt-safe pointer-events-none absolute top-0 z-3 flex h-14 w-full items-center *:pointer-events-auto"
    >
      <VanSticky>
        <div
          class="pt-safe flex h-[calc(56px+var(--safe-area-inset-top))] w-screen items-center transition-colors"
          :class="[isScrolled ? 'bg-(--p-color)' : 'bg-transparent']"
        >
          <NIcon color="white" size="1.5rem" class="ml-5" @click="$router.back()">
            <ArrowBackRound />
          </NIcon>
          <NIcon color="white" size="1.5rem" class="ml-5" @click="$router.force.push('/')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M19 8.71l-5.333-4.148a2.666 2.666 0 0 0-3.274 0L5.059 8.71a2.665 2.665 0 0 0-1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.2c0-.823-.38-1.6-1.03-2.105"
                ></path>
                <path d="M16 15c-2.21 1.333-5.792 1.333-8 0"></path>
              </g>
            </svg>
          </NIcon>
          <div
            @click="scrollbar?.scrollTo({ behavior: 'smooth', top: 0, left: 0 })"
            class="flex size-full items-center justify-center text-[16px] transition-opacity"
            :class="[isScrolled || 'opacity-0']"
          >
            <NIcon size="2.5rem">
              <PlayArrowRound />
            </NIcon>
            返回顶部
          </div>
        </div>
      </VanSticky>
    </div>
    <Teleport to="#cover" :disabled="!isFullscreen">
      <slot name="view" />
    </Teleport>
    <VanRow class="pointer-events-none absolute bottom-0 z-2 w-full">
      <VanCol span="1" offset="21">
        <NButton
          class="pointer-events-auto text-3xl!"
          @click="isFullscreen = true"
          text
          color="#fff"
        >
          <NIcon>
            <FullscreenRound />
          </NIcon>
        </NButton>
      </VanCol>
    </VanRow>
  </div>
</template>