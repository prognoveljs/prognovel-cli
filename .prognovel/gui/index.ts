import WebSocket from "ws";
import { readFileSync } from "fs";
import { siteFiles } from "../_files";
import { load } from "js-yaml";

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
      } catch (error) {
        console.error(error);
      }
    });
  });
}

async function fetchFile(ws: WebSocket, file: string) {
  let data;
  let path = "";
  let novel = "";
  if (file.split("/").length > 2) {
    [novel, file] = file.split("/");
  }

  if (novel) {
  } else {
    data = load(readFileSync(siteFiles()[file], "utf-8"));
  }

  ws.send(JSON.stringify({ type: "FETCH", file, data }));
}
