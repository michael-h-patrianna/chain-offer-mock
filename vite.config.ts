import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `\n$base100: #ffffff;\n$brandAccentPrimary: #4d61ff;\n$brandAccentSecondary75: rgba(255,255,255,0.65);\n`,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
  },
})
