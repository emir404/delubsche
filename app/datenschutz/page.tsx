import type { Metadata } from "next";
import { LegalPage, LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutz – De Lübsche Schut",
  description:
    "Datenschutzerklärung von De Lübsche Schut, Lachswehrallee 40, 23558 Lübeck.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <LegalSection heading="Verantwortliche">
        <p>
          De Lübsche Schut
          <br />
          Inhaber: Thomas Becker, Stefan Bünning
          <br />
          Lachswehrallee 40
          <br />
          23558 Lübeck
        </p>
        <p className="mt-4">
          Telefon: +49 1575 263 918 3, +49 152 55 900 937
          <br />
          E-Mail:{" "}
          <a href="mailto:info@die-schute.de" className="hover:opacity-70">
            info@die-schute.de
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Besuch unserer Website / Server-Logfiles">
        <p>
          Beim Aufruf unserer Website werden automatisch technische Daten durch
          unseren Hosting-Anbieter erfasst (z.&nbsp;B. IP-Adresse, aufgerufene
          Seite, Datum und Uhrzeit des Zugriffs, Browsertyp). Diese
          Verarbeitung ist notwendig, um die Website bereitzustellen und die
          Sicherheit des Betriebs zu gewährleisten. Eine Auswertung zu
          Marketing- oder Trackingzwecken findet nicht statt.
        </p>
      </LegalSection>

      <LegalSection heading="Keine weiteren Datenverarbeitungen">
        <p>
          Auf dieser Website gibt es kein Kontaktformular, keine Registrierung,
          keinen Newsletter und keine Verlinkung zu Social-Media-Plattformen.
          Es werden keine personenbezogenen Daten über die Website aktiv
          erhoben; wenn Sie uns telefonisch oder per E-Mail kontaktieren,
          verwenden wir Ihre Angaben nur zur Bearbeitung Ihrer Anfrage.
        </p>
      </LegalSection>

      <LegalSection heading="Google Maps">
        <p>
          Auf unserer Startseite ist eine Karte von Google Maps eingebunden,
          um Ihnen die Anfahrt zu erleichtern. Beim Laden der Karte werden
          technische Daten (z.&nbsp;B. Ihre IP-Adresse) an Google übertragen.
          Anbieter ist Google Ireland Limited, Gordon House, Barrow Street,
          Dublin 4, Irland.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
