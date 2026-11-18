/**
 * Perseid Night — the brand, written once.
 *
 * One `defineTheme()` serves all four roots: the ticket email, the event
 * page, the printable ticket and the social poster. A deep indigo-violet
 * night sky with silver and pale icy-blue accents; Lora for display type,
 * Inter for body, Space Mono for ticket codes and labels.
 *
 * The hex palette lives in `palette` so the drawn Svg artwork (stars,
 * constellations, the observatory dome) uses exactly the same colors as the
 * theme tokens.
 */
import { defineTheme } from "@hyper-elements/react";

export const palette = {
  night: "#120E2B",
  violet: "#1D1545",
  violetSoft: "#2B2060",
  violetMist: "#41327E",
  ice: "#BFE6FA",
  iceMid: "#8FC9EF",
  iceSoft: "#E6F5FE",
  violetAccent: "#5C54B8",
  silver: "#C9CDE4",
  silverDim: "#9A9DB8",
  paper: "#F5F3FA",
  paperDeep: "#E9E5F4",
  card: "#FFFFFF",
  ink: "#221C3F",
  muted: "#6B658A",
  border: "#DDD8EC",
  white: "#FFFFFF",
} as const;

export const fontStacks = {
  display: "Lora, Georgia, 'Times New Roman', serif",
  body: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "'Space Mono', SFMono-Regular, Menlo, Consolas, monospace",
} as const;

/**
 * Web fonts for the HTML roots (email, page, print HTML). The latin subsets
 * only — the templates are English. The PDF and the share card do not fetch
 * these; `src/fonts.ts` hands them the same families as local WOFF files
 * from the @fontsource packages.
 */
export const webFonts = [
  {
    family: "Lora",
    src: "https://fonts.gstatic.com/s/lora/v37/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkq0.woff2",
    format: "woff2" as const,
    weight: 400,
  },
  {
    family: "Lora",
    src: "https://fonts.gstatic.com/s/lora/v37/0QI6MX1D_JOuGQbT0gvTJPa787wsuxJBkq0.woff2",
    format: "woff2" as const,
    weight: 500,
  },
  {
    family: "Lora",
    src: "https://fonts.gstatic.com/s/lora/v37/0QI6MX1D_JOuGQbT0gvTJPa787zAvBJBkq0.woff2",
    format: "woff2" as const,
    weight: 600,
  },
  {
    family: "Lora",
    src: "https://fonts.gstatic.com/s/lora/v37/0QI6MX1D_JOuGQbT0gvTJPa787z5vBJBkq0.woff2",
    format: "woff2" as const,
    weight: 700,
  },
  {
    family: "Lora",
    src: "https://fonts.gstatic.com/s/lora/v37/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-MoFoq92nA.woff2",
    format: "woff2" as const,
    weight: 400,
    style: "italic" as const,
  },
  {
    family: "Lora",
    src: "https://fonts.gstatic.com/s/lora/v37/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-PgFoq92nA.woff2",
    format: "woff2" as const,
    weight: 500,
    style: "italic" as const,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 400,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 500,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 600,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 700,
  },
  {
    family: "Space Mono",
    src: "https://fonts.gstatic.com/s/spacemono/v17/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2",
    format: "woff2" as const,
    weight: 400,
  },
  {
    family: "Space Mono",
    src: "https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZUFWaHg.woff2",
    format: "woff2" as const,
    weight: 700,
  },
];

export const perseidTheme = defineTheme({
  colors: {
    background: palette.paper,
    foreground: palette.ink,
    primary: palette.violet,
    primaryForeground: palette.paper,
    muted: palette.muted,
    border: palette.border,
    accent: palette.ice,
    accentForeground: palette.night,
    night: palette.night,
    violet: palette.violet,
    violetSoft: palette.violetSoft,
    ice: palette.ice,
    iceMid: palette.iceMid,
    silver: palette.silver,
    paper: palette.paper,
    card: palette.card,
  },
  fonts: {
    body: fontStacks.body,
    heading: fontStacks.display,
    mono: fontStacks.mono,
  },
  fontSizes: { body: 16 },
  lineHeights: { body: 1.6 },
  radii: { card: 12, pill: 999 },
  elements: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 40, lineHeight: 1.08, fontWeight: 600, letterSpacing: -0.5, mobile: { fontSize: 30 } },
          2: { fontSize: 26, lineHeight: 1.2, fontWeight: 600, letterSpacing: -0.3, mobile: { fontSize: 22 } },
          3: { fontSize: 18, lineHeight: 1.3, fontWeight: 600 },
        },
      },
    },
    Button: {
      backgroundColor: "{colors.primary}",
      color: "{colors.primaryForeground}",
      fontSize: 16,
      fontWeight: 600,
      padding: [14, 28],
      borderRadius: 999,
      hover: { backgroundColor: "{colors.night}" },
      variants: {
        ice: {
          backgroundColor: "{colors.accent}",
          color: "{colors.accentForeground}",
          hover: { backgroundColor: "{colors.iceMid}" },
        },
        light: {
          backgroundColor: "{colors.paper}",
          color: "{colors.violet}",
          hover: { backgroundColor: "{colors.silver}" },
        },
      },
    },
    Link: {
      color: "{colors.primary}",
      fontWeight: 600,
    },
  },
  styles: {
    /** A white card on the paper ground. */
    card: {
      backgroundColor: "{colors.card}",
      border: { width: 1, style: "solid", color: "{colors.border}" },
      borderRadius: 12,
      padding: 28,
      gap: 16,
    },
    /** A violet card: the ticket, the star chart, the footer band. */
    darkCard: {
      backgroundColor: "{colors.violet}",
      color: palette.paper,
      borderRadius: 12,
      padding: 28,
      gap: 16,
    },
    /** Small-caps mono eyebrow above a heading. */
    eyebrow: {
      fontFamily: "{fonts.mono}",
      fontSize: 11,
      fontWeight: 400,
      letterSpacing: 2.2,
      textTransform: "uppercase",
      lineHeight: 1.4,
    },
    /** A label over a value (date, gates, code). */
    metaLabel: {
      fontFamily: "{fonts.mono}",
      fontSize: 10,
      fontWeight: 400,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      lineHeight: 1.4,
      color: "{colors.muted}",
    },
    /** A rounded pill, e.g. the ticket code on the share card. */
    pill: {
      backgroundColor: "{colors.accent}",
      color: "{colors.accentForeground}",
      fontFamily: "{fonts.mono}",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 1.2,
      padding: [8, 16],
      borderRadius: 999,
    },
  },
  formats: {
    email: {
      elements: {
        Heading: {
          by: {
            level: {
              1: { fontSize: 36, mobile: { fontSize: 28 } },
              2: { fontSize: 24, mobile: { fontSize: 20 } },
            },
          },
        },
      },
    },
  },
});

/** Type every token name in templates. */
declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof perseidTheme;
  }
}
