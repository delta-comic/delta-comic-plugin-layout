import type { UniImage } from '@delta-comic/model'
import type { Swiper as SwiperClass } from 'swiper'
import type { Component } from 'vue'

import * as model from '../model'

declare module '@delta-comic/ui' {
  export interface GlobalEnvironments {
    'layout::view::image.top-bar': Component<BarProps>
    'layout::view::image.content': Component<ContentProps>
    'layout::view::image.bottom-bar': Component<BarProps>
  }
}

export interface ImageReaderSettings {
  doubleImage: boolean
  isFollowView: boolean
  preloadImages: number
  vertical: boolean
}

export interface BarProps {
  page: model.ContentImagePage
  images: UniImage[]
  swiper?: SwiperClass
  index: number
}

export interface ContentProps {
  page: model.ContentImagePage
  images: UniImage[]
  image: UniImage
  swiper?: SwiperClass
  index: number
}
export enum QueryKey {
  Images = 'layout::view::image',
}