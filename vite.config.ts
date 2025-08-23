import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  
  ssr: {
    noExternal: [
      // List packages here that cause `module is not defined` errors
      // Example:
      // "some-broken-package"
    ],
  },

  define: {
    // Prevent SSR from crashing if any library tries to access `module`
    'module': '{}',
  },
});
