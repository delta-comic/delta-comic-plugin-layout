import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import _package from './package.json'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'
import { deltaComic } from 'delta-comic-core/vite'
import { vite as vidstack } from 'vidstack/plugins'
export default defineConfig(({ command }) => ({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('media-'),
        },
      },
    }),
    vidstack({
      include: './src/view/*'
    }),
    Components({
      dts: true,
      resolvers: [
        NaiveUiResolver(),
        VantResolver()
      ],
    }),
    tailwindcss(),
    deltaComic({
      description: _package.description,
      author: _package.author.name,
      displayName: '基础布局组件',
      name: 'layout',
      version: _package.version,
      supportCoreVersion: '^0.5'
    }, command, _package)
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('> 1%, last 2 versions, not ie <= 8'))
    }
  },
  server: {
    port: 6173,
    host: true
  },
  base: "/",
} satisfies UserConfigExport))