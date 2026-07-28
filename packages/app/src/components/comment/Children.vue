<script setup lang="ts">
import {
  type PageKey,
  UniComment,
  UniContentPage,
  type UniItem,
  type UniUser,
} from '@delta-comic/model'
import { DcWaterfall } from '@delta-comic/ui'
import { useInfiniteQuery } from '@pinia/colada'
import { CloseRound } from '@vicons/material'
import { NButton, NDrawer, NDrawerContent, NIcon } from 'naive-ui'
import { computed, shallowRef } from 'vue'

import { translate } from '@/i18n'
import type { StreamPage } from '@/utils/query'

import DefaultCommentRow from './CommentRow.vue'
import Sender from './Sender.vue'

import { createChildrenCommentQueryKey, QueryKey } from '.'

const props = defineProps<{ item: UniItem }>()
const emit = defineEmits<{ user: [user: UniUser] }>()
const parentComment = shallowRef<UniComment>()
const show = shallowRef(false)

const commentRow = computed(
  () => UniComment.commentRow.get(props.item.contentType) ?? DefaultCommentRow,
)
const query = useInfiniteQuery<StreamPage<UniComment>, Error, PageKey>({
  enabled: () => parentComment.value !== undefined,
  getNextPageParam: page => page.nextPage,
  getPreviousPageParam: page => page.lastPage,
  initialPageParam: () => parentComment.value?.fetchChildren.initPage ?? 0,
  key: () => [
    QueryKey.ChildrenComment,
    createChildrenCommentQueryKey(
      props.item.id,
      parentComment.value?.id ?? 'unselected',
      props.item.thisEp.id,
      UniContentPage.contentPages.key.toString(props.item.contentType),
    ),
  ],
  query: async ({ pageParam, signal }) => {
    const parent = parentComment.value
    if (!parent) throw new Error('A parent comment is required')
    return await parent.fetchChildren.query({}, pageParam, signal)
  },
})

defineExpose({
  async loadChild(parent: UniComment) {
    parentComment.value = parent
    show.value = true
    await query.refresh()
  },
})
</script>

<template>
  <NDrawer v-model:show="show" height="80vh" :mask-closable="false" placement="bottom">
    <NDrawerContent :native-scrollbar="false">
      <template #header>
        <div class="flex w-full items-center justify-between">
          <span>{{ translate('layout.comment.detail') }}</span>
          <NButton circle quaternary @click="show = false">
            <template #icon
              ><NIcon><CloseRound /></NIcon
            ></template>
          </NButton>
        </div>
      </template>
      <div class="flex h-[70vh] flex-col overflow-hidden">
        <DcWaterfall
          v-if="parentComment"
          class="min-h-0 flex-1 bg-(--dc-color-page)"
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
            :parent-comment="parentComment"
            @click-user="emit('user', $event)"
          />
        </DcWaterfall>
        <Sender v-if="parentComment" :aim="parentComment" :item />
      </div>
    </NDrawerContent>
  </NDrawer>
</template>