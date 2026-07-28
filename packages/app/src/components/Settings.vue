<script setup lang="ts">
import type { FormSingleConfigure } from '@delta-comic/model'
import { useConfig } from '@delta-comic/plugin'
import { DcCell, DcCellGroup } from '@delta-comic/ui'

import { translate } from '@/i18n'

const configStore = useConfig()

const localizeConfig = <T extends FormSingleConfigure>(config: T): T => {
  const localized: FormSingleConfigure = {
    ...config,
    info: translate(config.info),
    placeholder: config.placeholder ? translate(config.placeholder) : undefined,
  }
  if (localized.type === 'radio' || localized.type === 'checkbox') {
    localized.selects = localized.selects.map(option => ({
      ...option,
      label: translate(option.label),
    }))
  }
  return localized as T
}
</script>

<template>
  <NScrollbar class="size-full">
    <DcCellGroup
      v-for="[key, { data, form, name }] of configStore.form.entries()"
      :key
      :title="translate(name)"
    >
      <template v-for="[field, config] of Object.entries(form)" :key="field">
        <DcCell v-if="config.type === 'switch'" center :title="translate(config.info)">
          <template #right-icon>
            <DcFormSwitch :config="localizeConfig(config)" v-model="data.value[field]" />
          </template>
        </DcCell>
        <NPopselect v-else-if="config.type === 'string'" :options="[]" size="huge" trigger="click">
          <DcCell center clickable :title="translate(config.info)">{{ data.value[field] }}</DcCell>
          <template #empty>
            <DcFormString
              v-model="data.value[field]"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
            />
          </template>
        </NPopselect>
        <NPopselect v-else-if="config.type === 'number'" :options="[]" size="huge" trigger="click">
          <DcCell center clickable :title="translate(config.info)">{{ data.value[field] }}</DcCell>
          <template #empty>
            <DcFormNumber
              v-model="data.value[field]"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
            />
          </template>
        </NPopselect>
        <NPopselect
          v-else-if="config.type === 'radio'"
          v-model:value="data.value[field]"
          :options="localizeConfig(config).selects"
          placement="bottom-end"
          size="huge"
          trigger="click"
        >
          <DcCell center clickable :title="translate(config.info)">
            {{ localizeConfig(config).selects.find(v => v.value === data.value[field])?.label }}
          </DcCell>
        </NPopselect>
        <NPopselect
          v-else-if="config.type === 'checkbox'"
          v-model:value="data.value[field]"
          multiple
          :options="localizeConfig(config).selects"
          placement="bottom-end"
          size="huge"
          trigger="click"
        >
          <DcCell center clickable :title="translate(config.info)">{{ data.value[field] }}</DcCell>
        </NPopselect>
        <DcVar v-else :value="{ show: false }" v-slot="{ value }">
          <DcCell center clickable :title="translate(config.info)" @click="value.show = true">
            {{ data.value[field] }}
          </DcCell>
          <NModal v-model:show="value.show" preset="dialog" :title="translate(config.info)">
            <DcFormDate
              v-if="config.type === 'date'"
              v-model="data.value[field]"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
            />
            <DcFormDateRange
              v-else-if="config.type === 'dateRange'"
              v-model="data.value[field]"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
            />
            <DcFormPairs
              v-else-if="config.type === 'pairs'"
              v-model="data.value[field]"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
            />
          </NModal>
        </DcVar>
      </template>
    </DcCellGroup>
  </NScrollbar>
</template>