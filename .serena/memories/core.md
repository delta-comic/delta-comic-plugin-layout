Project root: `delta-comic-plugin-layout`.
- Monorepo app source and only publishable workspace package: `packages/app` (`@delta-comic/plugin-layout`).
- Release/build scripts: `script/`; app build config: `packages/app/vite.config.mts`; root tool config: `vite.config.ts`.
- The only build and release directory is `packages/app/dist`; GitHub Release assets are `packages/app/dist/manifest.json` and `packages/app/dist/plugin.zip`.
- Semantic-release writes its computed version to `packages/app/package.json`, builds the app, and publishes that workspace package directly to GitHub Packages. There is no root `dist/release`, root `dist/package`, or artifact validation script.
- Read `mem:tech_stack` for toolchain pins, `mem:conventions` for repo rules, `mem:suggested_commands` for commands, and `mem:task_completion` for required verification.