import { noop } from 'es-toolkit'
import { Swiper as SwiperClass } from 'swiper'
export declare const useSwipeDbClick: (
  onClick?: typeof noop,
  onDbClick?: typeof noop
) => {
  handleTouchstart: (_swiper: SwiperClass, e: TouchEvent | PointerEvent | MouseEvent) => void
  handleTouchmove: (_swiper: SwiperClass, e: TouchEvent | PointerEvent | MouseEvent) => void
  handleTouchend: () => void
  handleDbTap: () => void
}