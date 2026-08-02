<script setup lang="ts">
import type { FormDefaultValue, FormSingleConfigure } from '@delta-comic/model'
import { useConfig } from '@delta-comic/plugin'
import { DcCell, DcCellGroup } from '@delta-comic/ui'

import { translate } from '@/i18n'

const configStore = useConfig()
type ConfigValue = FormDefaultValue[keyof FormDefaultValue]

const setConfigValue = (values: Record<string, ConfigValue>, field: string, value: ConfigValue) =>
  (values[field] = value)

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
            <DcFormSwitch
              :config="localizeConfig(config)"
              :model-value="data.value[field] as boolean"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
          </template>
        </DcCell>
        <NPopselect v-else-if="config.type === 'string'" :options="[]" size="huge" trigger="click">
          <DcCell center clickable :title="translate(config.info)">{{ data.value[field] }}</DcCell>
          <template #empty>
            <DcFormString
              :model-value="data.value[field] as string"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
          </template>
        </NPopselect>
        <NPopselect v-else-if="config.type === 'number'" :options="[]" size="huge" trigger="click">
          <DcCell center clickable :title="translate(config.info)">{{ data.value[field] }}</DcCell>
          <template #empty>
            <DcFormNumber
              :model-value="data.value[field] as number"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
          </template>
        </NPopselect>
        <NPopselect
          v-else-if="config.type === 'radio'"
          :value="data.value[field] as string"
          :options="localizeConfig(config).selects"
          placement="bottom-end"
          size="huge"
          trigger="click"
          @update:value="setConfigValue(data.value, field, $event)"
        >
          <DcCell center clickable :title="translate(config.info)">
            {{ localizeConfig(config).selects.find(v => v.value === data.value[field])?.label }}
          </DcCell>
        </NPopselect>
        <NPopselect
          v-else-if="config.type === 'checkbox'"
          :value="data.value[field] as string[]"
          multiple
          :options="localizeConfig(config).selects"
          placement="bottom-end"
          size="huge"
          trigger="click"
          @update:value="setConfigValue(data.value, field, $event)"
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
              :model-value="data.value[field] as string"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
            <DcFormDateRange
              v-else-if="config.type === 'dateRange'"
              :model-value="data.value[field] as [string, string]"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
            <DcFormPairs
              v-else-if="config.type === 'pairs'"
              :model-value="data.value[field] as { key: string; value: string }[]"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
          </NModal>
        </DcVar>
      </template>
    </DcCellGroup>
  </NScrollbar>
</template>