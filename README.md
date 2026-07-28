# Delta Comic 基础布局插件

[![GitHub](https://img.shields.io/github/license/delta-comic/delta-comic-plugin-layout)](https://github.com/delta-comic/delta-comic-plugin-layout/blob/main/LICENSE)

这是 [Delta Comic](https://github.com/delta-comic/delta-comic) 的官方基础布局插件，提供：

- 内容详情、作者订阅、标签、推荐与评论布局；
- 图片阅读器（翻页、双页、连续阅读）和视频播放器；
- 收藏、点赞、分享、举报与插件配置入口；
- 可由其他插件扩展的 `DcEnvironment` 插槽。

当前代码面向 Delta Comic `>=3.0.0-next.6 <4.0.0`，插件自身不作为 npm 包发布。用户应从 GitHub Release 下载 `plugin.zip` 并通过 Delta Comic 安装；`manifest.json` 同时作为可独立读取的发布元数据提供。

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

发布分支和产物规则见 [发布流程](docs/release-workflow.md)。

## 通用插件模板

新插件可从 [`plugin-template`](plugin-template/README.md) 开始。它是一个可独立复制的完整工程，
包含最小运行时示例、TypeScript 7/`vue-tsgo`、测试覆盖率、产物校验以及同款 CI 发布流程；它不
属于当前根 pnpm workspace，避免模板依赖和布局插件互相耦合。
