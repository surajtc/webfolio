import fs from "node:fs";
import path from "node:path";

export interface FileEntry {
  path: string;
  content: string;
}

/** ---- Helpers ---- */

/** Which files do we care about? */
function isTargetFile(fileName: string): boolean {
  return /\.(tsx|json)$/i.test(fileName);
}

/** Turn any OS‐specific path into a forward‐slash relative path */
function toPosixRelative(baseDir: string, fullPath: string): string {
  return path.relative(baseDir, fullPath).split(path.sep).join("/");
}

/**
 * Given a POSIX‐style relative path and the base folder name,
 * decide whether it belongs under `app/components/…` or
 * `app/<baseName>/…`.
 */
function buildOutputPath(relPath: string, baseName: string): string {
  if (relPath.startsWith("components/")) {
    return `${relPath}`;
  }
  return `app/${baseName}/${relPath}`;
}

/**
 * Collapse any import paths matching
 *   @/(…/<baseName>/)components/…  →  @/components/…
 */
function sanitizeImports(content: string, baseName: string): string {
  const importRegex = new RegExp(`@/(?:[^/]+/)*${baseName}/components/`, "g");
  return content.replace(importRegex, "@/components/");
}

export function getAppFileEntries(dir: string): FileEntry[] {
  const results: FileEntry[] = [];
  const baseName = path.basename(dir);

  function recurse(currentDir: string) {
    for (const name of fs.readdirSync(currentDir)) {
      const fullPath = path.join(currentDir, name);
      const stat = fs.lstatSync(fullPath);

      if (stat.isDirectory()) {
        recurse(fullPath);
        continue;
      }

      if (!isTargetFile(name)) continue;

      // 1) Compute a POSIX‐style relative path
      const relPath = toPosixRelative(dir, fullPath);

      // 2) Build the final output path
      const outputPath = buildOutputPath(relPath, baseName);

      // 3) Read + sanitize
      const raw = fs.readFileSync(fullPath, "utf8");
      const content = sanitizeImports(raw, baseName);

      results.push({ path: outputPath, content });
    }
  }

  recurse(dir);
  return results;
}
