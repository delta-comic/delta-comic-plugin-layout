# Delta Comic 基础布局插件

[![GitHub](https://img.shields.io/github/license/delta-comic/delta-comic-plugin-layout)](https://github.com/delta-comic/delta-comic-plugin-layout/blob/main/LICENSE)

这是 [Delta Comic](https://github.com/delta-comic/delta-comic) 的官方基础布局插件，提供：

- 内容详情、作者订阅、标签、推荐与评论布局；
- 图片阅读器（翻页、双页、连续阅读）和 Artplayer 视频播放器；
- 收藏、点赞、分享、举报与插件配置入口；
- 可由其他插件扩展的 `DcEnvironment` 插槽。

当前代码面向 Delta Comic `>=3.0.0-next.16 <4.0.0` 与插件 API v1。每次 GitHub Release 同时发布同版本的 GitHub Package，用户也可以从 Release 下载 `plugin.zip` 并通过 Delta Comic 安装；`manifest.json` 同时作为可独立读取的发布元数据提供。

视频播放器支持 MP4/WebM 等浏览器原生格式及 HLS 线路，提供字幕、倍速、画中画、AirPlay、锁屏和全屏等常用控制。移动端可长按临时切换到 3 倍速，双击播放或暂停。其他内容插件仍通过 `ContentVideoPage.fetchVideo()` 返回 `{ sources, textTrack? }` 配置，其中 `sources` 为线路数组，`textTrack` 可附加 VTT、SRT 或 ASS 字幕。

## 开发

项目使用 Vite+ 和 pnpm workspace：

```sh
vp install
vp run dev
```

提交前运行完整门禁：

```sh
vp check
vp run typecheck
vp test run --coverage
vp run build
vp run artifacts
```

构建产物位于 `packages/app/dist/`。`vp run artifacts` 会验证外置 manifest、压缩包内 manifest 与实际入口文件完全一致。

发布分支和产物规则见 [发布流程](docs/release-workflow.md)。其他插件希望复用布局、阅读器或组件时，见 [布局插件接入指南](docs/plugin-integration.md)。
