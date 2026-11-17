import type { Database } from "@/integrations/supabase/types";

export type ContactRequest = Database["public"]["Tables"]["contact_requests"]["Row"];
export type ContactSource = Database["public"]["Enums"]["contact_source"];
export type ContactStatus = Database["public"]["Enums"]["contact_status"];
export type ManualContactSource = Exclude<ContactSource, "website">;

export type ManualContactValues = {
  receivedAt: string;
  source: ManualContactSource;
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  schedule: string;
  message: string;
  internalNotes: string;
};

export const sourceLabels: Record<ContactSource, string> = {
  website: "Site",
  phone: "Telefone",
  whatsapp: "WhatsApp",
};

export const statusLabels: Record<ContactStatus, string> = {
  new: "Novo",
  contacted: "Contactado",
  scheduled: "Agendado",
  closed: "Concluído",
};

export function localDateTimeValue(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function emptyManualContact(): ManualContactValues {
  return {
    receivedAt: localDateTimeValue(),
    source: "phone",
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    schedule: "",
    message: "",
    internalNotes: "",
  };
}

export function validateManualContact(values: ManualContactValues) {
  const errors: Partial<Record<keyof ManualContactValues, string>> = {};
  if (!values.name.trim()) errors.name = "Indique o nome da pessoa.";
  if (!values.phone.trim()) errors.phone = "Indique o número de telefone.";
  if (!values.receivedAt || Number.isNaN(new Date(values.receivedAt).getTime())) {
    errors.receivedAt = "Indique quando recebeu o contacto.";
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Verifique o endereço de email.";
  }
  return errors;
}

const optionalText = (value: string) => value.trim() || null;

export function toManualContactInsert(values: ManualContactValues, userId: string) {
  return {
    received_at: new Date(values.receivedAt).toISOString(),
    source: values.source,
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: optionalText(values.email),
    service: optionalText(values.service),
    location: optionalText(values.location),
    schedule: optionalText(values.schedule),
    message: optionalText(values.message),
    internal_notes: values.internalNotes.trim(),
    status: "new" as const,
    created_by: userId,
  } satisfies Database["public"]["Tables"]["contact_requests"]["Insert"];
}

export function formatRequestDate(value: string) {
  return new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
