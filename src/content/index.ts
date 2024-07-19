import { promises as fs } from "fs";
import path from "path";

export async function getContent() {
  const filePath = path.join(process.cwd(), "src", "data", "content.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}
