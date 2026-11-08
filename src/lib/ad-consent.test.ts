import { afterEach, describe, expect, it, vi } from "vitest";
import { requiresConsent, readChoice, saveChoice, reportBookingConversion, CONSENT_KEY } from "./ad-consent";
describe("advertising consent", () => {
  it("requires consent in Portugal", () => { expect(requiresConsent("h=clinicadesassossego.pt\nloc=PT", "clinicadesassossego.pt")).toBe(true); });
  it("blocks unknown and proxy geography", () => { expect(requiresConsent("h=proxy.test\nloc=US", "clinicadesassossego.pt")).toBe(true); expect(requiresConsent("", "clinicadesassossego.pt")).toBe(true); });
  it("does not require a banner in the US", () => { expect(requiresConsent("h=clinicadesassossego.pt\nloc=US", "clinicadesassossego.pt")).toBe(false); });
  it("preserves consent evidence after withdrawal", () => { localStorage.removeItem(CONSENT_KEY); saveChoice("granted"); saveChoice("denied"); expect(readChoice()).toBe("denied"); const records = JSON.parse(localStorage.getItem(CONSENT_KEY) || "[]"); expect(records.map((r: {choice: string}) => r.choice)).toEqual(["granted", "denied"]); expect(records[0].notice).toContain("Google Ads"); });
});

describe("booking conversion", () => {
  afterEach(() => {
    localStorage.removeItem(CONSENT_KEY);
    document.querySelectorAll("script[data-google-ads], script[data-google-manager]").forEach(script => script.remove());
    delete window.gtag;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  it("reports the exact provided destination only on success, without customer fields", async () => {
    saveChoice("granted");
    const gtag = vi.fn();
    window.gtag = gtag;
    await reportBookingConversion(true);
    expect(gtag.mock.calls.filter(call => call[0] === "event")).toEqual([
      ["event", "conversion", { send_to: "AW-18557865973/_po2CMyFwLQdEPWfipFF" }],
    ]);
  });
  it("does not report a failed submission even with acceptance", async () => {
    saveChoice("granted");
    const gtag = vi.fn();
    window.gtag = gtag;
    await reportBookingConversion(false);
    expect(gtag).not.toHaveBeenCalled();
  });
  it("does not queue a successful submission after refusal", async () => {
    saveChoice("denied");
    const gtag = vi.fn();
    window.gtag = gtag;
    await reportBookingConversion(true);
    expect(gtag).not.toHaveBeenCalled();
  });
  it("honors Global Privacy Control over acceptance", async () => {
    saveChoice("granted");
    vi.stubGlobal("navigator", { globalPrivacyControl: true });
    const gtag = vi.fn();
    window.gtag = gtag;
    await reportBookingConversion(true);
    expect(gtag).not.toHaveBeenCalled();
  });
});