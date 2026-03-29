import { uni } from '@delta-comic/model'
import type { UseQueryReturn } from '@pinia/colada'
import type { AudioSrc, MediaSrc, TextTrackInit } from 'vidstack'

export abstract class ContentImagePage extends uni.content.ContentPage {
  public abstract fetchImages: () => UseQueryReturn<uni.image.Image[]>
}

export type VideoConfig = { textTrack?: TextTrackInit[] } & Exclude<MediaSrc, string | AudioSrc>[]
export abstract class ContentVideoPage extends uni.content.ContentPage {
  public abstract fetchVideo: () => UseQueryReturn<VideoConfig>
}