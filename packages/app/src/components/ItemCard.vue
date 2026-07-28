<script setup lang="ts">
import { RecentDB } from '@delta-comic/db'
import { UniImage, UniItem, type UniItemRaw } from '@delta-comic/model'
import { useConfig } from '@delta-comic/plugin'
import { DcImage } from '@delta-comic/ui'
import { SharedFunction } from '@delta-comic/utils'
import { EyeInvisibleOutlined } from '@vicons/antd'
import { MoreVertRound } from '@vicons/material'
import { createReusableTemplate } from '@vueuse/core'
import { NButton, NIcon, NPopconfirm } from 'naive-ui'
import { computed, type HTMLAttributes, type StyleValue, useTemplateRef } from 'vue'

import { translate } from '@/i18n'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    disabled?: boolean
    freeHeight?: boolean
    item: UniItem | UniItemRaw
    style?: StyleValue
    type?: 'big' | 'default' | 'small'
  }>(),
  { type: 'default' },
)
const emit = defineEmits<{ click: [] }>()
const coverElement = useTemplateRef<InstanceType<typeof DcImage>>('cover')
const cover = computed(() =>
  UniItem.is(props.item) ? props.item.$cover : UniImage.create(props.item.cover),
)
const imageRatio = computed(() => {
  if (coverElement.value?.isLoaded) return undefined
  const width = cover.value.aspect?.width ?? coverElement.value?.imageEl?.clientWidth ?? 3
  const height = cover.value.aspect?.height ?? coverElement.value?.imageEl?.clientHeight ?? 4
  return `${width} / ${height}`
})

defineSlots<{ cover(): unknown; default(): unknown; smallTopInfo(): unknown }>()
const [DefineActions, Actions] = createReusableTemplate()
const { upsert } = RecentDB.useUpsert()
const addToRecent = () => {
  if (UniItem.is(props.item)) return upsert({ item: props.item })
}

const appConfig = useConfig().$loadApp()
const processedTitle = computed(() =>
  appConfig.data.value.easilyTitle
    ? props.item.title.replace(/(（[^）]+）|\[[^\]]+\]|\([^)]+\)|【[^】]+】)+?/gi, '').trim()
    : props.item.title,
)
const isSafe = computed(() => !window.$$safe$$ || props.item.customIsSafe === true)
const isUnavailable = computed(() => props.disabled || !isSafe.value)

const handleClick = () => {
  if (isUnavailable.value) return
  void SharedFunction.call(
    'routeToContent',
    props.item.contentType,
    props.item.id,
    props.item.thisEp.id,
    UniItem.is(props.item) ? props.item : undefined,
  )
  emit('click')
}

const heightStyle = computed(() => (props.freeHeight ? 'auto' : '140px'))
</script>

<template>
  <DefineActions>
    <NPopconfirm @positive-click="addToRecent">
      <template #trigger>
        <NButton class="absolute! right-2 bottom-1.5" text @click.stop>
          <template #icon>
            <NIcon color="var(--dc-color-text-secondary)" size="1rem"><MoreVertRound /></NIcon>
          </template>
        </NButton>
      </template>
      {{ translate('layout.actions.addToRecent') }}
    </NPopconfirm>
  </DefineActions>

  <article
    v-if="type !== 'small'"
    :aria-disabled="isUnavailable"
    class="dc-hairline-top-bottom relative flex w-full overflow-hidden bg-(--dc-color-surface) p-2 text-(--dc-color-text)"
    :class="[
      { 'dc-haptics-feedback': !isUnavailable, 'cursor-not-allowed opacity-60': isUnavailable },
      props.class,
    ]"
    :style="[{ height: heightStyle }, style]"
    @click="handleClick"
  >
    <DcImage
      v-if="type === 'big'"
      class="absolute top-0 left-0 h-full w-full blur-lg"
      fit="cover"
      :src="cover"
    />
    <DcImage
      ref="cover"
      class="z-2 w-3/10 rounded-lg!"
      fit="contain"
      :src="cover"
      :style="{ aspectRatio: imageRatio }"
    />
    <div class="absolute bottom-0 z-3 h-fit w-3/10"><slot name="cover" /></div>
    <div class="absolute right-2 flex h-[calc(100%-8px)] w-[calc(70%-18px)] flex-col">
      <span class="dc-clamp-2">{{ processedTitle }}</span>
      <div class="absolute bottom-2 text-sm text-(--dc-color-text-secondary)"><slot /></div>
    </div>
    <Actions />
    <div
      v-if="!isSafe"
      class="absolute inset-0.5 z-100 rounded-lg bg-(--dc-color-surface)/85 backdrop-blur-md"
      @click.stop
    >
      <div
        class="absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2 text-xl font-semibold"
      >
        <NIcon size="40px"><EyeInvisibleOutlined /></NIcon>
        {{ translate('layout.content.unsafe') }}
      </div>
    </div>
  </article>

  <article
    v-else
    :aria-disabled="isUnavailable"
    class="dc-hairline-top-bottom relative block w-full overflow-hidden rounded-lg bg-(--dc-color-surface) text-(--dc-color-text)"
    :class="[
      { 'dc-haptics-feedback': !isUnavailable, 'cursor-not-allowed opacity-60': isUnavailable },
      props.class,
    ]"
    :style="[{ height: heightStyle }, style]"
    @click="handleClick"
  >
    <div class="relative flex w-full items-center">
      <DcImage
        ref="cover"
        class="w-full rounded-t-lg"
        fit="cover"
        :src="cover"
        :style="{ aspectRatio: imageRatio }"
      />
      <slot name="cover" />
      <div
        class="absolute bottom-0 flex h-6 w-full items-end gap-1 bg-[linear-gradient(transparent,rgba(0,0,0,0.9))] pb-0.5 pl-1 text-[10px]! text-white"
      >
        <slot name="smallTopInfo" />
      </div>
    </div>
    <div class="flex w-full flex-col overflow-hidden p-1">
      <span class="text-start text-sm">{{ processedTitle }}</span>
      <div class="my-1 flex h-auto w-full flex-nowrap items-center"><slot /></div>
    </div>
    <Actions />
    <div
      v-if="!isSafe"
      class="absolute inset-0.5 z-100 rounded-lg bg-(--dc-color-surface)/85 backdrop-blur-md"
      @click.stop
    >
      <div
        class="absolute top-1/2 left-3 flex -translate-y-1/2 flex-col items-center gap-2 text-center text-lg font-semibold"
      >
        <NIcon size="40px"><EyeInvisibleOutlined /></NIcon>
        {{ translate('layout.content.unsafe') }}
      </div>
    </div>
  </article>
</template>