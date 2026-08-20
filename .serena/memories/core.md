Project root: `delta-comic-plugin-layout`.
- Monorepo app source: `packages/app`; release/build scripts: `script/`.
- App build config: `packages/app/vite.config.mts`; root tool config: `vite.config.ts`.
- Generated app artifacts live in `packages/app/dist`; release validation is in `script/artifacts.mts`.
- Read `mem:tech_stack` for toolchain pins, `mem:conventions` for repo rules, `mem:suggested_commands` for commands, and `mem:task_completion` for required verification.