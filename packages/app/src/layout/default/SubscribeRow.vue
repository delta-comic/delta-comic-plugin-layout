<script setup lang="ts">
import { SubscribeDB } from '@delta-comic/db'
import type { UniContentPage, UniItemAuthor } from '@delta-comic/model'
import { translatePluginText, usePluginStore } from '@delta-comic/plugin'
import { createLoadingMessage, DcAuthorIcon, DcEnvironment } from '@delta-comic/ui'
import { PlusRound } from '@vicons/material'
import { createReusableTemplate } from '@vueuse/core'
import { NButton, NDropdown, NIcon, type DropdownOption } from 'naive-ui'
import { computed, h } from 'vue'

import { translate } from '@/i18n'

const props = defineProps<{ author: UniItemAuthor; isSmall?: boolean; page: UniContentPage }>()
defineSlots<{
  subscribeRow(args: {
    author: UniItemAuthor
    isSubscribe: boolean
    page: UniContentPage
    type: 'common' | 'small'
  }): unknown
}>()
const pluginStore = usePluginStore()

const authorKey = computed(() =>
  SubscribeDB.key.toString([props.author.$$plugin, props.author.label]),
)
const subscription = SubscribeDB.useQuery(
  query => query.where('key', '=', authorKey.value).selectAll().execute(),
  ['layout:subscribe-row', authorKey.value],
  () => [],
)
const isSubscribe = computed(() => (subscription.data.value?.length ?? 0) > 0)
const subscribeProvider = computed(() => {
  if (!props.author.subscribe) return undefined
  return pluginStore.plugins.get(props.author.$$plugin)?.model?.social?.subscribe
})

const { isLoading: isAdding, upsert } = SubscribeDB.useUpsert()
const addSubscribe = () => {
  const provider = subscribeProvider.value
  if (!provider) return
  return createLoadingMessage(translate('layout.author.following')).bind(
    (async () => {
      await upsert({
        items: [
          {
            author: props.author,
            itemKey: null,
            key: authorKey.value,
            plugin: props.author.$$plugin,
            type: 'author',
          },
        ],
      })
    })(),
  )
}

const { isLoading: isRemoving, remove } = SubscribeDB.useRemove()
const removeSubscribe = () => {
  const provider = subscribeProvider.value
  if (!provider) return
  return createLoadingMessage(translate('layout.author.unfollowing')).bind(
    (async () => {
      await remove({ keys: [authorKey.value] })
    })(),
  )
}

const toggleSubscribe = () => (isSubscribe.value ? removeSubscribe() : addSubscribe())
const actionOptions = computed<DropdownOption[]>(() =>
  (props.author.actions ?? []).flatMap(key => {
    const action = pluginStore.plugins
      .get(props.author.$$plugin)
      ?.model?.user?.userActions?.find(action => action.id === key)
    if (!action) return []
    const icon = action.icon
    return [
      { ...(icon ? { icon: () => h(icon) } : {}), key, label: translatePluginText(action.name) },
    ]
  }),
)
const selectAction = (key: string) =>
  pluginStore.plugins
    .get(props.author.$$plugin)
    ?.model?.user?.userActions?.find(action => action.id === key)
    ?.call(props.author)

const environmentArgs = computed(() => ({
  author: props.author,
  isSubscribe: isSubscribe.value,
  page: props.page,
  type: props.isSmall ? ('small' as const) : ('common' as const),
}))
const [DefineIdentity, Identity] = createReusableTemplate()
</script>

<template>
  <div class="relative min-w-fit" :class="isSmall ? 'flex flex-col items-center' : 'w-full'">
    <Identity />
    <slot name="subscribeRow" v-bind="environmentArgs" />
    <DcEnvironment :args="environmentArgs" name="layout::layout::default.subscribe-row" />
    <NButton
      v-if="subscribeProvider"
      :circle="isSmall"
      :class="isSmall ? 'mt-1' : 'absolute! top-1/2 right-3 -translate-y-1/2'"
      :loading="isAdding || isRemoving"
      round
      size="small"
      type="primary"
      @click.stop="toggleSubscribe"
    >
      <template #icon>
        <NIcon class="transition-transform" :class="isSubscribe && 'rotate-45'">
          <PlusRound />
        </NIcon>
      </template>
      <template v-if="!isSmall" #default>
        {{ translate(isSubscribe ? 'layout.author.unfollow' : 'layout.author.follow') }}
      </template>
    </NButton>
  </div>

  <DefineIdentity>
    <NDropdown
      :disabled="actionOptions.length === 0"
      :options="actionOptions"
      placement="bottom-start"
      trigger="click"
      @select="selectAction"
    >
      <button
        class="flex max-w-64 items-center dc-ellipsis border-0 bg-transparent pl-2 text-left"
        type="button"
      >
        <DcAuthorIcon :author class="mx-2" :size-spacing="8.5" />
        <span class="flex min-w-0 flex-col text-nowrap">
          <span class="dc-ellipsis text-[16px] text-(--dc-color-primary)">{{ author.label }}</span>
          <span class="dc-ellipsis text-[11px] text-(--dc-color-text-secondary)">
            {{ author.description }}
          </span>
        </span>
      </button>
    </NDropdown>
  </DefineIdentity>
</template>