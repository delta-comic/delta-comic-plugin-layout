import { UniContentPage, type UniImage } from '@delta-comic/model'

/**
 * 图片内容页基类。
 *
 * 内容插件实现该类后，阅读器即可通过 {@link fetchImages} 拉取图片并渲染。
 *
 * @since 0.9.0
 */
export abstract class ContentImagePage extends UniContentPage {
  /** 拉取当前内容页的全部图片，可通过 `signal` 中止请求。 */
  public abstract fetchImages: (signal?: AbortSignal) => Promise<UniImage[]>
}

/**
 * 单个视频源，对应 Artplayer 的一个播放源。
 *
 * @since 0.9.0
 */
export interface VideoSource {
  /** 是否作为默认播放源；存在多个源时优先选择。 */
  default?: boolean
  /** 播放源展示名（如清晰度标签），未提供时回退为 `type`。 */
  label?: string
  /** 视频资源地址。 */
  src: string
  /** MIME 类型或媒体容器类型，供播放器解析。 */
  type?: string
}

/**
 * 视频字幕轨。
 *
 * @since 0.9.0
 */
export interface VideoTextTrack {
  /** 是否默认启用该字幕轨。 */
  default?: boolean
  /** 字幕文件编码（如 `utf-8`），用于非标准编码的本地字幕。 */
  encoding?: string
  /** 字幕轨类型，默认 `subtitles`。 */
  kind?: 'captions' | 'subtitles'
  /** 字幕轨展示名（如语言标签）。 */
  label?: string
  /** BCP 47 语言标签，如 `zh-CN`。 */
  language?: string
  /** 字幕文件地址。 */
  src: string
  /** 字幕文件格式，默认 `vtt`。 */
  type?: 'ass' | 'srt' | 'vtt'
}

/**
 * 视频内容页的播放配置。
 *
 * `sources` 为播放器渲染所需的全部视频源；`textTrack` 为可选的
 * 外挂字幕轨。内容插件通过 {@link ContentVideoPage.fetchVideo} 返回该配置。
 *
 * @since 0.9.0
 */
export interface VideoConfig {
  /** 全部视频源，至少需要一项，否则播放器初始化失败。 */
  sources: VideoSource[]
  /** 可选的外挂字幕轨列表。 */
  textTrack?: VideoTextTrack[]
}

/**
 * 视频内容页基类。
 *
 * 内容插件实现该类后，播放器即可通过 {@link fetchVideo} 获取
 * {@link VideoConfig} 并初始化。返回的 `sources` 不能为空数组。
 *
 * @since 0.9.0
 */
export abstract class ContentVideoPage extends UniContentPage {
  /** 拉取当前内容页的播放配置，可通过 `signal` 中止请求。 */
  public abstract fetchVideo: (signal?: AbortSignal) => Promise<VideoConfig>
}