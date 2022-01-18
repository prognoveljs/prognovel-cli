import { copyFileSync, existsSync, mkdirSync } from "fs";

export function markdownWasmOutput() {
  return {
    name: "markdown-wasm-output",
    buildEnd() {
      if (!existsSync(".prognovel/.dist")) mkdirSync(".prognovel/.dist", { recursive: true });
      console.log("🌟 copying markdown-wasm file...");
      copyFileSync("node_modules/markdown-wasm/dist/markdown.wasm", ".prognovel/.dist/markdown.wasm");
    },
  };
}
