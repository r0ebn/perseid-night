/**
 * Perseid Night — the single source of truth.
 *
 * One fictional guest, one event, one ticket. Every template (the email,
 * the page, the printable ticket and the share card) reads from here, so
 * changing the guest or the event in this file changes all four outputs.
 *
 * Money is integer cents; dates are fixed strings. The observatory, the
 * guest and the event are fictional.
 */

export const observatory = {
  name: "Meridian Hill Observatory",
  shortName: "Meridian Hill",
  established: 1898,
  tagline: "Watching the sky since 1898.",
  addressLines: ["12 Observatory Lane", "Meridian Hill, Vermont 05401"],
  phone: "+1 (802) 555-0147",
  phoneHref: "tel:+18025550147",
  email: "hello@meridianhill.example",
  site: "meridianhill.example",
} as const;

export const guest = {
  firstName: "Jonas",
  lastName: "Weber",
  fullName: "Jonas Weber",
} as const;

export const event = {
  name: "Perseid Night",
  subtitle: "Meteor Watch & Telescope Evening",
  dateShort: "Wed 12 Aug 2027",
  dateLabel: "Wednesday, 12 August 2027",
  gates: "8:30 PM",
  peak: "11:40 PM",
  close: "1:00 AM",
  venue: "Meridian Hill Observatory",
  radiant: "Perseus",
} as const;

export const ticket = {
  code: "PN-2027-0812",
  kind: "Stargazer",
  adults: 2,
  summary: "Stargazer · 2 adults",
  manageHref: "https://meridianhill.example/tickets/PN-2027-0812",
} as const;

export interface PriceLine {
  label: string;
  detail: string;
  amountCents: number;
}

export const priceLines: PriceLine[] = [
  { label: "Stargazer ticket", detail: "$24.00 × 2 adults", amountCents: 4800 },
  { label: "Hot chocolate for two", detail: "served at the warming hut", amountCents: 800 },
  { label: "Printed star chart", detail: "yours to take home", amountCents: 600 },
  { label: "Booking fee", detail: "per order", amountCents: 400 },
];

export const totalCents = priceLines.reduce((sum, line) => sum + line.amountCents, 0);

export interface ProgramItem {
  time: string;
  title: string;
  detail: string;
}

export const program: ProgramItem[] = [
  { time: "8:30 PM", title: "Gates open & check-in", detail: "Lower meadow lot — show your ticket code." },
  { time: "9:00 PM", title: "Welcome talk: “Why the Perseids fall”", detail: "Dr. Amara Osei, dome theatre." },
  { time: "9:30 PM", title: "Telescope sessions begin", detail: "The dome reflector and the lawn scopes." },
  { time: "10:30 PM", title: "Hot chocolate break", detail: "The warming hut, on the north lawn." },
  { time: "11:40 PM", title: "Meteor peak — guided watch", detail: "Lie back on the north lawn; Perseus rises north-east." },
  { time: "1:00 AM", title: "Gates close", detail: "Shuttle back to the town square at 1:15 AM." },
];

export interface Telescope {
  name: string;
  body: string;
}

export const telescopes: Telescope[] = [
  {
    name: "The Great Dome Reflector",
    body: "A 12-inch reflector under the dome. Saturn's rings and the Moon's craters, up close.",
  },
  {
    name: "The Lawn Dobsonians",
    body: "8-inch scopes on the north lawn. Deep-sky: the Double Cluster and the Andromeda Galaxy.",
  },
  {
    name: "The Binocular Station",
    body: "Wide-field views of Perseus, with a guide to the radiant point.",
  },
];

export interface BringItem {
  title: string;
  body: string;
}

export const whatToBring: BringItem[] = [
  { title: "Warm layers", body: "It drops to 11°C after midnight — bring one more than you think you need." },
  { title: "A red torch", body: "Or a phone with a red filter. White light ruins night vision for half an hour." },
  { title: "A blanket or reclining chair", body: "The best meteor watching is done lying down." },
  { title: "Your ticket code", body: "On your phone is fine — no printout needed." },
];

export const weatherNote =
  "Clear skies forecast — 14°C at gates opening, falling to 11°C by the peak. If cloud rolls in, the talk and the dome session go ahead regardless; meteors permitting.";

export const directions =
  "Summit Road off Route 7, twenty minutes from town. Free parking in the lower meadow lot; a shuttle leaves the town square at 8:00 PM and returns at 1:15 AM.";

export const finePrint = [
  "Tickets are non-refundable but transferable — give your code to a friend. Under-16s with an adult; red light only after 9:00 PM.",
  "Meridian Hill Observatory is fictional; no real event exists behind this ticket.",
];

/** Format integer cents as dollars, e.g. 4800 -> "$48.00". */
export function usd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
