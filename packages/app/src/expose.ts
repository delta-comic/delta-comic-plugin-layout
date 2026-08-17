import type { ExposeModel } from '@delta-comic/plugin'

import Children from './components/comment/Children.vue'
import Comment from './components/comment/Comment.vue'
import CommentRow from './components/comment/CommentRow.vue'
import Sender from './components/comment/Sender.vue'
import CreateFavouriteCard from './components/CreateFavouriteCard.vue'
import FavouriteSelect from './components/FavouriteSelect.vue'
import ItemCard from './components/ItemCard.vue'
import ShareButton from './components/ShareButton.vue'
import PreviewUser from './components/user/PreviewUser.vue'
import Default from './layout/Default.vue'
import * as model from './model'
import { createDateString } from './utils/date'
import Image from './view/Image.vue'
import Video from './view/Video.vue'

/**
 * 布局插件对外暴露的完整契约。
 *
 * 本接口通过 `PluginExposeRegistry` 的 module augmentation 注册到
 * `@delta-comic/plugin`，其他插件可声明依赖本插件后，经
 * `pluginModelChannels.expose.get('layout', 'default')` 读取以下能力：
 *
 * - `view`：内容阅读视图（`Image` 图片阅读器、`Video` 视频播放器）
 * - `layout`：内容页整体布局
 * - `model`：内容插件基类与视频/图片配置类型
 * - `component`：可复用的展示与交互组件（条目卡片、分享、收藏、评论等）
 * - `helper`：纯函数工具（日期格式化等）
 *
 * @since 0.9.0
 */
export interface LayoutPluginExpose extends ExposeModel {
  readonly view: { readonly Image: typeof Image; readonly Video: typeof Video }
  readonly layout: { readonly Default: typeof Default }
  readonly model: typeof model
  readonly component: {
    readonly ItemCard: typeof ItemCard
    readonly ShareButton: typeof ShareButton
    readonly FavouriteSelect: typeof FavouriteSelect
    readonly CreateFavouriteCard: typeof CreateFavouriteCard
    readonly comment: {
      readonly Comment: typeof Comment
      readonly Children: typeof Children
      readonly Sender: typeof Sender
      readonly CommentRow: typeof CommentRow
    }
    readonly previewUser: typeof PreviewUser
  }
  readonly helper: { readonly createDateString: typeof createDateString }
}

declare module '@delta-comic/plugin' {
  interface PluginExposeRegistry {
    layout: LayoutPluginExpose
  }
}

/**
 * 插件实际暴露的运行时值，形状与 {@link LayoutPluginExpose} 完全一致。
 *
 * 消费方应优先读取宿主注册表（`pluginModelChannels.expose`），而非直接
 * import 本对象；本对象同时经 `main.ts` 的 `model.expose` 交由宿主登记。
 */
export const expose = {
  view: { Image, Video },
  layout: { Default },
  model,
  component: {
    ItemCard,
    ShareButton,
    FavouriteSelect,
    CreateFavouriteCard,
    comment: { Comment, Children, Sender, CommentRow },
    previewUser: PreviewUser,
  },
  helper: { createDateString },
} as const satisfies LayoutPluginExpose

/** 布局插件暴露契约的类型别名，等价于 {@link LayoutPluginExpose}。 */
export type LibLayout = LayoutPluginExpose