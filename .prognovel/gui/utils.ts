import { exec } from "promisify-child-process";
import { promises } from "fs";
import { WebSocket } from "ws";
import { parse } from "dotenv";

const { readFile } = promises;

export async function runCommand(ws: WebSocket, task: string) {
  const { stdout } = await exec(`prognovel ${task}`);
  console.log(stdout);

  if (stdout.toString().toLowerCase().includes("upload failed")) {
    let env = {
      CF_ACCOUNT_ID: "",
      CF_NAMESPACE_ID: "",
      CF_API_TOKEN: "",
    };
    try {
      const rawEnv = parse(await readFile(".env", "utf-8"));
      env = {
        CF_ACCOUNT_ID: rawEnv.CF_ACCOUNT_ID || "",
        CF_NAMESPACE_ID: rawEnv.CF_NAMESPACE_ID || "",
        CF_API_TOKEN: rawEnv.CF_API_TOKEN || "",
      };
    } catch (error) {}
    ws.send(
      JSON.stringify({
        type: "COMMANDERROR",
        task,
        env,
      }),
    );
  }
}
