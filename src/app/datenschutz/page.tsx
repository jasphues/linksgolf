import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — LINKSGOLF",
  robots: { index: false },
};

export default function DatenschutzPage() {
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

      <h1 className="text-4xl font-bold tracking-tight mb-2">Datenschutzerklärung</h1>
      <p className="text-muted-foreground mb-12">Zuletzt aktualisiert: April 2026</p>

      <section className="space-y-10 text-sm leading-relaxed">

        <div>
          <h2 className="text-lg font-semibold mb-3">1. Verantwortlicher</h2>
          <p className="text-muted-foreground">
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><br />
            Jasper Huesgen<br />
            Albrechtstr. 19<br />
            10117 Berlin<br />
            E-Mail: <a href="mailto:hi@linksgolf.xyz" className="underline hover:text-foreground">hi@linksgolf.xyz</a>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">2. Allgemeines zur Datenverarbeitung</h2>
          <p className="text-muted-foreground">
            Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur
            Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
            Eine Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung
            des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer
            Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch
            gesetzliche Vorschriften gestattet ist.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">3. Bereitstellung der Website (Server-Logfiles)</h2>
          <p className="text-muted-foreground mb-2">
            Diese Website wird über die Infrastruktur von <strong>Vercel Inc.</strong> (340 Pine Street, Suite 701,
            San Francisco, CA 94104, USA) bereitgestellt. Bei jedem Aufruf unserer Website erfasst Vercel
            automatisch Informationen in sogenannten Server-Logfiles:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-2">
            <li>IP-Adresse (anonymisiert)</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Aufgerufene URL</li>
            <li>Browser-Typ und -Version</li>
            <li>Betriebssystem</li>
          </ul>
          <p className="text-muted-foreground">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Betrieb der Website).
            Vercel verarbeitet diese Daten gemäß seiner Datenschutzrichtlinie unter{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              vercel.com/legal/privacy-policy
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">4. Cookies</h2>
          <p className="text-muted-foreground mb-2">
            Diese Website setzt Cookies nur nach Ihrer ausdrücklichen Einwilligung ein.
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Technisch notwendige Cookies:</strong> Wir speichern Ihre Cookie-Einwilligungsentscheidung
            im <code>localStorage</code> Ihres Browsers. Diese Speicherung ist technisch erforderlich,
            damit Ihre Entscheidung beim nächsten Besuch erhalten bleibt, und erfordert keine gesonderte
            Einwilligung (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p className="text-muted-foreground">
            Sie können Ihren Browser so einstellen, dass keine Cookies gespeichert werden oder bereits
            gespeicherte Cookies gelöscht werden. In diesem Fall können einzelne Funktionen der Website
            eingeschränkt sein.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">5. Google Analytics</h2>
          <p className="text-muted-foreground mb-2">
            Diese Website nutzt <strong>Google Analytics 4</strong>, einen Webanalysedienst der Google Ireland Limited
            (Gordon House, Barrow Street, Dublin 4, Irland; „Google"), <strong>ausschließlich nach Ihrer
            ausdrücklichen Einwilligung</strong>.
          </p>
          <p className="text-muted-foreground mb-2">
            Google Analytics verwendet Cookies und ähnliche Technologien, um Ihr Nutzungsverhalten auf dieser
            Website zu analysieren. Die dabei erzeugten Informationen (einschließlich Ihrer IP-Adresse) werden
            in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
          </p>
          <p className="text-muted-foreground mb-2">
            Wir haben die IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse innerhalb der EU gekürzt wird,
            bevor sie an Google übermittelt wird.
          </p>
          <p className="text-muted-foreground mb-2">
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre
            Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie auf den Link
            „Cookie-Einstellungen" im Footer klicken.
          </p>
          <p className="text-muted-foreground">
            Weitere Informationen zum Umgang mit Nutzerdaten bei Google finden Sie in der Datenschutzerklärung
            von Google:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              policies.google.com/privacy
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">6. Externe Inhalte und Bilder</h2>
          <p className="text-muted-foreground">
            Diese Website bindet Bilder ein, die auf externen Servern (z.B. der jeweiligen Golfclubs oder
            Hoteliers) gehostet werden. Beim Laden dieser Bilder kann Ihre IP-Adresse an die jeweiligen
            externen Server übermittelt werden. Dies ist technisch bedingt und liegt außerhalb unseres
            Einflussbereichs. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">7. Ihre Rechte</h2>
          <p className="text-muted-foreground mb-2">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li><strong>Auskunft</strong> (Art. 15 DSGVO): Recht auf Auskunft über die verarbeiteten Daten</li>
            <li><strong>Berichtigung</strong> (Art. 16 DSGVO): Recht auf Berichtigung unrichtiger Daten</li>
            <li><strong>Löschung</strong> (Art. 17 DSGVO): Recht auf Löschung Ihrer Daten</li>
            <li><strong>Einschränkung</strong> (Art. 18 DSGVO): Recht auf Einschränkung der Verarbeitung</li>
            <li><strong>Widerspruch</strong> (Art. 21 DSGVO): Recht auf Widerspruch gegen die Verarbeitung</li>
            <li><strong>Widerruf</strong> (Art. 7 Abs. 3 DSGVO): Jederzeit widerrufliche Einwilligung</li>
            <li><strong>Beschwerde</strong>: Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            Für Anfragen zu Ihren Datenschutzrechten wenden Sie sich bitte an:{" "}
            <a href="mailto:hi@linksgolf.xyz" className="underline hover:text-foreground">hi@linksgolf.xyz</a>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">8. Datensicherheit</h2>
          <p className="text-muted-foreground">
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte
            eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
            Adresszeile des Browsers von „http://" auf „https://" wechselt.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">9. Änderungen dieser Datenschutzerklärung</h2>
          <p className="text-muted-foreground">
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
            rechtlichen Anforderungen entspricht. Das Datum der letzten Aktualisierung ist oben angegeben.
          </p>
        </div>

      </section>
    </div>
  );
}
