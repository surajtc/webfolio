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
      <Tabs defaultValue="preview" className="h-full py-2 px-4">
        <div className="flex items-center justify-between pl-1 py-1">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Webfolio
          </Link>
          <div className="flex items-center gap-2">
            <TabsList className="rounded-full !h-auto">
              <TabsTrigger value="preview" className="rounded-full">
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="rounded-full">
                Code
              </TabsTrigger>
            </TabsList>
            <ThemeToggle />
          </div>
        </div>
        <div className="border border-input rounded-xl overflow-hidden flex-1 bg-background">
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
