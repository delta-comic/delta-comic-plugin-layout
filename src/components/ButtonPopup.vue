<script setup lang="ts">
import type { DcPopup } from '@delta-comic/ui'
import type { PopupProps } from 'vant'
import { shallowRef } from 'vue'
const $props = withDefaults(defineProps<Partial<PopupProps> & { class: any }>(), {
  position: 'bottom',
  round: true,
  overlay: true,
  closeOnClickOverlay: true
})
const isShow = shallowRef(false)
defineSlots<{ button(): void; default(): void }>()
</script>

<template>
  <div @click="isShow = true">
    <slot name="button" @click="isShow = true" />
  </div>
  <DcPopup :="$props" :class="[$props.class]" v-model:show="isShow">
    <slot></slot>
  </DcPopup>
</template>