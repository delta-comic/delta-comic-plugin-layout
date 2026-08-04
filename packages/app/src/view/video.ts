import type Artplayer from 'artplayer'

import * as model from '../model'

export interface BarProps {
  player: Artplayer | null
  page: model.ContentVideoPage
  isFullscreen: boolean
}
export enum QueryKey {
  Videos = 'layout::view::video',
}