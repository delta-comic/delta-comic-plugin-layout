<script setup lang="ts"></script>

<template>
  <div class="van-hairline--top w-full *:bg-transparent">
    <slot name="recommend" :="{ page, item: union }" />
    <Inject key="layout::layout::default.recommend" :args="{ page, item: union }" />
    <component
      :is="getItemCard(item.contentType)"
      :item
      v-for="item of page.recommends.content.data.value"
    />
  </div>
</template>