"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";

const STORAGE_KEY = "cookie_consent";

type ConsentState = "accepted" | "declined" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState;
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  }

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics gaId="G-D782ZN62VQ" />}

      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm shadow-lg">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Wir nutzen Google Analytics, um die Nutzung dieser Website zu verstehen und zu verbessern.
              Dafür benötigen wir Ihre Einwilligung.{" "}
              <Link href="/datenschutz" className="underline hover:text-foreground transition-colors">
                Datenschutzerklärung
              </Link>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={decline}
                className="text-sm px-4 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                Ablehnen
              </button>
              <button
                onClick={accept}
                className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsLink() {
  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  return (
    <button
      onClick={reset}
      className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors underline"
    >
      Cookie-Einstellungen
    </button>
  );
}
