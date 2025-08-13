import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcssPlugin from '@tailwindcss/vite'
import svgrPlugin from 'vite-plugin-svgr'
import basicSslPlugin from '@vitejs/plugin-basic-ssl'
import reactPlugin from '@vitejs/plugin-react-swc'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import _ from 'lodash'
import { defineConfig } from 'vite'
import topLevelAwaitPlugin from 'vite-plugin-top-level-await'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const { mapValues } = _

const env = {
  isDev: process.env.NODE_ENV !== 'production',
  buildRevision: `${Date.now()}`
}

const dirname = path.dirname(fileURLToPath(import.meta.url))
const appDir = path.join(dirname, './src')

export default defineConfig({
  define: mapValues(
    {
      'app.env': {
        buildRevision: env.buildRevision,
        enableServiceWorker: !env.isDev
      }
    },
    value => JSON.stringify(value)
  ),
  resolve: {
    alias: {
      '@app': appDir
    }
  },
  plugins: [
    basicSslPlugin(),
    reactPlugin(),
    tailwindcssPlugin(),
    svgrPlugin(),
    topLevelAwaitPlugin()
  ].filter(Boolean),
  build: {
    target: browserslistToEsbuild(),
    outDir: 'build',
    minify: true
  },
  server: {
    https: false,
    proxy: {
      '^/api': {
        target: 'http://localhost:5401',
        changeOrigin: true,
        xfwd: true,
        secure: false
      }
    }
  }
})
