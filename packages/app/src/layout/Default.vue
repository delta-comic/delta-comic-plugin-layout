<script setup lang="ts">
import type { UniContentPage, UniItem } from '@delta-comic/model'
import { DcEnvironment, DcTab } from '@delta-comic/ui'
import { useQuery } from '@pinia/colada'
import { KeyboardArrowDownRound, VisibilityOutlined } from '@vicons/material'
import { NCollapseTransition, NIcon, NScrollbar } from 'naive-ui'
import { computed, shallowRef, useTemplateRef } from 'vue'

import Comment from '@/components/comment/Comment.vue'
import { translate } from '@/i18n'
import { createDateString } from '@/utils/date'

import type * as LayoutExtension from './default'
import { createPageQueryKey, QueryKey } from './default'
import Actions from './default/Actions.vue'
import Description from './default/Description.vue'
import EpController from './default/EpController.vue'
import Recommends from './default/Recommends.vue'
import SubscribeList from './default/SubscribeList.vue'
import Tags from './default/Tags.vue'
import ViewBox from './default/ViewBox.vue'

const props = defineProps<{ isR18g?: boolean; page: UniContentPage }>()
defineSlots<{
  action(args: LayoutExtension.ContentProps): unknown
  description(args: LayoutExtension.ContentProps): unknown
  recommend(args: LayoutExtension.ContentProps): unknown
  subscribeRow(args: LayoutExtension.SubscribeRowProps): unknown
  tab(args: LayoutExtension.TabProps): unknown
  view(args: { item?: UniItem }): unknown
}>()

const detailQuery = useQuery({
  key: () => [QueryKey.Detail, createPageQueryKey(props.page)],
  query: ({ signal }) => props.page.fetchDetail(signal),
})
const union = computed(() => detailQuery.data.value ?? props.page.preload)
const shortIdQuery = useQuery({
  key: () => [QueryKey.ShortId, createPageQueryKey(props.page)],
  query: ({ signal }) => props.page.fetchShortId(signal),
})

const showTitleFull = shallowRef(false)
const activeTab = shallowRef('info')
const scrollbar = useTemplateRef<InstanceType<typeof NScrollbar>>('scrollbar')
const isScrolled = shallowRef(false)
const tabs = computed(() => [
  { name: 'info', title: translate('layout.content.info') },
  {
    name: 'comments',
    title: `${translate('layout.content.comments')}${union.value?.commentNumber ? ` ${union.value.commentNumber}` : ''}`,
  },
])
const dateLabels = computed(() => ({
  differentYearFormat: translate('layout.date.differentYearFormat'),
  sameYearFormat: translate('layout.date.sameYearFormat'),
  todayFormat: translate('layout.date.todayFormat'),
  yesterdayFormat: translate('layout.date.yesterdayFormat'),
}))
const updateTime = computed(() =>
  union.value?.updateTime ? createDateString(union.value.updateTime, dateLabels.value) : undefined,
)

const handleScroll = (event: Event) => {
  isScrolled.value = (event.currentTarget as HTMLElement).scrollTop > 56
}
</script>

<template>
  <NScrollbar
    ref="scrollbar"
    class="h-full! bg-(--dc-color-surface)"
    :style="{
      backgroundColor: isR18g
        ? 'color-mix(in oklab, var(--nui-error-color-hover) 5%, var(--dc-color-surface))'
        : 'var(--dc-color-surface)',
    }"
    @scroll="handleScroll"
  >
    <ViewBox :is-scrolled="isScrolled" :scrollbar>
      <template #view><slot name="view" :item="union" /></template>
    </ViewBox>

    <div class="sticky top-0 z-2 bg-(--dc-color-surface)">
      <DcTab v-model="activeTab" :items="tabs" :router="false" swipeable />
    </div>

    <section v-show="activeTab === 'info'" class="dc-hairline-top min-h-[70vh]">
      <SubscribeList :page :union>
        <template #subscribe-row="args"><slot name="subscribeRow" v-bind="args" /></template>
      </SubscribeList>
      <div class="mx-auto mt-2 w-[95%]">
        <div class="relative flex h-fit">
          <div class="relative w-[calc(100%-2rem)] text-[17px] font-medium">
            <button
              v-if="!showTitleFull"
              class="flex w-full flex-col border-0 bg-transparent p-0 text-left text-(--dc-color-text)"
              type="button"
              @click="showTitleFull = true"
            >
              <span class="w-full dc-ellipsis">{{ union?.title }}</span>
              <span class="mt-1 flex gap-2 text-xs font-normal text-(--dc-color-text-secondary)">
                <span v-if="union?.viewNumber" class="flex items-center gap-1">
                  <NIcon><VisibilityOutlined /></NIcon>
                  {{ translate('layout.content.viewCount', { count: union.viewNumber }) }}
                </span>
                <span v-if="updateTime">{{ updateTime }}</span>
              </span>
            </button>
            <NCollapseTransition :show="showTitleFull">
              <button
                class="w-full border-0 bg-transparent p-0 text-left text-(--dc-color-text)"
                type="button"
                @click="showTitleFull = false"
              >
                {{ union?.title }}
              </button>
              <div class="mt-1 flex gap-2 text-xs text-(--dc-color-text-secondary)">
                <span v-if="union?.viewNumber" class="flex items-center gap-1">
                  <NIcon><VisibilityOutlined /></NIcon>
                  {{ translate('layout.content.viewCount', { count: union.viewNumber }) }}
                </span>
                <span v-if="updateTime">{{ updateTime }}</span>
              </div>
              <p
                v-if="shortIdQuery.data.value"
                class="my-1 text-xs text-(--dc-color-text-secondary)"
              >
                {{ shortIdQuery.data.value }}
              </p>
              <Description :page :union>
                <template #description="args"><slot name="description" v-bind="args" /></template>
              </Description>
              <Tags :union />
            </NCollapseTransition>
          </div>
          <NIcon
            class="absolute -top-0.5 right-0 transition-transform"
            :class="showTitleFull && 'rotate-180'"
            color="var(--dc-color-text-tertiary)"
            size="2rem"
            @click="showTitleFull = !showTitleFull"
          >
            <KeyboardArrowDownRound />
          </NIcon>
        </div>
        <Actions :page :union>
          <template #action="args"><slot name="action" v-bind="args" /></template>
        </Actions>
        <EpController :is-r18g :page :scrollbar :union />
      </div>
      <Recommends :page :union>
        <template #recommend="args"><slot name="recommend" v-bind="args" /></template>
      </Recommends>
    </section>

    <section v-if="union" v-show="activeTab === 'comments'" class="dc-hairline-top h-[70vh]">
      <Comment class="h-full" :fetch-comments="page.fetchComments" :item="union" />
    </section>

    <slot name="tab" :page />
    <DcEnvironment :args="{ page }" name="layout::layout::default.tab" />
  </NScrollbar>
</template>