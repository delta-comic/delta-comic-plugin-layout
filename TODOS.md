# 任务清单

你现在着手完成以下内容，不分先后。你自己决定工作顺序

此外，你可以**任意的**添加依赖和增删monorepo

适当的用git提交(不推送)保存分割工作进度

你可以切分子任务来更好的规划进度

该清单内容位于`项目根目录/TODOS.md`

---

# delta-comic next.10 → next.11 升级重构

依据 `PLUGIN_DEVELOPMENT.md` 与 next.11 实际类型声明制定的升级清单。
`require: [{ id: 'core' }]` 保持不变（宿主仍内置 `core`）。

## 1. 类型错误修复（核心）

- [ ] 1.1 移除 `PluginManifest.kind` 字段：`packages/app/src/manifest.ts` 删除 `kind: 'normal'`，同步删除 `manifest.test.ts` 中对应断言
- [ ] 1.2 替换 `translatePluginText` → `pluginI18n.translateText`：`src/i18n/index.ts` 新增 `translateText` 包装导出；`ShareButton.vue`、`SubscribeRow.vue` 的导入与调用点改用该包装
- [ ] 1.3 修复 DB 查询 hook 泛型与 `EntryKey`（`FavouriteSelect.vue`、`SubscribeRow.vue`）：
  - 显式提供结果类型参数（`useQueryCard<FavouriteDB.Card[]>`、`useQueryItem<Pick<FavouriteDB.Item, 'belongTo'>[]>`、`SubscribeDB.useQuery<SubscribeDB.Item[]>`；`countDb` 那处仅修 key）
  - `otherKeys` 由扁平 `['a','b']` 包装为 `[['a','b']]`，满足 `readonly EntryKey[]`（接受缓存 key 形状变化）

## 2. 版本号对齐 next.11

- [ ] 2.1 `manifest.ts` 的 `supportCore` → `>=3.0.0-next.11 <4.0.0`
- [ ] 2.2 `manifest.test.ts` 断言与用例名同步（`next.10` → `next.11`）
- [ ] 2.3 `README.md` 中 `>=3.0.0-next.10 <4.0.0` 描述同步
- [ ] 2.4 `packages/app/package.json` peerDependencies → `>=3.0.0-next.11 <4.0.0`
- [ ] 2.5 `script/artifacts.test.ts`、`script/semantic-release-plugin.test.ts` 测试夹具的 `supportCore` 同步

## 3. 一致性清理

- [ ] 3.1 `manifest.ts` 的 `DELTA_COMIC_PLUGIN_API_VERSION` / `PluginManifest` 改从 `@delta-comic/plugin` 导入（对齐文档 §2.4）
- [ ] 3.2 `script/artifacts.mts` 本地 `PluginManifest` 接口与校验补齐 `icon` / `integrity` / `require[].download` 可选字段（前瞻，不阻断）

## 4. 验证

- [ ] 4.1 `vp install`
- [ ] 4.2 `vp run lib-build`
- [ ] 4.3 `vp check`
- [ ] 4.4 `vp run -r typecheck`（期望 0 错误）
- [ ] 4.5 `vp test run`（全绿；必要时补 `translateText` 单测）
- [ ] 4.6 `vp run build` → `vp run artifacts`（校验 `plugin.zip` / `manifest.json` 与 entry 产物一致）
- [ ] 4.7 可选冒烟：`vp dev` 验证配置读取、i18n 翻译、收藏/订阅 DB 查询、分享按钮文本翻译、`core` 依赖
