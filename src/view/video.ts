import type { MediaPlayerElement } from 'vidstack/elements'

import * as model from '../model'

export interface BarProps {
  player: MediaPlayerElement | null
  page: model.ContentVideoPage
  isFullscreen: boolean
}