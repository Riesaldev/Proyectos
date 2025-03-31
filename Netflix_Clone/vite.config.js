import { fileURLToPath } from "url";
import path from "path";
import react from "@vitejs/plugin-react";

// Definir __dirname manualmente
const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

export default {
  plugins: [ react() ],
  resolve: {
    alias: {
      "@": path.resolve( __dirname, "./src" ),
    },
  },
};
