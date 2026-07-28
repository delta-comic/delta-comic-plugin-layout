<script setup lang="ts">
import {
  UniComment,
  UniContentPage,
  type StreamQuery,
  type UniItem,
  type UniUser,
} from '@delta-comic/model'
import type { PageKey } from '@delta-comic/model'
import { DcWaterfall } from '@delta-comic/ui'
import { useInfiniteQuery } from '@pinia/colada'
import { computed, type HTMLAttributes, useTemplateRef } from 'vue'

import type { StreamPage } from '@/utils/query'

import PreviewUser from '../user/PreviewUser.vue'

import Children from './Children.vue'
import DefaultCommentRow from './CommentRow.vue'
import Sender from './Sender.vue'

import { createMainCommentQueryKey, QueryKey } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  fetchComments: StreamQuery<UniComment>
  item: UniItem
}>()
const commentRow = computed(
  () => UniComment.commentRow.get(props.item.contentType) ?? DefaultCommentRow,
)
const children = useTemplateRef<InstanceType<typeof Children>>('children')
const previewUser = useTemplateRef<InstanceType<typeof PreviewUser>>('previewUser')

const query = useInfiniteQuery<StreamPage<UniComment>, Error, PageKey>({
  getNextPageParam: page => page.nextPage,
  getPreviousPageParam: page => page.lastPage,
  initialPageParam: () => props.fetchComments.initPage,
  key: () => [
    QueryKey.MainComment,
    createMainCommentQueryKey(
      props.item.id,
      props.item.thisEp.id,
      UniContentPage.contentPages.key.toString(props.item.contentType),
    ),
  ],
  query: async ({ pageParam, signal }) => await props.fetchComments.query({}, pageParam, signal),
})

const showUser = (user: UniUser) => previewUser.value?.show(user)
</script>

<template>
  <div class="flex w-full flex-col overflow-hidden bg-(--dc-color-page)" :class="$props.class">
    <DcWaterfall
      class="min-h-0 flex-1"
      :col="1"
      :gap="0"
      :padding="0"
      :source="{ type: 'stream', value: query }"
      v-slot="{ item: comment }"
    >
      <component
        :is="commentRow"
        :comment
        :item
        @click="children?.loadChild(comment)"
        @click-user="showUser"
      />
    </DcWaterfall>
    <Sender :aim="item" :item />
  </div>
  <Children :item ref="children" @user="showUser" />
  <PreviewUser ref="previewUser" />
</template>