<script setup lang="ts">
import type { UniEp, UniItem } from '@delta-comic/model'
import { DcCell, DcEnvironment, DcList, DcToggleIcon } from '@delta-comic/ui'
import { LikeOutlined } from '@vicons/antd'
import { ArrowBackIosNewRound, FullscreenExitRound } from '@vicons/material'

import ButtonPopup from '@/components/ButtonPopup.vue'
import FavouriteSelect from '@/components/FavouriteSelect.vue'
import Settings from '@/components/Settings.vue'
import { useEpisodes } from '@/composables/useEpisodes'
import { translate } from '@/i18n'
import type { BarProps } from '@/view/image'

const props = defineProps<{
  args: BarProps
  isFullscreen: boolean
  selectedIndex: number
  showMenu: boolean
  union?: UniItem
}>()
const emit = defineEmits<{ back: []; exitFullscreen: []; like: []; selectPage: [value: number] }>()
defineSlots<{ bottomBar(args: BarProps): unknown; topBar(args: BarProps): unknown }>()

const { currentEpisode, episodes, episodeTitle, query, routeToEpisode } = useEpisodes({
  page: () => props.args.page,
  union: () => props.union,
})

const selectEpisode = (episode: UniEp) => routeToEpisode(episode)
</script>

<template>
  <Transition
    enter-active-class="transition-[transform,opacity] duration-200 ease-in-out"
    enter-from-class="-translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-[transform,opacity] duration-200 ease-in-out"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-full opacity-0"
  >
    <div
      v-if="showMenu && isFullscreen"
      class="absolute top-0 z-3 flex h-14 w-full items-center bg-[linear-gradient(rgba(0,0,0,0.5)_50%,transparent)] pt-safe text-white"
    >
      <NButton
        :aria-label="translate('layout.actions.back')"
        class="mx-3! text-2xl!"
        text
        @click="emit('back')"
      >
        <template #icon>
          <NIcon color="white"><ArrowBackIosNewRound /></NIcon>
        </template>
      </NButton>
      <div class="flex min-w-0 flex-1 flex-col text-nowrap">
        <span class="dc-ellipsis text-[1rem]">{{ union?.title }}</span>
        <span class="dc-ellipsis text-xs">{{ currentEpisode?.name }}</span>
      </div>
      <div class="flex items-center gap-4 pr-3">
        <slot name="topBar" v-bind="args" />
        <DcEnvironment :args name="layout::view::image.top-bar" />
        <DcToggleIcon
          v-if="union"
          :icon="LikeOutlined"
          :model-value="union.isLiked"
          padding
          size="30px"
          @click="emit('like')"
        />
        <FavouriteSelect v-if="union" :item="union" plain />
      </div>
    </div>
  </Transition>

  <Transition
    enter-active-class="transition-[transform,opacity] duration-200 ease-in-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-[transform,opacity] duration-200 ease-in-out"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="showMenu && isFullscreen"
      class="absolute bottom-0 z-3 flex min-h-16 w-full flex-col items-center justify-center bg-black/55 px-3 text-white backdrop-blur-md"
    >
      <NSlider
        class="absolute! top-0 w-[calc(100%-1.5rem)]!"
        :max="Math.max(0, args.images.length - 1)"
        :min="0"
        :tooltip="true"
        :value="selectedIndex"
        @update:value="emit('selectPage', $event)"
      />
      <span class="absolute top-1 left-3 text-xs">
        {{
          translate('layout.reader.pageProgress', {
            current: args.index + 1,
            total: args.images.length,
          })
        }}
      </span>
      <div class="mt-4 flex w-full items-center justify-end gap-4 overflow-x-auto">
        <slot name="bottomBar" v-bind="args" />
        <DcEnvironment :args name="layout::view::image.bottom-bar" />
        <ButtonPopup body-class="bg-black/80 text-white backdrop-blur" height="70vh">
          <template #button>
            <NButton text>
              <span class="text-white">{{ translate('layout.actions.settings') }}</span>
            </NButton>
          </template>
          <Settings />
        </ButtonPopup>
        <ButtonPopup
          v-if="episodes.length > 1"
          body-class="bg-black/80 text-white backdrop-blur"
          height="70vh"
        >
          <template #button>
            <NButton text>
              <span class="text-white">{{ translate('layout.content.episode') }}</span>
            </NButton>
          </template>
          <h2 class="px-4 text-lg">{{ translate('layout.content.episode') }}</h2>
          <DcList
            class="h-[calc(100%-3rem)] w-full"
            :min-height="44"
            :source="{ type: 'stream', value: query }"
            v-slot="{ height, index, item: episode }"
          >
            <DcCell
              center
              clickable
              :style="{ height: `${height ?? 44}px` }"
              :title="episodeTitle(episode, index)"
              :title-class="[
                'text-white',
                args.page.ep === episode.id && 'font-bold text-(--dc-color-primary)!',
              ]"
              @click="selectEpisode(episode)"
            />
          </DcList>
        </ButtonPopup>
        <NButton
          :aria-label="translate('layout.actions.exitFullscreen')"
          text
          @click="emit('exitFullscreen')"
        >
          <template #icon>
            <NIcon color="white" size="2rem"><FullscreenExitRound /></NIcon>
          </template>
        </NButton>
      </div>
    </div>
  </Transition>
</template>