import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CONSENT_KEY, NOTICE_TEXT, consentRequired, readChoice, saveChoice, syncAdvertising } from "@/lib/ad-consent";

export default function AdvertisingConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let active = true;
    void consentRequired().then(required => { if (active && required && readChoice() === null) setOpen(true); });
    void syncAdvertising();
    const settings = () => setOpen(true);
    const sync = () => { void syncAdvertising(); };
    const storage = (event: StorageEvent) => { if (event.key === CONSENT_KEY) sync(); };
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
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-lg">
      <DialogHeader><DialogTitle>Preferências de cookies</DialogTitle><DialogDescription className="pt-3 leading-relaxed">{NOTICE_TEXT}</DialogDescription></DialogHeader>
      <Link to="/privacidade" onClick={() => setOpen(false)} className="text-primary underline">Política de privacidade</Link>
      <div className="grid grid-cols-2 gap-3"><Button variant="outline" size="lg" onClick={() => choose("denied")}>Recusar</Button><Button size="lg" onClick={() => choose("granted")}>Aceitar</Button></div>
    </DialogContent>
  </Dialog>;
}