# 布局插件接入指南

本文面向**想依赖基础布局插件（`layout`）的内容插件作者**，说明如何通过 Delta Comic
插件体系（`require` 依赖声明 + `PluginExposeRegistry` 类型注册）接入布局插件提供的能力。

## 1. 概述

`@delta-comic/plugin-layout` 是 Delta Comic 的官方基础布局插件，它通过 `model.expose`
向其他插件暴露以下能力（`LayoutPluginExpose`）：

| 能力组 | 内容 | 用途 |
| --- | --- | --- |
| `view` | `Image`、`Video` | 图片阅读器 / 视频播放器视图 |
| `layout` | `Default` | 内容页整体布局组件 |
| `model` | `ContentImagePage`、`ContentVideoPage`、`VideoConfig` 等 | 内容插件基类与视频/图片配置类型 |
| `component` | `ItemCard`、`ShareButton`、`FavouriteSelect`、评论组件等 | 可复用的展示与交互组件 |
| `helper` | `createDateString` | 日期格式化工具 |

依赖方需要完成三件事：

1. 在 `manifest.json` 的 `require` 中声明对 `layout` 的依赖；
2. 通过 module augmentation 声明 `layout` 暴露的契约类型；
3. 在运行时经 `pluginModelChannels.expose` 读取暴露值。

> 版本基线：本文示例针对插件 API v1、布局插件 `0.9.2+`。跨版本时请以
> 实际安装版本的 `LayoutPluginExpose` 声明为准。

## 2. 声明依赖

在插件的 `manifest.json` 中把 `layout` 加入 `require`，`download` 指向布局插件的
`plugin.zip` 发布资产：

```jsonc
{
  "apiVersion": 1,
  "name": { "id": "my-content", "display": "My Content" },
  "version": { "plugin": "1.0.0", "supportCore": ">=3.0.0-next.15 <4.0.0" },
  "author": "you",
  "description": "demo",
  "require": [
    { "id": "core" },
    {
      "id": "layout",
      "download": "https://github.com/delta-comic/delta-comic-plugin-layout/releases/download/0.9.2/plugin.zip"
    }
  ]
}
```

- `require.id` 必须等于布局插件 `manifest.name.id`，即 `layout`；
- 宿主会按依赖图排序，先激活 `layout` 再激活你的插件；
- 预览版地址会随 `next` 晋级而更新，稳定发布后可改用 `main` 分支对应版本的下载地址。

## 3. 注册契约类型

在插件的入口（或类型声明文件）中用 module augmentation 扩展 `PluginExposeRegistry`，
声明"依赖插件暴露的契约"：

```ts
import type { LayoutPluginExpose } from '@delta-comic/plugin-layout'

declare module '@delta-comic/plugin' {
  interface PluginExposeRegistry {
    layout: LayoutPluginExpose
  }
}
```

> 远程 zip 插件无法 import 布局插件的源码包。若你的插件以源码仓库形式与宿主一起构建
> （内置插件），可直接 `import type`；远程插件通常只需使用读取到的值的推断类型，
> 或在本地以相同结构声明契约（见 §4 的局部声明示例）。

## 4. 读取暴露值

运行时期望在宿主完成插件激活后（如 `onBooted` 生命周期）读取：

```ts
import { pluginModelChannels } from '@delta-comic/plugin'

const contribution = pluginModelChannels.expose.get('layout', 'default')
if (!contribution) {
  // layout 未启用或未注册
  return
}
const { view, model, component, helper } = contribution.value
```

`get` 返回 `Contribution<LayoutPluginExpose> | undefined`：

```ts
interface Contribution<T> {
  readonly owner: string // 'layout'
  readonly id: string // 'default'
  readonly value: T // LayoutPluginExpose
}
```

远程插件拿不到 `LayoutPluginExpose` 类型时，可以只声明自己用到的子集（保持字段名与
形状一致，宿主注册时也会校验）：

