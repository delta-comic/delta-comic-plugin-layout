import { pluginI18n, type PluginLocaleMessages } from '@delta-comic/plugin'

const zhCN = {
  layout: {
    actions: {
      addToRecent: '加入稍后再看？',
      back: '返回',
      backToTop: '返回顶部',
      cancel: '取消',
      confirm: '确定',
      exitFullscreen: '退出全屏',
      favourite: '收藏',
      like: '喜欢',
      newFolder: '新建收藏夹',
      report: '举报',
      retry: '重试',
      settings: '设置',
      share: '分享',
      submit: '提交',
    },
    author: {
      count: '共 {count} 位',
      follow: '关注',
      following: '关注中',
      team: '创作团队',
      unfollow: '取关',
      unfollowing: '取消中',
    },
    comment: {
      closed: '评论区已关闭',
      closedUnavailable: '评论区已关闭（不可用）',
      detail: '评论详情',
      empty: '评论内容不能为空',
      owner: '楼主',
      placeholder: '写下你的留言吧…',
      replies: '共 {count} 条回复',
      reported: '评论已被举报',
      reportPrompt: '确定举报这条评论？',
      sending: '发送中',
      top: '置顶',
    },
    config: {
      image: {
        continuous: '条漫连续阅读',
        doubleImage: '同时显示两张图片',
        preloadImages: '前后预加载图片数量',
        title: '图片阅读器',
        vertical: '垂直翻页',
      },
    },
    manifest: { description: 'Delta Comic 的基础内容布局插件', displayName: '基础布局组件' },
    content: {
      comments: '评论',
      episode: '选集',
      episodeFallback: '第 {number} 话',
      info: '简介',
      reportPrompt: '确定举报该内容？',
      unsafe: '该内容疑似不安全',
      viewCount: '{count} 次浏览',
    },
    date: {
      differentYearFormat: 'YYYY年 M月D日 HH:mm',
      sameYearFormat: 'M月D日 HH:mm',
      todayFormat: '今天 HH:mm',
      yesterdayFormat: '昨天 HH:mm',
    },
    favourite: {
      contentCount: '{count} 个内容',
      creating: '正在创建收藏夹',
      description: '简介',
      name: '名称',
      nameRequired: '请填写名称',
      optional: '可选',
      private: '私密',
      selectionRequired: '请至少选择一个收藏夹',
      selecting: '正在选择收藏夹',
      title: '创建收藏夹',
      selectTitle: '选择收藏夹',
    },
    reader: {
      coverAlt: '封面',
      imageEmpty: '没有可显示的图片',
      imageLoadFailed: '图片加载失败',
      line: '线路 {number}',
      nextPage: '下一页',
      pageProgress: '{current} / {total}',
      previousPage: '上一页',
      source: '播放线路',
      subtitle: '字幕',
      subtitleOff: '关闭字幕',
      unsupportedVideoType: '不支持的视频格式：{type}',
      videoLoadFailed: '视频加载失败',
    },
    share: { title: '分享该内容' },
    user: { previewUnavailable: '该插件没有提供用户卡片' },
  },
}

export const layoutMessages = { 'zh-CN': zhCN } satisfies PluginLocaleMessages

export const translate = (key: string, params?: Record<string, number | string>) =>
  pluginI18n.translate(key, params)

export const translateText = (value: string) => pluginI18n.translateText(value)