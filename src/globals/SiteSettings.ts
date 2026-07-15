import type { GlobalConfig } from "payload";

/** Shared site data: address, hours, contact — used in Hero, Contact and Footer. */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Einstellungen",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "phillipEnabled",
      label: "Phillip (Website-Assistent) anzeigen",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "Schaltet den Chat-Assistenten unten rechts auf der Website ein oder aus. " +
          "Die Änderung greift innerhalb von etwa einer Minute.",
      },
    },
    {
      type: "group",
      name: "meta",
      label: "SEO & Metadaten",
      fields: [
        { name: "title", label: "Seitentitel", type: "text", required: true },
        {
          name: "description",
          label: "Beschreibung",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      type: "group",
      name: "contact",
      label: "Kontakt",
      fields: [
        { name: "name", label: "Name des Lokals", type: "text", required: true },
        { name: "street", label: "Straße", type: "text", required: true },
        { name: "city", label: "PLZ & Ort", type: "text", required: true },
        {
          name: "phoneDisplay",
          label: "Telefon (Anzeige, z.B. 0451 92996272)",
          type: "text",
          required: true,
        },
        {
          name: "phoneNumber",
          label: "Telefon (wählbar, z.B. 045192996272)",
          type: "text",
          required: true,
        },
        { name: "email", label: "E-Mail", type: "text", required: true },
        {
          name: "mapsEmbedSrc",
          label: "Google Maps Embed-URL (Karte)",
          type: "text",
          required: true,
        },
        {
          name: "mapsLink",
          label: "Google Maps Link (Route planen)",
          type: "text",
          required: true,
        },
        {
          name: "menuPdfUrl",
          label: "Speisekarte (PDF-Link in der Navigation)",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "hours",
      label: "Öffnungszeiten",
      type: "array",
      minRows: 7,
      maxRows: 7,
      labels: { singular: "Tag", plural: "Tage" },
      admin: {
        description:
          "Ein Eintrag pro Wochentag, beginnend mit Montag. „Von“ und „Bis“ leer lassen = " +
          "geschlossen. Sie steuern nur die Anzeige „Jetzt geöffnet“ — angezeigt wird immer der Text unter „Zeiten“.",
      },
      fields: [
        { name: "day", label: "Tag", type: "text", required: true },
        {
          name: "time",
          label: "Zeiten (angezeigter Text, z.B. „16:30 – 22:00“)",
          type: "text",
          required: true,
        },
        {
          name: "openFrom",
          label: "Von (HH:MM, leer = geschlossen)",
          type: "text",
        },
        {
          name: "openUntil",
          label: "Bis (HH:MM, „24:00“ für Open End)",
          type: "text",
        },
      ],
    },
    {
      name: "hoursNote",
      label: "Hinweis unter den Öffnungszeiten",
      type: "text",
      required: true,
    },
    {
      name: "tagline",
      label: "Tagline (Footer, z.B. Restaurant & Café an der Trave)",
      type: "text",
      required: true,
    },
    {
      name: "marquee",
      label: "Laufschrift (Footer)",
      type: "text",
      required: true,
      admin: {
        description: "Wird endlos wiederholt — mit „ · “ trennen, z.B. „Deutsche Küche · An der Trave“.",
      },
    },
  ],
};
