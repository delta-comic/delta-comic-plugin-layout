<script setup lang="ts">
import { usePreventBack } from '@delta-comic/ui'
import { useFullscreen } from '@delta-comic/utils'
import { ArrowBackRound, FullscreenRound, HomeRound, PlayArrowRound } from '@vicons/material'
import { NButton, NIcon, type NScrollbar } from 'naive-ui'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { translate } from '@/i18n'

const props = defineProps<{
  isScrolled: boolean
  scrollbar: InstanceType<typeof NScrollbar> | null
}>()
defineSlots<{ view(): unknown }>()

const router = useRouter()
const fullscreen = useFullscreen()
const isFullscreen = computed({
  get: () => fullscreen.isFullscreen.value,
  set: value => void (value ? fullscreen.entry() : fullscreen.exit()),
})
usePreventBack(isFullscreen)
</script>

<template>
  <section class="relative flex h-[30vh] justify-center bg-black text-white">
    <div class="pointer-events-none absolute top-0 z-3 flex h-14 w-full items-center pt-safe">
      <div
        class="pointer-events-auto flex h-[calc(56px+var(--safe-area-inset-top))] w-full items-center transition-colors"
        :class="isScrolled ? 'bg-(--dc-color-primary)' : 'bg-transparent'"
      >
        <NButton circle quaternary @click="router.back()">
          <template #icon
            ><NIcon color="white" size="1.5rem"><ArrowBackRound /></NIcon
          ></template>
        </NButton>
        <NButton circle quaternary @click="router.force.push('/')">
          <template #icon
            ><NIcon color="white" size="1.5rem"><HomeRound /></NIcon
          ></template>
        </NButton>
        <NButton
          class="mx-auto! transition-opacity"
          :class="!isScrolled && 'pointer-events-none opacity-0'"
          text
          @click="props.scrollbar?.scrollTo({ behavior: 'smooth', left: 0, top: 0 })"
        >
          <template #icon
            ><NIcon color="white" size="2rem"><PlayArrowRound /></NIcon
          ></template>
          <span class="text-white">{{ translate('layout.actions.backToTop') }}</span>
        </NButton>
      </div>
    </div>

    <Teleport to="body" :disabled="!isFullscreen">
      <div class="bg-black" :class="isFullscreen ? 'fixed inset-0 z-[100000]' : 'absolute inset-0'">
        <slot name="view" />
      </div>
    </Teleport>

    <NButton class="absolute! right-4 bottom-3 z-2 text-3xl!" text @click="isFullscreen = true">
      <template #icon
        ><NIcon color="white"><FullscreenRound /></NIcon
      ></template>
    </NButton>
  </section>
</template>