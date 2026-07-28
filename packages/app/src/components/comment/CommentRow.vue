<script setup lang="ts">
import type { UniComment, UniItem, UniUser } from '@delta-comic/model'
import { createLoadingMessage, DcEnvironment, DcImage, DcToggleIcon } from '@delta-comic/ui'
import { LikeOutlined } from '@vicons/antd'
import { ArrowForwardIosRound, ChatBubbleOutlineRound, NearbyErrorRound } from '@vicons/material'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
import { NButton, NEllipsis, NIcon, NPopconfirm, NTag, useMessage } from 'naive-ui'
import { computed, shallowRef } from 'vue'

import userIcon from '@/assets/images/userIcon.webp?url'
import { translate } from '@/i18n'
import { createDateString } from '@/utils/date'

import type { CommentProps } from '.'

const props = defineProps<{
  comment: UniComment
  item: UniItem
  parentComment?: UniComment
  usernameHighlight?: boolean
}>()
const emit = defineEmits<{ click: [comment: UniComment]; clickUser: [user: UniUser] }>()

defineSlots<{
  action(args: CommentProps): unknown
  avatar(args: CommentProps): unknown
  description(args: CommentProps): unknown
  reply(args: CommentProps): unknown
  userExtra(args: CommentProps): unknown
}>()

const environmentArgs = computed<CommentProps>(() => ({
  comment: props.comment,
  item: props.item,
  parentComment: props.parentComment,
  usernameHighlight: props.usernameHighlight,
}))
const isParentSender = computed(
  () =>
    props.comment.sender.id === props.parentComment?.sender.id &&
    props.comment.sender.$$plugin === props.parentComment.sender.$$plugin,
)
const dateLabels = computed(() => ({
  differentYearFormat: translate('layout.date.differentYearFormat'),
  sameYearFormat: translate('layout.date.sameYearFormat'),
  todayFormat: translate('layout.date.todayFormat'),
  yesterdayFormat: translate('layout.date.yesterdayFormat'),
}))
const liking = shallowRef(false)
const message = useMessage()

const toggleLike = async () => {
  if (liking.value) return
  liking.value = true
  const previous = props.comment.isLiked
  try {
    const result = await props.comment.like()
    const next = typeof result === 'boolean' ? result : !previous
    props.comment.isLiked = next
    if (next !== previous)
      props.comment.likeCount = Math.max(0, props.comment.likeCount + (next ? 1 : -1))
  } catch (error) {
    message.error(error instanceof Error ? error.message : String(error))
  } finally {
    liking.value = false
  }
}

const report = async () => {
  await createLoadingMessage().bind(props.comment.report())
  props.comment.reported = true
}
</script>

<template>
  <article
    class="dc-hairline-bottom relative flex bg-(--dc-color-surface) pb-1 text-(--dc-color-text)"
    @click="emit('click', comment)"
  >
    <div class="flex w-1/6 shrink-0 items-start justify-center">
      <div @click.stop>
        <DcImage
          class="mt-2 size-10"
          :fallback="userIcon"
          fit="cover"
          round
          :src="comment.sender.avatar ?? userIcon"
          @click="emit('clickUser', comment.sender)"
        />
        <slot name="avatar" v-bind="environmentArgs" />
        <DcEnvironment
          :args="environmentArgs"
          name="layout::components::comment::comment-row.avatar"
        />
      </div>
    </div>
    <div class="relative mr-3 ml-1 flex min-w-0 flex-1 flex-col">
      <button
        class="mt-2 mb-2 flex flex-col border-0 bg-transparent p-0 text-left"
        type="button"
        @click.stop="emit('clickUser', comment.sender)"
      >
        <span
          class="text-sm"
          :class="
            usernameHighlight || isParentSender
              ? 'font-bold text-(--dc-color-primary)'
              : 'text-(--dc-color-text)'
          "
        >
          {{ comment.sender.name ?? '' }}
          <NTag v-if="isParentSender" class="ml-1" size="tiny" type="primary">
            {{ translate('layout.comment.owner') }}
          </NTag>
          <slot name="userExtra" v-bind="environmentArgs" />
          <DcEnvironment
            :args="environmentArgs"
            name="layout::components::comment::comment-row.userExtra"
          />
        </span>
        <span class="text-[11px] text-(--dc-color-text-secondary)">
          {{ createDateString(dayjs(comment.time), dateLabels) }}
        </span>
      </button>

      <p v-if="comment.reported" class="m-0 text-(--dc-color-text-secondary)">
        {{ translate('layout.comment.reported') }}
      </p>
      <div v-else>
        <NTag v-if="comment.isTop" class="mr-1" size="small" type="primary">
          {{ translate('layout.comment.top') }}
        </NTag>
        <NEllipsis
          v-if="comment.content.type === 'string'"
          class="align-top"
          expand-trigger="click"
          :line-clamp="3"
          :tooltip="false"
        >
          {{ comment.content.text }}
        </NEllipsis>
        <div v-else v-html="DOMPurify.sanitize(comment.content.text)" />

        <slot name="description" v-bind="environmentArgs" />
        <DcEnvironment
          :args="environmentArgs"
          name="layout::components::comment::comment-row.description"
        />
      </div>

      <div class="mt-2 mb-1 -ml-0.5 flex gap-3" @click.stop>
        <DcToggleIcon
          :disabled="liking"
          :icon="LikeOutlined"
          :model-value="comment.isLiked"
          row-mode
          size="16px"
          @click="toggleLike"
        >
          {{ comment.likeCount || '' }}
        </DcToggleIcon>
        <DcToggleIcon
          class="font-bold"
          dis-changed
          :icon="ChatBubbleOutlineRound"
          row-mode
          size="16px"
        >
          {{ comment.childrenCount || '' }}
        </DcToggleIcon>
        <NPopconfirm :positive-text="translate('layout.actions.confirm')" @positive-click="report">
          <template #trigger>
            <NButton text>
              <template #icon
                ><NIcon size="16px"><NearbyErrorRound /></NIcon
              ></template>
            </NButton>
          </template>
          {{ translate('layout.comment.reportPrompt') }}
        </NPopconfirm>

        <slot name="action" v-bind="environmentArgs" />
        <DcEnvironment
          :args="environmentArgs"
          name="layout::components::comment::comment-row.action"
        />
      </div>

      <div
        v-if="comment.childrenCount > 0 && !isParentSender"
        class="pointer-events-none mt-1 mb-3 flex h-9 w-full items-center rounded bg-(--dc-gray-1) text-(--dc-color-primary)"
      >
        <span class="ml-2 text-[13px]">
          {{ translate('layout.comment.replies', { count: comment.childrenCount }) }}
        </span>
        <NIcon class="ml-1" size="11px"><ArrowForwardIosRound /></NIcon>
        <slot name="reply" v-bind="environmentArgs" />
        <DcEnvironment
          :args="environmentArgs"
          name="layout::components::comment::comment-row.reply"
        />
      </div>
    </div>
  </article>
</template>