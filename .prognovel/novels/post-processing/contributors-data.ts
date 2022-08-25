import { novelFiles } from "../../_files";
import { load } from "js-yaml";
import { readFileSync } from "fs";
import type { ChapterData } from "./chapter";

export function generateContributorData(chapterData: any, novel: string): ChapterData {
  let { contributors } = chapterData;
  const config = novelFiles(novel).contributorsConfig;
  const contributorData = load(readFileSync(config, "utf-8"));
  const novelData: any = load(readFileSync(novelFiles(novel).info, "utf-8"));

  return {
    ...chapterData,
    contributors: generateContributors(),
  };
  function generateContributors() {
    if (!(contributors && contributors.author)) {
      contributors.author = novelData.author;
    }
    return Object.keys(contributors).reduce((prev, cur) => {
      if (contributors[cur])
        prev[cur] = contributors[cur]
          .split(",")
          .map((name: string) => name.trim())
          .filter((name: string) => !!name)
          .map((contributor) => {
            if (typeof contributorData[contributor] === "string") {
              contributorData[contributor] = {
                payment: contributorData[contributor],
              };
            }

            return {
              name: contributor,
              ...(contributorData[contributor] || {}),
            };
          });

      return prev;
    }, {});
  }
}
