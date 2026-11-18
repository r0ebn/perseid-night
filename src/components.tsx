/**
 * Shared blocks, reused across all four roots.
 *
 * Wordmark, TicketFacts and FooterNote are text-only, so they work
 * everywhere — including the Email, where Svg is not available.
 * NightSkyScene, StarChart and MoonMark are drawn Svg shapes, used by the
 * Page, the Document and the Canvas. Nothing here fetches an image: every
 * visual is an element.
 */
import {
  Circle,
  Column,
  Grid,
  Line,
  Path,
  Polygon,
  Rect,
  Row,
  Span,
  Svg,
  Text,
  token,
} from "@hyper-elements/react";
import { event, guest, observatory, program, ticket } from "./data";
import { palette } from "./theme";

/** The observatory's wordmark: letterspaced serif name over a mono strapline. */
export function Wordmark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const name = light ? palette.paper : palette.violet;
  const sub = light ? palette.ice : palette.violetAccent;
  return (
    <Column style={{ gap: 3 }}>
      <Text
        style={{
          fontSize: compact ? 15 : 19,
          fontWeight: 700,
          letterSpacing: compact ? 2 : 3.2,
          lineHeight: 1,
          color: name,
        }}
      >
        MERIDIAN HILL
      </Text>
      <Text
        style={{
          fontFamily: token("fonts.mono"),
          fontSize: 10,
          fontWeight: 400,
          letterSpacing: compact ? 2 : 3,
          lineHeight: 1,
          color: sub,
        }}
      >
        OBSERVATORY · EST. 1898
      </Text>
    </Column>
  );
}

/**
 * A fixed field of stars, positioned as fractions of the viewBox so the
 * same sky fits any scene size. Deterministic — no random numbers, so
 * every render draws the same night.
 */
const STARS: Array<[number, number, number, number]> = [
  // [x, y, r, opacity] in a 1000 x 1000 box
  [42, 60, 2.2, 0.9], [118, 132, 1.4, 0.65], [205, 48, 1.8, 0.8], [268, 150, 1.2, 0.6],
  [330, 90, 2.4, 0.9], [392, 210, 1.4, 0.7], [455, 62, 1.8, 0.8], [512, 140, 1.2, 0.6],
  [588, 44, 2.2, 0.9], [645, 180, 1.5, 0.7], [705, 96, 1.8, 0.8], [762, 210, 1.2, 0.6],
  [828, 58, 2.4, 0.9], [888, 150, 1.5, 0.7], [945, 88, 1.8, 0.8], [88, 260, 1.2, 0.6],
  [160, 330, 1.6, 0.7], [240, 260, 1.2, 0.55], [355, 330, 1.8, 0.75], [430, 280, 1.2, 0.6],
  [520, 340, 1.5, 0.7], [610, 270, 1.2, 0.55], [690, 340, 1.8, 0.75], [780, 280, 1.2, 0.6],
  [860, 330, 1.5, 0.7], [930, 260, 1.2, 0.55], [30, 420, 1.4, 0.6], [300, 420, 1.2, 0.55],
  [560, 430, 1.4, 0.6], [820, 420, 1.2, 0.55], [960, 420, 1.4, 0.6], [130, 480, 1.2, 0.5],
  [470, 480, 1.2, 0.5], [730, 480, 1.2, 0.5], [950, 500, 1.2, 0.5],
];

function StarField({ width, height }: { width: number; height: number }) {
  return (
    <>
      {STARS.map(([fx, fy, r, opacity], i) => (
        <Circle
          key={i}
          cx={(fx / 1000) * width}
          cy={(fy / 1000) * height}
          r={r}
          style={{ fill: palette.paper, opacity }}
        />
      ))}
    </>
  );
}

/** A crescent moon: an icy disc with a sky-coloured bite taken out of it. */
export function MoonMark({ cx, cy, r, sky = palette.night }: { cx: number; cy: number; r: number; sky?: string }) {
  return (
    <>
      <Circle cx={cx} cy={cy} r={r * 1.6} style={{ fill: palette.ice, opacity: 0.12 }} />
      <Circle cx={cx} cy={cy} r={r} style={{ fill: palette.iceSoft }} />
      <Circle cx={cx + r * 0.45} cy={cy - r * 0.25} r={r * 0.88} style={{ fill: sky }} />
    </>
  );
}

/** A shooting star: a bright head and a fading tail. */
function Meteor({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <>
      <Line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: palette.iceSoft, strokeWidth: 2, opacity: 0.85 }} />
      <Circle cx={x2} cy={y2} r={2.6} style={{ fill: palette.iceSoft }} />
    </>
  );
}

/**
 * The observatory on its hill at night, drawn entirely from Svg shapes:
 * a star field, Cassiopeia's W, two meteors, a crescent moon, the dome
 * with its lit slit, pines and a small telescope on the lawn. One scene,
 * reused by the page hero and the share card.
 */
