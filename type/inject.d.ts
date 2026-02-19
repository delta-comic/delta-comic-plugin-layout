import { Component } from 'vue'
declare module '@delta-comic/plugin' {
  interface GlobalInjections {
    'layout::view::image::bottom-bar': Component<{}>
  }
}