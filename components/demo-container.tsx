import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FilePreview, type FileEntry } from "./file-preview";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export function DemoContainer({
  children,
  files,
}: {
  children: React.ReactNode;
  files: FileEntry[];
}) {
  return (
    <main className="h-screen overflow-hidden bg-sidebar">
      <Tabs defaultValue="preview" className="h-full p-2">
        <div className="flex items-center justify-between">
          <Link href="/">Web Blocks</Link>
          <div className="flex items-center gap-2">
            <TabsList className="">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <ThemeToggle />
          </div>
        </div>
        <div className="border rounded flex-1 bg-background">
          <TabsContent value="preview" className="h-full">
            {children}
          </TabsContent>

          <TabsContent value="code" className="h-full">
            <FilePreview files={files} />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
