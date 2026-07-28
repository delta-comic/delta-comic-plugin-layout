# Delta Comic 插件模板

这是从已验证的 Delta Comic 插件工程中提炼出的最小通用框架，包含：

- Vue 3、TypeScript 7、`vue-tsgo` 与 Vite+；
- `@delta-comic/plugin` 官方构建插件；
- `@delta-comic/ui`、Naive UI 与 Tailwind CSS；
- 插件配置、i18n、组件导出和集中式 manifest 元数据示例；
- Vitest 覆盖率门禁与安装包结构校验；
- `develop -> next -> main` 分支晋级和 semantic-release 自动发布；
- Release 中严格限制为 `manifest.json` 和 `plugin.zip` 两个资产。

## 创建自己的插件

复制本目录到新仓库后，至少完成以下替换：

1. 修改根目录及 `packages/app/package.json` 的名称、作者、仓库、许可证和描述；
2. 修改 `packages/app/src/metadata.ts` 的插件 ID、显示名称、依赖和核心版本范围；
3. 将 `template` i18n 命名空间、配置指针和示例组件替换成实际功能；
4. 修改 README、CI 上传产物名称和 Release 展示名称；
5. 选择许可证并添加完整 `LICENSE` 文件；
6. 初始化 GitHub 仓库后，先建立 `develop`，再使用发布脚本晋级分支。

插件 ID 会进入运行时注册、配置键和翻译键，发布后不应随意变更。所有用户可见文本应写入
`src/i18n`；组件使用 PascalCase；样式只使用 Tailwind CSS 工具类。

## 开发与验证

```sh
vp install
vp run dev
```

提交前运行：

```sh
vp check
vp run typecheck
vp test run --coverage
vp run build
vp run artifacts
```

构建产物在 `packages/app/dist/`。外置 manifest 用于市场或安装器读取，`plugin.zip` 是实际安装
包。发布方法见 [发布流程](docs/release-workflow.md)。

## 目录职责

```text
packages/app/src/
├── components/       # 可复用 Vue 组件，props 向下、事件向上
├── i18n/             # 插件自有多语言文本
├── config.ts         # ConfigPointer 配置声明
├── metadata.ts       # manifest 的唯一元数据来源
├── index.css         # Tailwind 与 Delta Comic UI 样式入口
└── main.ts           # 薄插件入口，只负责注册和导出公共能力
```
