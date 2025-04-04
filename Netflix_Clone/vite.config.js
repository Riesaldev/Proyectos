import path from "path"
import { fileURLToPath } from "url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __dirname = path.dirname( fileURLToPath( import.meta.url ) )

export default defineConfig( {
  plugins: [ react() ],
  resolve: {
    alias: {
      "@": path.resolve( __dirname, "./src" ),
    },
  },
  server: {
    port: 3000,

  },
  css: {
    postcss: {
      plugins: [
        tailwindcss( "./tailwind.config.js" ),
      ],
    },
  },
} )
