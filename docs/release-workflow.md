# 发布流程

项目使用 Conventional Commits 与 semantic-release 计算版本，只发布 GitHub Release，不发布 npm workspace 包。

| 分支 | 用途 | 发布结果 |
| --- | --- | --- |
| `develop` | 日常开发与集成 | 不发布 |
| `next` | 预发布验证 | `x.y.z-next.N` prerelease |
| `main` | 稳定版本 | `x.y.z` release |

`fix:` 触发补丁版本，`feat:` 触发次版本，`!` 或 `BREAKING CHANGE` 触发主版本。推送到 `next` 或 `main` 后，发布工作流会重新安装锁定依赖，执行检查和覆盖率测试，再把 semantic-release 计算的版本通过 `DELTA_PLUGIN_VERSION` 注入构建。

每个 Release 只上传以下两个资产：

- `manifest.json`：供市场或安装器直接读取的元数据；
- `plugin.zip`：包含 `manifest.json`、`index.js` 与 `index.css` 的可安装插件包。

发布脚本会在上传前检查版本一致性、入口文件存在性及压缩包内容；任何一项不匹配都会终止发布。源码中的 `packages/app/package.json` 只提供本地开发构建的基准版本，发布版本以 semantic-release 及产物 manifest 为准，不生成发布提交。

## 本地验证

```sh
vp check
vp run typecheck
vp test run --coverage
vp run build
vp run artifacts
```

在 `main` 或 `next` 分支上可以预演版本判定（不会创建 tag 或 Release）：

```sh
vp run release:dry-run
```

GitHub Actions 的“自动发布”也支持手动重跑，但所选 ref 必须是 `main` 或 `next`。工作流只需要 `contents: write`，不需要 npm token、Rust/Android 工具链或包仓库权限。
