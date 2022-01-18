import { WebSocket } from "ws";
import { exec } from "promisify-child-process";
import { pullUIData } from "./fetch-data";

export async function createNovelFromGUI(ws: WebSocket, novel: string) {
  const { stdout, stderr } = await exec(`prognovel novel add ${novel}`);
  if (stdout) console.log(stdout);
  if (stderr) {
    console.error(stderr);
  } else {
    ws.send(
      JSON.stringify({
        type: "PULLDATA",
        data: await pullUIData(),
      }),
    );
  }
}
