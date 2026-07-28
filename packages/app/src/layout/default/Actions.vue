<script setup lang="ts">
import type { UniContentPage, UniItem } from '@delta-comic/model'
import { createLoadingMessage, DcEnvironment, DcToggleIcon } from '@delta-comic/ui'
import { LikeFilled } from '@vicons/antd'
import { ReportGmailerrorredRound } from '@vicons/material'
import { NPopconfirm } from 'naive-ui'

import FavouriteSelect from '@/components/FavouriteSelect.vue'
import ShareButton from '@/components/ShareButton.vue'
import { translate } from '@/i18n'
import { useLike } from '@/utils/content'

const props = defineProps<{ page: UniContentPage; union?: UniItem }>()
defineSlots<{ action(args: { item: UniItem; page: UniContentPage }): unknown }>()

const { likeItem } = useLike()
const report = async () => {
  if (!props.union) return
  await createLoadingMessage().bind(props.union.report())
}
</script>

<template>
  <div v-if="union" class="mt-8 mb-4 flex flex-wrap justify-around gap-3">
    <DcToggleIcon
      :icon="LikeFilled"
      :model-value="union.isLiked"
      padding
      size="27px"
      @click="likeItem(union)"
    >
      {{ union.likeNumber || translate('layout.actions.like') }}
    </DcToggleIcon>
    <NPopconfirm :positive-text="translate('layout.actions.confirm')" @positive-click="report">
      <template #trigger>
        <DcToggleIcon dis-changed :icon="ReportGmailerrorredRound" padding size="27px">
          {{ translate('layout.actions.report') }}
        </DcToggleIcon>
      </template>
      {{ translate('layout.content.reportPrompt') }}
    </NPopconfirm>
    <FavouriteSelect :item="union" />
    <ShareButton :page />

    <slot name="action" :item="union" :page />
    <DcEnvironment :args="{ item: union, page }" name="layout::layout::default.action" />
  </div>
</template>