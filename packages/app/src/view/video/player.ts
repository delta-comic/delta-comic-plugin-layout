import type Artplayer from 'artplayer'
import type { Option, Setting, Subtitle } from 'artplayer'
import Hls from 'hls.js'

import type { VideoConfig, VideoSource, VideoTextTrack } from '@/model'

const HLS_MIME_TYPES = new Set([
  'application/hls',
  'application/mpegurl',
  'application/vnd.apple.mpegurl',
  'audio/mpegurl',
  'audio/x-mpegurl',
  'video/x-mpegurl',
])

const NATIVE_VIDEO_TYPES = new Set(['', 'video/mp4', 'video/ogg', 'video/webm', 'video/x-m4v'])
type CanPlayNativeVideo = (type: string) => CanPlayTypeResult

/** 播放器界面文案（由调用方传入已翻译文本）。 */
export interface PlayerLabels {
  line(index: number): string
  source: string
  subtitle: string
  subtitleOff: string
  unsupportedType(type: string): string
  videoLoadFailed: string
}

/** 归一化后的视频源：补充播放类型与展示名。 */
export interface NormalizedVideoSource extends VideoSource {
  /** 播放方式：HLS 流媒体或浏览器原生播放。 */
  artType: 'm3u8' | 'native'
  /** 解析后的展示名（源未提供 `label` 时回退为线路名）。 */
  label: string
}

/** 归一化后的播放配置，供 `createPlayerOptions` 直接消费。 */
export interface NormalizedVideoConfig {
  defaultSource: NormalizedVideoSource
  sources: NormalizedVideoSource[]
  textTracks: VideoTextTrack[]
}

type ArtplayerConstructor = typeof Artplayer
type ArtplayerModule = { default: ArtplayerConstructor }
type ArtplayerLoader = () => Promise<ArtplayerModule>

/** 对 Artplayer 类进行插件级全局配置（快进倍率、移动端双击播放）。 */
export const configureArtplayer = (ArtplayerClass: ArtplayerConstructor) => {
  ArtplayerClass.FAST_FORWARD_VALUE = 3
  ArtplayerClass.MOBILE_DBCLICK_PLAY = true
}

const normalizeMimeType = (type?: string) => type?.split(';', 1)[0]?.trim().toLowerCase() ?? ''

const canPlayNativeVideo: CanPlayNativeVideo = type => {
  if (typeof document === 'undefined') return ''
  return document.createElement('video').canPlayType(type)
}

/**
 * 解析视频源的播放方式：MIME 或 URL 命中 HLS 规则返回 `m3u8`，
 * 可被浏览器原生播放返回 `native`，其余抛错。
 */
