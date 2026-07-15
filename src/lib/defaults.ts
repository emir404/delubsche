/**
 * The site's content as it was before the CMS existed — still the single
 * source of truth for a fresh database: `scripts/seed.ts` writes exactly this
 * into the globals, and the frontend falls back to it field by field if a
 * global has not been seeded yet (so the site never renders empty).
 *
 * Images are the static files in `public/images`. Once the seed has uploaded
 * them into the Media collection, the CMS values win and these paths are only
 * the safety net.
 */

export const DEFAULT_SETTINGS = {
  phillipEnabled: true,
  meta: {
    title: "De Lübsche Schut – Restaurant & Café an der Trave",
    description:
      "De Lübsche Schut – das Restaurant auf der Trave in Lübeck. Wir bieten deutsche und mexikanische Küche. Lachswehrallee 40, 23558 Lübeck.",
  },
  contact: {
    // Stored in mixed case — the design uppercases it via CSS where needed, so
    // the copyright line and the wordmark can share one value.
    name: "De Lübsche Schut",
    street: "Lachswehrallee 40",
    city: "23558 Lübeck",
    phoneDisplay: "0451 92996272",
    phoneNumber: "045192996272",
    email: "info@die-schute.de",
    mapsEmbedSrc:
      "https://maps.google.com/maps?q=Lachswehrallee%2040%2C%2023558%20L%C3%BCbeck&z=15&output=embed",
    mapsLink: "https://maps.app.goo.gl/QCS14zLuomthtcN17",
    menuPdfUrl: "http://luebsche-schut.de/wp-content/uploads/2026/04/gesamtkarte.pdf",
  },
  // Monday first — the frontend re-orders for display and matches on the day
  // name, so this order is just the editing order in the admin.
  hours: [
    { day: "Montag", time: "Geschlossen", openFrom: "", openUntil: "" },
    { day: "Dienstag", time: "16:30 – 22:00", openFrom: "16:30", openUntil: "22:00" },
    { day: "Mittwoch", time: "16:30 – 22:00", openFrom: "16:30", openUntil: "22:00" },
    { day: "Donnerstag", time: "16:30 – 22:00", openFrom: "16:30", openUntil: "22:00" },
    { day: "Freitag", time: "16:30 – 22:00", openFrom: "16:30", openUntil: "22:00" },
    { day: "Samstag", time: "12:00 – Open End", openFrom: "12:00", openUntil: "24:00" },
    { day: "Sonntag", time: "12:00 – 21:00", openFrom: "12:00", openUntil: "21:00" },
  ],
  hoursNote: "Küche bis 21:00, sonntags bis 20:00",
  tagline: "Restaurant & Café an der Trave",
  marquee: "Deutsche Küche · Mexikanische Küche · An der Trave",
};

export const DEFAULT_HOMEPAGE = {
  hero: {
    imageSrc: "/images/hero.png",
    imageAlt: "De Lübsche Schut – Restaurantschiff auf der Trave",
    reserveLabel: "Tisch reservieren",
    columns: [
      { text: "DI–FR 16:30–22:00 · SA/SO AB 12:00" },
      { text: "Lachswehrallee 40, 23558 Lübeck" },
      { text: "DE LÜBSCHE SCHUT" },
    ],
  },
  about: {
    heading: "Willkommen\nauf der\nSchute",
    text: "De Lübsche Schut ist das Restaurant auf der Trave in Lübeck. Wir bieten deutsche und mexikanische Küche – mit unserer Karte haben wir versucht, die ein oder andere Erinnerung zu wecken und das „Lübsche“ mit einfließen zu lassen.",
    quote:
      "Wir haben immer ein offenes Ohr für Euch und hoffen, ihr fühlt euch wohl bei uns.",
    quoteAuthor: "Euer Team von „De Lübsche Schut“",
    ctaLabel: "FINDET UNS AUF GOOGLE MAPS",
    imageLargeSrc: "/images/hero.png",
    imageLargeAlt: "De Lübsche Schut – die Schute an der Lachswehrallee",
    imageSmallSrc: "/images/about-2.png",
    imageSmallAlt: "Illustration der Schute",
  },
  owners: {
    heading: "Wer\nwir sind",
    people: [
      {
        name: "Thomas Becker",
        role: "Inhaber",
        imageSrc: "/images/owner-thomas.png",
        imageAlt: "Porträt von Thomas Becker, Inhaber von De Lübsche Schut",
      },
      {
        name: "Stefan Bünning",
        role: "Inhaber & Küchenchef",
        imageSrc: "/images/owner-stefan.png",
        imageAlt:
          "Porträt von Stefan Bünning, Inhaber und Küchenchef von De Lübsche Schut",
      },
    ],
    intro:
      "Mit unserem mexikanisch inspirierten Angebot erinnert sich vielleicht so mancher Gast an das Lokal „Cielito Lindo“ am Roten Löwen hier in Lübeck. Stefan Bünning, der damalige Betreiber und Koch des beliebten Lokals, ist jetzt bei uns an Bord. Bevor der gebürtige Hamburger nach Norddeutschland zurückkehrte, arbeitete Stefan als Chefkoch in mehreren lateinamerikanischen Metropolen.",
    pullquote: {
      before: "Dort waren unter anderem",
      accent: "Shakira, Pelé, Ayrton Senna und Maradona",
      after: "von seinen Kochkünsten begeistert.",
    },
    paragraphs: [
      {
        text: "Wir freuen uns, ihn bei uns zu haben und sind davon überzeugt, dass auch Ihr von seinen Speisen begeistert sein werdet.",
      },
      { text: "Bei Fragen, Anregungen und Reservierungen sprecht uns gerne an." },
    ],
    ctaLabel: "SPRECHT UNS GERNE AN",
  },
  gallery: {
    images: [
      { src: "/images/gallery-1.png", alt: "Dessert mit Sahne und Kiwi" },
      { src: "/images/gallery-2.png", alt: "Gericht mit Pommes frites" },
      { src: "/images/gallery-3.png", alt: "Backfisch mit Pommes und Remoulade" },
      { src: "/images/gallery-4.png", alt: "Salatteller mit Schinken" },
      { src: "/images/gallery-5.png", alt: "Hauptgericht mit Bratkartoffeln" },
      {
        src: "/images/gallery-6.png",
        alt: "Roastbeef mit Remoulade und Bratkartoffeln",
      },
      { src: "/images/gallery-7.png", alt: "Teller mit Garnelen und Avocado" },
      { src: "/images/gallery-8.png", alt: "Gericht mit Salatbeilage" },
      { src: "/images/gallery-9.png", alt: "Matjes mit Bratkartoffeln" },
    ],
  },
  contact: {
    heading: "Kontakt &\nReservierung",
    reserveEyebrow: "Tisch reservieren — ruft uns an",
    infoItems: [{ text: "Wir akzeptieren alle gängigen Karten" }],
    hoursHeading: "Öffnungszeiten",
    mapCtaLabel: "Route planen",
  },
};
