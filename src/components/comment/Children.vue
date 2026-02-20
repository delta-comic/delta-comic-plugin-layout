<script setup lang="ts">
import { uni } from '@delta-comic/model'
import { DcPopup, DcWaterfall } from '@delta-comic/ui'
import { computed, shallowRef } from 'vue'
import Sender from './Sender.vue'
import { CloseRound } from '@vicons/material'
const $props = defineProps<{ item: uni.item.Item }>()
const parentComment = shallowRef<uni.comment.Comment>()

const isShowPopup = shallowRef(false)
defineExpose({
  loadChild(parent: uni.comment.Comment) {
    parentComment.value = parent
    isShowPopup.value = true
  }
})
defineEmits<{ user: [u: uni.user.User] }>()
const CommentRow = computed(() => uni.comment.Comment.commentRow.get($props.item.contentType))
</script>

<template>
  <DcPopup
    v-model:show="isShowPopup"
    position="bottom"
    lock-scroll
    ref="floatPopup"
    :overlay="false"
    class="h-[70vh] **:overflow-x-hidden"
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
      :source="parentComment.children"
      :padding="0"
      :col="1"
      :gap="0"
      v-if="parentComment"
      v-slot="{ item: comment }"
      class="h-[calc(100%-40px-36px)]! bg-(--van-background)"
      :data-processor="v => (parentComment ? [parentComment, ...v] : v)"
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
  </DcPopup>
</template>