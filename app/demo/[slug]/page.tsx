import type { FileEntry } from "@/lib/file-utils";
import { getAppFileEntries } from "@/lib/file-utils";
import type { PageKey } from "@/lib/registry";
import { PageRegistry } from "@/lib/registry";
import { notFound } from "next/navigation";

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

  const { component: Component, meta } = entry;

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

  return <Component />;
}
