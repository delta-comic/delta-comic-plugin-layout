import type Artplayer from 'artplayer'
import type { Option } from 'artplayer'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { VideoConfig } from '@/model'

import {
  ArtplayerRuntime,
  configureArtplayer,
  createPlayerOptions,
  getArtplayerType,
  normalizeVideoConfig,
  type PlayerLabels,
} from '../../../src/view/video/player'

const labels: PlayerLabels = {
  line: number => `Source ${number}`,
  source: 'Video source',
  subtitle: 'Subtitles',
  subtitleOff: 'Off',
  unsupportedType: type => `Unsupported: ${type}`,
  videoLoadFailed: 'Failed',
}

const videoConfig = (...sources: VideoConfig['sources']): VideoConfig => ({ sources })

class FakeArtplayer {
  public static FAST_FORWARD_VALUE = 2
  public static MOBILE_DBCLICK_PLAY = false
  public readonly handlers = new Map<string, (...args: unknown[]) => unknown>()
  public hls?: unknown
  public isDestroy = false
  public notice = { show: '' as string | Error | false }
  public option: Option
  public subtitle = { show: true, switch: vi.fn() }

  public constructor(option: Option) {
    this.option = option
  }

  public once(name: string, handler: (...args: unknown[]) => unknown) {
    this.handlers.set(name, handler)
    return this
  }

  public destroy() {
    this.isDestroy = true
    this.handlers.get('destroy')?.()
  }
}

afterEach(() => {
  Reflect.deleteProperty(window, 'Artplayer')
  document.querySelector('#artplayer-style')?.remove()
})

