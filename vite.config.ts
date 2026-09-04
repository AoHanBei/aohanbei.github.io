import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(fileURLToPath(new URL(".", import.meta.url)), "index.html"),
        notFound: resolve(fileURLToPath(new URL(".", import.meta.url)), "404.html"),
        modelport: resolve(fileURLToPath(new URL(".", import.meta.url)), "projects/modelport.html"),
        quantpilot: resolve(fileURLToPath(new URL(".", import.meta.url)), "projects/quantpilot.html"),
        memory: resolve(fileURLToPath(new URL(".", import.meta.url)), "projects/evolvable-user-memory.html")
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "src")
    }
  }
});
