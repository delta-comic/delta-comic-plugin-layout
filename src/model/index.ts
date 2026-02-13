import type { AudioSrc, MediaSrc, TextTrackInit } from 'vidstack'

import { PromiseContent, uni } from '@delta-comic/model'

export abstract class ContentImagePage extends uni.content.ContentPage {
  public images = PromiseContent.withResolvers<uni.image.Image[]>()
}

export type VideoConfig = { textTrack?: TextTrackInit[] } & Exclude<MediaSrc, string | AudioSrc>[]
export abstract class ContentVideoPage extends uni.content.ContentPage {
  public videos = PromiseContent.withResolvers<VideoConfig>()
}