export const getArtplayerType = (
  source: VideoSource,
  canPlayType: CanPlayNativeVideo = canPlayNativeVideo,
): 'm3u8' | 'native' => {
  const type = normalizeMimeType(source.type)
  if (HLS_MIME_TYPES.has(type) || /\.m3u8(?:$|[?#])/i.test(source.src)) return 'm3u8'
  if (NATIVE_VIDEO_TYPES.has(type)) return 'native'
  if (type.startsWith('video/') && canPlayType(type)) return 'native'
  throw new Error(type || source.type || 'unknown')
}

/**
 * 归一化播放配置：校验并解析每个视频源，确定默认源与字幕轨。
 * `sources` 为空或全部源不可解析时抛错。
 */
export const normalizeVideoConfig = (
  config: VideoConfig,
  labels: PlayerLabels,
): NormalizedVideoConfig => {
  if (config.sources.length === 0) throw new Error(labels.videoLoadFailed)

  const sources = config.sources.map((source, index) => {
    try {
      return {
        ...source,
        artType: getArtplayerType(source),
        label: source.label?.trim() || labels.line(index + 1),
      }
    } catch (error) {
      const type = error instanceof Error ? error.message : 'unknown'
      throw new Error(labels.unsupportedType(type), { cause: error })
    }
  })
  const defaultSource = sources.find(source => source.default) ?? sources[0]
  if (!defaultSource) throw new Error(labels.videoLoadFailed)
  return { defaultSource, sources, textTracks: config.textTrack ?? [] }
}

/** 由字幕轨构建 Artplayer 字幕设置项与默认字幕。无字幕时返回空设置。 */
export const createSubtitleOptions = (
  tracks: VideoTextTrack[],
  labels: PlayerLabels,
): { settings: Setting[]; subtitle?: Subtitle } => {
  if (tracks.length === 0) return { settings: [] }

  const firstTrack = tracks[0]
  if (!firstTrack) return { settings: [] }
  const defaultTrack = tracks.find(track => track.default) ?? firstTrack
  const selector: Setting[] = [
    { default: false, html: labels.subtitleOff, url: '' },
    ...tracks.map(track => ({
      default: track === defaultTrack,
      encoding: track.encoding,
      html: track.label?.trim() || track.language?.trim() || labels.subtitle,
      type: track.type,
      url: track.src,
    })),
  ]
  return {
    settings: [
      {
        html: labels.subtitle,
        selector,
        onSelect(item) {
          const url = String(item.url ?? '')
          if (!url) {
            this.subtitle.show = false
            return
          }
          this.subtitle.show = true
          void this.subtitle.switch(url, {
            encoding: item.encoding,
            name: String(item.html),
            type: item.type,
          })
        },
      },
    ],
    subtitle: {
      encoding: defaultTrack.encoding,
      name: defaultTrack.label,
      type: defaultTrack.type,
      url: defaultTrack.src,
    },
  }
}

/** 组装 Artplayer 初始化选项：源/字幕设置、播放器外观与交互开关。 */
export const createPlayerOptions = (
  container: HTMLDivElement,
  config: VideoConfig,
  labels: PlayerLabels,
  presentation: { poster?: string } = {},
): Option => {
  const normalized = normalizeVideoConfig(config, labels)
  const { settings, subtitle } = createSubtitleOptions(normalized.textTracks, labels)
  if (normalized.sources.length > 1) {
    settings.unshift({
      html: labels.source,
      selector: normalized.sources.map(source => ({
        default: source === normalized.defaultSource,
        html: source.label,
        source,
      })),
      onSelect(item) {
        const source = item.source as NormalizedVideoSource
        this.type = source.artType
        void this.switchUrl(source.src)
      },
    })
  }

  return {
    airplay: true,
    autoOrientation: true,
    autoplay: true,
    container,
    fastForward: true,
    fullscreen: true,
    fullscreenWeb: true,
    gesture: true,
    hotkey: true,
    lock: true,
    miniProgressBar: true,
    mutex: true,
    pip: true,
    playbackRate: true,
    playsInline: true,
    poster: presentation.poster,
    setting: true,
    settings,
    subtitle,
    subtitleOffset: Boolean(subtitle),
    theme: 'var(--dc-color-primary, #18a058)',
    type: normalized.defaultSource.artType,
    url: normalized.defaultSource.src,
  }
}

/**
 * Artplayer 播放器运行时：懒加载模块、托管 HLS 实例并记录全局副作用。
 *
 * `create` 返回的实例由内部追踪，销毁时同步清理 HLS 与
 * `window.Artplayer`/样式等全局副作用，避免多次懒加载互相污染。
 *
 * @since 0.9.0
 */
export class ArtplayerRuntime {
  readonly #active = new Set<Artplayer>()
  readonly #hls = new Map<Artplayer, Hls>()
  readonly #loader: ArtplayerLoader
  #globalSnapshot?: { hadArtplayer: boolean; style: HTMLElement | null; value: unknown }

  public constructor(loader: ArtplayerLoader = () => import('artplayer')) {
    this.#loader = loader
  }

  /**
   * 异步创建播放器实例。重复调用前会先 `destroy` 旧实例（幂等）。
   * HLS 源经 `customType.m3u8` 由内部 Hls.js 实例接管。
   */
  public async create(option: Option, labels: PlayerLabels) {
    this.#captureGlobalSnapshot()
    const { default: ArtplayerClass } = await this.#loader()
    configureArtplayer(ArtplayerClass)

    const art = new ArtplayerClass({
      ...option,
      customType: {
        ...option.customType,
        m3u8: (video, url, player) => this.#loadHls(video, url, player, labels),
        native: (video, url, player) => {
          this.#destroyHls(player)
          video.src = url
        },
      },
    })
    this.#active.add(art)
    art.once('destroy', () => {
      this.#destroyHls(art)
      this.#active.delete(art)
    })
    return art
  }

  /** 销毁播放器实例（已销毁/空值幂等）。 */
  public destroy(art: Artplayer | null | undefined) {
    if (!art || art.isDestroy) return
    art.destroy(true)
  }

  /** 销毁全部活跃实例并恢复被捕获的全局状态。 */
  public disposeAll() {
    for (const art of this.#active) this.destroy(art)
    this.#active.clear()
    this.#restoreGlobalSnapshot()
  }

  #captureGlobalSnapshot() {
    if (this.#globalSnapshot || typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }
    const artplayerWindow = window as Window & { Artplayer?: unknown }
    this.#globalSnapshot = {
      hadArtplayer: Object.hasOwn(artplayerWindow, 'Artplayer'),
      style: document.querySelector('#artplayer-style'),
      value: artplayerWindow.Artplayer,
    }
  }

  #destroyHls(art: Artplayer) {
    this.#hls.get(art)?.destroy()
    this.#hls.delete(art)
    art.hls = undefined
  }

  #loadHls(video: HTMLVideoElement, url: string, art: Artplayer, labels: PlayerLabels) {
    this.#destroyHls(art)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url
      return
    }
    if (!Hls.isSupported()) {
      art.notice.show = labels.videoLoadFailed
      return
    }

    const hls = new Hls()
    this.#hls.set(art, hls)
    art.hls = hls
    hls.loadSource(url)
    hls.attachMedia(video)
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (!data.fatal) return
      if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad()
      else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError()
      else {
        art.notice.show = labels.videoLoadFailed
        this.#destroyHls(art)
      }
    })
  }

  #restoreGlobalSnapshot() {
    if (!this.#globalSnapshot || typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }
    const snapshot = this.#globalSnapshot
    const artplayerWindow = window as Window & { Artplayer?: unknown }
    if (snapshot.hadArtplayer) artplayerWindow.Artplayer = snapshot.value
    else Reflect.deleteProperty(artplayerWindow, 'Artplayer')

    if (!snapshot.style) document.querySelector('#artplayer-style')?.remove()
    this.#globalSnapshot = undefined
  }
}

/** 默认的播放器运行时单例（真实 Artplayer）。 */
export const artplayerRuntime = new ArtplayerRuntime()