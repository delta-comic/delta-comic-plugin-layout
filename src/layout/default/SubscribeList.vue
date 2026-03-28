<script setup lang="ts"></script>

<template>
  <div
    class="relative mt-3 flex items-center pb-2 text-nowrap"
    v-if="(union?.author.length ?? 0) > 1"
    @click="showDetailUsers = true"
  >
    <span class="ml-3 font-bold">创作团队</span>
    <span class="absolute right-3 text-(--van-text-color-2)">共{{ union?.author.length }}位</span>
    <DcPopup v-model:show="showDetailUsers" position="bottom" round class="h-[50vh]">
      <SubscribeRow :author v-for="author of union.author" class="van-hairline--bottom py-2" />
    </DcPopup>
  </div>
  <div
    class="flex items-center overflow-x-auto text-nowrap"
    @pointerdown.stop
    @click.stop
    @pointermove.stop
  >
    <SubscribeRow :author="union.author[0]" v-if="union?.author.length === 1" class="mt-3" />
    <div v-else class="scroll flex overflow-x-scroll overflow-y-hidden" @click.stop>
      <SubscribeSmallRow
        class="flex items-center gap-3 text-nowrap"
        :author
        v-for="author of union?.author"
      />
    </div>
  </div>
</template>