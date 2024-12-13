import { ViteMinifyPlugin } from "vite-plugin-minify";
import { resolve } from "path";

export default {
  appType: "mpa",
  plugins: [ViteMinifyPlugin()],
  base: "./",
  root: "./src",
  resolve: {
    alias: {
      "@app": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        singleListing: resolve(__dirname, "src/single-listing/index.html"),
        profile: resolve(__dirname, "src/profile/index.html"),
        search: resolve(__dirname, "src/search/index.html"),
        create: resolve(__dirname, "src/create/index.html"),
        404: resolve(__dirname, "src/404.html"),
      },
    },
  },
  server: {
    open: true,
    port: 5100,
    strictPort: true,
  },
};
