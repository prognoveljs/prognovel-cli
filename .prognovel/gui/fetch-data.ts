import { promises } from "fs";
import { novelFiles, siteFiles } from "../_files";
import { load, dump } from "js-yaml";
import * as markdown from "markdown-wasm";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { WebSocket } from "ws";
import { dirname } from "path";
import glob from "tiny-glob";

const { readFile, writeFile } = promises;

export async function fetchFile(ws: WebSocket, file1: string) {
  let data;
  let filePath = "";
  let novel = "";
  let file2;
  if (file1.split("/").length > 1) {
    [novel, file2] = file1.split("/");
  }

  if (novel) {
    filePath = novelFiles(novel)[file2];
  } else {
    filePath = siteFiles()[file1];
  }
  data =
    file2 !== "synopsis"
      ? load(await readFile(filePath, "utf-8"))
      : markdown.parse(await readFile(filePath, "utf-8"));

  ws.send(JSON.stringify({ type: "FETCH", file: file1, data }));
}

export async function saveFile(file: string, data2: any) {
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
  data1 = load(await readFile(filePath, "utf-8"));
  const newData = file !== "synopsis" ? dump({ ...data1, ...data2 }) : NodeHtmlMarkdown.translate(data2);
  await writeFile(filePath, newData, "utf-8");
}

export async function pullUIData(): Promise<{
  [novel: string]: {
    info: any;
    banner: Uint8Array;
  };
}> {
  let data = {};

  for await (const file of await glob("novels/*/info.{yml,yaml}")) {
    const novel = dirname(file).split("/").pop();
    const info = load(await readFile(file, "utf-8")) as any;
    const bannerFile = (await glob(`novels/${novel}/cover.{webp,jpg,jpeg,png}`))[0];
    const ext = bannerFile.split(".")[1];
    data[novel] = {
      ...info,
      cover: `data:image/${ext};base64,${await readFile(bannerFile, "base64")}`,
    };
  }
  return data;
}
