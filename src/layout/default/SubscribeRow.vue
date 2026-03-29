<script setup lang="ts">
import { SubscribeDB } from '@delta-comic/db'
import type { uni } from '@delta-comic/model'
import { Global } from '@delta-comic/plugin'
import { createLoadingMessage } from '@delta-comic/ui'
import { createReusableTemplate } from '@vueuse/core'

const $props = defineProps<{
  page: uni.content.ContentPage
  author: uni.item.Author
  isSmall?: boolean
}>()

const [DefineAvatar, Avatar] = createReusableTemplate<{ author: uni.item.Author }>()

const getIsSubscribe = (author: uni.item.Author) =>
  SubscribeDB.useQuery(db =>
    db
      .where('key', '=', `${author.$$plugin}:${author.label}`)
      .selectAll()
      .execute()
      .then(v => v.length != 0)
  )

const addSubscribe = (author: uni.item.Author) =>
  createLoadingMessage('关注中').bind(
    SubscribeDB.upsert({
      type: 'author',
      author,
      plugin: author.$$plugin,
      key: SubscribeDB.key.toString([author.$$plugin, author.label]),
      itemKey: null
    })
  )
const removeSubscribe = (author: uni.item.Author) =>
  createLoadingMessage('取消中').bind(
    db.value
      .deleteFrom('subscribe')
      .where('key', '=', SubscribeDB.key.toString([author.$$plugin, author.label]))
      .execute()
  )

const getActionInfo = (key: string) => Global.userActions.get([$props.page.plugin, key])!
</script>

<template>
  <div class="relative w-full" v-if="isSmall">
    <Avatar :author />
    <DcVar
      :value="getIsSubscribe(author)"
      v-slot="{
        value: {
          data: { value: isSubscribe }
        }
      }"
    >
      <slot name="subscribeRow" :="{ page, author, isSubscribe, type: 'small' }" />
      <Inject
        key="layout::layout::default.subscribe-row"
        :args="{ page, author, isSubscribe, type: 'small' }"
      />

      <NButton
        round
        type="primary"
        :color="isSubscribe ? '#6a7282' : undefined"
        class="aspect-square px-0!"
        size="small"
        @click.stop="isSubscribe ? removeSubscribe(author) : addSubscribe(author)"
      >
        <template #icon>
          <NIcon :class="isSubscribe ? 'rotate-45' : 'rotate-0'" class="transition-transform">
            <PlusRound />
          </NIcon>
        </template>
      </NButton>
    </DcVar>
  </div>
  <div class="relative w-full" v-else>
    <Avatar :author />
    <DcVar
      :value="getIsSubscribe(author)"
      v-slot="{
        value: {
          data: { value: isSubscribe }
        }
      }"
    >
      <slot name="subscribeRow" :="{ page, author, isSubscribe, type: 'common' }" />
      <Inject
        key="layout::layout::default.subscribe-row"
        :args="{ page, author, isSubscribe, type: 'common' }"
      />

      <NButton
        round
        type="primary"
        :color="isSubscribe ? '#6a7282' : undefined"
        class="absolute! top-1/2 right-3 -translate-y-1/2"
        size="small"
        @click.stop="isSubscribe ? removeSubscribe(author) : addSubscribe(author)"
      >
        <template #icon>
          <NIcon :class="isSubscribe ? 'rotate-45' : 'rotate-0'" class="transition-transform">
            <PlusRound />
          </NIcon>
        </template>
        <template #default>
          {{ isSubscribe ? '取关' : '关注' }}
        </template>
      </NButton>
    </DcVar>
  </div>
  <DefineAvatar v-slot="{ author }">
    <VanPopover
      :actions="
        (author.actions ?? []).map(k => ({
          text: getActionInfo(k).name,
          icons: getActionInfo(k).icon,
          key: k
        }))
      "
      @select="q => getActionInfo(q.key).call(author)"
      placement="bottom-start"
    >
      <template #reference>
        <div class="van-ellipsis flex w-fit items-center pl-2 text-[16px] text-(--p-color)">
          <DcAuthorIcon :size-spacing="8.5" :author class="mx-2" />
          <div class="flex w-full flex-col text-nowrap">
            <div class="flex items-center text-(--nui-primary-color)">
              {{ author.label }}
            </div>
            <div class="-mt-0.5 flex max-w-2/3 items-center text-[11px] text-(--van-text-color-2)">
              {{ author.description }}
            </div>
          </div>
        </div>
      </template>
      <template #action="{ action: { text, icons } }: { action: PopoverAction; index: number }">
        <div class="relative flex w-full items-center justify-center gap-1 text-nowrap">
          <NIcon color="var(--van-text-color)" class="flex! items-center!" size="18px">
            <component :is="icons" />
          </NIcon>
          <div>{{ text }}</div>
        </div>
      </template>
    </VanPopover>
  </DefineAvatar>
</template>