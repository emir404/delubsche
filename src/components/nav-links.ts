import type { SiteData } from "@/lib/content";

export type NavLink = { label: string; href: string; external?: boolean };

/** The nav mirrors the page sections; only the menu PDF is editable (Einstellungen). */
export function navLinks(site: SiteData): NavLink[] {
  return [
    { label: "SPEISEKARTE", href: site.menuPdfUrl, external: true },
    { label: "ÜBER UNS", href: "#ueber-uns" },
    { label: "WER WIR SIND", href: "#wer-wir-sind" },
    { label: "ÖFFNUNGSZEITEN", href: "#oeffnungszeiten" },
    { label: "KONTAKT", href: "#kontakt" },
  ];
}
