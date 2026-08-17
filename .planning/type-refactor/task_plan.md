# Delta Comic Layout Plugin 类型安全重构计划

## Goal

提升 `@delta-comic/plugin-layout` 插件的类型安全性和代码质量，消除不必要的类型断言，实现端到端类型覆盖，同时保持依赖版本不变。

**成功标准**：
- 所有 `vp check`、`vp run -r typecheck`、`vp test run` 通过
- 类型安全性从 88/100 提升到 95/100
- 代码质量总分从 90/100 提升到 95/100
- 测试覆盖率保持或提升（行 84%+，函数 75%+，分支 70%+）
- 每个子任务完成后立即提交

## Current Phase

**Status:** 全部完成 ✅

## Next Step

无（9 个阶段全部完成，重构与验证流程收尾）

---

## Phases

### Phase 1: 类型系统加固 - 边界检查

**Status:** ✅ completed
**Priority:** HIGH
**Estimated Time:** 30 分钟

**Tasks:**
1. 搜索所有使用非空断言 `!` 的位置
2. 修复 `player.ts:85` - 移除 `sources[0]!`，添加显式检查
3. 检查其他可能存在边界问题的数组/对象访问
4. 添加友好的错误提示

**Files to Modify:**
- `packages/app/src/view/video/player.ts`
- 其他包含 `!` 断言的文件（待搜索确认）

**Verification:**
- `vp run -r typecheck` 无错误
- `vp test run` video 相关测试通过

**Exit Criteria:**
- 代码中不再有不安全的非空断言
- 所有边界情况都有显式检查

---

### Phase 2: 类型系统加固 - 显式返回类型

**Status:** ✅ completed
**Priority:** HIGH
**Estimated Time:** 45-60 分钟

**Tasks:**
1. 为 `useLike` 定义 `UseLikeReturn` 接口
2. 为 `useEpisodes` 定义 `UseEpisodesReturn` 接口
3. 为 `useImageReader` 定义 `UseImageReaderReturn` 接口
4. 为 `useArtplayer` 定义 `UseArtplayerReturn` 接口
5. 在函数签名处添加显式返回类型标注

**Files to Modify:**
- `packages/app/src/utils/content.ts`
- `packages/app/src/composables/useEpisodes.ts`
- `packages/app/src/view/image/useImageReader.ts`
- `packages/app/src/view/video/useArtplayer.ts`

**Verification:**
- `vp run -r typecheck` 无错误
- 所有调用方类型推断正确
- 不引入类型兼容性问题

**Exit Criteria:**
- 所有关键组合式函数都有显式返回类型
- 返回类型与实际返回值完全一致

---

### Phase 3: 类型系统加固 - 优化泛型

**Status:** ✅ completed
**Priority:** MEDIUM
**Estimated Time:** 30 分钟

**Tasks:**
1. 搜索所有泛型函数（`<T extends`）
2. 识别无用的泛型参数
3. 简化类型签名，移除不必要的复杂度
4. 保留有实际类型传递需求的泛型

**结果:** 搜索后仅发现 `StreamPage<T extends object>`（合法：`data: T[]` 使用 T）与 `localizeConfig<T>`（其 `as T` 断言移交 Phase 4 处理）。utils/composables 无过度泛型化函数，无需改动。

**Files to Modify:**
- `packages/app/src/utils/` 目录下的工具函数
- `packages/app/src/composables/` 目录下的组合式函数

**Verification:**
- `vp run -r typecheck` 无错误
- 代码可读性提升
- 类型推断仍然正确

**Exit Criteria:**
- 没有过度泛型化的函数
- 类型签名清晰简洁

---

### Phase 4: 类型系统加固 - Settings.vue 类型守卫

**Status:** ✅ completed
**Priority:** HIGH
**Estimated Time:** 30-45 分钟

**Tasks:**
1. 创建类型守卫函数 `getConfigValue<T>`
2. 添加运行时类型验证逻辑
3. 使用泛型约束确保类型正确性
4. 替换 Settings.vue 中的所有 `as` 断言
5. 类型不匹配时回退到 `defaultValue`

**Files to Modify:**
- `packages/app/src/components/Settings.vue`

**Verification:**
- `vp run -r typecheck` 无错误
- Settings 组件功能正常
- 类型推断准确

**Exit Criteria:**
- Settings.vue 中不再有类型断言
- 所有配置字段类型安全

---

### Phase 5: 类型系统加固 - VideoConfig 重构

**Status:** ✅ completed
**Priority:** HIGH
**Estimated Time:** 1-1.5 小时

**Tasks:**
1. 搜索所有引用 `ContentVideoPage` 和 `VideoConfig` 的位置
2. 重新定义 `VideoConfig` 为清晰的接口（包含 `sources` 和 `textTrack`）
3. 更新 `ContentVideoPage.fetchVideo()` 签名
4. 修改 `player.ts` 中的数组访问逻辑（`config[0]` → `config.sources[0]`）
5. 修改 `Video.vue` 中的使用方式
6. 检查所有实现 `fetchVideo()` 的地方（如果有外部使用）

**Files to Modify:**
- `packages/app/src/model/index.ts`
- `packages/app/src/view/video/player.ts`
- `packages/app/src/view/video/useArtplayer.ts`
- `packages/app/src/view/Video.vue`

**Verification:**
- `vp run -r typecheck` 无错误
- `vp test run` 所有 video 测试通过
- `vp run build` 构建成功

