// import { promises as fs } from "fs";
import path from "path";
import React from "react";

// export async function getContent() {
//   const filePath = path.join(process.cwd(), "src", "data", "content.json");
//   const fileContents = await fs.readFile(filePath, "utf8");
//   return JSON.parse(fileContents);
// }

export function nl2br(str: string) {
  return str.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i !== str.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
}
