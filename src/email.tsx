/**
 * Perseid Night — ticket confirmation email (600px).
 *
 * A warm welcome, the night at a glance, the price table, a dark ticket
 * card with the ticket code, the program, what to bring, the weather note
 * and directions. No Svg here: email clients can't draw it, so the email
 * leans on the theme's colors, the serif display type and the ticket card
 * instead. The plain-text twin comes from the same render — see
 * scripts/build.tsx.
 */
import {
  Button,
  Column,
  Divider,
  Email,
  Heading,
  Link,
  List,
  ListItem,
  Row,
  Section,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import {
  directions,
  event,
  guest,
  observatory,
  priceLines,
  ticket,
  totalCents,
  usd,
  weatherNote,
  whatToBring,
} from "./data";
import { palette, perseidTheme, webFonts } from "./theme";
import { FooterNote, ProgramSchedule, TicketFacts, Wordmark } from "./components";

export default function TicketEmail() {
  return (
    <Email
      width={600}
      theme={perseidTheme}
      title={`You're going to Perseid Night — ${observatory.name}`}
      previewText={`${guest.firstName}, your ${ticket.summary} ticket for ${event.dateShort} is confirmed. Ticket ${ticket.code}.`}
      lang="en"
      fonts={webFonts}
      style={{ gap: 0 }}
    >
      {/* Header band: wordmark, then the welcome. */}
      <Section
        tokens={{ colors: { background: palette.violet, foreground: palette.paper } }}
        style={{ backgroundColor: palette.violet, padding: [36, 40, 40], gap: 32, mobile: { padding: [28, 24, 32] } }}
      >
        <Row style={{ alignItems: "center" }}>
          <Wordmark light />
          <Text style={{ apply: ["eyebrow"], color: palette.ice, textAlign: "right", mobile: { textAlign: "left" } }}>
            Ticket confirmed
          </Text>
        </Row>
        <Column style={{ gap: 14 }}>
          <Heading level={1} style={{ color: palette.paper }}>
            See you under the Perseids, {guest.firstName}.
          </Heading>
          <Text style={{ fontSize: 17, lineHeight: 1.6, color: palette.silver }}>
            Your {ticket.summary} ticket for {event.dateLabel} is booked. The dome will be open, the telescopes will
            be out, and around {event.peak} the sky should put on its best show of the year. Everything you need is
            below.
          </Text>
        </Column>
      </Section>

      {/* Ticket summary. */}
      <Section style={{ padding: [32, 40], gap: 24, mobile: { padding: [24, 24] } }}>
        <Column style={{ apply: ["card"] }}>
          <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>Your night</Text>
          <TicketFacts columns={2} />
          <Divider />
          <Table style={{ cellPadding: [7, 0], rowBorder: { width: 1, style: "solid", color: token("colors.border") } }}>
            <TableRow header>
              <TableCell>Ticket &amp; extras</TableCell>
              <TableCell style={{ textAlign: "right" }}>Price</TableCell>
            </TableRow>
            {priceLines.map((line) => (
              <TableRow key={line.label}>
                <TableCell>
                  {line.label}
                  <Span style={{ color: token("colors.muted") }}> · {line.detail}</Span>
                </TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: 600 }}>{usd(line.amountCents)}</TableCell>
              </TableRow>
            ))}
            <TableRow footer>
              <TableCell style={{ fontWeight: 700 }}>Total · paid in full</TableCell>
              <TableCell style={{ textAlign: "right", fontWeight: 700 }}>{usd(totalCents)}</TableCell>
            </TableRow>
          </Table>
        </Column>

        {/* Ticket card: the ticket code, big and mono. */}
        <Column
          style={{
            apply: ["darkCard"],
            alignItems: "center",
            textAlign: "center",
            padding: [32, 28],
            gap: 12,
            border: { top: `3px dashed ${palette.ice}` },
          }}
        >
          <Text style={{ apply: ["eyebrow"], color: palette.ice }}>Your ticket code</Text>
          <Text
            style={{
              fontFamily: token("fonts.mono"),
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 3,
              lineHeight: 1.2,
              color: palette.paper,
              mobile: { fontSize: 24, letterSpacing: 1.5 },
            }}
          >
            {ticket.code}
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 1.5, color: palette.silver }}>
            Show this code at the gate — no printout needed. Your printable ticket and star chart are attached to
            your event page.
          </Text>
          <Button href={ticket.manageHref} variant="ice" style={{ alignSelf: "center" }}>
            View your ticket
          </Button>
        </Column>

        {/* The program. */}
        <Column style={{ gap: 12 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>The night&rsquo;s program</Text>
          <ProgramSchedule />
        </Column>

        {/* What to bring. */}
        <Column style={{ gap: 12 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>What to bring</Text>
          <List style={{ gap: 10, fontSize: 15, lineHeight: 1.55, indent: 20 }}>
            {whatToBring.map((item) => (
              <ListItem key={item.title}>
                <Span style={{ fontWeight: 700 }}>{item.title}. </Span>
                {item.body}
              </ListItem>
            ))}
          </List>
        </Column>

        {/* Weather + directions. */}
        <Column style={{ apply: ["card"], gap: 12 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>Weather &amp; getting there</Text>
          <Text style={{ fontSize: 15, lineHeight: 1.6 }}>{weatherNote}</Text>
          <Text style={{ fontSize: 15, lineHeight: 1.6 }}>{directions}</Text>
        </Column>

        <Column style={{ gap: 6 }}>
          <Text style={{ fontSize: 15, lineHeight: 1.6 }}>
            Questions before the night? Reply to this email or call us at{" "}
            <Link href={observatory.phoneHref}>{observatory.phone}</Link> — someone answers, usually on the second
            ring.
          </Text>
          <Text style={{ fontSize: 15, color: token("colors.muted") }}>Clear skies, the Meridian Hill team</Text>
        </Column>

        <Divider />

        <Column style={{ gap: 10 }}>
          <FooterNote />
          <Text style={{ fontSize: 12, lineHeight: 1.6, color: token("colors.muted") }}>
            You&rsquo;re receiving this because you booked a ticket for {event.name} at {observatory.name}. Manage
            your ticket any time at{" "}
            <Link href={ticket.manageHref} style={{ color: token("colors.muted") }}>
              {observatory.site}/tickets
            </Link>
            .
          </Text>
        </Column>
      </Section>
    </Email>
  );
}
