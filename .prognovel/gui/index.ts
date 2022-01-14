import WebSocket from "ws";
import { readFileSync, writeFileSync } from "fs";
import { novelFiles, siteFiles } from "../_files";
import { load, dump } from "js-yaml";
import * as markdown from "markdown-wasm";
import { NodeHtmlMarkdown } from "node-html-markdown";
// import TurndownService from "turndown";

export function initializeGUIServer() {
  console.log("...\n");
  const wss = new WebSocket.WebSocketServer({
    port: 6060,
  });

  console.log(`🚀 launching ProgNovel GUI from port 6060.
    Admin page is now ready to use in www.<your-prognovel-site>.com/admin`);

  wss.on("connection", (ws) => {
    ws.on("message", (d: Buffer) => {
      try {
        const data = JSON.parse(d.toString("utf-8"));
        console.log("incoming:", data);

        if (data.type === "FETCH") fetchFile(ws, data.file);
        if (data.type === "SAVE") saveFile(ws, data.file, data.data);
      } catch (error) {
        console.error(error);
      }
    });
  });
}

async function fetchFile(ws: WebSocket, file: string) {
  let data;
  let filePath = "";
  let novel = "";
  if (file.split("/").length > 1) {
    [novel, file] = file.split("/");
  }

  if (novel) {
    filePath = novelFiles(novel)[file];
  } else {
    filePath = siteFiles()[file];
  }
  data =
    file !== "synopsis"
      ? load(readFileSync(filePath, "utf-8"))
      : markdown.parse(readFileSync(filePath, "utf-8"));

  ws.send(JSON.stringify({ type: "FETCH", file, data }));
}

async function saveFile(ws: WebSocket, file: string, data2: any) {
  let data1;
  let filePath = "";
  let novel = "";
  if (file.split("/").length > 1) {
    [novel, file] = file.split("/");
  }

  if (novel) {
    filePath = novelFiles(novel)[file];
  } else {
    filePath = siteFiles()[file];
  }
  data1 = load(readFileSync(filePath, "utf-8"));
  const newData = file !== "synopsis" ? dump({ ...data1, ...data2 }) : NodeHtmlMarkdown.translate(data2);
  writeFileSync(filePath, newData, "utf-8");
}
