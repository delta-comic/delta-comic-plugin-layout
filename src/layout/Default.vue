<script setup lang="ts">
import Comment from '@/components/comment/Comment.vue'
import ItemCard from '@/components/ItemCard.vue'
import { createDateString } from '@/utils/date'

import * as LayoutInject from './default'

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

const getItemCard = (contentType: uni.content.ContentType_) =>
  uni.item.Item.itemCard.get(contentType) ?? ItemCard

const isLiked = shallowRef(union.value?.isLiked ?? false)
const likeSignal = new SmartAbortController()
const handleLike = async () => {
  likeSignal.abort()
  try {
    union.value?.like(likeSignal.signal).then(v => (isLiked.value = v))
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
    <ViewBox />
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
          <SubscribeList />
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

                  <Description />

                  <Tags />
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
            <Actions />
            <EpController />
          </div>
          <Recommends />
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