import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — LINKSGOLF",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to LINKSGOLF
        </Link>
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-2">Impressum</h1>
      <p className="text-muted-foreground mb-12">Angaben gemäß § 5 TMG</p>

      <section className="space-y-10 text-sm leading-relaxed">

        {/* Operator */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Verantwortlicher</h2>
          <p className="text-muted-foreground">
            J Huesgen<br />
            Albrechtstr. 19<br />
            10117 Berlin<br />
            Deutschland
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Kontakt</h2>
          <p className="text-muted-foreground">
            E-Mail: <a href="mailto:hi@linksgolf.xyz" className="underline hover:text-foreground">hi@linksgolf.xyz</a>
          </p>
        </div>

        {/* Purpose */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Zweck der Website</h2>
          <p className="text-muted-foreground">
            LINKSGOLF ist ein redaktionelles Informationsportal über Links-Golfplätze weltweit.
            Die Website bietet beschreibende Inhalte, Vergleiche und Reiseinformationen zu Golfplätzen.
            Es werden keine Buchungen vermittelt oder Verkaufsgeschäfte abgewickelt.
          </p>
        </div>

        {/* Image credits */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Bildnachweise</h2>
          <p className="text-muted-foreground mb-3">
            Die auf dieser Website verwendeten Bilder stammen aus folgenden Quellen.
            Alle Bildrechte verbleiben bei den jeweiligen Rechteinhabern.
          </p>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside">
            <li>Golfplatz-Bilder: © Jeweilige Golfclubs und deren offizielle Fotografen</li>
            <li>Royal County Down: © Royal County Down Golf Club</li>
            <li>Hotel-Bilder: © Jeweilige Hoteliers / Marine &amp; Lawn Hotels</li>
            <li>TripAdvisor-Bilder: © TripAdvisor LLC / jeweilige Urheber</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            Sollten Sie als Rechteinhaber einer Abbildung der Verwendung widersprechen, wenden Sie sich
            bitte per E-Mail an uns. Wir werden das betreffende Bild unverzüglich entfernen.
          </p>
        </div>

        {/* Liability */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Haftungsausschluss</h2>
          <p className="text-muted-foreground mb-2">
            <strong>Haftung für Inhalte:</strong> Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            Insbesondere Preisangaben, Verfügbarkeiten und Öffnungszeiten der Golfplätze können sich ohne vorherige
            Ankündigung ändern.
          </p>
          <p className="text-muted-foreground">
            <strong>Haftung für Links:</strong> Diese Website enthält Links zu externen Websites. Auf den Inhalt
            dieser externen Seiten haben wir keinen Einfluss und übernehmen daher keine Haftung.
          </p>
        </div>

        {/* Copyright */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Urheberrecht</h2>
          <p className="text-muted-foreground">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
            deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
            außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des Autors.
          </p>
        </div>

      </section>
    </div>
  );
}
