<script setup lang="ts">
import { uni } from '@delta-comic/model'
import { Inject } from '@delta-comic/plugin'
import { LikeFilled } from '@vicons/antd'
import { FolderOutlined, ReportGmailerrorredRound } from '@vicons/material'

import FavouriteSelect from '@/components/FavouriteSelect.vue'
import { useLike } from '@/utils/content'

defineProps<{
  union?: uni.item.Item
  page: uni.content.ContentPage
}>()

const { mutate: likeItem } = useLike()
</script>

<template>
  <div class="mt-8 mb-4 flex justify-around" v-if="union">
    <DcToggleIcon
      padding
      size="27px"
      :modelValue="union.isLiked"
      @click="likeItem(union)"
      :icon="LikeFilled"
    >
      {{ (union.likeNumber ?? 0) || '喜欢' }}
    </DcToggleIcon>
    <DcToggleIcon padding size="27px" :icon="FolderOutlined" dis-changed> 缓存 </DcToggleIcon>
    <DcToggleIcon padding size="27px" disChanged :icon="ReportGmailerrorredRound">
      举报
    </DcToggleIcon>
    <FavouriteSelect :item="union" />
    <ShareButton :page />

    <slot name="action" :="{ page, item: union }" />
    <Inject key="layout::layout::default.action" :args="{ page, item: union }" />
  </div>
</template>