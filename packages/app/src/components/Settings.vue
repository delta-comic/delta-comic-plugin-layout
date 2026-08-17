<script setup lang="ts">
import type {
  FormDefaultValue,
  FormSingleConfigure,
  FormSingleResult,
  FormCheckbox,
  FormDate,
  FormDateRange,
  FormNumber,
  FormPairs,
  FormRadio,
  FormString,
  FormSwitch,
} from '@delta-comic/model'
import { useConfig } from '@delta-comic/plugin'
import { DcCell, DcCellGroup } from '@delta-comic/ui'

import { translate } from '@/i18n'

const configStore = useConfig()
type ConfigValue = FormDefaultValue[keyof FormDefaultValue]

const setConfigValue = (values: Record<string, ConfigValue>, field: string, value: ConfigValue) =>
  (values[field] = value)

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === 'string')

const isDateRange = (value: unknown): value is [string, string] =>
  Array.isArray(value) && value.length === 2 && value.every(item => typeof item === 'string')

const isPair = (value: unknown): value is { key: string; value: string } =>
  typeof value === 'object' &&
  value !== null &&
  'key' in value &&
  typeof value.key === 'string' &&
  'value' in value &&
  typeof value.value === 'string'

const isPairs = (value: unknown): value is { key: string; value: string }[] =>
  Array.isArray(value) && value.every(isPair)

function getConfigValue(
  config: FormString | FormDate | FormRadio,
  value: ConfigValue | undefined,
): string
function getConfigValue(config: FormNumber, value: ConfigValue | undefined): number
function getConfigValue(config: FormSwitch, value: ConfigValue | undefined): boolean
function getConfigValue(config: FormCheckbox, value: ConfigValue | undefined): string[]
function getConfigValue(config: FormDateRange, value: ConfigValue | undefined): [string, string]
function getConfigValue(
  config: FormPairs,
  value: ConfigValue | undefined,
): FormSingleResult<FormPairs>
function getConfigValue(config: FormSingleConfigure, value: ConfigValue | undefined): ConfigValue {
  switch (config.type) {
    case 'string':
    case 'date':
    case 'radio':
      return typeof value === 'string' ? value : (config.defaultValue ?? '')
    case 'number':
      return typeof value === 'number' ? value : (config.defaultValue ?? 0)
    case 'switch':
      return typeof value === 'boolean' ? value : (config.defaultValue ?? false)
    case 'checkbox':
      return isStringArray(value) ? value : (config.defaultValue ?? [])
    case 'dateRange':
      return isDateRange(value) ? value : (config.defaultValue ?? ['', ''])
    case 'pairs':
      return isPairs(value) ? value : (config.defaultValue ?? [])
  }
}

const localizeConfig = <T extends FormSingleConfigure>(config: T): T => ({
  ...config,
  info: translate(config.info),
  placeholder: config.placeholder ? translate(config.placeholder) : undefined,
  ...(config.type === 'radio' || config.type === 'checkbox'
    ? { selects: config.selects.map(option => ({ ...option, label: translate(option.label) })) }
    : {}),
})
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
              :model-value="getConfigValue(config, data.value[field])"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
          </template>
        </DcCell>
        <NPopselect v-else-if="config.type === 'string'" :options="[]" size="huge" trigger="click">
          <DcCell center clickable :title="translate(config.info)">{{ data.value[field] }}</DcCell>
          <template #empty>
            <DcFormString
              :model-value="getConfigValue(config, data.value[field])"
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
              :model-value="getConfigValue(config, data.value[field])"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
          </template>
        </NPopselect>
        <NPopselect
          v-else-if="config.type === 'radio'"
          :value="getConfigValue(config, data.value[field])"
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
          :value="getConfigValue(config, data.value[field])"
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
              :model-value="getConfigValue(config, data.value[field])"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
            <DcFormDateRange
              v-else-if="config.type === 'dateRange'"
              :model-value="getConfigValue(config, data.value[field])"
              class="max-w-[80vw]!"
              :config="localizeConfig(config)"
              @update:model-value="setConfigValue(data.value, field, $event)"
            />
            <DcFormPairs
              v-else-if="config.type === 'pairs'"
              :model-value="getConfigValue(config, data.value[field])"
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