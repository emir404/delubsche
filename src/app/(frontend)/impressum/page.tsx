import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Impressum – De Lübsche Schut",
  description: "Impressum von De Lübsche Schut, Lachswehrallee 40, 23558 Lübeck.",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <LegalSection>
        <p>
          De Lübsche Schut
          <br />
          Lachswehrallee 40
          <br />
          23558 Lübeck
        </p>
      </LegalSection>

      <LegalSection heading="Inhaber">
        <p>
          Thomas Becker
          <br />
          Stefan Bünning
        </p>
      </LegalSection>

      <LegalSection heading="Telefon">
        <p>
          <a href="tel:+4915752639183" className="hover:opacity-70">
            +49 1575 263 918 3
          </a>
          <br />
          <a href="tel:+4915255900937" className="hover:opacity-70">
            +49 152 55 900 937
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="E-Mail">
        <p>
          <a href="mailto:info@die-schute.de" className="hover:opacity-70">
            info@die-schute.de
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="USt-IdNr.">
        <p>22 102 05 684</p>
      </LegalSection>
    </LegalPage>
  );
}