**Exit Criteria:**
- `VideoConfig` 类型定义清晰
- 所有使用方更新完毕
- 类型安全性提升

---

### Phase 6: 代码质量审查 - Vue 组件最佳实践

**Status:** ✅ completed
**Priority:** MEDIUM
**Estimated Time:** 30 分钟

**Tasks:**
1. 检查所有 `.vue` 文件是否使用 `<script setup>`
2. 确认 props/emits/slots 定义完整
3. 统一 props 定义风格
4. 检查 `defineExpose` 使用是否正确
5. 确认所有需要暴露的方法都已声明

**Files to Review:**
- 所有 `.vue` 文件

**Verification:**
- `vp run -r typecheck` 无错误
- 所有组件符合 Vue 3 + Composition API 最佳实践

**Exit Criteria:**
- 所有组件风格统一
- 无违反最佳实践的代码

---

### Phase 7: 代码质量审查 - i18n 一致性

**Status:** ✅ completed
**Priority:** LOW
**Estimated Time:** 20 分钟

**Tasks:**
1. 搜索硬编码字符串模式（引号内的纯文本）
2. 确认所有用户可见字符串都使用 i18n
3. 统一 `translate()` / `translateText()` 使用模式

**Files to Review:**
- 所有 `.vue`、`.ts`、`.tsx` 文件

**Verification:**
- 无遗漏的硬编码用户可见字符串
- `vp test run` i18n 相关测试通过

**Exit Criteria:**
- i18n 使用保持 100% 符合规范

---

### Phase 8: 文档与类型定义补充

**Status:** ✅ completed
**Priority:** MEDIUM
**Estimated Time:** 30-45 分钟

**Tasks:**
1. 为 `model/index.ts` 中的公开类型添加 JSDoc 注释
2. 为 `expose.ts` 中的公开接口添加使用说明
3. 为复杂的组合式函数添加注释
4. 为关键类型添加 `@since` 标记

**Files to Modify:**
- `packages/app/src/model/index.ts`
- `packages/app/src/expose.ts`
- 所有导出的组合式函数文件

**Verification:**
- 注释格式正确（JSDoc 标准）
- 描述准确清晰

**Exit Criteria:**
- 所有公开 API 都有文档
- 复杂逻辑有注释说明

---

### Phase 9: 完整验证与产物检查

**Status:** ✅ completed
**Priority:** HIGH
**Estimated Time:** 30 分钟

**Tasks:**
1. 运行 `vp check` - 格式和 lint 检查
2. 运行 `vp run -r typecheck` - 类型检查（0 错误）
3. 运行 `vp test run` - 单元测试（全部通过）
4. 运行 `vp test run --coverage` - 覆盖率检查（达到阈值）
5. 运行 `vp run build` - 构建生产版本
6. 运行 `vp run artifacts` - 验证产物完整性

**Verification:**
- 所有命令退出码为 0
- 无类型错误、无测试失败
- 产物包含：`index.js`, `index.css`, `manifest.json`, `plugin.zip`

**Exit Criteria:**
- 完整验证流程全部通过
- 代码质量目标达成

---

## Decisions Made

| Decision | Rationale | Date |
|----------|-----------|------|
| 按照独立→关联顺序执行 | 最小化风险，每个阶段独立验证 | 2026-08-16 |
| 每个小任务完成后立即提交 | 保存进度，便于回滚 | 2026-08-16 |
| 使用类型守卫 + 泛型约束 | 两者结合，既安全又简洁 | 2026-08-16 |
| VideoConfig 改为接口定义 | 更清晰，避免交叉类型混淆 | 2026-08-16 |
| 保持依赖版本不变 | 重构聚焦代码质量，不引入新风险 | 2026-08-16 |

---

## Errors Encountered

| Error | Attempt | Resolution | Phase |
|-------|---------|------------|-------|
| `SubscribeRow.vue:34` `Promise<...{type: string}[]>` 不可赋给 `Promise<SubscribeRow[]>`（next.11 适配 pre-existing） | 移除手写 `SubscribeRow` 类型，改用推断 | typecheck 通过 | 1 |

---

## Key Files

| File | Purpose | Phase |
|------|---------|-------|
| `packages/app/src/view/video/player.ts` | 视频播放器逻辑，边界检查目标 | 1 |
| `packages/app/src/components/Settings.vue` | 配置组件，类型断言重构目标 | 4 |
| `packages/app/src/model/index.ts` | 类型定义，VideoConfig 重构目标 | 5 |
| `packages/app/src/utils/content.ts` | 组合式函数，返回类型标注目标 | 2 |
| `packages/app/src/composables/useEpisodes.ts` | 组合式函数，返回类型标注目标 | 2 |
| `packages/app/src/expose.ts` | 插件公开接口，文档补充目标 | 8 |

---

## Progress Tracking

- **Phase 1 (边界检查):** ✅ completed
- **Phase 2 (显式返回类型):** ✅ completed
- **Phase 3 (优化泛型):** ✅ completed
- **Phase 4 (Settings.vue):** ✅ completed
- **Phase 5 (VideoConfig 重构):** ✅ completed
- **Phase 6 (Vue 组件审查):** ✅ completed
- **Phase 7 (i18n 审查):** ✅ completed
- **Phase 8 (文档补充):** ✅ completed
- **Phase 9 (完整验证):** ✅ completed

**Total Phases:** 9
**Completed:** 9
**In Progress:** 0
**Remaining:** 0