export function NightSkyScene({
  width,
  height,
  viewBox = "0 0 960 420",
  hidden,
}: {
  width: number;
  height: number;
  viewBox?: string;
  hidden?: { mobile?: boolean; desktop?: boolean };
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      hidden={hidden}
      title="Meridian Hill Observatory under a Perseid meteor shower."
    >
      <Rect x={0} y={0} width={960} height={420} style={{ fill: palette.night }} />
      <StarField width={960} height={420} />
      {/* Cassiopeia's W, top right */}
      <Line x1={700} y1={58} x2={742} y2={92} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.55 }} />
      <Line x1={742} y1={92} x2={784} y2={56} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.55 }} />
      <Line x1={784} y1={56} x2={826} y2={90} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.55 }} />
      <Line x1={826} y1={90} x2={868} y2={54} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.55 }} />
      <Circle cx={700} cy={58} r={3} style={{ fill: palette.iceSoft }} />
      <Circle cx={742} cy={92} r={3} style={{ fill: palette.iceSoft }} />
      <Circle cx={784} cy={56} r={3.4} style={{ fill: palette.iceSoft }} />
      <Circle cx={826} cy={90} r={3} style={{ fill: palette.iceSoft }} />
      <Circle cx={868} cy={54} r={3} style={{ fill: palette.iceSoft }} />
      {/* Two meteors */}
      <Meteor x1={430} y1={70} x2={330} y2={130} />
      <Meteor x1={590} y1={120} x2={510} y2={168} />
      {/* The moon */}
      <MoonMark cx={140} cy={92} r={30} />
      {/* The hill, with a faint rim of light along its crest so the
          silhouette reads against the sky. The path runs past the edges of
          the viewBox so the rim shows only along the crest, not as a frame. */}
      <Path
        d="M-10,362 Q240,310 480,352 T970,344 L970,440 L-10,440 Z"
        style={{ fill: "#0B0818", stroke: palette.violetMist, strokeWidth: 1.5 }}
      />
      {/* Pines */}
      <Polygon points="120,368 138,318 156,368" style={{ fill: "#0B0818" }} />
      <Polygon points="180,372 196,330 212,372" style={{ fill: "#0B0818" }} />
      <Polygon points="880,368 898,320 916,368" style={{ fill: "#0B0818" }} />
      <Polygon points="830,372 844,336 858,372" style={{ fill: "#0B0818" }} />
      {/* The dome: drum, cupola and a lit slit — one silhouette, so the
          cupola is the same near-black as the drum. */}
      <Rect x={620} y={300} width={150} height={58} style={{ fill: "#0B0818" }} />
      <Path d="M620,302 A75,75 0 0 1 770,302 Z" style={{ fill: "#0B0818" }} />
      <Rect x={688} y={250} width={14} height={52} style={{ fill: palette.ice, opacity: 0.95 }} />
      <Circle cx={695} cy={221} r={3.5} style={{ fill: palette.ice }} />
      <Rect x={640} y={330} width={20} height={28} style={{ fill: palette.ice, opacity: 0.85 }} />
      {/* A small telescope on the lawn, planted on the hill and pointed at Perseus */}
      <Line x1={470} y1={388} x2={470} y2={362} style={{ stroke: "#0B0818", strokeWidth: 4 }} />
      <Line x1={458} y1={388} x2={470} y2={366} style={{ stroke: "#0B0818", strokeWidth: 3 }} />
      <Line x1={482} y1={388} x2={470} y2={366} style={{ stroke: "#0B0818", strokeWidth: 3 }} />
      <Polygon points="452,344 500,328 506,338 458,354" style={{ fill: "#0B0818" }} />
    </Svg>
  );
}

/**
 * The night's star chart for the printed ticket: Perseus and Cassiopeia
 * with the radiant point marked. Svg holds shapes only, so the labels
 * live in Text below the drawing.
 */
