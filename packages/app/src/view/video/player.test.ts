import type Artplayer from 'artplayer'
import { describe, expect, it } from 'vitest'

import type { VideoConfig } from '@/model'

import {
  configureArtplayer,
  createPlayerOptions,
  getArtplayerType,
  normalizeVideoConfig,
  type PlayerLabels,
} from './player'

const labels: PlayerLabels = {
  line: number => `Source ${number}`,
  source: 'Video source',
  subtitle: 'Subtitles',
  subtitleOff: 'Off',
  unsupportedType: type => `Unsupported: ${type}`,
  videoLoadFailed: 'Failed',
}

const videoConfig = (...sources: VideoConfig[number][]) => sources as VideoConfig

describe('Artplayer video adapter', () => {
  it('detects HLS by MIME type or file extension and keeps native video formats', () => {
    expect(
      getArtplayerType({ src: 'https://example.com/video', type: 'application/vnd.apple.mpegurl' }),
    ).toBe('m3u8')
    expect(getArtplayerType({ src: 'https://example.com/video.m3u8?token=1' })).toBe('m3u8')
    expect(getArtplayerType({ src: 'https://example.com/video.mp4', type: 'video/mp4' })).toBe(
      'native',
    )
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
})