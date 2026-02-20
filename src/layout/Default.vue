<script setup lang="ts">
import { LikeFilled } from '@vicons/antd'
import {
  ArrowBackRound,
  ArrowForwardIosOutlined,
  FolderOutlined,
  FullscreenRound,
  KeyboardArrowDownRound,
  PlayArrowRound,
  PlusRound,
  ReportGmailerrorredRound
} from '@vicons/material'
import { computedAsync, createReusableTemplate, useCssVar } from '@vueuse/core'
import { AnimatePresence, motion } from 'motion-v'
import { computed, shallowRef, useTemplateRef, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sortBy } from 'es-toolkit/compat'
import { PopoverAction } from 'vant'
import { isString } from 'es-toolkit'
import DOMPurify from 'dompurify'
import { SharedFunction, useFullscreen } from '@delta-comic/core'
import { PromiseContent, uni } from '@delta-comic/model'
import { createLoadingMessage } from '@delta-comic/ui'
import { SmartAbortController } from '@delta-comic/request'
import { useConfig, Global, Inject } from '@delta-comic/plugin'
import { db, SubscribeDB } from '@delta-comic/db'
import { createDateString } from '@/utils/date'
import ItemCard from '@/components/ItemCard.vue'
import FavouriteSelect from '@/components/FavouriteSelect.vue'
import Comment from '@/components/comment/Comment.vue'
import type * as LayoutInject from './default'

defineSlots<{
  subscribeRow(args: LayoutInject.SubscribeRowProps): any
  action(args: LayoutInject.ContentProps): any
  description(args: LayoutInject.ContentProps): any
  recommend(args: LayoutInject.ContentProps): any
  tab(args: LayoutInject.TabProps): any
  view(): any
}>()

const $router = useRouter()
const $route = useRoute()
const $props = defineProps<{ page: uni.content.ContentPage; isR18g?: boolean }>()

const fullscreen = useFullscreen()
const setFullscreen = async (isFull: boolean) => (isFull ? fullscreen.entry() : fullscreen.exit())

const union = computed(() => $props.page.union.value!)
const showTitleFull = shallowRef(false)
const [TitleDefine, Title] = createReusableTemplate()
const isScrolled = shallowRef(false)

const scrollbar = useTemplateRef('scrollbar')
const epSelList = useTemplateRef('epSelList')
const isShowEpSelectPopup = shallowRef(false)
const eps = computedAsync(
  async () => sortBy(await $props.page.eps.content, v => Number(v.index)),
  []
)
const nowEpId = $route.params.ep.toString()
const nowEp = computed(() => eps.value.find(ep => ep.index === nowEpId))
const nowEpIndex = computed(() => eps.value.findIndex(ep => ep.index === nowEpId))
const openEpSelectPopup = async () => {
  scrollbar.value?.scrollTo(0, 0)
  isShowEpSelectPopup.value = true
  await nextTick()
  epSelList.value?.listInstance?.scrollTo({
    index: eps.value.findIndex(ep => ep.index === nowEpId)
  })
}
const safeHeightTopCss = useCssVar('--safe-area-inset-top')
const safeHeightTop = computed(() => Number(safeHeightTopCss.value?.match(/\d+/)?.[0]))
const getItemCard = (contentType: uni.content.ContentType_) =>
  uni.item.Item.itemCard.get(contentType) ?? ItemCard

const handleChick = (preload: uni.item.RawItem) =>
  SharedFunction.call(
    'routeToContent',
    preload.contentType,
    preload.id,
    preload.thisEp.index,
    uni.item.Item.create(preload)
  )
const isLiked = shallowRef(union.value?.isLiked ?? false)
const likeSignal = new SmartAbortController()
const handleLike = async () => {
  likeSignal.abort()
  try {
    union.value.like(likeSignal.signal).then(v => (isLiked.value = v))
  } catch (error) {
    console.error('liked fail')
  }
}

const contentSource = PromiseContent.withResolvers<uni.item.Item>(true)
watch(
  $props.page.union,
  union => {
    if (!union) return
    console.log('resolve', union)
    contentSource.resolve(union)
  },
  { immediate: true }
)

$props.page.detail.content.onError(err => {
  console.error('resolve catch', err)
  contentSource.reset(false)
  contentSource.reject(err)
})
$props.page.detail.content.onSuccess(data => {
  console.log('resolve then', $props.page.preload.value)
  contentSource.reset(false)
  contentSource.resolve(data)
})

