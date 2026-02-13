import { ConfigPointer } from '@delta-comic/plugin'

export const imageViewConfig = new ConfigPointer(
  'core.view.image',
  {
    doubleImage: { type: 'switch', defaultValue: false, info: '同时显示两个图片' },
    preloadImages: {
      type: 'number',
      defaultValue: 2,
      info: '图片前后预加载数量',
      range: [1, 10],
      float: false
    },
    isFollowView: { type: 'switch', defaultValue: false, info: '条漫连贯阅读' }
  },
  '布局'
)