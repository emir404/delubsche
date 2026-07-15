import type { GlobalConfig } from "payload";

/** All editable content of the homepage, grouped by section. */
export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Startseite",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          name: "hero",
          fields: [
            {
              name: "image",
              label: "Hintergrundbild",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "reserveLabel",
              label: "Button-Text (Tisch reservieren)",
              type: "text",
              required: true,
            },
            {
              name: "columns",
              label: "Info-Zeile unten (max. 3)",
              type: "array",
              maxRows: 3,
              fields: [{ name: "text", label: "Text", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Über uns",
          name: "about",
          fields: [
            {
              name: "heading",
              label: "Überschrift (Zeilenumbruch per Enter)",
              type: "textarea",
              required: true,
            },
            { name: "text", label: "Text", type: "textarea", required: true },
            { name: "quote", label: "Zitat", type: "textarea", required: true },
            {
              name: "quoteAuthor",
              label: "Zitat — Unterzeile",
              type: "text",
              required: true,
            },
            {
              name: "ctaLabel",
              label: "Button-Text (Google Maps)",
              type: "text",
              required: true,
            },
            {
              name: "imageLarge",
              label: "Großes Bild",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "imageSmall",
              label: "Kleines Bild (überlappend)",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
        },
        {
          label: "Wer wir sind",
          name: "owners",
          fields: [
            {
              name: "heading",
              label: "Überschrift (Zeilenumbruch per Enter)",
              type: "textarea",
              required: true,
            },
            {
              name: "people",
              label: "Portraits (max. 2)",
              type: "array",
              minRows: 2,
              maxRows: 2,
              fields: [
                { name: "name", label: "Name", type: "text", required: true },
                { name: "role", label: "Rolle", type: "text", required: true },
                {
                  name: "image",
                  label: "Portrait",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
            { name: "intro", label: "Einleitender Absatz", type: "textarea", required: true },
            {
              type: "group",
              name: "pullquote",
              label: "Hervorgehobenes Zitat",
              admin: {
                description:
                  "Wird als ein Satz angezeigt — der mittlere Teil erscheint in der Akzentfarbe.",
              },
              fields: [
                { name: "before", label: "Text davor", type: "text", required: true },
                {
                  name: "accent",
                  label: "Hervorgehobener Teil (Akzentfarbe)",
                  type: "text",
                  required: true,
                },
                { name: "after", label: "Text danach", type: "text", required: true },
              ],
            },
            {
              name: "paragraphs",
              label: "Weitere Absätze",
              type: "array",
              minRows: 1,
              fields: [{ name: "text", label: "Text", type: "textarea", required: true }],
            },
            { name: "ctaLabel", label: "Button-Text (Kontakt)", type: "text", required: true },
          ],
        },
        {
          label: "Galerie",
          name: "gallery",
          fields: [
            {
              name: "images",
              label: "Bilder (max. 12)",
              type: "array",
              maxRows: 12,
              fields: [
                {
                  name: "image",
                  label: "Bild",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Kontakt",
          name: "contact",
          fields: [
            {
              name: "heading",
              label: "Überschrift (Zeilenumbruch per Enter)",
              type: "textarea",
              required: true,
            },
            {
              name: "reserveEyebrow",
              label: "Überzeile über der Telefonnummer",
              type: "text",
              required: true,
            },
            {
              name: "infoItems",
              label: "Zeile unter der Telefonnummer (max. 4)",
              type: "array",
              maxRows: 4,
              admin: {
                description:
                  "Werden durch „·“ getrennt angezeigt. E-Mail und Adresse kommen aus den Einstellungen — hier stehen die Zusätze.",
              },
              fields: [{ name: "text", label: "Text", type: "text", required: true }],
            },
            {
              name: "hoursHeading",
              label: "Überschrift Öffnungszeiten",
              type: "text",
              required: true,
            },
            {
              name: "mapCtaLabel",
              label: "Button-Text auf der Karte",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
