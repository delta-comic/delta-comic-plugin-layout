<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import _CommentRow from './CommentRow.vue'
import { uni, type RStream } from '@delta-comic/model'
import { DcWaterfall } from '@delta-comic/ui'
import Children from './Children.vue'
import PreviewUser from '../user/previewUser.vue'

const $props = defineProps<{
  item: uni.item.Item
  comments: RStream<uni.comment.Comment>
  class?: any
}>()
const CommentRow = computed(
  () => uni.comment.Comment.commentRow.get($props.item.contentType) ?? _CommentRow
)

const children = useTemplateRef('children')

const previewUser = useTemplateRef('previewUser')
</script>

<template>
  <template v-if="item.commentSendable">
    <div class="w-full overflow-hidden bg-(--van-background)" :class="$props.class ?? 'non-height'">
      <DcWaterfall
        :source="comments"
        ref="waterfall"
        class="h-[calc(100%-40px)]!"
        v-slot="{ item: comment }"
        :col="1"
        :gap="0"
        :padding="0"
      >
        <component
          :is="CommentRow"
          :comment
          :item
          @clickUser="(user: uni.user.User) => previewUser?.show(user)"
          @click="children?.loadChild(comment)"
        />
      </DcWaterfall>
      <Sender :item :aim="item" />
    </div>
    <Children :item ref="children" @user="user => previewUser?.show(user)" />
  </template>
  <div
    v-else
    class="h-[calc(70vh-var(--van-tabs-line-height))] w-full pt-2 text-center text-(--van-text-color-2)"
  >
    评论区已关闭
  </div>
  <PreviewUser ref="previewUser" />
</template>