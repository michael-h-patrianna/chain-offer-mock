import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/**/*',
          dest: 'assets'
        }
      ]
    })
  ],
  resolve: {
    alias: [
      { find: '@patrianna/core-components', replacement: path.resolve(__dirname, 'src/stubs/core-components.tsx') },
      { find: '@patrianna/shared-utils', replacement: path.resolve(__dirname, 'src/stubs/shared-utils.ts') },
  { find: 'classnames', replacement: path.resolve(__dirname, 'src/stubs/classnames.ts') },
  { find: '@patrianna/shared-hooks', replacement: path.resolve(__dirname, 'src/stubs/shared-hooks.ts') },
  { find: '@patrianna-icons/material-icons', replacement: path.resolve(__dirname, 'src/stubs/material-icons.tsx') },
  { find: 'next/link', replacement: path.resolve(__dirname, 'src/stubs/next-link.tsx') },
  { find: 'date-fns', replacement: path.resolve(__dirname, 'src/stubs/date-fns.ts') },
  { find: 'uuid', replacement: path.resolve(__dirname, 'src/stubs/uuid.ts') },
  { find: '@reduxjs/toolkit', replacement: path.resolve(__dirname, 'node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js') },
  { find: 'react-redux', replacement: path.resolve(__dirname, 'node_modules/react-redux/es/index.js') },
    ],
  },
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
})
