import WebSocket from "ws";

export function initializeGUIServer() {
  console.log("...\n");
  const wss = new WebSocket.WebSocketServer({
    port: 6060,
  });

  console.log(`🚀 launching ProgNovel GUI from port 6060.
    Admin page is now ready to use in www.<your-prognovel-site>.com/admin`);

  wss.on("connection", (ws) => {
    ws.on("message", WebSocketMessage);
  });
}

function WebSocketMessage(data: any) {}
