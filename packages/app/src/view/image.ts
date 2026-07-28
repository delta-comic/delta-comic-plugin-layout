import type { UniImage } from '@delta-comic/model'
import type { Swiper as SwiperClass } from 'swiper'

import * as model from '../model'

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