# 任务清单

你现在着手完成以下内容，不分先后。你自己决定工作顺序

此外，你可以**任意的**添加依赖和增删monorepo

适当的用git提交(不推送)保存分割工作进度

你可以切分子任务来更好的规划进度

该清单内容位于`项目根目录/TODOS.md`

---

# delta-comic next.10 → next.13 升级重构

依据 `PLUGIN_DEVELOPMENT.md` 与 next.13 实际类型声明制定的升级清单。
`require: [{ id: 'core' }]` 保持不变（宿主仍内置 `core`）。

## 1. 类型错误修复（核心）

- [x] 1.1 移除 `PluginManifest.kind` 字段：`packages/app/src/manifest.ts` 删除 `kind: 'normal'`，同步删除 `manifest.test.ts` 中对应断言
- [x] 1.2 替换 `translatePluginText` → `pluginI18n.translateText`：`src/i18n/index.ts` 新增 `translateText` 包装导出；`ShareButton.vue`、`SubscribeRow.vue` 的导入与调用点改用该包装
- [x] 1.3 修复 DB 查询 hook 泛型与 `EntryKey`（`FavouriteSelect.vue`、`SubscribeRow.vue`）：
  - 显式提供结果类型参数（`useQueryCard<FavouriteDB.Card[]>`、`useQueryItem<Pick<FavouriteDB.Item, 'belongTo'>[]>`、`SubscribeDB.useQuery<SubscribeRow[]>`；`countDb` 那处仅修 key）
  - `otherKeys` 由扁平 `['a','b']` 包装为 `[['a','b']]`，满足 `readonly EntryKey[]`（接受缓存 key 形状变化）
  - 注：`SubscribeDB.Item` 是联合类型，与 `selectAll()` 的扁平映射类型不兼容，改用内联 `SubscribeRow` 结构类型（组件仅用 `.length`）

## 2. 版本号对齐 next.13

- [x] 2.1 `manifest.ts` 的 `supportCore` → `>=3.0.0-next.16 <4.0.0`
- [x] 2.2 `manifest.test.ts` 断言与用例名同步（`next.10` → `next.13`）
- [x] 2.3 `README.md` 中 `>=3.0.0-next.10 <4.0.0` 描述同步
- [x] 2.4 `packages/app/package.json` peerDependencies → `>=3.0.0-next.16 <4.0.0`
- [x] 2.5 发布测试夹具的 `supportCore` 同步

## 3. 一致性清理

- [ ] 3.1 ~~`manifest.ts` 的 `DELTA_COMIC_PLUGIN_API_VERSION` / `PluginManifest` 改从 `@delta-comic/plugin` 导入（对齐文档 §2.4）~~ 已回退：`@delta-comic/plugin` 的 ESM 在 Node 下无法解析 `lz-string` 命名导出，导致 `vite.config.mts` 加载失败（`lib-build` 报错），保持 `@delta-comic/model` 导入（revert 7b89303）
- [x] 3.2 插件 manifest 的可选字段保持由 `@delta-comic/model` 提供类型

## 4. 验证

- [x] 4.1 `vp install`
- [x] 4.2 `vp run lib-build`
- [x] 4.3 `vp check`
- [x] 4.4 `vp run -r typecheck`（0 错误）
- [x] 4.5 `vp test run`（17 文件 74 用例全绿）+ `vp test run --coverage`（覆盖率阈值：行/函数/语句 75%，分支 70%）
- [x] 4.6 `vp run build`（构建通过：`index.js`/`index.css`/`manifest.json`/`plugin.zip` 齐全，manifest 无 `kind`、`supportCore` 为 next.13）
- [ ] 4.7 冒烟（需宿主 Delta Comic 环境，本仓库无法执行）：`vp dev` 验证配置读取、i18n 翻译、收藏/订阅 DB 查询、分享按钮文本翻译、`core` 依赖
