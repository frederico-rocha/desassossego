import { describe, expect, it } from "vitest";
import { emptyManualContact, toManualContactInsert, validateManualContact } from "./contact-requests";

const validContact = () => ({
  ...emptyManualContact(),
  receivedAt: "2026-11-17T08:30",
  name: "  Maria Silva  ",
  phone: "  +351 912 345 678  ",
});

describe("manual clinic contacts", () => {
  it("requires a phone number for telephone contacts", () => {
    const errors = validateManualContact({ ...validContact(), source: "phone", phone: "" });
    expect(errors.phone).toBe("Indique o número de telefone.");
  });

  it("requires a phone number for WhatsApp contacts", () => {
    const errors = validateManualContact({ ...validContact(), source: "whatsapp", phone: "   " });
    expect(errors.phone).toBe("Indique o número de telefone.");
  });

  it("requires the person's name", () => {
    const errors = validateManualContact({ ...validContact(), name: " " });
    expect(errors.name).toBe("Indique o nome da pessoa.");
  });

  it("requires when the contact was received", () => {
    const errors = validateManualContact({ ...validContact(), receivedAt: "" });
    expect(errors.receivedAt).toBe("Indique quando recebeu o contacto.");
  });

  it("accepts a valid WhatsApp contact and records its source", () => {
    const values = { ...validContact(), source: "whatsapp" as const };
    expect(validateManualContact(values)).toEqual({});
    expect(toManualContactInsert(values, "staff-user-id")).toMatchObject({
      source: "whatsapp",
      name: "Maria Silva",
      phone: "+351 912 345 678",
      created_by: "staff-user-id",
      status: "new",
    });
  });

  it("keeps an optional email empty instead of storing blank text", () => {
    expect(toManualContactInsert(validContact(), "staff-user-id").email).toBeNull();
  });
});
