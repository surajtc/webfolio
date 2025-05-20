// app/demo/page.tsx
import { Index } from "@/components/demo";
import DemoViewer from "@/components/demo-viewer";

// lib/read-dir-recursive.ts
import fs from "fs";
import path from "path";

export type FileNode =
  | { name: string; content: string }
  | { name: string; children: FileNode[] };

export function readDirRecursive(dir: string): FileNode[] {
  return fs.readdirSync(dir).map((name) => {
    const fullPath = path.join(dir, name);
    const isDir = fs.lstatSync(fullPath).isDirectory();
    if (isDir) {
      return {
        name,
        children: readDirRecursive(fullPath),
      };
    } else {
      return {
        name,
        content: fs.readFileSync(fullPath, "utf8"),
      };
    }
  });
}

export default function DemoPage() {
  const files = readDirRecursive("components/demo");
  const test = readDirRecursive("components/demo/login");
  const dash = readDirRecursive("components/demo/dashboard");

  return (
    <div>
      <DemoViewer files={files} componentKey="demo" />
      <DemoViewer files={test} componentKey="login" />
      <DemoViewer files={dash} componentKey="dashboard" />
    </div>
  );
}
