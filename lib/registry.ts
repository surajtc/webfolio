// lib/pageRegistry.ts
/// <reference types="webpack-env" />

import type { FC } from "react";

// — your optional per-page metadata shape
export interface PageMeta {
  title?: string;
  description?: string;
  // add more fields here as needed
}

// — what each entry in the registry looks like
export interface PageDef {
  component: FC;
  meta?: PageMeta;
}

// cast away TS’s “Require has no context” so webpack’s require.context works
const req = (require as any).context(
  /* directory */ "../components/examples",
  /* recursive */ true,
  /* pattern   */ /\/page\.tsx?$/,
);

export const PageRegistry: Record<string, PageDef> = req
  .keys()
  .reduce((registry: Record<string, PageDef>, filePath: string) => {
    // filePath: e.g. "./dashboard/page.tsx"
    const key = filePath
      .replace(/^\.\//, "") // "dashboard/page.tsx"
      .replace(/\/page\.tsx?$/, ""); // "dashboard"

    // import the module
    const mod: { default: FC; meta?: PageMeta } = req(filePath);

    registry[key] = {
      component: mod.default,
      meta: mod.meta,
    };

    return registry;
  }, {});

export type PageKey = keyof typeof PageRegistry;
