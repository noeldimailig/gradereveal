import { defineConfig } from 'vite'  
import react from '@vitejs/plugin-react'  
import { fileURLToPath } from 'node:url'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({  
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
    ],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.css']
  }
})