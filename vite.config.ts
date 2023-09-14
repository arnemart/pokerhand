import { defineConfig } from "vite"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

export default defineConfig({
  root: join(dirname(fileURLToPath(new URL(import.meta.url))), "src", "client")
})
