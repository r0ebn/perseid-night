/**
 * Perseid Night — social poster (1080 × 1080).
 *
 * Composed like a poster: the observatory and the date, the event name in
 * large serif type, the night sky with the dome and a meteor shower, and
 * the ticket code as an icy-blue pill. Rendered to PNG and SVG by
 * `renderImage()` — see scripts/build.ts. No image is fetched: the sky
 * is drawn Svg.
 */
import { Canvas, Column, Heading, Row, Text, token } from "@hyper-elements/react";
import { event, observatory, ticket } from "./data";
import { palette, perseidTheme } from "./theme";
import { NightSkyScene } from "./components";

export default function ShareCard() {
  return (
    <Canvas
      width={1080}
      height={1080}
      theme={perseidTheme}
      title={`${event.name} — ${event.dateLabel}, ${observatory.name}`}
      lang="en"
      style={{
        backgroundColor: palette.night,
        color: palette.paper,
        padding: [72, 72],
        gap: 26,
        justifyContent: "space-between",
      }}
    >
      <Column style={{ gap: 18, alignItems: "center", textAlign: "center" }}>
        <Text style={{ apply: ["eyebrow"], color: palette.ice, fontSize: 14 }}>
          {observatory.name} · {event.dateLabel}
        </Text>
        <Heading level={1} style={{ fontSize: 88, lineHeight: 1.02, color: palette.paper }}>
          {event.name}
        </Heading>
        <Text
          style={{
            fontFamily: token("fonts.heading"),
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 32,
            lineHeight: 1.3,
            color: palette.silver,
          }}
        >
          {event.subtitle}
        </Text>
        <Text style={{ fontSize: 22, lineHeight: 1.5, color: palette.silver }}>
          Gates {event.gates} · Meteor peak {event.peak} · {ticket.summary}
        </Text>
      </Column>
      <NightSkyScene width={936} height={409} />
      <Row style={{ gap: 16, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ apply: ["pill"], flex: "none", fontSize: 16 }}>{ticket.code}</Text>
        <Text style={{ fontSize: 18, color: palette.silver }}>{observatory.site}</Text>
      </Row>
    </Canvas>
  );
}
