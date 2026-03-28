<script setup lang="ts"></script>

<template>
  <div
    class="van-haptics-feedback relative mb-4 flex w-full items-center rounded py-2 pl-3"
    :class="[
      isR18g
        ? config.isDark
          ? ''
          : 'bg-(--van-gray-1)/70'
        : config.isDark
          ? 'bg-(--van-gray-8)'
          : 'bg-(--van-gray-2)'
    ]"
    v-if="eps && eps.length > 1"
    @click="openEpSelectPopup"
  >
    <span>选集</span>
    <span class="mx-0.5">·</span>
    <span class="van-ellipsis max-w-1/2">{{ nowEp?.name || `第${nowEpIndex + 1}话` }}</span>
    <span class="absolute right-2 flex items-center text-xs text-(--van-text-color-2)">
      <span>{{ nowEpIndex + 1 }}/{{ eps.length }}</span>
      <NIcon size="12px" class="ml-1">
        <ArrowForwardIosOutlined />
      </NIcon>
    </span>
  </div>
  <DcPopup
    round
    position="bottom"
    class="flex h-[70vh] flex-col"
    v-model:show="isShowEpSelectPopup"
  >
    <div class="flex h-10 w-full items-center pt-2 pl-8 text-lg font-bold">选集</div>
    <DcList
      class="h-full w-full"
      :source="{ data: PromiseContent.resolve(eps), isEnd: true }"
      :itemHeight="40"
      v-slot="{ data: { item: ep, index }, height }"
      ref="epSelList"
    >
      <VanCell
        clickable
        @click="routeToContent({ ...union.toJSON(), thisEp: ep.toJSON() })"
        :title="ep.name || `第${index + 1}话`"
        :title-class="[nowEpId === ep.index && 'font-bold text-(--p-color)!']"
        class="flex w-full items-center"
        :style="{ height: `${height}px !important` }"
      >
      </VanCell>
    </DcList>
  </DcPopup>
</template>