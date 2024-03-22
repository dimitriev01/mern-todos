import { defineConfig, UserConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import babel from "@rollup/plugin-babel"

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.REACT_APP_API_BASE_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    babel({
      include: ["./src/**"],
      extensions: [".js", ".ts", ".tsx"],
      babelHelpers: "bundled",
      parserOpts: {
        sourceType: "module",
      },
    }),
    react(),
    svgr(),
  ],
  build: {
    manifest: true,
    target: "esnext",
    outDir: "build",
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          let info = assetInfo.name.split(".")
          let extType = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|webp|bmp|ico/i.test(extType)) {
            extType = "img"
          } else if (/woff|woff2/.test(extType)) {
            extType = "css"
          }
          return `static/${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: `static/js/[name]-[hash].js`,
        entryFileNames: `static/js/[name]-[hash].js`,
      },
    },
  },
  resolve: {
    alias: [
      { find: "pages", replacement: "/src/pages" },
      { find: "app", replacement: "/src/app" },
      { find: "entities", replacement: "/src/entities" },
      { find: "features", replacement: "/src/features" },
      { find: "processes", replacement: "/src/processes" },
      { find: "shared", replacement: "/src/shared" },
      { find: "widgets", replacement: "/src/widgets" },
    ],
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[local]_[hash:base64:4]",
    },
  },
})
