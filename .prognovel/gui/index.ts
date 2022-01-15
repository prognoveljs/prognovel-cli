import WebSocket from "ws";
import { saveFile, fetchFile, pullUIData } from "./fetch-data";

export function initializeGUIServer() {
  console.log("...\n");

  const wss = new WebSocket.WebSocketServer({
    port: 6060,
  });

  console.log(`🚀 launching ProgNovel GUI from port 6060.
    Admin page is now ready to use in www.<your-prognovel-site>.com/admin`);

  wss.on("connection", async (ws) => {
    ws.on("message", (d: Buffer) => {
      try {
        const data = JSON.parse(d.toString("utf-8"));
        console.log("incoming:", data);

        if (data.type === "FETCH") fetchFile(ws, data.file);
        if (data.type === "SAVE") saveFile(data.file, data.data);
      } catch (error) {
        console.error(error);
      }
    });

    ws.send(
      JSON.stringify({
        type: "PULLDATA",
        data: await pullUIData(),
      }),
    );
  });
}
