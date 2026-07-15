import { getCms, toImg, type Img } from "./cms";
import { DEFAULT_HOMEPAGE, DEFAULT_SETTINGS } from "./defaults";
import type { Homepage, SiteSetting } from "@/payload-types";

/**
 * Reads the globals and resolves them into the plain, fully-typed view models
 * the (client) section components take as props. Every field falls back to
 * `defaults.ts`, so an unseeded database renders the original site instead of
 * throwing — and upload relations become `{ src, alt }` here rather than in
 * each component.
 */

/** Sonntag = 0, to line up with Date.getDay(). */
const DAY_INDEX: Record<string, number> = {
  Sonntag: 0,
  Montag: 1,
  Dienstag: 2,
  Mittwoch: 3,
  Donnerstag: 4,
  Freitag: 5,
  Samstag: 6,
};

export interface HoursRow {
  day: string;
  time: string;
  /** Minutes since midnight, or null when closed — drives „Jetzt geöffnet“. */
  open: [number, number] | null;
  /** Date.getDay() index, so „Heute“ survives any re-ordering in the admin. */
  dayIndex: number;
}

export interface SiteData {
  meta: { title: string; description: string };
  name: string;
  street: string;
  city: string;
  phoneDisplay: string;
  phoneNumber: string;
  phoneHref: string;
  email: string;
  mapsEmbedSrc: string;
  mapsLink: string;
  menuPdfUrl: string;
  hours: HoursRow[];
  hoursNote: string;
  tagline: string;
  marquee: string;
  phillipEnabled: boolean;
}

/** „16:30“ → 990. Anything unparseable means „closed“. */
function toMinutes(value: string | null | undefined): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec((value ?? "").trim());
  if (!match) return null;
  const minutes = parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
  return Number.isFinite(minutes) ? minutes : null;
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = (value ?? "").trim();
  return trimmed === "" ? fallback : trimmed;
}

/** A textarea heading — one animated line per row. */
export function toLines(value: string | null | undefined, fallback: string): string[] {
  const lines = text(value, fallback)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length ? lines : fallback.split("\n");
}

function img(
  media: Parameters<typeof toImg>[0],
  fallbackSrc: string,
  fallbackAlt: string,
): Img {
  return toImg(media, fallbackAlt) ?? { src: fallbackSrc, alt: fallbackAlt };
}

export async function getSiteData(): Promise<SiteData> {
  const cms = await getCms();
  const s = (await cms.findGlobal({ slug: "site-settings" })) as SiteSetting;
  const d = DEFAULT_SETTINGS;

  const rows = s?.hours?.length ? s.hours : d.hours;
  const hours: HoursRow[] = rows.map((row) => {
    const from = toMinutes(row.openFrom);
    const until = toMinutes(row.openUntil);
    return {
      day: row.day,
      time: row.time,
      open: from !== null && until !== null ? [from, until] : null,
      dayIndex: DAY_INDEX[row.day.trim()] ?? -1,
    };
  });

  const phoneNumber = text(s?.contact?.phoneNumber, d.contact.phoneNumber);

  return {
    meta: {
      title: text(s?.meta?.title, d.meta.title),
      description: text(s?.meta?.description, d.meta.description),
    },
    name: text(s?.contact?.name, d.contact.name),
    street: text(s?.contact?.street, d.contact.street),
    city: text(s?.contact?.city, d.contact.city),
    phoneDisplay: text(s?.contact?.phoneDisplay, d.contact.phoneDisplay),
    phoneNumber,
    phoneHref: `tel:${phoneNumber.replace(/\s+/g, "")}`,
    email: text(s?.contact?.email, d.contact.email),
    mapsEmbedSrc: text(s?.contact?.mapsEmbedSrc, d.contact.mapsEmbedSrc),
    mapsLink: text(s?.contact?.mapsLink, d.contact.mapsLink),
    menuPdfUrl: text(s?.contact?.menuPdfUrl, d.contact.menuPdfUrl),
    hours,
    hoursNote: text(s?.hoursNote, d.hoursNote),
    tagline: text(s?.tagline, d.tagline),
    marquee: text(s?.marquee, d.marquee),
    // Unset (null) means on — the checkbox is opt-out.
    phillipEnabled: s?.phillipEnabled !== false,
  };
}

