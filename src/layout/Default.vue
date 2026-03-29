<script setup lang="ts">
import type { uni } from '@delta-comic/model'
import { useQuery } from '@pinia/colada'
import { KeyboardArrowDownRound } from '@vicons/material'
import { createReusableTemplate, useCssVar } from '@vueuse/core'
import { motion } from 'motion-v'
import { computed, shallowRef, useTemplateRef } from 'vue'

import Comment from '@/components/comment/Comment.vue'
import { createDateString } from '@/utils/date'

import * as LayoutInject from './default'
import Actions from './default/Actions.vue'
import Description from './default/Description.vue'
import EpController from './default/EpController.vue'
import SubscribeList from './default/SubscribeList.vue'
import Tags from './default/Tags.vue'
import ViewBox from './default/ViewBox.vue'

defineSlots<{
  subscribeRow(args: LayoutInject.SubscribeRowProps): any
  action(args: LayoutInject.ContentProps): any
  description(args: LayoutInject.ContentProps): any
  recommend(args: LayoutInject.ContentProps): any
  tab(args: LayoutInject.TabProps): any
  view(): any
}>()

const $props = defineProps<{ page: uni.content.ContentPage; isR18g?: boolean }>()

const { data: detail } = useQuery({
  query: ({ signal }) => $props.page.fetchDetail(signal),
  key: () => [LayoutInject.QueryKey.Detail, LayoutInject.createPageQueryKey($props.page)]
})
const union = computed(() => detail.value ?? $props.page.preload)

const showTitleFull = shallowRef(false)
const [TitleDefine, Title] = createReusableTemplate()

const safeHeightTopCss = useCssVar('--safe-area-inset-top')
const safeHeightTop = computed(() => Number(safeHeightTopCss.value?.match(/\d+/)?.[0]))
const isScrolled = shallowRef(false)
const scrollbar = useTemplateRef('scrollbar')

const { data: shortId } = useQuery({
  query: ({ signal }) => $props.page.fetchShortId(signal),
  key: () => [LayoutInject.QueryKey.ShortId, LayoutInject.createPageQueryKey($props.page)]
})
</script>

<template>
  <TitleDefine>
    <div
      class="mt-1 flex gap-1 text-xs font-normal text-(--van-text-color-2) *:flex *:items-center"
    >
      <div class="flex items-center gap-1 text-xs text-(--van-text-color-2)">
        <span>
          <VanIcon class="mr-0.5" name="eye-o" size="14px" />
          <span>{{ union?.viewNumber }}</span>
        </span>
        <span>
          <span>{{ createDateString(union?.$updateTime) }}</span>
        </span>
      </div>
    </div>
  </TitleDefine>

  <NScrollbar
    ref="scrollbar"
    class="h-full! bg-(--van-background-2) *:w-full"
    :style="{
      '--van-background-2': isR18g
        ? 'color-mix(in oklab, var(--nui-error-color-hover) 5%, transparent)'
        : 'var(--nui-body-color)'
    }"
  >
    <ViewBox :isScrolled :scrollbar>
      <template #view>
        <slot name="view" />
      </template>
    </ViewBox>
    <VanTabs
      shrink
      swipeable
      sticky
      :offset-top="56 + safeHeightTop"
      background="var(--nui-card-color)"
      @scroll="({ isFixed }) => (isScrolled = isFixed)"
      class="not-full min-h-[70vh]!"
    >
      <VanTab
        class="van-hairline--top relative min-h-full bg-(--nui-card-color)"
        title="简介"
        name="info"
      >
        <div class="min-h-[60vh] w-full">
          <SubscribeList :page :union />
          <div class="mx-auto mt-2 w-[95%]">
            <div class="relative flex h-fit">
              <div class="relative w-[89%] text-[17px] font-medium">
                <AnimatePresence>
                  <motion.div
                    :initial="{ opacity: 0 }"
                    :exit="{ opacity: 0 }"
                    key="info"
                    :animate="{ opacity: 1 }"
                    v-if="!showTitleFull"
                    class="van-ellipsis absolute top-0 flex w-full flex-col"
                  >
                    <span @click="showTitleFull = !showTitleFull">
                      {{ union?.title }}
                    </span>
                    <Title />
                  </motion.div>
                </AnimatePresence>
                <NCollapseTransition :show="showTitleFull" class="w-[calc(100%+2rem)]!">
                  <span @click="showTitleFull = !showTitleFull" class="w-[calc(100%-2rem)]">
                    {{ union?.title }}
                  </span>
                  <Title />

                  <div
                    v-if="shortId"
                    class="mt-0.5 flex justify-start text-xs font-light text-(--van-text-color-2)"
                  >
                    <div class="mr-2">
                      {{ shortId }}
                    </div>
                  </div>

                  <Description :page :union />

                  <Tags :union />
                </NCollapseTransition>
              </div>
              <NIcon
                size="2rem"
                color="var(--van-text-color-3)"
                class="absolute -top-0.5 -right-1 transition-transform"
                :class="[showTitleFull && 'rotate-180!']"
                @click="showTitleFull = !showTitleFull"
              >
                <KeyboardArrowDownRound />
              </NIcon>
            </div>
            <Actions :page :union>
              <template #action="{ item, page }">
                <slot name="action" :item :page />
              </template>
            </Actions>
            <EpController :page :union :scrollbar />
          </div>
          <Recommends />
        </div>
      </VanTab>

      <VanTab class="van-hairline--top h-full!" title="评论" name="comment" v-if="union">
        <template #title>
          <span>评论</span>
          <span class="ml-0.5 text-xs! font-light">{{ union?.commentNumber ?? '' }}</span>
        </template>
        <Comment :fetchComments="page.fetchComments" :item="union" class="h-[calc(70vh-38px)]" />
      </VanTab>

      <slot name="tab" :="{ page }" />
      <Inject key="layout::layout::default.tab" :args="{ page }" />
    </VanTabs>
  </NScrollbar>
</template>
<style scoped lang="css">
.scroll::-webkit-scrollbar {
  display: none;
}

:deep(.van-tabs__wrap) {
  --van-tabs-line-height: 38px;
  height: var(--van-tabs-line-height) !important;
}
</style>
<style>
:root {
  --van-tabs-line-height: 38px !important;
}
</style>