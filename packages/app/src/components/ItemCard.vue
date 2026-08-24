<script setup lang="ts">
import { RecentDB } from '@delta-comic/db'
import { UniImage, UniItem, type UniItemRaw } from '@delta-comic/model'
import { useConfig, usePluginStore } from '@delta-comic/plugin'
import { DcImage } from '@delta-comic/ui'
import { SharedFunction } from '@delta-comic/utils'
import { MoreVertRound } from '@vicons/material'
import { createReusableTemplate } from '@vueuse/core'
import { NPopconfirm } from 'naive-ui'
import { computed, type StyleValue, type ClassValue, useTemplateRef } from 'vue'

import { translate } from '@/i18n'

const $props = withDefaults(
  defineProps<{
    class?: ClassValue
    disabled?: boolean
    freeHeight?: boolean
    item: UniItem | UniItemRaw
    style?: StyleValue
    type?: 'big' | 'default' | 'small'
  }>(),
  { type: 'default' },
)
const $emit = defineEmits<{ click: [] }>()
const cover = useTemplateRef<InstanceType<typeof DcImage>>('cover')
const $cover = computed(() =>
  UniItem.is($props.item) ? $props.item.$cover : UniImage.create($props.item.cover),
)
const imageRatio = computed(() =>
  cover.value?.isLoaded
    ? 'unset'
    : `${$cover.value.aspect?.width || cover.value?.imageEl?.getBoundingClientRect().width || 3} / ${$cover.value.aspect?.height || cover.value?.imageEl?.getBoundingClientRect().height || 4}`,
)

defineSlots<{ default(): void; smallTopInfo(): void; cover(): void }>()
const [TemplateIns, ComponentIns] = createReusableTemplate()
const { upsert } = RecentDB.useUpsert()
const handlePositiveClick = () => {
  if (UniItem.is($props.item)) return upsert({ item: $props.item })
}

const configStore = useConfig()
const pluginStore = usePluginStore()
const appConfig = computed(() => {
  const pointer = pluginStore.plugins.get('core')?.config
  return pointer ? configStore.load(pointer).data.value : undefined
})

const processedTitle = computed(() =>
  appConfig.value?.easilyTitle === true
    ? $props.item.title.replace(/(（[^）]+）|\[[^\]]+\]|\([^)]+\)|【[^】]+】)+?/gi, '').trim()
    : $props.item.title,
)
const isUnavailable = computed(() => $props.disabled)

const handleClick = () => {
  if (isUnavailable.value) return
  void SharedFunction.call(
    'routeToContent',
    $props.item.contentType,
    $props.item.id,
    $props.item.thisEp.id,
    UniItem.is($props.item) ? $props.item : undefined,
  )
  $emit('click')
}
</script>

<template>
  <TemplateIns>
    <NPopconfirm @positive-click="handlePositiveClick">
      <template #trigger>
        <NButton @click.stop text class="absolute! right-2 bottom-1.5">
          <NIcon color="var(--van-text-color-2)" size="1rem">
            <MoreVertRound />
          </NIcon>
        </NButton>
      </template>
      {{ translate('layout.actions.addToRecent') }}
    </NPopconfirm>
  </TemplateIns>
  <div
    ref="container"
    @click="handleClick"
    :disabled
    v-if="type != 'small'"
    class="van-hairline--top-bottom relative flex w-full overflow-hidden bg-(--van-background-2) p-2 text-(--van-text-color)"
    :style="[{ height: freeHeight ? 'auto' : '140px' }, style]"
    :class="[{ 'van-haptics-feedback': !disabled }, $props.class]"
  >
    <DcImage
      :src="$cover"
      v-if="type === 'big'"
      class="absolute top-0 left-0 h-full w-full blur-lg"
      fit="cover"
    />
    <DcImage :src="$cover" class="image-size z-2 w-3/10 rounded-lg!" fit="contain" ref="cover" />
    <div class="absolute bottom-0 z-3 h-fit w-3/10">
      <slot name="cover" />
    </div>
    <div
      class="absolute right-2 flex h-[calc(100%-8px)] w-[calc(70%-18px)] flex-col *:text-justify"
    >
      <span class="van-multi-ellipsis--l2">{{ processedTitle }}</span>
      <div class="absolute bottom-2 text-sm text-(--van-text-color-2)">
        <slot />
      </div>
    </div>
    <ComponentIns />
  </div>

  <div
    :style="[{ height: freeHeight ? 'auto' : '140px' }, style]"
    v-else
    @click="handleClick"
    :disabled
    :class="[{ 'van-haptics-feedback': !disabled }, $props.class]"
    ref="container"
    class="van-hairline--top-bottom relative block w-full items-center overflow-hidden rounded-lg border-none bg-(--van-background-2) bg-center p-0 text-(--van-text-color)"
  >
    <div class="relative flex w-full items-center">
      <DcImage :src="$cover" class="image-size w-full rounded-t-lg" fit="cover" ref="cover" />
      <slot name="cover" />
      <div
        class="absolute bottom-0 flex h-6 w-full items-end justify-start gap-1 bg-[linear-gradient(transparent,rgba(0,0,0,0.9))] pb-0.5 pl-1 text-[10px]! text-white *:flex *:items-center"
      >
        <slot name="smallTopInfo" />
      </div>
    </div>
    <div class="flex w-full flex-col overflow-hidden p-1 text-(--van-text-color)">
      <div class="flex flex-nowrap">
        <span class="text-start text-sm">{{ processedTitle }}</span>
      </div>
      <div class="my-1 flex h-auto w-full flex-nowrap items-center">
        <slot />
      </div>
    </div>
    <ComponentIns />
  </div>
</template>
<style scoped lang="css">
:deep(.image-size) {
  aspect-ratio: v-bind('imageRatio');
}
</style>