```ts
interface LayoutExposeSubset {
  readonly model: {
    readonly ContentVideoPage: new () => unknown
    readonly ContentImagePage: new () => unknown
    readonly VideoConfig: unknown
  }
}
declare module '@delta-comic/plugin' {
  interface PluginExposeRegistry {
    layout: LayoutExposeSubset
  }
}
```

## 5. 暴露契约详解

### 5.1 `view` — 阅读视图

| 成员 | 类型 | Props |
| --- | --- | --- |
| `Image` | Vue 组件 | `page: ContentImagePage`、`union?: UniItem` |
| `Video` | Vue 组件 | `page: ContentVideoPage`、`union?: UniItem` |

内容插件只需实现对应的页面基类并把页面对象传给视图组件，即可获得完整的
图片阅读器（翻页 / 双页 / 连续阅读）或 Artplayer 视频播放器（HLS、字幕、倍速等）。

### 5.2 `layout` — 内容页布局

| 成员 | 类型 | Props |
| --- | --- | --- |
| `Default` | Vue 组件 | `page: UniContentPage`、`isR18g?: boolean` |

`Default` 是内容页的整体布局（详情、作者订阅、标签、推荐、评论与阅读器），
其他插件一般不需要替换它，而是通过 `model.content` 注册自己的
`ContentPage` / `Layout` 组件与它协作。

### 5.3 `model` — 内容基类与配置类型

```ts
export abstract class ContentImagePage extends UniContentPage {
  public abstract fetchImages: (signal?: AbortSignal) => Promise<UniImage[]>
}

export abstract class ContentVideoPage extends UniContentPage {
  public abstract fetchVideo: (signal?: AbortSignal) => Promise<VideoConfig>
}

export interface VideoConfig {
  sources: VideoSource[] // 至少一项，否则播放器初始化失败
  textTrack?: VideoTextTrack[]
}

export interface VideoSource {
  default?: boolean
  label?: string
  src: string
  type?: string // MIME 类型，如 video/mp4、application/vnd.apple.mpegurl
}

export interface VideoTextTrack {
  default?: boolean
  encoding?: string
  kind?: 'captions' | 'subtitles'
  label?: string
  language?: string
  src: string
  type?: 'ass' | 'srt' | 'vtt'
}
```

这是内容插件与布局插件之间最重要的契约：

- **图片内容插件**：继承 `ContentImagePage` 并实现 `fetchImages`，把实例交给
  `view.Image`；
- **视频内容插件**：继承 `ContentVideoPage` 并实现 `fetchVideo`，把实例交给
  `view.Video`。返回的 `sources` 不能为空数组；`default: true` 的源会被优先选中；
  支持 `m3u8` 的 HLS 线路（按 MIME 或 `.m3u8` 后缀识别）与浏览器原生格式。

### 5.4 `component` — 可复用组件

| 成员 | Props 要点 | 用途 |
| --- | --- | --- |
| `ItemCard` | `item: UniItem \| UniItemRaw`，`type?: 'big' \| 'default' \| 'small'`，`disabled?`、`freeHeight?`，`click` 事件 | 条目卡片（封面 + 标题），可自定义 `cover`/`default`/`smallTopInfo` 插槽 |
| `ShareButton` | `page: UniContentPage` | 分享入口按钮（配合 `social.share` 使用） |
| `FavouriteSelect` | `item: UniItem`，`plain?: boolean` | 收藏选择器 |
| `CreateFavouriteCard` | 暴露 `create()` 方法 | 新建收藏夹卡片 |
| `comment.Comment` | `item: UniItem`、`fetchComments: StreamQuery<UniComment>` | 主评论流（含输入框、分页、点赞与举报） |
| `comment.Children` | `item: UniItem` | 子评论（楼中楼），暴露 `loadChild()` |
| `comment.Sender` | `aim: UniComment \| UniItem`、`item: UniItem` | 评论输入框 |
| `comment.CommentRow` | `comment: UniComment`、`item: UniItem` 等，含 `action`/`avatar`/`description`/`reply`/`userExtra` 插槽 | 单条评论行（默认实现） |
| `previewUser` | 暴露 `show()` | 用户预览弹层 |

