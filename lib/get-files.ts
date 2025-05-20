// lib/get-block-files.ts
import fs from "node:fs";
import path from "node:path";

export function getFiles(block: string) {
  const basePath = path.join(process.cwd(), "blocks", block);

  function readDirRecursive(dir: string): any[] {
    return fs.readdirSync(dir).map((file) => {
      const fullPath = path.join(dir, file);
      const isDir = fs.lstatSync(fullPath).isDirectory();
      return isDir
        ? { name: file, children: readDirRecursive(fullPath) }
        : { name: file, content: fs.readFileSync(fullPath, "utf-8") };
    });
  }

  return readDirRecursive(basePath);
}
