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
        index: "./src/index.html",
        login: "./src/login/index.html",
        profile: "./src/profile/index.html",
        register: "./src/register/index.html",
        sucess: "./src/register/sucess/index.html",
      },
    },
  },
  server: {
    open: true,
    port: 5100,
    strictPort: true,
  },
};
