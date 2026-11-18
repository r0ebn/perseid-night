/**
 * Build: validate every template, then render all four outputs into `out/`.
 *
 *   npm run build
 *
 * The build gate is `validate()`: any error fails the build, warnings are
 * printed. The email is also checked with the `@hyper-elements/email-clients`
 * plugin (classic Outlook, Gmail, Apple Mail and the rest), and per-client
 * previews are written to `out/clients/`.
 *
 * Outputs:
 *   out/email.html, out/email.txt      ticket email + plain-text twin
 *   out/page.html                      event page
 *   out/ticket.html, out/ticket.pdf    printable ticket + star chart
 *   out/share-card.png, out/share-card.svg  social poster (1080 x 1080)
 *   out/clients/*.html                 the email as Outlook, Gmail and
 *                                      Apple Mail draw it
 *
 * Nothing is fetched at build time: the PDF and the poster get their
 * fonts as local WOFF files from the @fontsource packages — see
 * `src/fonts.ts`.
 */
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { ElementsError, formatDiagnostics, render, validate } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { emailClients, renderInEmailClients } from "@hyper-elements/email-clients";
import TicketEmail from "../src/email";
import EventPage from "../src/page";
import NightTicket from "../src/document";
import ShareCard from "../src/canvas";
import { loadFontFiles } from "../src/fonts";

const OUT = new URL("../out/", import.meta.url);

function report(name: string, diagnostics: { severity: string }[] | readonly { severity: string }[], formatted: string) {
  const errors = diagnostics.filter((d) => d.severity === "error").length;
  const warnings = diagnostics.filter((d) => d.severity === "warning").length;
  console.log(`\n== ${name}: ${errors} error(s), ${warnings} warning(s)`);
  if (formatted.trim()) console.log(formatted);
  return errors;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(new URL("clients/", OUT), { recursive: true });

  const clientsPlugin = await emailClients();

  // --- Build gate: validate all four templates. Errors fail the build. ---
  let errors = 0;
  const emailEl = createElement(TicketEmail);
  const pageEl = createElement(EventPage);
  const documentEl = createElement(NightTicket);
  const canvasEl = createElement(ShareCard);

  const emailValidation = validate(emailEl, { plugins: [clientsPlugin] });
  errors += report("validate email (+ email-clients)", emailValidation.diagnostics, formatDiagnostics(emailValidation.diagnostics));
  const pageValidation = validate(pageEl);
  errors += report("validate page", pageValidation.diagnostics, formatDiagnostics(pageValidation.diagnostics));
  const documentValidation = validate(documentEl);
  errors += report("validate document", documentValidation.diagnostics, formatDiagnostics(documentValidation.diagnostics));
  const canvasValidation = validate(canvasEl);
  errors += report("validate canvas", canvasValidation.diagnostics, formatDiagnostics(canvasValidation.diagnostics));
  if (errors > 0) {
    console.error(`\nBuild failed: ${errors} validation error(s).`);
    process.exitCode = 1;
    return;
  }

  // --- Email: HTML + plain-text twin. ---
  const email = await render(emailEl, { plugins: [clientsPlugin] });
  report("render email", email.diagnostics, formatDiagnostics(email.diagnostics));
  await writeFile(new URL("email.html", OUT), email.html);
  await writeFile(new URL("email.txt", OUT), email.text);
  console.log("Wrote out/email.html, out/email.txt");

  // --- Per-client previews of the email. ---
  const previews = await renderInEmailClients(emailEl, {
    emailClients: ["outlook", "gmail", "apple-mail"],
    fonts: "inline",
  });
  for (const preview of previews.previews) {
    await writeFile(new URL(`clients/${preview.filename}`, OUT), preview.html);
    console.log(`Wrote out/clients/${preview.filename}`);
  }
  for (const skipped of previews.skipped) {
    console.log(`Skipped client preview: ${skipped.client} — ${skipped.reason}`);
  }
  report("email-clients previews", previews.diagnostics, formatDiagnostics(previews.diagnostics));

  // --- Page. ---
  const page = await render(pageEl);
  report("render page", page.diagnostics, formatDiagnostics(page.diagnostics));
  await writeFile(new URL("page.html", OUT), page.html);
  console.log("Wrote out/page.html");

  // --- Document: print HTML + PDF. ---
  const document = await render(documentEl);
  report("render document", document.diagnostics, formatDiagnostics(document.diagnostics));
  await writeFile(new URL("ticket.html", OUT), document.html);
  console.log("Wrote out/ticket.html");

  const fonts = await loadFontFiles();
  console.log(`\nLoaded ${fonts.length} font files for the PDF and image engines`);
  const pdf = await renderPdf(documentEl, { fonts });
  report("renderPdf ticket", pdf.diagnostics, formatDiagnostics(pdf.diagnostics));
  await writeFile(new URL("ticket.pdf", OUT), pdf.pdf);
  console.log(`Wrote out/ticket.pdf (${pdf.pdf.length} bytes)`);

  // --- Canvas: PNG + SVG. ---
  const png = await renderImage(canvasEl, { fonts });
  report("renderImage share card (png)", png.diagnostics, formatDiagnostics(png.diagnostics));
  await writeFile(new URL("share-card.png", OUT), png.image);
  console.log(`Wrote out/share-card.png (${png.width}x${png.height}, ${png.image.length} bytes)`);

  const svg = await renderImage(canvasEl, { fonts, format: "svg" });
  report("renderImage share card (svg)", svg.diagnostics, formatDiagnostics(svg.diagnostics));
  await writeFile(new URL("share-card.svg", OUT), svg.image);
  console.log(`Wrote out/share-card.svg (${svg.image.length} bytes)`);

  // The README embeds the share card, and `out/` is gitignored — so copies
  // live in `docs/`, refreshed on every build.
  await mkdir(new URL("../docs/screenshots/", import.meta.url), { recursive: true });
  await copyFile(new URL("share-card.svg", OUT), new URL("../docs/share-card.svg", import.meta.url));
  await copyFile(new URL("share-card.png", OUT), new URL("../docs/screenshots/share-card.png", import.meta.url));
  console.log("Copied share card to docs/share-card.svg and docs/screenshots/share-card.png");

  console.log("\nBuild complete. Open out/email.html, out/page.html, out/ticket.html, out/ticket.pdf or out/share-card.png.");
}

main().catch((error) => {
  if (error instanceof ElementsError) {
    console.error(formatDiagnostics(error.diagnostics));
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
