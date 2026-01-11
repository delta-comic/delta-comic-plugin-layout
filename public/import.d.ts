import type { uni, DependDefine } from 'delta-comic-core'
export type LayoutPlugin = DependDefine<{
  view: Record<'Image' | 'Video', uni.content.ViewComp>
  layout: Record<'Default', uni.content.ViewLayoutComp>
}>