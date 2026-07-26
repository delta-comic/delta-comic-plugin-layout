<script setup lang="ts">
import { uni } from '@delta-comic/model'
import { useConfig } from '@delta-comic/plugin'
import { createLoadingMessage, DcPopup } from '@delta-comic/ui'
import { useMutation } from '@pinia/colada'
import { isEmpty } from 'es-toolkit/compat'
import type { FieldInstance } from 'vant'
import { shallowRef } from 'vue'

import { createChildrenCommentQueryKey, createMainCommentQueryKey } from '.'

const config = useConfig()

const $props = defineProps<{
  class?: any
  aim: uni.item.Item | uni.comment.Comment
  item: uni.item.Item
}>()

const show = shallowRef(false)
const input = shallowRef('')
const inputEl = shallowRef<FieldInstance>()
const isSubmitting = shallowRef(false)

const { mutateAsync: submit } = useMutation({
  key: () => [
    uni.item.Item.is($props.aim)
      ? createMainCommentQueryKey(
          $props.aim.id,
          uni.content.ContentPage.contentPages.key.toString($props.aim.contentType)
        )
      : createChildrenCommentQueryKey(
          $props.item.id,
          $props.aim.id,
          uni.content.ContentPage.contentPages.key.toString($props.item.contentType)
        )
  ],
  async mutation({ content }: { content: string }) {
    if (isEmpty(content)) return window.$message.info('评论内容不能为空')
    isSubmitting.value = true
    const loading = createLoadingMessage('发送中')
    try {
      await loading.bind($props.aim.sendComment(input.value))
    } finally {
      show.value = false
      input.value = ''
      isSubmitting.value = false
    }
  }
})
</script>

<template>
  <DcPopup v-model:show="show" position="bottom" class="w-full bg-(--van-background-2) pb-1" round>
    <VanField
      type="textarea"
      class="min-h-[30vh] w-full"
      autosize
      v-model="input"
      placeholder="写下你的留言吧..."
      @click="inputEl?.focus()"
      ref="inputEl"
      :disabled="isSubmitting"
    />
    <div class="mt-1 flex h-8 w-full items-center justify-end pr-1">
      <NButton round type="primary" :loading="isSubmitting" @click="submit({ content: input })">
        提交
      </NButton>
    </div>
  </DcPopup>

  <div
    class="van-hairline--top flex h-10 w-full items-center justify-center bg-(--van-background-2)"
    :class
    @click="
      async () => {
        if (!item.commentSendable) return
        show = true
        await $nextTick()
        inputEl?.focus()
      }
    "
  >
    <div
      :class="[config.isDark ? 'bg-[#333] text-[#666]' : 'bg-gray-100 text-gray-300']"
      class="van-ellipsis flex h-[80%] w-[90%] items-center rounded-full px-2 text-xs!"
    >
      <template v-if="item.commentSendable">
        {{ input || '写下你的留言吧...' }}
      </template>
      <template v-else> 评论区已关闭(不可用) </template>
    </div>
  </div>
</template>