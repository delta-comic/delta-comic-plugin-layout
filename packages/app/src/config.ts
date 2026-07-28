import { ConfigPointer } from '@delta-comic/plugin'

export const imageViewConfig = new ConfigPointer(
  'layout.view.image',
  {
    doubleImage: { type: 'switch', defaultValue: false, info: 'layout.config.image.doubleImage' },
    preloadImages: {
      type: 'number',
      defaultValue: 2,
      info: 'layout.config.image.preloadImages',
      range: [1, 10],
      float: false,
    },
    isFollowView: { type: 'switch', defaultValue: false, info: 'layout.config.image.continuous' },
    vertical: { type: 'switch', defaultValue: false, info: 'layout.config.image.vertical' },
  },
  'layout.config.image.title',
)