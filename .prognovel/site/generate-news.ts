import glob from "tiny-glob";
import { promises } from "fs";
import * as markdown from "markdown-wasm";
import fm from "front-matter";
import { publishFiles } from "../_files";
import { IS_STATIC } from "../main";

const { readFile, writeFile } = promises;

export async function generateNews() {
  const files = await glob(`news/**.md`);
  let result = {};

  for (const file of files) {
    const md = fm<{
      date: number | string;
      title: string;
      author: {
        name: string;
        email?: string;
      };
    }>(await readFile(file, "utf-8"));
    const content = markdown.parse(md.body);
    const id = file.split("/")[1].slice(0, -3);

    result[id] = {
      title: md?.attributes?.title || id,
      date:
        typeof md?.attributes?.date === "number" ? md?.attributes?.date : Date.parse(md?.attributes?.date),
      author: {
        name: md?.attributes?.author,
      },
      content,
    };
  }

  await writeFile(publishFiles().news, JSON.stringify(result), "utf-8");

  if (IS_STATIC) {
    const siteMetadata = JSON.parse(await readFile(publishFiles().siteMetadata, "utf-8"));
    siteMetadata.news = result
      ? Object.keys(result)
          .map((news) => {
            delete result[news].content;
            return {
              id: news,
              ...result[news],
            };
          })
          .sort((a, b) => {
            return b.date - a.date;
          })
          .slice(0, 3)
      : [];
    await writeFile(publishFiles().siteMetadata, JSON.stringify(siteMetadata, null, 2), "utf-8");
  }

  return result;
}

export async function generateNewsTimestamp(newsResult: any) {
  for (const id in newsResult) {
    if (!newsResult[id].date) {
      newsResult[id].date = Date.now();
      const md = fm<{
        date: number;
        title: string;
        author: {
          name: string;
          email?: string;
        };
      }>(await readFile(`news/${id}.md`, "utf-8"));
      await writeFile(
        `news/${id}.md`,
        `---
${Object.keys(md.attributes).reduce((prev, cur, i) => {
  if (cur === "date") {
    prev += `${cur}: ${new Date(newsResult[id].date).toString()}`;
  } else {
    prev += `${cur}: ${md.attributes[cur]}`;
  }
  if (i < Object.keys(md.attributes).length - 1) prev += "\n";
  return prev;
}, "")}${!("date" in md.attributes) ? `\ndate: ${new Date(newsResult[id].date).toString()}` : ""}
---

${md.body}`,
        "utf-8",
      );
    }
  }
  return newsResult;
}
