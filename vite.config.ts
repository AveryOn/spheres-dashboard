import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: { port: 3007, strictPort: true, host: true },
  preview: { port: 3008, strictPort: true, host: true },
})