describe('Artplayer video adapter', () => {
  it('detects HLS by MIME type or file extension and keeps native video formats', () => {
    expect(
      getArtplayerType({ src: 'https://example.com/video', type: 'application/vnd.apple.mpegurl' }),
    ).toBe('m3u8')
    expect(getArtplayerType({ src: 'https://example.com/video.m3u8?token=1' })).toBe('m3u8')
    expect(getArtplayerType({ src: 'https://example.com/video.mp4', type: 'video/mp4' })).toBe(
      'native',
    )
    expect(
      getArtplayerType(
        { src: 'https://example.com/video.custom', type: 'video/x-custom' },
        () => 'probably',
      ),
    ).toBe('native')
    expect(() =>
      getArtplayerType(
        { src: 'https://example.com/video.custom', type: 'video/x-custom' },
        () => '',
      ),
    ).toThrow('video/x-custom')
    expect(() =>
      getArtplayerType({ src: 'https://example.com/video.mpd', type: 'application/dash+xml' }),
    ).toThrow('application/dash+xml')
  })

  it('normalizes line labels and honors the explicitly selected default line', () => {
    const config = videoConfig(
      { src: 'one.mp4', type: 'video/mp4' },
      { default: true, label: 'HD', src: 'two.m3u8' },
    )
    const result = normalizeVideoConfig(config, labels)

    expect(result.sources.map(source => source.label)).toEqual(['Source 1', 'HD'])
    expect(result.defaultSource.src).toBe('two.m3u8')
  })

  it('enables common controls, mobile gestures, sources, and URL subtitles', () => {
    const config = videoConfig(
      { default: true, src: 'one.mp4', type: 'video/mp4' },
      { src: 'two.m3u8' },
    )
    config.textTrack = [
      { default: true, label: 'English', language: 'en', src: 'subtitle.vtt', type: 'vtt' },
    ]

    const option = createPlayerOptions(document.createElement('div'), config, labels)

    expect(option).toMatchObject({
      airplay: true,
      fastForward: true,
      fullscreen: true,
      fullscreenWeb: true,
      gesture: true,
      lock: true,
      pip: true,
      playbackRate: true,
      playsInline: true,
      subtitle: { type: 'vtt', url: 'subtitle.vtt' },
      subtitleOffset: true,
      type: 'native',
      url: 'one.mp4',
    })
    expect(option.settings).toHaveLength(2)
    expect(option.settings?.[0]?.selector?.map(item => item.html)).toEqual(['Source 1', 'Source 2'])
  })

  it('sets long press to temporary 3x speed and enables mobile double-tap playback', () => {
    const constructor = { FAST_FORWARD_VALUE: 2, MOBILE_DBCLICK_PLAY: false }
    configureArtplayer(constructor as typeof Artplayer)

    expect(constructor).toEqual({ FAST_FORWARD_VALUE: 3, MOBILE_DBCLICK_PLAY: true })
  })

  it('returns a localized error for empty and unsupported configurations', () => {
    expect(() => normalizeVideoConfig(videoConfig(), labels)).toThrow('Failed')
    expect(() =>
      normalizeVideoConfig(
        videoConfig({ src: 'https://example.com/video.mpd', type: 'application/dash+xml' }),
        labels,
      ),
    ).toThrow('Unsupported: application/dash+xml')
  })

  it('switches URL subtitles on and off from Artplayer settings', () => {
    const config = videoConfig({ src: 'video.mp4' })
    config.textTrack = [
      { default: true, label: 'English', src: 'en.vtt', type: 'vtt' },
      { encoding: 'gbk', label: '中文', src: 'zh.srt', type: 'srt' },
    ]
    const option = createPlayerOptions(document.createElement('div'), config, labels)
    const setting = option.settings?.[0]
    const fake = { subtitle: { show: true, switch: vi.fn() } }

    setting?.onSelect?.call(
      fake as Artplayer,
      { html: 'Off', url: '' } as never,
      {} as never,
      new Event('click'),
    )
    expect(fake.subtitle.show).toBe(false)

    setting?.onSelect?.call(
      fake as Artplayer,
      { encoding: 'gbk', html: '中文', type: 'srt', url: 'zh.srt' } as never,
      {} as never,
      new Event('click'),
    )
    expect(fake.subtitle.show).toBe(true)
    expect(fake.subtitle.switch).toHaveBeenCalledWith('zh.srt', {
      encoding: 'gbk',
      name: '中文',
      type: 'srt',
    })
  })

  it('owns Artplayer instances and restores module globals on unload', async () => {
    const loader = vi.fn(async () => {
      ;(window as Window & { Artplayer?: unknown }).Artplayer = FakeArtplayer
      const style = document.createElement('style')
      style.id = 'artplayer-style'
      document.head.append(style)
      return { default: FakeArtplayer as typeof Artplayer }
    })
    const runtime = new ArtplayerRuntime(loader)
    const option = createPlayerOptions(
      document.createElement('div'),
      videoConfig({ src: 'video.mp4' }),
      labels,
    )

    const art = await runtime.create(option, labels)
    expect(loader).toHaveBeenCalledOnce()
    expect(FakeArtplayer.FAST_FORWARD_VALUE).toBe(3)
    expect(FakeArtplayer.MOBILE_DBCLICK_PLAY).toBe(true)

    const video = document.createElement('video')
    await art.option.customType?.native?.call(art, video, 'next.mp4', art)
    expect(video.src.endsWith('/next.mp4')).toBe(true)
    vi.spyOn(video, 'canPlayType').mockReturnValue('maybe')
    await art.option.customType?.m3u8?.call(art, video, 'stream.m3u8', art)
    expect(video.src.endsWith('/stream.m3u8')).toBe(true)

    runtime.disposeAll()
    expect(art.isDestroy).toBe(true)
    expect(window).not.toHaveProperty('Artplayer')
    expect(document.querySelector('#artplayer-style')).toBeNull()
  })

  it('preserves globals and styles that existed before Artplayer loaded', async () => {
    const previous = { version: 'host' }
    ;(window as Window & { Artplayer?: unknown }).Artplayer = previous
    const style = document.createElement('style')
    style.id = 'artplayer-style'
    document.head.append(style)
    const runtime = new ArtplayerRuntime(async () => ({
      default: FakeArtplayer as typeof Artplayer,
    }))

    const art = await runtime.create(
      createPlayerOptions(document.createElement('div'), videoConfig({ src: 'video.mp4' }), labels),
      labels,
    )
    runtime.destroy(null)
    runtime.destroy(art)
    runtime.destroy(art)
    runtime.disposeAll()

    expect((window as Window & { Artplayer?: unknown }).Artplayer).toBe(previous)
    expect(document.querySelector('#artplayer-style')).toBe(style)
  })
})