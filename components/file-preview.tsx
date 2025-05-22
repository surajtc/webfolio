// components/FilePreview.tsx
// components/FilePreview.tsx
"use client";

import { useState } from "react";
import parse from "html-react-parser";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  CopyIcon,
} from "lucide-react";
import { Button } from "./ui/button";

export type FileEntry = {
  path: string;
  codeHtml: string;
};

export interface FilePreviewProps {
  files: FileEntry[];
}

type Node = {
  name: string;
  children: Record<string, Node>;
  codeHtml?: string;
};

/** Build a folder/file tree using simple for-loops */
function buildTree(files: FileEntry[]) {
  const root: Node = { name: "", children: {} };

  for (let i = 0; i < files.length; i++) {
    const { path, codeHtml } = files[i];
    const parts = path.split("/");
    let node = root;

    for (let j = 0; j < parts.length; j++) {
      const part = parts[j];
      if (!node.children[part]) {
        node.children[part] = { name: part, children: {} };
      }
      node = node.children[part];
      // last segment → store highlighted HTML
      if (j === parts.length - 1) {
        node.codeHtml = codeHtml;
      }
    }
  }

  return root;
}

export function FilePreview({ files }: FilePreviewProps) {
  const tree = buildTree(files);

  let defaultPath = "";
  for (let i = 0; i < files.length; i++) {
    if (files[i].path.endsWith("page.tsx")) {
      defaultPath = files[i].path;
      break;
    }
  }
  if (!defaultPath && files.length) {
    defaultPath = files[0].path;
  }

  const [selectedPath, setSelectedPath] = useState<string>(defaultPath);

  let selectedFile: FileEntry | undefined;
  for (let i = 0; i < files.length; i++) {
    if (files[i].path === selectedPath) {
      selectedFile = files[i];
      break;
    }
  }

  const navItems: React.ReactNode[] = [];
  for (const name in tree.children) {
    navItems.push(
      <TreeNode
        key={name}
        node={tree.children[name]}
        path={name}
        selectedPath={selectedPath}
        onSelect={setSelectedPath}
      />,
    );
  }

  return (
    <div className="flex h-full">
      <nav className="w-64 border-r p-2 overflow-auto space-y-4">
        {navItems}
      </nav>

      <main className="flex-1 overflow-auto">
        {selectedFile ? (
          <>
            <div className="flex items-center justify-between border-b px-4 py-2">
              <div className="text-sm flex items-center gap-1">
                <FileIcon className="size-4" />
                <span>{selectedFile.path}</span>
              </div>
              <Button variant="ghost" size="icon">
                <CopyIcon />
              </Button>
            </div>
            <div className="p-4 sh-code">{parse(selectedFile.codeHtml)}</div>
          </>
        ) : (
          <div>No file selected</div>
        )}
      </main>
    </div>
  );
}

interface TreeNodeProps {
  node: Node;
  path: string;
  selectedPath: string;
  onSelect: (path: string) => void;
}

function TreeNode({ node, path, selectedPath, onSelect }: TreeNodeProps) {
  const [open, setOpen] = useState(true);
  const isFile = node.codeHtml !== undefined;
  const name = node.name;
  const fullPath = path;

  if (isFile) {
    const isSelected = fullPath === selectedPath;
    return (
      <button
        type="button"
        className={`w-full flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-muted/50 hover:text-foreground ${
          isSelected ? "text-foreground bg-muted/50" : ""
        }`}
        onClick={() => onSelect(fullPath)}
      >
        <FileIcon className="size-4" /> {name}
      </button>
    );
  }

  // folder
  const childrenItems: React.ReactNode[] = [];
  if (open) {
    for (const childName in node.children) {
      const childNode = node.children[childName];
      const childPath = `${fullPath}/${childName}`;
      childrenItems.push(
        <TreeNode
          key={childPath}
          node={childNode}
          path={childPath}
          selectedPath={selectedPath}
          onSelect={onSelect}
        />,
      );
    }
  }

  return (
    <div className="text-muted-foreground text-sm space-y-1">
      <button
        type="button"
        className="w-full px-2 py-1 cursor-pointer flex items-center gap-2 hover:bg-muted/50 hover:text-foreground"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ChevronDownIcon className="size-4" />
        ) : (
          <ChevronRightIcon className="size-4" />
        )}
        {name}
      </button>
      {open && <div className="pl-4 space-y-1">{childrenItems}</div>}
    </div>
  );
}
