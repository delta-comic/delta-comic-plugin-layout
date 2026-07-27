<script setup lang="ts">
import { UniComment, UniContentPage, type UniItem, type UniUser } from '@delta-comic/model'
import { DcWaterfall } from '@delta-comic/ui'
import { useInfiniteQuery } from '@pinia/colada'
import { CloseRound } from '@vicons/material'
import { NDrawer } from 'naive-ui'
import { computed, shallowRef } from 'vue'

import Sender from './Sender.vue'

import { createChildrenCommentQueryKey, QueryKey } from '.'
const $props = defineProps<{ item: UniItem }>()
const parentComment = shallowRef<UniComment>()

const isShowPopup = shallowRef(false)
defineExpose({
  loadChild(parent: UniComment) {
    parentComment.value = parent
    isShowPopup.value = true
    query.refresh()
  },
})
defineEmits<{ user: [u: UniUser] }>()
const CommentRow = computed(() => UniComment.commentRow.get($props.item.contentType))

const query = useInfiniteQuery({
  enabled: () => !!parentComment.value,
  key: () => [
    QueryKey.ChildrenComment,
    createChildrenCommentQueryKey(
      $props.item.id,
      parentComment.value?.id ?? 'unknown',
      UniContentPage.contentPages.key.toString($props.item.contentType),
    ),
  ],
  query: async ({ signal, pageParam }) =>
    await parentComment.value!.fetchChildren.query({}, pageParam, signal),
  initialPageParam: parentComment.value!.fetchChildren.initPage,
  getNextPageParam: lastPage => lastPage.nextPage,
  getPreviousPageParam: lastPage => lastPage.lastPage,
})
</script>

<template>
  <NDrawer
    v-model:show="isShowPopup"
    placement="bottom"
    blockScroll
    ref="floatPopup"
    :maskClosable="false"
    class="h-[70vh] overflow-hidden"
  >
    <div class="van-hairline--bottom relative flex h-9 w-full items-center pl-3 text-base">
      评论详情
      <NIcon
        class="absolute! right-3"
        size="22px"
        color="var(--van-text-color-2)"
        @click="isShowPopup = false"
      >
        <CloseRound />
      </NIcon>
    </div>
    <DcWaterfall
      :source="{ type: 'stream', value: query }"
      :padding="0"
      :col="1"
      :gap="0"
      v-if="parentComment"
      v-slot="{ item: comment }"
      class="h-[calc(70vh-40px-36px)]! bg-(--van-background)"
    >
      <component
        :is="CommentRow"
        :parentComment
        :comment
        :item
        @click-user="$emit('user', $event)"
      />
    </DcWaterfall>
    <Sender :item :aim="parentComment" v-if="parentComment" />
  </NDrawer>
</template>