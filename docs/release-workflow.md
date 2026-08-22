# 发布流程

项目使用 Conventional Commits 与 semantic-release 计算版本。每次发布由同一个 semantic-release 生命周期直接发布 `packages/app` workspace 包，并同时创建 GitHub Release，二者使用完全相同的版本号。

| 分支 | 用途 | 发布结果 |
| --- | --- | --- |
| `develop` | 日常开发与集成 | 不发布 |
| `next` | 预发布验证 | `x.y.z-next.N` GitHub Package 与 prerelease |
| `main` | 稳定版本 | `x.y.z` GitHub Package 与 release |

`fix:` 触发补丁版本，`feat:` 触发次版本，`!` 或 `BREAKING CHANGE` 触发主版本。推送到 `next` 或 `main` 后，发布工作流会重新安装锁定依赖，执行检查和覆盖率测试，再把 semantic-release 计算的版本通过 `DELTA_PLUGIN_VERSION` 注入构建。

每个 Release 只上传以下两个资产：

- `manifest.json`：供市场或安装器直接读取的元数据；
- `plugin.zip`：包含 `manifest.json`、`index.js` 与 `index.css` 的可安装插件包。

GitHub Package 名称为 `@delta-comic/plugin-layout`，由 `packages/app/package.json` 直接定义并发布，只包含该包声明的 `dist` 目录；发布时使用 `next` 或 `latest` dist-tag。

semantic-release 会把计算出的版本写入 `packages/app/package.json`，再构建并直接发布该 workspace 包。插件构建目录始终是 `packages/app/dist`，不会再复制到根目录的临时 `dist/release` 或 `dist/package`。

## 分支晋级

发布必须通过分支晋级脚本触发 GitHub Actions，不直接手动创建 tag 或 GitHub Release。脚本会拒绝脏工作区和未与远端同步的源分支，不使用 force push，并在操作结束后切回源分支。

仓库只有 `main` 时，可先建立 `develop`：

```sh
vp run --no-cache branch:develop:dry-run
vp run --no-cache branch:develop
```

日常预发布从 `develop` 晋级到 `next`。第一次晋级时脚本会自动从 `develop` 创建并推送 `next`；后续会同步现有 `next`、普通合并 `develop` 并推送，由“自动发布”工作流生成 prerelease：

```sh
vp run --no-cache release:preview:dry-run
vp run --no-cache release:preview
```

稳定发布使用同一流程将 `next` 晋级到 `main`：

```sh
vp run --no-cache release:stable:dry-run
vp run --no-cache release:stable
```

如果普通合并发生冲突，脚本会停止且不会推送。解决冲突并完成合并后，应重新执行本地验证，再按仓库保护规则完成推送。稳定版发布完成后可执行 `branch:develop`，把 `origin/main` 的发布历史合回开发线。

## 本地验证

```sh
vp check
vp run typecheck
vp test run --coverage
vp run build
```

在 `main` 或 `next` 分支上可以单独预演 semantic-release 的版本判定（不会创建 tag 或 Release）：

```sh
vp run release:dry-run
```

GitHub Actions 的“自动发布”也支持手动重跑，但所选 ref 必须是 `main` 或 `next`。工作流需要 `contents: write` 和 `packages: write`，不需要 npm token、Rust/Android 工具链。
