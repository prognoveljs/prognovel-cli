import { copyFileSync } from "fs";

export function markdownWasmOutput() {
  return {
    name: "markdown-wasm-output",
    buildEnd() {
      console.log("🌟 copying markdown-wasm file...");
      copyFileSync("node_modules/markdown-wasm/dist/markdown.wasm", ".prognovel/.dist/markdown.wasm");
    },
  };
}