export interface HomeData {
  hero: {
    image: Img;
    reserveLabel: string;
    columns: string[];
  };
  about: {
    heading: string[];
    text: string;
    quote: string;
    quoteAuthor: string;
    ctaLabel: string;
    imageLarge: Img;
    imageSmall: Img;
  };
  owners: {
    heading: string[];
    people: Array<{ name: string; role: string; image: Img }>;
    intro: string;
    pullquote: { before: string; accent: string; after: string };
    paragraphs: string[];
    ctaLabel: string;
  };
  gallery: { images: Img[] };
  contact: {
    heading: string[];
    reserveEyebrow: string;
    infoItems: string[];
    hoursHeading: string;
    mapCtaLabel: string;
  };
}

export async function getHomeData(): Promise<HomeData> {
  const cms = await getCms();
  const h = (await cms.findGlobal({ slug: "homepage" })) as Homepage;
  const d = DEFAULT_HOMEPAGE;

  const people = h?.owners?.people?.length ? h.owners.people : null;
  const galleryImages = h?.gallery?.images?.length ? h.gallery.images : null;
  const columns = h?.hero?.columns?.length ? h.hero.columns : null;
  const paragraphs = h?.owners?.paragraphs?.length ? h.owners.paragraphs : null;
  const infoItems = h?.contact?.infoItems?.length ? h.contact.infoItems : null;

  return {
    hero: {
      image: img(h?.hero?.image, d.hero.imageSrc, d.hero.imageAlt),
      reserveLabel: text(h?.hero?.reserveLabel, d.hero.reserveLabel),
      columns: columns
        ? columns.map((c) => c.text)
        : d.hero.columns.map((c) => c.text),
    },
    about: {
      heading: toLines(h?.about?.heading, d.about.heading),
      text: text(h?.about?.text, d.about.text),
      quote: text(h?.about?.quote, d.about.quote),
      quoteAuthor: text(h?.about?.quoteAuthor, d.about.quoteAuthor),
      ctaLabel: text(h?.about?.ctaLabel, d.about.ctaLabel),
      imageLarge: img(h?.about?.imageLarge, d.about.imageLargeSrc, d.about.imageLargeAlt),
      imageSmall: img(h?.about?.imageSmall, d.about.imageSmallSrc, d.about.imageSmallAlt),
    },
    owners: {
      heading: toLines(h?.owners?.heading, d.owners.heading),
      people: people
        ? people.map((p, i) => ({
            name: p.name,
            role: p.role,
            image: img(
              p.image,
              d.owners.people[i]?.imageSrc ?? d.owners.people[0].imageSrc,
              p.name,
            ),
          }))
        : d.owners.people.map((p) => ({
            name: p.name,
            role: p.role,
            image: { src: p.imageSrc, alt: p.imageAlt },
          })),
      intro: text(h?.owners?.intro, d.owners.intro),
      pullquote: {
        before: text(h?.owners?.pullquote?.before, d.owners.pullquote.before),
        accent: text(h?.owners?.pullquote?.accent, d.owners.pullquote.accent),
        after: text(h?.owners?.pullquote?.after, d.owners.pullquote.after),
      },
      paragraphs: paragraphs
        ? paragraphs.map((p) => p.text)
        : d.owners.paragraphs.map((p) => p.text),
      ctaLabel: text(h?.owners?.ctaLabel, d.owners.ctaLabel),
    },
    gallery: {
      images: galleryImages
        ? galleryImages.map((g, i) => img(g.image, d.gallery.images[i]?.src ?? "", ""))
        : d.gallery.images.map((g) => ({ src: g.src, alt: g.alt })),
    },
    contact: {
      heading: toLines(h?.contact?.heading, d.contact.heading),
      reserveEyebrow: text(h?.contact?.reserveEyebrow, d.contact.reserveEyebrow),
      infoItems: infoItems
        ? infoItems.map((i) => i.text)
        : d.contact.infoItems.map((i) => i.text),
      hoursHeading: text(h?.contact?.hoursHeading, d.contact.hoursHeading),
      mapCtaLabel: text(h?.contact?.mapCtaLabel, d.contact.mapCtaLabel),
    },
  };
}
