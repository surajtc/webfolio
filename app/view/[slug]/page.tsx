import { DemoContainer } from "@/components/demo-container";
import { FilePreview } from "@/components/file-preview";
import type { FileEntry } from "@/lib/file-utils";
import { getAppFileEntries } from "@/lib/file-utils";
import type { PageKey } from "@/lib/registry";
import { PageRegistry } from "@/lib/registry";
import { notFound } from "next/navigation";
import { highlight } from "sugar-high";

export function generateStaticParams() {
  const keys = Object.keys(PageRegistry);

  return keys.map((k) => ({ slug: k }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: PageKey }>;
}) {
  const { slug } = await params;

  const entry = PageRegistry[slug];
  if (!entry) return notFound();

  let files: FileEntry[];

  try {
    files = getAppFileEntries(`components/examples/${slug}`);
  } catch (err) {
    console.error(`[page/${slug}] failed to load files:`, err);
    notFound();
  }

  if (files.length === 0) {
    console.warn(`[page/${slug}] no files found`);
    notFound();
  }

  const highlighted = files.map(({ path, content }) => ({
    path,
    codeHtml: highlight(content),
  }));

  return (
    <DemoContainer files={highlighted}>
      <iframe src={`/demo/${slug}`} title={slug} className="h-full w-full" />
    </DemoContainer>
  );
}
