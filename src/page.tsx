/**
 * Perseid Night — event page (960px).
 *
 * A public page for the night: the observatory under a meteor shower, the
 * night at a glance, the program, the telescope lineup, weather and
 * directions, and the guest's ticket card. The hero scene is drawn Svg —
 * one scene for desktop, a cropped one for phones.
 */
import {
  Button,
  Column,
  Divider,
  Grid,
  Heading,
  Page,
  Row,
  Section,
  Text,
  token,
} from "@hyper-elements/react";
import {
  directions,
  event,
  guest,
  observatory,
  telescopes,
  ticket,
  weatherNote,
  whatToBring,
} from "./data";
import { palette, perseidTheme, webFonts } from "./theme";
import {
  FooterNote,
  NightSkyScene,
  ProgramSchedule,
  TelescopeCard,
  TicketFacts,
  Wordmark,
} from "./components";

export default function EventPage() {
  return (
    <Page
      width={960}
      theme={perseidTheme}
      title={`${event.name} — ${event.subtitle} · ${observatory.name}`}
      description={`A public stargazing night at ${observatory.name}: ${event.dateLabel}, gates ${event.gates}, meteor peak ${event.peak}.`}
      lang="en"
      fonts={webFonts}
      style={{ gap: 0 }}
    >
      {/* Hero: wordmark, the night sky, the headline. */}
      <Section
        tokens={{ colors: { background: palette.night, foreground: palette.paper } }}
        style={{ backgroundColor: palette.night, padding: [36, 0, 48], gap: 28 }}
      >
        <Row style={{ alignItems: "center", padding: [0, 40], mobile: { padding: [0, 24] } }}>
          <Wordmark light />
          <Text style={{ apply: ["eyebrow"], color: palette.ice, textAlign: "right", mobile: { textAlign: "left" } }}>
            Public stargazing night
          </Text>
        </Row>
        <NightSkyScene width={960} height={420} hidden={{ mobile: true }} />
        <NightSkyScene
          width={360}
          height={189}
          viewBox="60 0 800 420"
          hidden={{ desktop: true }}
        />
        <Column style={{ gap: 16, padding: [0, 40], mobile: { padding: [0, 24] } }}>
          <Heading level={1} style={{ fontSize: 56, color: palette.paper, mobile: { fontSize: 38 } }}>
            {event.name}
          </Heading>
          <Text style={{ fontSize: 22, lineHeight: 1.45, color: palette.silver, mobile: { fontSize: 18 } }}>
            {event.subtitle} — {event.dateLabel}. Gates {event.gates}, meteor peak {event.peak}.
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 1.65, color: palette.silver }}>
            One night a year, the Perseids fall over Meridian Hill — and the observatory opens its dome, its lawn
            and its telescopes to anyone who wants to watch. Bring a blanket, lie back, and count the meteors with
            us.
          </Text>
          <Row style={{ gap: 16 }}>
            <Button href={ticket.manageHref} variant="ice" style={{ flex: "none" }}>
              View your ticket
            </Button>
            <Button href={`https://${observatory.site}`} variant="light" style={{ flex: "none" }}>
              {observatory.site}
            </Button>
          </Row>
        </Column>
      </Section>

      {/* The night at a glance. */}
      <Section style={{ padding: [40, 40, 0], mobile: { padding: [32, 24, 0] } }}>
        <Column style={{ apply: ["card"] }}>
          <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>The night at a glance</Text>
          <TicketFacts columns={4} />
        </Column>
      </Section>

      {/* Program + what to bring, side by side. */}
      <Section style={{ padding: [32, 40, 0], mobile: { padding: [24, 24, 0] } }}>
        <Row style={{ gap: 24, alignItems: "start" }}>
          <Column style={{ apply: ["card"], gap: 14 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>The program</Text>
            <ProgramSchedule />
          </Column>
          <Column style={{ apply: ["card"], gap: 14 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>What to bring</Text>
            <Column style={{ gap: 12 }}>
              {whatToBring.map((item) => (
                <Column key={item.title} style={{ gap: 2 }}>
                  <Text style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35 }}>{item.title}</Text>
                  <Text style={{ fontSize: 14, lineHeight: 1.55, color: token("colors.muted") }}>{item.body}</Text>
                </Column>
              ))}
            </Column>
          </Column>
        </Row>
      </Section>

      {/* The telescopes. */}
      <Section style={{ padding: [32, 40, 0], mobile: { padding: [24, 24, 0] } }}>
        <Column style={{ gap: 16 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>The telescopes</Text>
          <Heading level={2}>Three ways to look up</Heading>
          <Grid columns={3} style={{ gap: 20 }}>
            {telescopes.map((scope) => (
              <TelescopeCard key={scope.name} title={scope.name} body={scope.body} />
            ))}
          </Grid>
        </Column>
      </Section>

      {/* Weather, directions and the ticket. */}
      <Section style={{ padding: [32, 40, 48], gap: 24, mobile: { padding: [24, 24, 32] } }}>
        <Column style={{ apply: ["card"], gap: 12 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.violetAccent }}>Weather &amp; getting there</Text>
          <Text style={{ fontSize: 15, lineHeight: 1.6 }}>{weatherNote}</Text>
          <Text style={{ fontSize: 15, lineHeight: 1.6 }}>{directions}</Text>
        </Column>

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
          <Text style={{ apply: ["eyebrow"], color: palette.ice }}>Your ticket</Text>
          <Text style={{ fontSize: 17, lineHeight: 1.5, color: palette.paper }}>
            {guest.fullName} · {ticket.summary} · {event.dateShort}
          </Text>
          <Text
            style={{
              fontFamily: token("fonts.mono"),
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 3,
              lineHeight: 1.2,
              color: palette.paper,
              mobile: { fontSize: 22, letterSpacing: 1.5 },
            }}
          >
            {ticket.code}
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 1.5, color: palette.silver }}>
            Show this code at the gate — no printout needed. Your printable ticket and star chart are below.
          </Text>
        </Column>

        <Divider />

        <FooterNote />
      </Section>
    </Page>
  );
}
