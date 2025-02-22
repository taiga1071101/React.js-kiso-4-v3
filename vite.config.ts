import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/React.js-kiso-4-v3/",
  plugins: [react()],
})
