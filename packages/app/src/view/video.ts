import type Artplayer from 'artplayer'
import type { Component } from 'vue'

import * as model from '../model'

declare module '@delta-comic/ui' {
  export interface GlobalEnvironments {
    'layout::view::video.top-bar': Component<BarProps>
    'layout::view::video.center-bar': Component<BarProps>
    'layout::view::video.bottom-bar': Component<BarProps>
    'layout::view::video.content': Component<BarProps>
  }
}

export interface BarProps {
  player: Artplayer | null
  page: model.ContentVideoPage
  isFullscreen: boolean
}
export enum QueryKey {
  Videos = 'layout::view::video',
}