import { DeltaComicUiResolver } from '@delta-comic/ui/vite'
import { deltaComicPlus } from '@delta-comic/vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { fileURLToPath, URL } from 'node:url'
import { NaiveUiResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { vite as vidstack } from 'vidstack/plugins'
import { defineConfig, type UserConfigExport } from 'vite'
import dts from 'vite-plugin-dts'

import _package from './package.json'

export default defineConfig(
  ({ command }) =>
    ({
      plugins: [
        dts({ include: ['./src'], outDir: './type', tsconfigPath: './tsconfig.json' }),
        vue({
          template: { compilerOptions: { isCustomElement: tag => tag.startsWith('media-') } }
        }),
        vidstack({ include: './src/view/*' }),
        Components({
          dts: true,
          resolvers: [NaiveUiResolver(), VantResolver(), DeltaComicUiResolver()]
        }),
        tailwindcss(),
        deltaComicPlus(
          {
            require: [{ id: 'core' }],
            author: _package.author.name,
            beforeBoot: [],
            description: _package.description,
            entry: { jsPath: './index.js', cssPath: 'auto' },
            name: { display: '基础布局组件', id: 'layout' },
            version: { plugin: _package.version, supportCore: '^1.0' }
          },
          command
        )
      ],
      resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
      css: {
        transformer: 'lightningcss',
        lightningcss: {
          targets: browserslistToTargets(browserslist('> 1%, last 2 versions, not ie <= 8'))
        }
      },
      server: { port: 6174, host: true },
      base: './'
    }) satisfies UserConfigExport
)