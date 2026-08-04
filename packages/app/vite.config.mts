import { fileURLToPath, URL } from 'node:url'

import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { defineConfig, lazyPlugins, type PluginOption, type UserConfig } from 'vite-plus'

import packageJson from './package.json' with { type: 'json' }
import { createPluginManifest } from './src/manifest.js'

export default defineConfig(
  ({ command, mode }) =>
    ({
      base: './',
      build: {
        emptyOutDir: true,
        minify: 'oxc',
        outDir: 'dist',
        sourcemap: false,
        target: 'es2022',
      },
      css: {
        lightningcss: { targets: browserslistToTargets(browserslist('> 1%, last 2 versions')) },
        transformer: 'lightningcss',
      },
      plugins: lazyPlugins(async () => {
        const [
          { DeltaComicUiResolver },
          { deltaComic },
          { default: tailwindcss },
          { default: vue },
          { NaiveUiResolver },
          { default: Components },
        ] = await Promise.all([
          import('@delta-comic/ui/vite'),
          import('@delta-comic/plugin/vite'),
          import('@tailwindcss/vite'),
          import('@vitejs/plugin-vue'),
          import('unplugin-vue-components/resolvers'),
          import('unplugin-vue-components/vite'),
        ])

        // The host helper resolves its Vite types from the plugin peer tree, while Vite+ exposes
        // its own compatible copy. Keep the cast at this single integration boundary.
        const pluginHelpers = (mode === 'test'
          ? []
          : deltaComic(
              createPluginManifest(process.env.DELTA_PLUGIN_VERSION ?? packageJson.version),
              command,
            )) as unknown as PluginOption[]

        const frameworkPlugins = [
          vue() as unknown as PluginOption,
          Components({
            dts: true,
            dtsTsx: false,
            resolvers: [NaiveUiResolver(), DeltaComicUiResolver()],
          }) as unknown as PluginOption,
          tailwindcss() as unknown as PluginOption,
        ]
        return [...frameworkPlugins, ...pluginHelpers]
      }),
      resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
      server: { host: true, port: 6174, strictPort: true },
      test: { environment: 'happy-dom', include: ['src/**/*.test.ts'] },
    }) as UserConfig,
)