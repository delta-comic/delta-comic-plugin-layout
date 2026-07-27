import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import type { UserConfig } from 'vite-plus'
import { defineConfig, lazyPlugins } from 'vite-plus'

import pkg from './package.json' with { type: 'json' }

const host = process.env.TAURI_DEV_HOST

export default defineConfig(
  ({ command }) =>
    ({
      plugins: lazyPlugins(async () => {
        const [
          { deltaComic },
          { default: tailwindcss },
          { default: vue },
          { default: vueJsx },
          { default: MotionResolver },
          { NaiveUiResolver },
          { default: Components },
          { DeltaComicUiResolver },
          { default: legacy },
        ] = await Promise.all([
          import('@delta-comic/plugin/vite'),
          import('@tailwindcss/vite'),
          import('@vitejs/plugin-vue'),
          import('@vitejs/plugin-vue-jsx'),
          import('motion-v/resolver'),
          import('unplugin-vue-components/resolvers'),
          import('unplugin-vue-components/vite'),
          import('@delta-comic/ui/vite'),
          import('@vitejs/plugin-legacy'),
        ])

        return [
          vue({
            template: { compilerOptions: { isCustomElement: tag => tag.startsWith('media-') } },
          }),
          vueJsx(),
          Components({
            dts: true,
            resolvers: [MotionResolver(), NaiveUiResolver(), DeltaComicUiResolver()],
            dtsTsx: false,
          }),
          tailwindcss(),
          deltaComic(
            {
              version: { plugin: pkg.version, supportCore: '^3.0' },
              name: { display: '图像与视频布局', id: 'layout' },
              author: pkg.author.name,
              description: pkg.description,
              require: [],
            },
            command,
          ),
          legacy({ modernPolyfills: true, renderLegacyChunks: true, renderModernChunks: false }),
        ]
      }),
      resolve: {
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
        extensions: ['.ts', '.tsx', '.json', '.mjs', '.js', '.jsx', '.mts'],
      },
      css: {
        transformer: 'lightningcss',
        lightningcss: { targets: browserslistToTargets(browserslist('> 5%')) },
      },
      build: {
        // Tauri uses Chromium on Windows and WebKit on macOS and Linux
        target: process.env.TAURI_ENV_PLATFORM == 'windows' ? 'chrome105' : 'safari15',
        // don't minify for debug builds
        minify: !process.env.TAURI_ENV_DEBUG ? 'oxc' : false,
        // produce sourcemaps for debug builds
        sourcemap: !!process.env.TAURI_ENV_DEBUG,
        rolldownOptions: {
          input: {
            main: resolve(import.meta.dirname, 'main.html'),
            splash: resolve(import.meta.dirname, 'index.html'),
          },
        },
      },
      worker: { format: 'es' },
      base: '/',
      server: {
        port: 5173,
        // Tauri expects a fixed port, fail if that port is not available
        strictPort: true,
        // if the host Tauri is expecting is set, use it
        host: host || false,
        hmr: host ? { protocol: 'ws', host, port: 1421 } : undefined,

        watch: {
          // tell vite to ignore watching `src-tauri`
          ignored: ['**/src-tauri/**', 'src-tauri'],
        },
      },
      test: { environment: 'happy-dom', include: ['src/**/*.test.ts'] },
      clearScreen: false,
      envPrefix: ['VITE_', 'TAURI_ENV_*'],
    }) as UserConfig,
)