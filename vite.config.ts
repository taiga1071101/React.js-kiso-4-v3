import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/React.js-kiso-4-v3/",
  build: {
    outDir: 'dist',  // 出力ディレクトリが正しいか確認
    rollupOptions: {
      input: 'index.html', // メインのエントリーポイントを確認
    },
  },
  plugins: [react()],
})
