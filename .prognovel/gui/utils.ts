import { exec } from "promisify-child-process";
import { WebSocket } from "ws";

export async function runCommand(ws: WebSocket, task: string) {
  const { stdout, stderr } = await exec(`prognovel ${task}`);
  if (stdout) console.log(stdout);
  if (stderr) {
    console.error(stderr);
    ws.send(
      JSON.stringify({
        type: "COMMANDERROR",
        task,
      }),
    );
  } else {
    // ws.send(
    //   JSON.stringify({
    //     type: "PULLDATA",
    //     data: await pullUIData(),
    //   }),
    // );
  }
}
