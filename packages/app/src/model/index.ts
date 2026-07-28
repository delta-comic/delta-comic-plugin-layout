import { UniContentPage, type UniImage } from '@delta-comic/model'
import type { AudioSrc, MediaSrc, TextTrackInit } from 'vidstack'

export abstract class ContentImagePage extends UniContentPage {
  public abstract fetchImages: (signal?: AbortSignal) => Promise<UniImage[]>
}

export type VideoConfig = { textTrack?: TextTrackInit[] } & Exclude<MediaSrc, string | AudioSrc>[]
export abstract class ContentVideoPage extends UniContentPage {
  public abstract fetchVideo: (signal?: AbortSignal) => Promise<VideoConfig>
}