import { useFullscreen } from '@delta-comic/utils'
import type Artplayer from 'artplayer'
import {
  computed,
  onBeforeUnmount,
  shallowReadonly,
  shallowRef,
  toValue,
  watch,
  type ComputedRef,
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

/** `useArtplayer` 的入参。 */
interface UseArtplayerOptions {
  /** 视频播放配置；变为 `undefined` 或新值时重建播放器。 */
  config: MaybeRefOrGetter<VideoConfig | undefined>
  /** 播放器挂载容器（模板 ref）。 */
  container: Readonly<ShallowRef<HTMLDivElement | null>>
  /** 播放器界面文案（已 i18n）。 */
  labels: PlayerLabels
  /** 封面图地址，可动态更新。 */
  poster?: MaybeRefOrGetter<string | undefined>
  /** 播放器工厂，测试时注入 mock；默认使用真实 Artplayer。 */
  runtime?: ArtplayerRuntime
}

/** `useArtplayer` 的返回值。 */
interface UseArtplayerReturn {
  /** 控制栏是否可见。 */
  controlsVisible: Readonly<ShallowRef<boolean>>
  /** 最近的播放错误（含 `video:error` 与创建失败）。 */
  error: Readonly<ShallowRef<Error | undefined>>
  /** 宿主页面是否处于全屏。 */
  isFullscreen: ComputedRef<boolean>
  /** 当前 Artplayer 实例，销毁或重建期间为 `null`。 */
  player: Readonly<ShallowRef<Artplayer | null>>
  /** 重新加载播放器（递增内部 token 触发重建）。 */
  reload: () => void
}

const unlockScreenOrientation = async () => {
  try {
    screen.orientation.unlock()
  } catch {
    // Screen orientation is optional and unavailable in most desktop browsers.
  }
}

/**
 * Artplayer 播放器组合式函数。
 *
 * 监听 `container`/`config`/`reloadToken` 变化重建播放器（按代际
 * 编号丢弃过期创建结果），并同步宿主全屏状态：播放器全屏事件驱动
 * 宿主页面全屏，宿主全屏变化反向同步回播放器。
 *
 * @since 0.9.0
 */
export const useArtplayer = (options: UseArtplayerOptions): UseArtplayerReturn => {
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