export function StarChart() {
  return (
    <Column style={{ gap: 10 }}>
      <Svg width={320} height={168} viewBox="0 0 320 168" title="Star chart: Perseus and Cassiopeia, with the Perseid radiant.">
        <Rect x={0} y={0} width={320} height={168} style={{ fill: palette.night }} />
        <StarField width={320} height={168} />
        {/* Perseus: a chain of stars, lower left */}
        <Line x1={52} y1={128} x2={86} y2={108} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.6 }} />
        <Line x1={86} y1={108} x2={118} y2={122} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.6 }} />
        <Line x1={118} y1={122} x2={150} y2={96} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.6 }} />
        <Line x1={150} y1={96} x2={184} y2={112} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.6 }} />
        <Circle cx={52} cy={128} r={2.6} style={{ fill: palette.paper }} />
        <Circle cx={86} cy={108} r={3} style={{ fill: palette.paper }} />
        <Circle cx={118} cy={122} r={2.6} style={{ fill: palette.paper }} />
        <Circle cx={150} cy={96} r={3.2} style={{ fill: palette.paper }} />
        <Circle cx={184} cy={112} r={2.6} style={{ fill: palette.paper }} />
        {/* Cassiopeia's W, upper right */}
        <Line x1={196} y1={44} x2={224} y2={66} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.6 }} />
        <Line x1={224} y1={66} x2={252} y2={42} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.6 }} />
        <Line x1={252} y1={42} x2={280} y2={64} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.6 }} />
        <Line x1={280} y1={64} x2={304} y2={40} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.6 }} />
        <Circle cx={196} cy={44} r={2.6} style={{ fill: palette.paper }} />
        <Circle cx={224} cy={66} r={2.6} style={{ fill: palette.paper }} />
        <Circle cx={252} cy={42} r={3} style={{ fill: palette.paper }} />
        <Circle cx={280} cy={64} r={2.6} style={{ fill: palette.paper }} />
        <Circle cx={304} cy={40} r={2.6} style={{ fill: palette.paper }} />
        {/* The radiant: an icy-blue four-point star between them */}
        <Polygon points="168,52 172,64 184,68 172,72 168,84 164,72 152,68 164,64" style={{ fill: palette.ice }} />
        <Circle cx={168} cy={68} r={12} style={{ fill: palette.night, stroke: palette.ice, strokeWidth: 1, opacity: 0.6 }} />
        {/* Horizon */}
        <Line x1={0} y1={160} x2={320} y2={160} style={{ stroke: palette.silver, strokeWidth: 1, opacity: 0.35 }} />
      </Svg>
      <Row style={{ gap: 16 }}>
        <Text style={{ fontSize: 11, color: token("colors.muted") }}>
          <Span style={{ fontWeight: 700, color: palette.violet }}>Perseus</Span> — the radiant
        </Text>
        <Text style={{ fontSize: 11, color: token("colors.muted") }}>
          <Span style={{ fontWeight: 700, color: palette.violet }}>Cassiopeia</Span> — find the W
        </Text>
      </Row>
    </Column>
  );
}

/** One fact: a mono label over a value. */
function Fact({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Column style={{ gap: 3 }}>
      <Text style={{ apply: ["metaLabel"] }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{value}</Text>
      {sub ? <Text style={{ fontSize: 13, lineHeight: 1.4, color: token("colors.muted") }}>{sub}</Text> : null}
    </Column>
  );
}

/** Date, gates, meteor peak and ticket — the night at a glance. */
export function TicketFacts({ columns = 4 }: { columns?: number }) {
  return (
    <Grid columns={columns} style={{ gap: 20 }}>
      <Fact label="Date" value={event.dateShort} sub={event.venue} />
      <Fact label="Gates open" value={event.gates} sub="check-in, lower meadow lot" />
      <Fact label="Meteor peak" value={event.peak} sub={`radiant: ${event.radiant}`} />
      <Fact label="Ticket" value={ticket.summary} sub={guest.fullName} />
    </Grid>
  );
}

/** TicketFacts as a horizontal Row, for the narrow ticket page. */
export function TicketFactsRow() {
  return (
    <Row style={{ gap: 20 }}>
      <Fact label="Date" value={event.dateShort} sub={event.venue} />
      <Fact label="Gates open" value={event.gates} sub="check-in, lower meadow" />
      <Fact label="Meteor peak" value={event.peak} sub={`radiant: ${event.radiant}`} />
      <Fact label="Ticket" value={ticket.summary} sub={guest.fullName} />
    </Row>
  );
}

/** The night's program as a two-column table: time, then title + detail. */
export function ProgramSchedule({ compact = false }: { compact?: boolean }) {
  return (
    <Column style={{ gap: compact ? 4 : 10 }}>
      {program.map((item) => (
        <Row key={item.time} style={{ gap: 16, alignItems: "start" }}>
          <Text
            style={{
              fontFamily: token("fonts.mono"),
              fontSize: compact ? 11 : 13,
              fontWeight: 700,
              color: palette.violetAccent,
              width: compact ? 64 : 74,
              flex: "none",
              lineHeight: 1.5,
            }}
          >
            {item.time}
          </Text>
          <Column style={{ gap: 1 }}>
            <Text style={{ fontSize: compact ? 12 : 15, fontWeight: 700, lineHeight: 1.35 }}>{item.title}</Text>
            <Text style={{ fontSize: compact ? 11 : 13.5, lineHeight: 1.45, color: token("colors.muted") }}>
              {item.detail}
            </Text>
          </Column>
        </Row>
      ))}
    </Column>
  );
}

/** The observatory's address and contact lines, for footers. */
export function FooterNote({ light = false }: { light?: boolean }) {
  const color = light ? palette.silver : token("colors.muted");
  return (
    <Column style={{ gap: 2 }}>
      <Text style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5, color: light ? palette.paper : palette.violet }}>
        {observatory.name} · {observatory.tagline}
      </Text>
      <Text style={{ fontSize: 13, lineHeight: 1.5, color }}>
        {observatory.addressLines.join(", ")} · {observatory.phone} · {observatory.email}
      </Text>
    </Column>
  );
}

/** A telescope highlight card for the event page. */
export function TelescopeCard({ title, body }: { title: string; body: string }) {
  return (
    <Column style={{ apply: ["card"], padding: 24, gap: 8 }}>
      <Text style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, color: palette.violet }}>{title}</Text>
      <Text style={{ fontSize: 14, lineHeight: 1.6, color: token("colors.muted") }}>{body}</Text>
    </Column>
  );
}
