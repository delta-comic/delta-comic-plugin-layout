import { useFullscreen } from '@delta-comic/utils'
import type Artplayer from 'artplayer'
import {
  computed,
  onBeforeUnmount,
  shallowReadonly,
  shallowRef,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type ShallowRef,
} from 'vue'
import { useRouter } from 'vue-router'

import type { VideoConfig } from '@/model'

import {
  artplayerRuntime,
  createPlayerOptions,
  type ArtplayerRuntime,
  type PlayerLabels,
} from './player'

interface UseArtplayerOptions {
  config: MaybeRefOrGetter<VideoConfig | undefined>
  container: Readonly<ShallowRef<HTMLDivElement | null>>
  labels: PlayerLabels
  poster?: MaybeRefOrGetter<string | undefined>
  runtime?: ArtplayerRuntime
}

const unlockScreenOrientation = async () => {
  try {
    screen.orientation.unlock()
  } catch {
    // Screen orientation is optional and unavailable in most desktop browsers.
  }
}

export const useArtplayer = (options: UseArtplayerOptions) => {
  const runtime = options.runtime ?? artplayerRuntime
  const fullscreen = useFullscreen()
  const router = useRouter()
  const player = shallowRef<Artplayer | null>(null)
  const controlsVisible = shallowRef(true)
  const error = shallowRef<Error>()
  const reloadToken = shallowRef(0)
  let generation = 0

  const setHostFullscreen = async (value: boolean) => {
    try {
      if (value) await fullscreen.entry()
      else await fullscreen.exit()
    } catch {
      // The browser may reject fullscreen without a direct user gesture.
    }
  }

  watch(
    [options.container, () => toValue(options.config), reloadToken],
    async ([container, config], _previous, onCleanup) => {
      const currentGeneration = ++generation
      error.value = undefined
      runtime.destroy(player.value)
      player.value = null
      if (!container || !config) return

      let created: Artplayer | undefined
      onCleanup(() => runtime.destroy(created))
      try {
        created = await runtime.create(
          createPlayerOptions(container, config, options.labels, {
            poster: options.poster === undefined ? undefined : toValue(options.poster),
          }),
          options.labels,
        )
        if (currentGeneration !== generation) {
          runtime.destroy(created)
          return
        }
        if (!created) return
        const instance = created
        instance.on('control', state => (controlsVisible.value = state))
        instance.on('fullscreen', state => void setHostFullscreen(state))
        instance.on('fullscreenWeb', state => void setHostFullscreen(state))
        instance.on('video:error', value => {
          error.value = value
          instance.notice.show = options.labels.videoLoadFailed
        })
        player.value = instance
      } catch (value) {
        error.value = value instanceof Error ? value : new Error(String(value))
      }
    },
    { immediate: true },
  )

  watch(
    [player, () => (options.poster === undefined ? undefined : toValue(options.poster))],
    ([art, poster]) => {
      if (!art || art.isDestroy) return
      art.poster = poster ?? ''
    },
    { immediate: true },
  )

  watch(
    [fullscreen.isFullscreen, player],
    ([isFullscreen, art]) => {
      if (!art) return
      try {
        if (isFullscreen) {
          if (!art.fullscreen && !art.fullscreenWeb) art.fullscreen = true
        } else {
          if (art.fullscreen) art.fullscreen = false
          if (art.fullscreenWeb) art.fullscreenWeb = false
        }
      } catch {
        // Artplayer and the host reconcile again on the next fullscreen event.
      }
    },
    { immediate: true },
  )

  const removeRouterGuard = router.beforeEach(() => void unlockScreenOrientation())
  onBeforeUnmount(() => {
    generation++
    removeRouterGuard()
    runtime.destroy(player.value)
    player.value = null
    void setHostFullscreen(false)
    void unlockScreenOrientation()
  })

  return {
    controlsVisible: shallowReadonly(controlsVisible),
    error: shallowReadonly(error),
    isFullscreen: computed(() => fullscreen.isFullscreen.value),
    player: shallowReadonly(player),
    reload: () => reloadToken.value++,
  }
}