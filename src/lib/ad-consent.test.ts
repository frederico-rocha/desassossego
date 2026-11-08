import { describe, expect, it } from "vitest";
import { requiresConsent, readChoice, saveChoice, CONSENT_KEY } from "./ad-consent";
describe("advertising consent", () => {
  it("requires consent in Portugal", () => { expect(requiresConsent("h=clinicadesassossego.pt\nloc=PT", "clinicadesassossego.pt")).toBe(true); });
  it("blocks unknown and proxy geography", () => { expect(requiresConsent("h=proxy.test\nloc=US", "clinicadesassossego.pt")).toBe(true); expect(requiresConsent("", "clinicadesassossego.pt")).toBe(true); });
  it("does not require a banner in the US", () => { expect(requiresConsent("h=clinicadesassossego.pt\nloc=US", "clinicadesassossego.pt")).toBe(false); });
  it("preserves consent evidence after withdrawal", () => { localStorage.removeItem(CONSENT_KEY); saveChoice("granted"); saveChoice("denied"); expect(readChoice()).toBe("denied"); const records = JSON.parse(localStorage.getItem(CONSENT_KEY) || "[]"); expect(records.map((r: {choice: string}) => r.choice)).toEqual(["granted", "denied"]); expect(records[0].notice).toContain("Google Ads"); });
});