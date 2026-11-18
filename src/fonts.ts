/**
 * Font files for the PDF and image engines.
 *
 * renderPdf and renderImage never fetch: every font the Document or Canvas
 * uses must be given as bytes (TTF, OTF or WOFF — not WOFF2). The files come
 * from the @fontsource packages in devDependencies, so a clean checkout gets
 * them with `npm install`. One entry per family / weight / style used.
 *
 * The HTML roots (email, page, print HTML) reference the same families as
 * web fonts instead — see `webFonts` in `src/theme.ts`.
 */
import { readFile } from "node:fs/promises";

export interface FontFile {
  family: string;
  src: Buffer;
  weight?: number;
  style?: "normal" | "italic";
}

const FONTSOURCE = new URL("../node_modules/@fontsource/", import.meta.url);

const SPECS: Array<{ family: string; file: string; weight: number; style?: "normal" | "italic" }> = [
  { family: "Lora", file: "lora/files/lora-latin-400-normal.woff", weight: 400 },
  { family: "Lora", file: "lora/files/lora-latin-500-normal.woff", weight: 500 },
  { family: "Lora", file: "lora/files/lora-latin-600-normal.woff", weight: 600 },
  { family: "Lora", file: "lora/files/lora-latin-700-normal.woff", weight: 700 },
  { family: "Lora", file: "lora/files/lora-latin-400-italic.woff", weight: 400, style: "italic" },
  { family: "Lora", file: "lora/files/lora-latin-500-italic.woff", weight: 500, style: "italic" },
  { family: "Inter", file: "inter/files/inter-latin-400-normal.woff", weight: 400 },
  { family: "Inter", file: "inter/files/inter-latin-500-normal.woff", weight: 500 },
  { family: "Inter", file: "inter/files/inter-latin-600-normal.woff", weight: 600 },
  { family: "Inter", file: "inter/files/inter-latin-700-normal.woff", weight: 700 },
  { family: "Space Mono", file: "space-mono/files/space-mono-latin-400-normal.woff", weight: 400 },
  { family: "Space Mono", file: "space-mono/files/space-mono-latin-700-normal.woff", weight: 700 },
];

export async function loadFontFiles(): Promise<FontFile[]> {
  const out: FontFile[] = [];
  for (const spec of SPECS) {
    const src = await readFile(new URL(spec.file, FONTSOURCE));
    out.push({ family: spec.family, src, weight: spec.weight, style: spec.style });
  }
  return out;
}
