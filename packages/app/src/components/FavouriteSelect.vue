<script setup lang="ts">
import { db, DBUtils, FavouriteDB, ItemStoreDB } from '@delta-comic/db'
import { UniContentPage, type UniItem } from '@delta-comic/model'
import { DcCell, DcCellGroup, DcState, DcToggleIcon } from '@delta-comic/ui'
import { useQueryCache } from '@pinia/colada'
import { StarFilled } from '@vicons/antd'
import { PlusFilled, StarOutlineRound } from '@vicons/material'
import { noop } from 'es-toolkit'
import { NButton, NCheckbox, NDrawer, NDrawerContent, NIcon, useMessage } from 'naive-ui'
import { computed, shallowReactive, shallowRef, useTemplateRef } from 'vue'

import { translate } from '@/i18n'

import CreateFavouriteCard from './CreateFavouriteCard.vue'

const props = defineProps<{ item: UniItem; plain?: boolean }>()

const createFavouriteCard =
  useTemplateRef<InstanceType<typeof CreateFavouriteCard>>('createFavouriteCard')
const selection = shallowReactive(new Set<FavouriteDB.Card['createAt']>())
const show = shallowRef(false)
const message = useMessage()
const queryCache = useQueryCache()
const itemKey = computed(() =>
  ItemStoreDB.itemKey.toString([
    UniContentPage.contentPages.key.toString(props.item.contentType),
    props.item.id,
  ]),
)
const favouriteQueryKey = 'layout:favourite-select'

const { state: allFavouriteCards } = FavouriteDB.useQueryCard(
  query => query.selectAll().execute(),
  [`${favouriteQueryKey}:cards`],
  () => [],
)

const { data: favouriteItems } = FavouriteDB.useQueryItem(
  query => query.select('belongTo').execute(),
  [`${favouriteQueryKey}:card-counts`],
  () => [],
)
const cardCounts = computed(() => {
  const counts = new Map<FavouriteDB.Card['createAt'], number>()
  for (const item of favouriteItems.value) {
    counts.set(item.belongTo, (counts.get(item.belongTo) ?? 0) + 1)
  }
  return counts
})

let selectionPromise: PromiseWithResolvers<FavouriteDB.Card['createAt'][]> | undefined

const create = async () => {
  if (selectionPromise) {
    message.warning(translate('layout.favourite.selecting'))
    throw new Error('Favourite selection is already open')
  }

  const request = Promise.withResolvers<FavouriteDB.Card['createAt'][]>()
  selectionPromise = request
  try {
    selection.clear()
    const items = await db
      .selectFrom('favouriteItem')
      .where('itemKey', '=', itemKey.value)
      .selectAll()
      .execute()
    for (const item of items) selection.add(item.belongTo)
    show.value = true
    return await request.promise
  } catch (error) {
    if (selectionPromise === request) selectionPromise = undefined
    throw error
  }
}

const cancel = () => {
  selectionPromise?.reject(new DOMException('Selection cancelled', 'AbortError'))
  selectionPromise = undefined
  selection.clear()
  show.value = false
}

const submit = () => {
  if (selection.size === 0) {
    message.warning(translate('layout.favourite.selectionRequired'))
    return
  }
  selectionPromise?.resolve([...selection])
  selectionPromise = undefined
  selection.clear()
  show.value = false
}

const toggleCard = (createAt: FavouriteDB.Card['createAt']) => {
  if (selection.has(createAt)) selection.delete(createAt)
  else selection.add(createAt)
}

const { upsert } = FavouriteDB.useUpsertItem()
const favouriteThis = async (belongTos: FavouriteDB.Card['createAt'][]) => {
  await DBUtils.withTransition(async trx => {
    await trx.deleteFrom('favouriteItem').where('itemKey', '=', itemKey.value).execute()
    if (belongTos.length > 0) await upsert({ belongTos, item: props.item, trx })
  })
  await queryCache.invalidateQueries({ key: [FavouriteDB.QueryKey.item] })
}

const toggleFavourite = () => favouriteThis(thisFavouriteCount.value > 0 ? [] : [0])

const { data: thisFavouriteCount } = FavouriteDB.useQueryItem(
  query => DBUtils.countDb(query.where('itemKey', '=', itemKey.value)),
  [`${favouriteQueryKey}:item-count`, itemKey.value],
  () => 0,
)
</script>

<template>
  <DcToggleIcon
    :icon="plain ? StarOutlineRound : StarFilled"
    :model-value="thisFavouriteCount > 0"
    padding
    :size="plain ? '35px' : '27px'"
    @click="toggleFavourite"
    @long-click="create().then(favouriteThis).catch(noop)"
  >
    {{ plain ? '' : translate('layout.actions.favourite') }}
  </DcToggleIcon>
  <NDrawer v-model:show="show" height="80vh" placement="bottom" @after-leave="cancel">
    <NDrawerContent :native-scrollbar="false">
      <template #header>
        <div class="flex w-full items-center justify-between">
          <span>{{ translate('layout.favourite.selectTitle') }}</span>
          <NButton text type="primary" @click="createFavouriteCard?.create()">
            <template #icon
              ><NIcon><PlusFilled /></NIcon
            ></template>
            {{ translate('layout.actions.newFolder') }}
          </NButton>
        </div>
      </template>
      <DcCellGroup inset class="mb-6!">
        <DcState
          v-slot="{ data }"
          class="h-fit! w-full!"
          content-class="h-fit w-full"
          :state="allFavouriteCards"
        >
          <template v-for="card of data" :key="card.createAt">
            <DcCell
              center
              clickable
              :label="
                translate('layout.favourite.contentCount', {
                  count: cardCounts.get(card.createAt) ?? 0,
                })
              "
              :title="card.title"
              @click="toggleCard(card.createAt)"
            >
              <template #right-icon>
                <NCheckbox :checked="selection.has(card.createAt)" />
              </template>
            </DcCell>
          </template>
        </DcState>
      </DcCellGroup>
      <NButton class="m-5! w-30!" secondary size="large" strong type="primary" @click="submit">
        {{ translate('layout.actions.confirm') }}
      </NButton>
    </NDrawerContent>
  </NDrawer>
  <CreateFavouriteCard ref="createFavouriteCard" />
</template>