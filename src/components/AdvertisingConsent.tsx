import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CONSENT_KEY, NOTICE_TEXT, consentRequired, readChoice, saveChoice, syncAdvertising } from "@/lib/ad-consent";

export default function AdvertisingConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let active = true;
    void consentRequired().then(required => { if (active && required && readChoice() === null) setOpen(true); });
    void syncAdvertising();
    const settings = () => setOpen(true);
    const sync = () => { void syncAdvertising(); };
    const storage = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY) return;
      sync();
      if (readChoice() === "denied" && document.querySelector("script[data-google-ads]")) window.location.reload();
    };
    window.addEventListener("open-cookie-settings", settings);
    window.addEventListener("ad-consent-changed", sync);
    window.addEventListener("storage", storage);
    return () => {
      active = false;
      window.removeEventListener("open-cookie-settings", settings);
      window.removeEventListener("ad-consent-changed", sync);
      window.removeEventListener("storage", storage);
    };
  }, []);
  const choose = (choice: "granted" | "denied") => {
    saveChoice(choice);
    setOpen(false);
    // A loaded tag manager can keep third-party tags alive; reload on withdrawal.
    if (choice === "denied" && document.querySelector("script[data-google-ads]")) window.location.reload();
  };
  if (!open) return null;
  return <section aria-label="Preferências de cookies" className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background text-foreground">
    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8">
      <p className="min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground">
        {NOTICE_TEXT}{" "}
        <Link to="/privacidade" className="text-primary underline underline-offset-2">Política de privacidade</Link>
      </p>
      <div className="grid shrink-0 grid-cols-2 gap-3 lg:w-56">
        <Button variant="outline" onClick={() => choose("denied")}>Recusar</Button>
        <Button onClick={() => choose("granted")}>Aceitar</Button>
      </div>
    </div>
  </section>;
}