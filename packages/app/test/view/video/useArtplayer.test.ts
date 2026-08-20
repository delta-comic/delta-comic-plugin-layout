import type Artplayer from 'artplayer'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, h, nextTick, shallowRef } from 'vue'

import type { VideoConfig } from '@/model'

import type { ArtplayerRuntime, PlayerLabels } from '../../../src/view/video/player'

const serviceMocks = vi.hoisted(() => ({ useFullscreen: vi.fn(), useRouter: vi.fn() }))

vi.mock('@delta-comic/utils', () => ({ useFullscreen: serviceMocks.useFullscreen }))
vi.mock('vue-router', () => ({ useRouter: serviceMocks.useRouter }))

import { useArtplayer } from '../../../src/view/video/useArtplayer'

const labels: PlayerLabels = {
  line: index => `Source ${index}`,
  source: 'Video source',
  subtitle: 'Subtitles',
  subtitleOff: 'Off',
  unsupportedType: type => `Unsupported: ${type}`,
  videoLoadFailed: 'Failed',
}

class FakePlayer {
  public fullscreen = false
  public fullscreenWeb = false
  public isDestroy = false
  public notice = { show: '' as string | Error | false }
  public poster = ''
  readonly #events = new Map<string, (...args: never[]) => unknown>()

  public on(name: string, handler: (...args: never[]) => unknown) {
    this.#events.set(name, handler)
    return this
  }

  public emit(name: string, ...args: never[]) {
    this.#events.get(name)?.(...args)
  }
}

const flush = async () => {
  await nextTick()
  await Promise.resolve()
  await nextTick()
}

const mountedApps: ReturnType<typeof createApp>[] = []

beforeEach(() => {
  serviceMocks.useFullscreen.mockReset()
  serviceMocks.useRouter.mockReset()
})

afterEach(() => {
  for (const app of mountedApps.splice(0)) app.unmount()
})

const mountComposable = (runtime: ArtplayerRuntime, config?: VideoConfig) => {
  const isFullscreen = shallowRef(false)
  const fullscreen = {
    entry: vi.fn(async () => (isFullscreen.value = true)),
    exit: vi.fn(async () => (isFullscreen.value = false)),
    isFullscreen,
  }
  const removeGuard = vi.fn()
  const beforeEach = vi.fn(() => removeGuard)
  serviceMocks.useFullscreen.mockReturnValue(fullscreen)
  serviceMocks.useRouter.mockReturnValue({ beforeEach })

  const container = shallowRef(document.createElement('div'))
  const poster = shallowRef<string>()
  const videoConfig = shallowRef(config)
  let result!: ReturnType<typeof useArtplayer>
  const app = createApp({
    setup() {
      result = useArtplayer({ config: videoConfig, container, labels, poster, runtime })
      return () => h('div')
    },
  })
  app.mount(document.createElement('div'))
  mountedApps.push(app)
  return { app, beforeEach, fullscreen, isFullscreen, poster, removeGuard, result, videoConfig }
}

describe('useArtplayer', () => {
  it('creates the player, forwards control/errors, and reloads it', async () => {
    const player = new FakePlayer()
    const runtime = {
      create: vi.fn(async () => player as Artplayer),
      destroy: vi.fn((value?: FakePlayer | null) => {
        if (value) value.isDestroy = true
      }),
    } as ArtplayerRuntime
    const mounted = mountComposable(runtime, { sources: [{ src: 'video.mp4' }] })
    await flush()

    expect(runtime.create).toHaveBeenCalledOnce()
    expect(mounted.result.player.value).toBe(player)
    player.emit('control', false as never)
    expect(mounted.result.controlsVisible.value).toBe(false)

    const error = new Error('broken video')
    player.emit('video:error', error as never)
    expect(mounted.result.error.value).toBe(error)
    expect(player.notice.show).toBe('Failed')

    mounted.result.reload()
    await flush()
    expect(runtime.create).toHaveBeenCalledTimes(2)
    expect(runtime.destroy).toHaveBeenCalled()
  })

  it('synchronizes Artplayer and host fullscreen state', async () => {
    const player = new FakePlayer()
    const runtime = {
      create: vi.fn(async () => player as Artplayer),
      destroy: vi.fn(),
    } as ArtplayerRuntime
    const mounted = mountComposable(runtime, { sources: [{ src: 'video.mp4' }] })
    await flush()

    player.emit('fullscreen', true as never)
    await flush()
    expect(mounted.fullscreen.entry).toHaveBeenCalledOnce()
    expect(player.fullscreen).toBe(true)

    mounted.isFullscreen.value = false
    player.fullscreenWeb = true
    await flush()
    expect(player.fullscreen).toBe(false)
    expect(player.fullscreenWeb).toBe(false)
  })

  it('updates the poster in place without rebuilding the player', async () => {
    const player = new FakePlayer()
    const runtime = {
      create: vi.fn(async () => player as Artplayer),
      destroy: vi.fn(),
    } as ArtplayerRuntime
    const mounted = mountComposable(runtime, { sources: [{ src: 'video.mp4' }] })
    await flush()

    mounted.poster.value = 'cover.webp'
    await flush()

    expect(player.poster).toBe('cover.webp')
    expect(runtime.create).toHaveBeenCalledOnce()
  })

  it('rebuilds the player when the video configuration changes', async () => {
    const players = [new FakePlayer(), new FakePlayer()]
    const runtime = {
      create: vi.fn(async () => players.shift() as Artplayer),
      destroy: vi.fn(),
    } as ArtplayerRuntime
    const mounted = mountComposable(runtime, { sources: [{ src: 'video.mp4' }] })
    await flush()

    mounted.videoConfig.value = { sources: [{ src: 'next.webm', type: 'video/webm' }] }
    await flush()

    expect(runtime.create).toHaveBeenCalledTimes(2)
    expect(runtime.destroy).toHaveBeenCalled()
  })

  it('surfaces construction failures and skips absent video configurations', async () => {
    const failure = new Error('construction failed')
    const runtime = {
      create: vi.fn(async () => Promise.reject(failure)),
      destroy: vi.fn(),
    } as ArtplayerRuntime
    const mounted = mountComposable(runtime)
    await flush()
    expect(runtime.create).not.toHaveBeenCalled()

    mounted.videoConfig.value = { sources: [{ src: 'video.mp4' }] }
    await flush()
    expect(mounted.result.error.value).toBe(failure)
  })

  it('cleans up the player, route guard, fullscreen, and orientation on unmount', async () => {
    const player = new FakePlayer()
    const runtime = {
      create: vi.fn(async () => player as Artplayer),
      destroy: vi.fn(),
    } as ArtplayerRuntime
    const mounted = mountComposable(runtime, { sources: [{ src: 'video.mp4' }] })
    await flush()

    mounted.app.unmount()
    mountedApps.pop()
    await flush()
    expect(mounted.removeGuard).toHaveBeenCalledOnce()
    expect(mounted.fullscreen.exit).toHaveBeenCalled()
    expect(runtime.destroy).toHaveBeenCalledWith(player)
  })
})