评论组件通过 `UniComment.commentRow` 注册表支持自定义评论行（见 `@delta-comic/model`
的 `UniComment`），`Comment` 默认使用 `CommentRow`，其他插件可注册自己的实现。

### 5.5 `helper` — 工具函数

```ts
createDateString(
  value: ConfigType | Dayjs = dayjs(),
  labels: DateFormatLabels = defaultLabels, // 不同年/同年/今天/昨天四种格式
  now: Dayjs = dayjs(),
): string // 无效日期返回 ''
```

按"今天 / 昨天 / 同年 / 跨年"四种规则格式化日期，`labels` 建议传入 i18n 文案。

## 6. 完整示例

一个"视频内容插件"接入布局插件的骨架。页面类只需实现 `fetchVideo`
（满足 `ContentVideoPage` 的结构契约），视图组件从布局插件的暴露值中读取：

```ts
import { defineDeltaComicPlugin, pluginModelChannels } from '@delta-comic/plugin'
import { UniContentPage, type UniItem } from '@delta-comic/model'
import type { LayoutPluginExpose } from '@delta-comic/plugin-layout'

declare module '@delta-comic/plugin' {
  interface PluginExposeRegistry {
    layout: LayoutPluginExpose
  }
}

class MyVideoPage extends UniContentPage {
  // 以下为 UniContentPage 抽象成员，按内容插件规范实现
  public async fetchVideo(signal?: AbortSignal) {
    return {
      sources: [
        { default: true, label: '超清', src: 'https://cdn.example.com/a.m3u8' },
        { label: 'MP4', src: 'https://cdn.example.com/a.mp4', type: 'video/mp4' },
      ],
      textTrack: [
        {
          default: true,
          label: '简体',
          language: 'zh-CN',
          src: 'https://cdn.example.com/a.zh.srt',
          type: 'srt',
        },
      ],
    }
  }
}

const useVideoView = () => {
  const contribution = pluginModelChannels.expose.get('layout', 'default')
  if (!contribution) throw new Error('layout plugin is not enabled')
  return contribution.value.view.Video
}

export default defineDeltaComicPlugin({
  name: 'my-content',
  i18n: {
    'zh-CN': { 'my-content.name': '我的视频' },
  },
})
```

> `MyVideoPage` 的类声明与内容注册（`Content.Model` 中的 `ContentPage`/`ItemCard`/
> `Layout` 等字段）以 `@delta-comic/plugin` 与 `@delta-comic/model` 的实际类型为准；
> 上面只列出与布局插件契约相关的部分。宿主会根据内容类型把 `view.Image` / `view.Video`
> 作为对应内容页的视图渲染。

## 7. 注意事项

1. **依赖顺序**：宿主按 `require` 依赖图串行激活，`layout` 一定先于你的插件激活，
   但 `onBooted` 之前不保证注册表已就绪；读取失败应降级而非崩溃。
2. **只读契约**：`LayoutPluginExpose` 全部字段为 `readonly`，不要修改暴露值；
   跨插件调用请用实际存在的 `SharedFunction.call(name, ...args)`；需要按插件筛选时，
   使用宿主提供的按插件调用 API。
3. **导入约束**：远程插件只能从 `@delta-comic/{plugin,model,utils,ui,db,logger}` 顶层导入，
   不得 import 子路径；`@delta-comic/plugin-layout` 的源码包仅内置插件（与宿主同仓库
   构建）可直接引用。
4. **i18n**：插件内所有用户可见字符串必须使用 `pluginI18n.translate(key)`，不要直接
    使用布局插件导出的简体中文文案。
5. **版本匹配**：`require.download` 应指向与 `supportCore` 兼容的布局插件版本；
   预览版（`-next.N`）与稳定版契约可能不同，升级前先核对 §5 中的签名。
