import { Swiper as SwiperClass } from 'swiper';
import { noop } from 'es-toolkit';
export declare const useSwipeDbClick: (onClick?: typeof noop, onDbClick?: typeof noop) => {
    handleTouchstart: (_swiper: SwiperClass, e: TouchEvent | PointerEvent | MouseEvent) => void;
    handleTouchmove: (_swiper: SwiperClass, e: TouchEvent | PointerEvent | MouseEvent) => void;
    handleTouchend: () => void;
    handleDbTap: () => void;
};
