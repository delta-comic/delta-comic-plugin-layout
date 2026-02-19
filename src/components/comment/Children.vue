<script setup lang="ts">
import { uni } from '@delta-comic/model'
import { DcPopup, DcWaterfall } from '@delta-comic/ui'
import { computed, shallowRef } from 'vue'
import Sender from './Sender.vue'
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
    <DcWaterfall
      :source="parentComment.children"
      :padding="0"
      :col="1"
      :gap="0"
      v-if="parentComment"
      v-slot="{ item: comment }"
      class="h-[calc(100%-40px)]! bg-(--van-background)"
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