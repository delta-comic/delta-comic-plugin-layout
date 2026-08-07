<script setup lang="ts">
import { FavouriteDB } from '@delta-comic/db'
import {
  NButton,
  NDrawer,
  NForm,
  NFormItem,
  NInput,
  NSwitch,
  type FormInst,
  type FormRules,
  useMessage,
} from 'naive-ui'
import { computed, reactive, shallowRef, useTemplateRef } from 'vue'

import { translate } from '@/i18n'

export interface FavouriteFormData {
  description: string
  isPrivate: boolean
  title: string
}

const createEmptyFormData = (): FavouriteFormData => ({
  description: '',
  isPrivate: true,
  title: '',
})

const show = shallowRef(false)
const submitting = shallowRef(false)
const message = useMessage()
const formRef = useTemplateRef<FormInst>('form')
const formData = reactive(createEmptyFormData())
const formRules = computed<FormRules>(() => ({
  title: [
    {
      message: translate('layout.favourite.nameRequired'),
      required: true,
      trigger: ['input', 'blur'],
    },
  ],
}))

const resetForm = (value: Partial<FavouriteFormData> = {}) => {
  Object.assign(formData, createEmptyFormData(), value)
  formRef.value?.restoreValidation()
}

const create = (defaultValue: Partial<FavouriteFormData> = {}) => {
  if (show.value) {
    message.warning(translate('layout.favourite.creating'))
    return
  }
  resetForm(defaultValue)
  show.value = true
}

const cancel = () => {
  resetForm()
  show.value = false
}

const { createCard } = FavouriteDB.useCreateCard()

const onSubmit = async () => {
  if (submitting.value) return
  try {
    await formRef.value?.validate()
  } catch {
    return
  }

  submitting.value = true
  try {
    await createCard({
      card: {
        createAt: Date.now(),
        description: formData.description,
        private: formData.isPrivate,
        title: formData.title,
      },
    })
    cancel()
  } catch (error) {
    message.error(error instanceof Error ? error.message : String(error))
  } finally {
    submitting.value = false
  }
}

defineExpose({ create })
</script>

<template>
  <NDrawer v-model:show="show" height="min(70vh, 32rem)" placement="bottom" @after-leave="cancel">
    <NDrawerContent :title="translate('layout.favourite.title')" :native-scrollbar="false">
      <form @submit.prevent="onSubmit">
        <DcCellGroup inset>
          <NForm
            ref="form"
            :model="formData"
            :rules="formRules"
            class="px-4 pt-4"
            label-placement="left"
            label-width="80"
          >
            <NFormItem :label="translate('layout.favourite.name')" path="title">
              <NInput
                v-model:value="formData.title"
                :placeholder="translate('layout.favourite.name')"
              />
            </NFormItem>
            <NFormItem :label="translate('layout.favourite.description')" path="description">
              <NInput
                v-model:value="formData.description"
                :autosize="{ minRows: 2, maxRows: 5 }"
                :placeholder="translate('layout.favourite.optional')"
                type="textarea"
              />
            </NFormItem>
            <NFormItem :label="translate('layout.favourite.private')" path="isPrivate">
              <NSwitch v-model:value="formData.isPrivate" />
            </NFormItem>
          </NForm>
        </DcCellGroup>
        <NButton
          attr-type="submit"
          class="m-5! w-30!"
          :loading="submitting"
          secondary
          size="large"
          strong
          type="primary"
        >
          {{ translate('layout.actions.submit') }}
        </NButton>
      </form>
    </NDrawerContent>
  </NDrawer>
</template>