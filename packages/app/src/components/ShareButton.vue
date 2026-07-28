<script setup lang="ts">
import type { UniContentPage } from '@delta-comic/model'
import { Global, type Share, translatePluginText } from '@delta-comic/plugin'
import { DcImagedIcon, DcToggleIcon } from '@delta-comic/ui'
import { ShareSharp } from '@vicons/material'
import { NButton, NDrawer, NDrawerContent } from 'naive-ui'
import { computed, shallowRef } from 'vue'

import { translate } from '@/i18n'

const props = defineProps<{ page: UniContentPage }>()
const show = shallowRef(false)
const methods = computed(() =>
  [...Global.share.entries()].filter(([, method]) => method.filter(props.page)),
)

const selectMethod = async (method: Share.InitiativeItem) => {
  show.value = false
  await method.call(props.page)
}
</script>

<template>
  <DcToggleIcon dis-changed :icon="ShareSharp" padding size="27px" @click="show = true">
    {{ translate('layout.actions.share') }}
  </DcToggleIcon>
  <NDrawer v-model:show="show" placement="bottom">
    <NDrawerContent :native-scrollbar="false" :title="translate('layout.share.title')">
      <div class="dc-scrollbar-hidden flex gap-3 overflow-x-auto px-1 py-4">
        <button
          v-for="[key, method] of methods"
          :key="key.toString()"
          class="flex min-w-20 dc-haptics-feedback flex-col items-center gap-1 border-0 bg-transparent"
          type="button"
          @click="selectMethod(method)"
        >
          <DcImagedIcon
            :bg-color="method.bgColor ?? 'var(--dc-gray-1)'"
            :icon="method.icon"
            :size-spacing="12"
          />
          <span class="dc-clamp-2 w-20 text-center text-xs text-(--dc-color-text-secondary)">
            {{ translatePluginText(method.name) }}
          </span>
        </button>
      </div>
      <template #footer>
        <NButton block size="large" @click="show = false">
          {{ translate('layout.actions.cancel') }}
        </NButton>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>