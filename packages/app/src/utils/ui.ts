import { noop } from 'es-toolkit'
import type { Swiper as SwiperClass } from 'swiper'

type GestureEvent = MouseEvent | PointerEvent | TouchEvent

interface SwipeDoubleClickOptions {
  clickDelay?: number
  maxTapDuration?: number
  moveThreshold?: number
}

const eventPoint = (event: GestureEvent) => {
  if ('touches' in event) {
    const touch = event.touches[0] ?? event.changedTouches[0]
    return { x: touch?.pageX ?? 0, y: touch?.pageY ?? 0 }
  }
  return { x: event.pageX, y: event.pageY }
}

export const useSwipeDbClick = (
  onClick = noop,
  onDbClick = noop,
  options: SwipeDoubleClickOptions = {},
) => {
  const { clickDelay = 300, maxTapDuration = 200, moveThreshold = 30 } = options
  let touchStartTime = 0
  let touchStartX = 0
  let touchStartY = 0
  let isDragging = false
  let tapTimer: ReturnType<typeof setTimeout> | undefined

  const clearTapTimer = () => {
    if (tapTimer === undefined) return
    clearTimeout(tapTimer)
    tapTimer = undefined
  }

  return {
    dispose: clearTapTimer,
    handleDbTap: () => {
      clearTapTimer()
      onDbClick()
    },
    handleTouchend: () => {
      if (isDragging || Date.now() - touchStartTime >= maxTapDuration || tapTimer !== undefined) {
        return
      }
      tapTimer = setTimeout(() => {
        tapTimer = undefined
        onClick()
      }, clickDelay)
    },
    handleTouchmove: (_swiper: SwiperClass, event: GestureEvent) => {
      const { x, y } = eventPoint(event)
      if (Math.abs(x - touchStartX) > moveThreshold || Math.abs(y - touchStartY) > moveThreshold) {
        isDragging = true
      }
    },
    handleTouchstart: (_swiper: SwiperClass, event: GestureEvent) => {
      const { x, y } = eventPoint(event)
      touchStartTime = Date.now()
      touchStartX = x
      touchStartY = y
      isDragging = false
    },
  }
}