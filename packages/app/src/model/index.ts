import { UniContentPage, type UniImage } from '@delta-comic/model'

export abstract class ContentImagePage extends UniContentPage {
  public abstract fetchImages: (signal?: AbortSignal) => Promise<UniImage[]>
}

export interface VideoSource {
  default?: boolean
  label?: string
  src: string
  type?: string
}

export interface VideoTextTrack {
  default?: boolean
  encoding?: string
  kind?: 'captions' | 'subtitles'
  label?: string
  language?: string
  src: string
  type?: 'ass' | 'srt' | 'vtt'
}

export interface VideoConfig {
  sources: VideoSource[]
  textTrack?: VideoTextTrack[]
}

export abstract class ContentVideoPage extends UniContentPage {
  public abstract fetchVideo: (signal?: AbortSignal) => Promise<VideoConfig>
}