const config = useConfig()

const [DefineAvatar, Avatar] = createReusableTemplate<{ author: uni.item.Author }>()

const getActionInfo = (key: string) => Global.userActions.get([union.value.$$plugin, key])!

const getIsSubscribe = (author: uni.item.Author) =>
  db.value
    .selectFrom('subscribe')
    .where('key', '=', `${author.$$plugin}:${author.label}`)
    .selectAll()
    .execute()
    .then(v => v.length != 0)

const showDetailUsers = shallowRef(false)

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

const [DefineSubscribeRow, SubscribeRow] = createReusableTemplate<{
  author: uni.item.Author
  class?: any
}>()

const [DefineSubscribeSmallRow, SubscribeSmallRow] = createReusableTemplate<{
  author: uni.item.Author
  class?: any
}>()
</script>

<template>
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

  <DefineSubscribeRow v-slot="{ author, class: className }">
    <div class="relative w-full" :class="className">
      <Avatar :author />
      <DcAwait :promise="() => getIsSubscribe(author)" v-slot="{ result: isSubscribe }">
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
      </DcAwait>
    </div>
  </DefineSubscribeRow>

  <DefineSubscribeSmallRow v-slot="{ author, class: className }">
    <div class="relative w-full" :class="className">
      <Avatar :author />
      <DcAwait :promise="() => getIsSubscribe(author)" v-slot="{ result: isSubscribe }">
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
      </DcAwait>
    </div>
  </DefineSubscribeSmallRow>

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
      <Teleport to="#cover" :disabled="!fullscreen.isFullscreen.value">
        <slot name="view" />
      </Teleport>
      <VanRow class="pointer-events-none absolute bottom-0 z-2 w-full">
        <VanCol span="1" offset="21">
          <NButton
            class="pointer-events-auto text-3xl!"
            @click="setFullscreen(true)"
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
        <DcContent
          :source="contentSource.content"
          retriable
          @reset-retry="$props.page.reloadAll"
          class="min-h-[60vh]"
        >
          <div
            class="relative mt-3 flex items-center pb-2 text-nowrap"
            v-if="(union?.author.length ?? 0) > 1"
            @click="showDetailUsers = true"
          >
            <span class="ml-3 font-bold">创作团队</span>
            <span class="absolute right-3 text-(--van-text-color-2)"
              >共{{ union?.author.length }}位</span
            >
            <DcPopup v-model:show="showDetailUsers" position="bottom" round class="h-[50vh]">
              <SubscribeRow
                :author
                v-for="author of union.author"
                class="van-hairline--bottom py-2"
              />
            </DcPopup>
          </div>
          <div
            class="flex items-center overflow-x-auto text-nowrap"
            @pointerdown.stop
            @click.stop
            @pointermove.stop
          >
            <SubscribeRow
              :author="union.author[0]"
              v-if="union?.author.length === 1"
              class="mt-3"
            />
            <div v-else class="scroll flex overflow-x-scroll overflow-y-hidden" @click.stop>
              <SubscribeSmallRow
                class="flex items-center gap-3 text-nowrap"
                :author
                v-for="author of union?.author"
              />
            </div>
          </div>
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
                    class="mt-0.5 flex justify-start text-xs font-light text-(--van-text-color-2)"
                  >
                    <div class="mr-2">
                      {{ page.pid.content.data.value }}
                    </div>
                  </div>
                  <DcText
                    :text="union.description"
                    v-if="isString(union?.description)"
                    class="mt-1 justify-start text-xs font-normal text-(--van-text-color-2)"
                  >
                  </DcText>
                  <DcText
                    :text="union.description.content"
                    v-else-if="union?.description?.type == 'text'"
                    class="mt-1 justify-start text-xs font-normal text-(--van-text-color-2)"
                  >
                  </DcText>
                  <div
                    v-html="DOMPurify.sanitize(union?.description?.content ?? '')"
                    v-else
                    class="mt-1 max-w-full justify-start text-xs font-normal text-(--van-text-color-2)"
                  ></div>

                  <slot name="description" :="{ page, item: union }" />
                  <Inject key="layout::layout::default.description" :args="{ page, item: union }" />

                  <div
                    class="flex w-full flex-col"
                    v-for="[name, categories] of Object.entries(
                      Object.groupBy(union?.categories ?? [], v => v.group)
                    )"
                  >
                    <NDivider
                      class="my-1! text-xs! text-(--van-gray-7)! **:font-light!"
                      title-placement="left"
                    >
                      {{ name }}
                    </NDivider>
                    <div class="flex flex-wrap gap-2.5 *:px-3! **:text-xs!">
                      <NButton
                        tertiary
                        round
                        type="tertiary"
                        size="small"
                        v-for="category of categories
                          ?.toSorted((a, b) => b.name.length - a.name.length)
                          .filter(Boolean)"
                        @click="
                          SharedFunction.call(
                            'routeToSearch',
                            category.search.keyword,
                            [page.plugin, category.search.source],
                            category.search.sort
                          )
                        "
                      >
                        {{ category.name }}
                      </NButton>
                    </div>
                  </div>
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
            <!-- action bar -->
            <div class="mt-8 mb-4 flex justify-around" v-if="union">
              <DcToggleIcon
                padding
                size="27px"
                v-model="isLiked"
                @click="handleLike"
                :icon="LikeFilled"
              >
                {{ (union.likeNumber ?? 0) + (isLiked ? 1 : 0) || '喜欢' }}
              </DcToggleIcon>
              <DcToggleIcon padding size="27px" :icon="FolderOutlined" dis-changed>
                缓存
              </DcToggleIcon>
              <DcToggleIcon padding size="27px" dis-changed :icon="ReportGmailerrorredRound">
                举报
              </DcToggleIcon>
              <FavouriteSelect :item="union" />
              <ShareButton :page />

              <slot name="action" :="{ page, item: union }" />
              <Inject key="layout::layout::default.action" :args="{ page, item: union }" />
            </div>
            <!-- ep select -->
            <div
              class="van-haptics-feedback relative mb-4 flex w-full items-center rounded py-2 pl-3"
              :class="[
                isR18g
                  ? config.isDark
                    ? ''
                    : 'bg-(--van-gray-1)/70'
                  : config.isDark
                    ? 'bg-(--van-gray-8)'
                    : 'bg-(--van-gray-2)'
              ]"
              v-if="eps && eps.length > 1"
              @click="openEpSelectPopup"
            >
              <span>选集</span>
              <span class="mx-0.5">·</span>
              <span class="van-ellipsis max-w-1/2">{{
                nowEp?.name || `第${nowEpIndex + 1}话`
              }}</span>
              <span class="absolute right-2 flex items-center text-xs text-(--van-text-color-2)">
                <span>{{ nowEpIndex + 1 }}/{{ eps.length }}</span>
                <NIcon size="12px" class="ml-1">
                  <ArrowForwardIosOutlined />
                </NIcon>
              </span>
            </div>
            <DcPopup
              round
              position="bottom"
              class="flex h-[70vh] flex-col"
              v-model:show="isShowEpSelectPopup"
            >
              <div class="flex h-10 w-full items-center pt-2 pl-8 text-lg font-bold">选集</div>
              <DcList
                class="h-full w-full"
                :source="{ data: PromiseContent.resolve(eps), isEnd: true }"
                :itemHeight="40"
                v-slot="{ data: { item: ep, index }, height }"
                ref="epSelList"
              >
                <VanCell
                  clickable
                  @click="handleChick({ ...union.toJSON(), thisEp: ep.toJSON() })"
                  :title="ep.name || `第${index + 1}话`"
                  :title-class="[nowEpId === ep.index && 'font-bold text-(--p-color)!']"
                  class="flex w-full items-center"
                  :style="{ height: `${height}px !important` }"
                >
                </VanCell>
              </DcList>
            </DcPopup>
          </div>
          <!-- recommend -->
          <div class="van-hairline--top w-full *:bg-transparent">
            <slot name="recommend" :="{ page, item: union }" />
            <Inject key="layout::layout::default.recommend" :args="{ page, item: union }" />
            <component
              :is="getItemCard(item.contentType)"
              :item
              v-for="item of page.recommends.content.data.value"
            />
          </div>
        </DcContent>
      </VanTab>

      <VanTab class="van-hairline--top h-full!" title="评论" name="comment">
        <template #title>
          <span>评论</span>
          <span class="ml-0.5 text-xs! font-light">{{ union?.commentNumber ?? '' }}</span>
        </template>
        <Comment :comments="page.comments" :item="union" class="h-[calc(70vh-38px)]" />
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