import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      pages: "/src/pages",
      components: "/src/components",
      utils: "/src/utils",
      interfaces: "/src/interfaces",
      hooks: "/src/hooks",
      store: "/src/store",
    },
  },
  server: {
    host: 'localhost',
    port: 3000, // Specify the port
  },
})
