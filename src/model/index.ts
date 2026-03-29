import { uni } from '@delta-comic/model'
import type { AudioSrc, MediaSrc, TextTrackInit } from 'vidstack'

export abstract class ContentImagePage extends uni.content.ContentPage {
  public abstract fetchImages: (signal?: AbortSignal) => Promise<uni.image.Image[]>
}

export type VideoConfig = { textTrack?: TextTrackInit[] } & Exclude<MediaSrc, string | AudioSrc>[]
export abstract class ContentVideoPage extends uni.content.ContentPage {
  public abstract fetchVideo: (signal?: AbortSignal) => Promise<VideoConfig>
}