<script setup lang="ts">
import { UniContentPage, UniItem, type UniComment } from '@delta-comic/model'
import { useMutation, useQueryCache } from '@pinia/colada'
import { isEmpty } from 'es-toolkit/compat'
import { NButton, NDrawer, NDrawerContent, NInput, type InputInst, useMessage } from 'naive-ui'
import { nextTick, shallowRef, type HTMLAttributes, useTemplateRef } from 'vue'

import { translate } from '@/i18n'

import { createChildrenCommentQueryKey, createMainCommentQueryKey, QueryKey } from '.'

const props = defineProps<{
  aim: UniComment | UniItem
  class?: HTMLAttributes['class']
  item: UniItem
}>()

const show = shallowRef(false)
const input = shallowRef('')
const inputElement = useTemplateRef<InputInst>('input')
const message = useMessage()
const queryCache = useQueryCache()

const queryKey = () =>
  UniItem.is(props.aim)
    ? [
        QueryKey.MainComment,
        createMainCommentQueryKey(
          props.aim.id,
          props.item.thisEp.id,
          UniContentPage.contentPages.key.toString(props.aim.contentType),
        ),
      ]
    : [
        QueryKey.ChildrenComment,
        createChildrenCommentQueryKey(
          props.item.id,
          props.aim.id,
          props.item.thisEp.id,
          UniContentPage.contentPages.key.toString(props.item.contentType),
        ),
      ]

const { isLoading, mutateAsync: submit } = useMutation({
  key: queryKey,
  mutation: async ({ content }: { content: string }) => {
    const normalizedContent = content.trim()
    if (isEmpty(normalizedContent)) {
      message.info(translate('layout.comment.empty'))
      return false
    }
    await props.aim.sendComment(normalizedContent)
    return true
  },
  onSuccess: async sent => {
    if (!sent) return
    input.value = ''
    show.value = false
    await queryCache.invalidateQueries({ key: queryKey() })
  },
})

const open = async () => {
  if (!props.item.commentSendable) return
  show.value = true
  await nextTick()
  inputElement.value?.focus()
}
</script>

<template>
  <NDrawer v-model:show="show" height="min(70vh, 32rem)" placement="bottom">
    <NDrawerContent :native-scrollbar="false" :title="translate('layout.comment.placeholder')">
      <NInput
        ref="input"
        v-model:value="input"
        :autosize="{ minRows: 5, maxRows: 12 }"
        :disabled="isLoading"
        :placeholder="translate('layout.comment.placeholder')"
        type="textarea"
      />
      <template #footer>
        <NButton
          :disabled="!input.trim()"
          :loading="isLoading"
          round
          type="primary"
          @click="submit({ content: input })"
        >
          {{ translate('layout.actions.submit') }}
        </NButton>
      </template>
    </NDrawerContent>
  </NDrawer>

  <button
    class="dc-hairline-top flex h-10 w-full items-center justify-center border-0 bg-(--dc-color-surface)"
    :class="$props.class"
    :disabled="!item.commentSendable"
    type="button"
    @click="open"
  >
    <span
      class="flex h-4/5 w-9/10 items-center dc-ellipsis rounded-full bg-(--dc-gray-1) px-3 text-xs text-(--dc-color-text-tertiary)"
    >
      {{
        item.commentSendable
          ? input || translate('layout.comment.placeholder')
          : translate('layout.comment.closedUnavailable')
      }}
    </span>
  </button>
</template>