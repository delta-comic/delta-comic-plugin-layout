<script setup lang="ts">
import type { DrawerPlacement } from 'naive-ui'
import { shallowRef, type HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    bodyClass?: HTMLAttributes['class']
    height?: number | string
    placement?: DrawerPlacement
    width?: number | string
  }>(),
  { height: '70vh', placement: 'bottom', width: 'min(88vw, 30rem)' },
)

const show = shallowRef(false)

defineSlots<{ button(): unknown; default(): unknown }>()
</script>

<template>
  <div class="contents" @click="show = true">
    <slot name="button" />
  </div>
  <NDrawer
    v-model:show="show"
    :height="props.placement === 'bottom' || props.placement === 'top' ? props.height : undefined"
    :placement="props.placement"
    :width="props.placement === 'left' || props.placement === 'right' ? props.width : undefined"
  >
    <NDrawerContent :native-scrollbar="false">
      <div class="h-full w-full" :class="props.bodyClass">
        <slot />
      </div>
    </NDrawerContent>
  </NDrawer>
</template>