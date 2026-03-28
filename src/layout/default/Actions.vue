<script setup lang="ts"></script>

<template>
  <div class="mt-8 mb-4 flex justify-around" v-if="union">
    <DcToggleIcon padding size="27px" v-model="isLiked" @click="handleLike" :icon="LikeFilled">
      {{ (union.likeNumber ?? 0) + (isLiked ? 1 : 0) || '喜欢' }}
    </DcToggleIcon>
    <DcToggleIcon padding size="27px" :icon="FolderOutlined" dis-changed> 缓存 </DcToggleIcon>
    <DcToggleIcon padding size="27px" dis-changed :icon="ReportGmailerrorredRound">
      举报
    </DcToggleIcon>
    <FavouriteSelect :item="union" />
    <ShareButton :page />

    <slot name="action" :="{ page, item: union }" />
    <Inject key="layout::layout::default.action" :args="{ page, item: union }" />
  </div>
</template>