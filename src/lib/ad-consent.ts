export const CONSENT_KEY = "desassossego_ad_consent";
export const NOTICE_VERSION = "2026-11-08.1";
export const NOTICE_TEXT = "Com autorização, o Google Ads e o Google Tag Manager recebem dados técnicos da visita (página, dispositivo e identificadores de cookies) e a indicação de que um pedido foi enviado, para medir publicidade e otimizar anúncios. Não enviamos os dados preenchidos no formulário ou informação clínica. Pode recusar ou retirar a autorização nas Definições de cookies.";
export const CONSENT_COUNTRIES = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH", "CA"];
type Choice = "granted" | "denied";
type RecordEntry = { choice: Choice; at: string; version: string; notice: string; region: string };
declare global { interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void } }
let region = "unknown";
let lookup: Promise<boolean> | undefined;
export function requiresConsent(trace: string, hostname: string) {
  const host = trace.match(/^h=(.+)$/m)?.[1]?.trim().toLowerCase();
  const country = trace.match(/^loc=([A-Z0-9]{2})$/m)?.[1];
  return host !== hostname.toLowerCase() || !country || ["XX", "T1"].includes(country) || CONSENT_COUNTRIES.includes(country);
}
export function readChoice(): Choice | null {
  if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return "denied";
  try {
    const records: RecordEntry[] = JSON.parse(localStorage.getItem(CONSENT_KEY) || "[]");
    const last = records.at(-1);
    return last?.version === NOTICE_VERSION && ["granted", "denied"].includes(last.choice) ? last.choice : null;
  } catch { return null; }
}
export function consentRequired() {
  return lookup ??= (async () => {
    try {
      const res = await fetch("/cdn-cgi/trace", { signal: AbortSignal.timeout(2000) });
      if (!res.ok) return true;
      const trace = await res.text();
      region = trace.match(/^loc=([A-Z0-9]{2})$/m)?.[1] || "unknown";
      return requiresConsent(trace, location.hostname);
    } catch { return true; }
  })();
}
export function saveChoice(choice: Choice) {
  let records: RecordEntry[] = [];
  try { records = JSON.parse(localStorage.getItem(CONSENT_KEY) || "[]"); } catch { /* start a new consent record */ }
  if (!Array.isArray(records)) records = [];
  records.push({ choice, at: new Date().toISOString(), version: NOTICE_VERSION, notice: NOTICE_TEXT, region });
  localStorage.setItem(CONSENT_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event("ad-consent-changed"));
}
export async function canTrackAdvertising() {
  const initial = readChoice();
  const required = initial === null ? await consentRequired() : true;
  const latest = readChoice();
  return latest === "granted" || (latest === null && !required);
}
export async function syncAdvertising() {
  const allowed = await canTrackAdvertising();
  window.gtag?.("consent", "update", { ad_storage: allowed ? "granted" : "denied", ad_user_data: allowed ? "granted" : "denied", ad_personalization: "denied" });
  if (!allowed) { window.gtag?.("set", "user_data", null); return; }
  if (document.querySelector("script[data-google-ads]")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("set", "developer_id.dZjgwMW", true);
  window.gtag("js", new Date());
  window.gtag("config", "AW-18557865973", { allow_ad_personalization_signals: false });
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=AW-18557865973";
  script.async = true;
  script.dataset.googleAds = "";
  document.head.appendChild(script);
  if (!document.querySelector("script[data-google-manager]")) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const manager = document.createElement("script");
    manager.src = "https://www.googletagmanager.com/gtm.js?id=GTM-PK45BB99";
    manager.async = true;
    manager.dataset.googleManager = "";
    document.head.appendChild(manager);
  }
}

export async function reportBookingConversion(success: boolean) {
  if (!success || !(await canTrackAdvertising())) return;
  await syncAdvertising();
  if (!(await canTrackAdvertising())) return;
  // Report only the successful submission, never form contents or health details.
  window.gtag?.("event", "conversion", {
    send_to: "AW-18557865973/_po2CMyFwLQdEPWfipFF",
  });
}