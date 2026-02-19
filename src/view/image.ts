import type { uni } from '@delta-comic/model'
import type { Swiper as SwiperClass } from 'swiper'

import * as model from '../model'

export interface BarProps {
  page: model.ContentImagePage
  images: uni.image.Image[]
  swiper?: SwiperClass
  index: number
}

export interface ContentProps {
  page: model.ContentImagePage
  images: uni.image.Image[]
  image: uni.image.Image
  swiper: SwiperClass
  index: number
}