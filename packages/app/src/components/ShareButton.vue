<script setup lang="ts">
import type { UniContentPage } from '@delta-comic/model'
import { type Social, translatePluginText, usePluginStore } from '@delta-comic/plugin'
import { DcImagedIcon, DcToggleIcon } from '@delta-comic/ui'
import { ShareSharp } from '@vicons/material'
import { NButton, NDrawer, NDrawerContent } from 'naive-ui'
import { computed, shallowRef } from 'vue'

import { translate } from '@/i18n'

const props = defineProps<{ page: UniContentPage }>()
const show = shallowRef(false)
const pluginStore = usePluginStore()
const methods = computed(() =>
  pluginStore
    .modelEntries('social')
    .flatMap(([plugin, social]) =>
      (social.share?.initiative ?? [])
        .filter(method => method.filter(props.page))
        .map(method => ({ id: `${plugin}:${method.key}`, method })),
    ),
)

const selectMethod = async (method: Social.InitiativeItem) => {
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
          v-for="entry of methods"
          :key="entry.id"
          class="flex min-w-20 dc-haptics-feedback flex-col items-center gap-1 border-0 bg-transparent"
          type="button"
          @click="selectMethod(entry.method)"
        >
          <DcImagedIcon
            :bg-color="entry.method.bgColor ?? 'var(--dc-gray-1)'"
            :icon="entry.method.icon"
            :size-spacing="12"
          />
          <span class="dc-clamp-2 w-20 text-center text-xs text-(--dc-color-text-secondary)">
            {{ translatePluginText(entry.method.name) }}
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