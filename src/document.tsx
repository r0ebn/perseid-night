/**
 * Perseid Night — printable ticket + star chart (A5 landscape).
 *
 * One page, meant to be printed or shown on a phone at the gate: the
 * observatory and the guest, the night's facts, a small star chart of
 * Perseus and Cassiopeia with the radiant marked, the program, and the
 * ticket code. Renders to print HTML and to PDF (see scripts/build.ts).
 */
import {
  Column,
  Divider,
  Document,
  Heading,
  PageFooter,
  PageNumber,
  Row,
  Text,
  token,
} from "@hyper-elements/react";
import { event, finePrint, guest, observatory, ticket } from "./data";
import { palette, perseidTheme, webFonts } from "./theme";
import { ProgramSchedule, StarChart, TicketFactsRow, Wordmark } from "./components";

export default function NightTicket() {
  return (
    <Document
      size="A5"
      orientation="landscape"
      margin={[20, 36, 16, 36]}
      theme={perseidTheme}
      title={`Ticket ${ticket.code} — ${event.name}, ${observatory.name}`}
      lang="en"
      fonts={webFonts}
      style={{ fontSize: 13, lineHeight: 1.5, gap: 6 }}
    >
      {/* Header: wordmark, ticket title, guest. */}
      <Row style={{ alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <Wordmark />
        <Column style={{ gap: 2, alignItems: "end" }}>
          <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>Admit two · {event.name}</Text>
          <Heading level={1} style={{ fontSize: 26, lineHeight: 1.1 }}>
            {guest.fullName}
          </Heading>
          <Text style={{ fontSize: 12, color: token("colors.muted") }}>
            {ticket.summary} · {event.dateLabel}
          </Text>
        </Column>
      </Row>

      <Divider />

      {/* The night's facts. */}
      <TicketFactsRow />

      {/* Star chart + program, side by side. */}
      <Row style={{ gap: 28, alignItems: "start" }}>
        <Column style={{ width: 320, flex: "none", gap: 8 }}>
          <Text style={{ apply: ["metaLabel"] }}>Tonight&rsquo;s sky</Text>
          <StarChart />
        </Column>
        <Column style={{ gap: 8 }}>
          <Text style={{ apply: ["metaLabel"] }}>The program</Text>
          <ProgramSchedule compact />
        </Column>
      </Row>

      {/* Ticket code. */}
      <Row
        style={{
          gap: 20,
          alignItems: "center",
          backgroundColor: palette.violet,
          borderRadius: 8,
          padding: [10, 20],
        }}
      >
        <Text
          style={{
            fontFamily: token("fonts.mono"),
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 3,
            color: palette.paper,
            lineHeight: 1.2,
          }}
        >
          {ticket.code}
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.45, color: palette.silver }}>
          Present this code at the gate, with photo ID.
        </Text>
      </Row>

      {/* Fine print. */}
      <Column style={{ gap: 3, padding: [8, 0, 0], border: { top: `1px solid ${palette.border}` } }}>
        {finePrint.map((line) => (
          <Text key={line} style={{ fontSize: 9.5, lineHeight: 1.45, color: token("colors.muted") }}>
            {line}
          </Text>
        ))}
      </Column>

      <PageFooter style={{ padding: [8, 0, 0], border: { top: `1px solid ${palette.border}` } }}>
        <Row style={{ gap: 16 }}>
          <Text style={{ fontSize: 9.5, color: token("colors.muted") }}>
            {observatory.name} · {observatory.addressLines.join(", ")} · {observatory.phone} · {observatory.email}
          </Text>
          <Text style={{ width: 120, textAlign: "right", fontSize: 9.5, color: token("colors.muted") }}>
            Page <PageNumber /> of <PageNumber total />
          </Text>
        </Row>
      </PageFooter>
    </Document>
  );
}
