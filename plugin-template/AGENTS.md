# 项目规范

- 使用 `vp` 管理依赖、检查、测试与构建。
- Vue 组件使用 Composition API、`<script setup lang="ts">` 和 PascalCase 文件名。
- UI 使用 `@delta-comic/ui` 与 Naive UI；样式只写 Tailwind CSS 工具类。
- 所有用户可见文本通过插件 i18n 提供。
- 依赖版本集中维护在 `pnpm-workspace.yaml` catalog。
- 提交遵循 Conventional Commits；发布必须使用 `docs/release-workflow.md` 的分支晋级脚本。
- 提交前运行 `vp check`、`vp run typecheck`、`vp test run --coverage`、`vp run build` 和
  `vp run artifacts`。
