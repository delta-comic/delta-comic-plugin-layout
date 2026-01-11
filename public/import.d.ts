import type { uni } from 'delta-comic-core'
export type LayoutPlugin = {
  view: Record<'Image' | 'Video', uni.content.ViewComp>
  layout: Record<'Default', uni.content.ViewLayoutComp>
}