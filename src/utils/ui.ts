import type { Swiper as SwiperClass } from 'swiper'

import { noop } from 'es-toolkit'

export const useSwipeDbClick = (onClick = noop, onDbClick = noop) => {
  let touchStartTime = 0
  let touchStartX = 0
  let touchStartY = 0
  let isDragging = false
  let tapEventTimerId = 0

  const THRESHOLD = 200 // 单击的时间阈值（毫秒）
  const MOVE_THRESHOLD = 30 // 拖动的滑动距离阈值
  return {
    handleTouchstart: (_swiper: SwiperClass, e: TouchEvent | PointerEvent | MouseEvent) => {
      if (e instanceof TouchEvent) {
        var pageX = e.touches[0].pageX
        var pageY = e.touches[0].pageY
      } else {
        var pageX = e.pageX
        var pageY = e.pageY
      }
      touchStartTime = Date.now() // 记录触摸开始的时间
      touchStartX = pageX
      touchStartY = pageY
      isDragging = false
    },
    handleTouchmove: (_swiper: SwiperClass, e: TouchEvent | PointerEvent | MouseEvent) => {
      if (e instanceof TouchEvent) {
        var pageX = e.touches[0].pageX
        var pageY = e.touches[0].pageY
      } else {
        var pageX = e.pageX
        var pageY = e.pageY
      }
      const distanceX = Math.abs(pageX - touchStartX)
      const distanceY = Math.abs(pageY - touchStartY)

      // 如果滑动距离超过阈值，则认为是拖动
      if (distanceX > MOVE_THRESHOLD || distanceY > MOVE_THRESHOLD) {
        isDragging = true
      }
    },
    handleTouchend: () => {
      const touchEndTime = Date.now()
      // 判断是否为单击
      if (!isDragging && touchEndTime - touchStartTime < THRESHOLD && tapEventTimerId === 0) {
        tapEventTimerId = <number>(<any>setTimeout(() => {
          tapEventTimerId = 0
          onClick()
        }, 300))
      }
    },
    handleDbTap: () => {
      clearTimeout(tapEventTimerId)
      tapEventTimerId = 0
      onDbClick()
    }
  }
}