import type { Swiper } from 'swiper'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useSwipeDbClick } from './ui'

const swiper = {} as Swiper
const pointer = (pageX: number, pageY: number) => ({ pageX, pageY }) as PointerEvent

describe('useSwipeDbClick', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
  })

  afterEach(() => vi.useRealTimers())

  it('defers a single tap until the double-tap window closes', () => {
    const click = vi.fn()
    const gesture = useSwipeDbClick(click)

    gesture.handleTouchstart(swiper, pointer(20, 20))
    vi.advanceTimersByTime(50)
    gesture.handleTouchend()
    expect(click).not.toHaveBeenCalled()

    vi.advanceTimersByTime(300)
    expect(click).toHaveBeenCalledOnce()
  })

  it('cancels a pending single tap when a double tap arrives', () => {
    const click = vi.fn()
    const doubleClick = vi.fn()
    const gesture = useSwipeDbClick(click, doubleClick)

    gesture.handleTouchstart(swiper, pointer(20, 20))
    gesture.handleTouchend()
    gesture.handleDbTap()
    vi.runAllTimers()

    expect(click).not.toHaveBeenCalled()
    expect(doubleClick).toHaveBeenCalledOnce()
  })

  it('ignores drags and long presses', () => {
    const click = vi.fn()
    const gesture = useSwipeDbClick(click, undefined, { maxTapDuration: 100, moveThreshold: 10 })

    gesture.handleTouchstart(swiper, pointer(0, 0))
    gesture.handleTouchmove(swiper, pointer(11, 0))
    gesture.handleTouchend()

    gesture.handleTouchstart(swiper, pointer(0, 0))
    vi.advanceTimersByTime(100)
    gesture.handleTouchend()
    vi.runAllTimers()

    expect(click).not.toHaveBeenCalled()
  })

  it('disposes a pending tap timer', () => {
    const click = vi.fn()
    const gesture = useSwipeDbClick(click)
    gesture.handleTouchstart(swiper, pointer(0, 0))
    gesture.handleTouchend()

    gesture.dispose()
    vi.runAllTimers()

    expect(click).not.toHaveBeenCalled()
  })

  it('reads touch coordinates, including the final changed touch', () => {
    const click = vi.fn()
    const gesture = useSwipeDbClick(click, undefined, { moveThreshold: 5 })
    const touch = (touches: { pageX: number; pageY: number }[], changedTouches = touches) =>
      ({ changedTouches, touches }) as unknown as TouchEvent

    gesture.handleTouchstart(swiper, touch([], [{ pageX: 4, pageY: 8 }]))
    gesture.handleTouchmove(swiper, touch([{ pageX: 5, pageY: 9 }]))
    gesture.handleTouchend()
    vi.runAllTimers()

    expect(click).toHaveBeenCalledOnce()
  })
})