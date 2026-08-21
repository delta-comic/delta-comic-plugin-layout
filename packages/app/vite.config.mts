import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { DELTA_COMIC_PLUGIN_API_VERSION, type PluginManifest } from '@delta-comic/model'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { defineConfig, lazyPlugins } from 'vite-plus'

import packageJson from './package.json' with { type: 'json' }
import { pluginName } from './src/symbol.js'

export const pluginManifestBase = {
  apiVersion: DELTA_COMIC_PLUGIN_API_VERSION,
  author: 'wenxig',
  description: 'layout.manifest.description',
  entry: { cssPath: 'src/index.css', jsPath: 'src/main.ts' },
  name: { display: 'layout.manifest.displayName', id: pluginName },
  require: [{ id: 'core' }],
} satisfies Omit<PluginManifest, 'version'>

export const createPluginManifest = (version: string): PluginManifest => ({
  ...pluginManifestBase,
  entry: { ...pluginManifestBase.entry },
  name: { ...pluginManifestBase.name },
  require: pluginManifestBase.require.map(dependency => ({ ...dependency })),
  version: { plugin: version, supportCore: '>=3.0.0-next.15 <4.0.0' },
})

export default defineConfig(({ command }) => ({
  base: './',
  build: {
    emptyOutDir: true,
    minify: 'oxc',
    outDir: 'dist',
    rollupOptions: {
      output: {
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: chunk => (chunk.name.endsWith('.d') ? 'index.d.ts' : 'index.js'),
      },
    },
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
      { dts },
    ] = await Promise.all([
      import('@delta-comic/ui/vite'),
      import('@delta-comic/plugin/vite'),
      import('@tailwindcss/vite'),
      import('@vitejs/plugin-vue'),
      import('unplugin-vue-components/resolvers'),
      import('unplugin-vue-components/vite'),
      import('rolldown-plugin-dts'),
    ])

    return [
      vue(),
      Components({
        dts: true,
        dtsTsx: false,
        resolvers: [NaiveUiResolver(), DeltaComicUiResolver()],
      }),
      tailwindcss(),
      deltaComic(createPluginManifest(process.env.DELTA_PLUGIN_VERSION ?? packageJson.version)),
      ...(command === 'build'
        ? [
            dts({
              vue: true,
              tsconfig: resolve(import.meta.dirname, './tsconfig.app.json'),
              sourcemap: true,
            }),
          ]
        : []),
    ]
  }),
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: true, port: 6174, strictPort: true },
  test: { environment: 'happy-dom', include: ['test/**/*.test.ts'] },
  oxc: { exclude: [/\.js$/, /\.d\.[cm]?ts$/] },
}))