"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ComponentRegistry, ComponentKey } from "@/lib/component-registry";

type FileNode =
  | { name: string; content: string }
  | { name: string; children: FileNode[] };

function flattenFiles(
  tree: FileNode[],
  prefix = "",
): { name: string; path: string; content: string }[] {
  const flat: { name: string; path: string; content: string }[] = [];

  function recurse(nodes: FileNode[], currentPath: string) {
    for (const node of nodes) {
      const fullPath = `${currentPath}${node.name}`;
      if ("content" in node) {
        flat.push({ name: node.name, path: fullPath, content: node.content });
      } else {
        recurse(node.children, `${fullPath}/`);
      }
    }
  }

  recurse(tree, prefix);
  return flat;
}

function FileTree({
  files,
  onSelect,
  basePath = "",
}: {
  files: FileNode[];
  onSelect: (filePath: string) => void;
  basePath?: string;
}) {
  return (
    <ul className="text-sm pl-4 font-mono space-y-1">
      {files.map((file) =>
        "children" in file ? (
          <li key={file.name}>
            📁 {file.name}
            <FileTree
              files={file.children}
              onSelect={onSelect}
              basePath={`${basePath}${file.name}/`}
            />
          </li>
        ) : (
          <li
            key={file.name}
            className="cursor-pointer hover:underline"
            onClick={() => onSelect(`${basePath}${file.name}`)}
          >
            📄 {file.name}
          </li>
        ),
      )}
    </ul>
  );
}

function FileViewer({
  files,
  selectedPath,
}: {
  files: { path: string; content: string }[];
  selectedPath: string;
}) {
  const selected = files.find((f) => f.path === selectedPath);

  if (!selected)
    return (
      <div className="text-sm italic text-muted-foreground">
        Select a file to view its content
      </div>
    );

  return (
    <div>
      <div className="text-sm font-semibold mb-2">{selected.path}</div>
      <pre className="bg-muted p-4 rounded overflow-auto text-xs max-h-[500px]">
        <code>{selected.content}</code>
      </pre>
    </div>
  );
}

export default function DemoViewer({
  componentKey,
  files,
}: {
  componentKey: ComponentKey;
  files: FileNode[];
}) {
  const flatFiles = flattenFiles(files);
  const [selectedFile, setSelectedFile] = useState(flatFiles[0]?.path || "");

  const Component = ComponentRegistry[componentKey];

  return (
    <div className="p-6">
      <Tabs defaultValue="preview">
        <TabsList className="mb-6">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="border rounded p-4 bg-background">
            {Component ? <Component /> : <div>Component not found.</div>}
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 border rounded p-4 bg-background">
              <FileTree files={files} onSelect={setSelectedFile} />
            </div>
            <div className="md:col-span-2 border rounded p-4 bg-background">
              <FileViewer files={flatFiles} selectedPath={selectedFile} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
