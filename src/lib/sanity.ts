import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "lfctwwh9",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});
