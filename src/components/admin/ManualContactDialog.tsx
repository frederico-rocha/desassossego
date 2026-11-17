import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  emptyManualContact,
  toManualContactInsert,
  validateManualContact,
  type ManualContactValues,
} from "@/lib/contact-requests";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const fieldClass = "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onSaved: () => void;
};

export default function ManualContactDialog({ open, onOpenChange, userId, onSaved }: Props) {
  const [values, setValues] = useState<ManualContactValues>(emptyManualContact);
  const [errors, setErrors] = useState<ReturnType<typeof validateManualContact>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setValues(emptyManualContact());
      setErrors({});
    }
  }, [open]);

  const update = <K extends keyof ManualContactValues>(key: K, value: ManualContactValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateManualContact(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSaving(true);
    const { error } = await supabase.from("contact_requests").insert(toManualContactInsert(values, userId));
    setSaving(false);

    if (error) {
      toast.error("Não foi possível guardar o contacto. Tente novamente.");
      return;
    }

    toast.success("Contacto registado.");
    onSaved();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Registar contacto recebido</DialogTitle>
          <DialogDescription>Adicione apenas contactos já recebidos por telefone ou WhatsApp.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} noValidate className="grid gap-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">Origem
              <select className={fieldClass} value={values.source} onChange={(event) => update("source", event.target.value as ManualContactValues["source"])}>
                <option value="phone">Telefone</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </label>
            <label className="text-sm font-medium">Recebido em
              <input type="datetime-local" className={fieldClass} value={values.receivedAt} onChange={(event) => update("receivedAt", event.target.value)} aria-invalid={Boolean(errors.receivedAt)} />
              {errors.receivedAt && <span className="mt-1 block text-xs text-destructive">{errors.receivedAt}</span>}
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">Nome *
              <input className={fieldClass} value={values.name} onChange={(event) => update("name", event.target.value)} autoComplete="off" aria-invalid={Boolean(errors.name)} />
              {errors.name && <span className="mt-1 block text-xs text-destructive">{errors.name}</span>}
            </label>
            <label className="text-sm font-medium">Telefone *
              <input type="tel" className={fieldClass} value={values.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+351 912 345 678" aria-invalid={Boolean(errors.phone)} />
              {errors.phone && <span className="mt-1 block text-xs text-destructive">{errors.phone}</span>}
            </label>
          </div>
          <label className="text-sm font-medium">Email (opcional)
            <input type="email" className={fieldClass} value={values.email} onChange={(event) => update("email", event.target.value)} placeholder="email@exemplo.pt" aria-invalid={Boolean(errors.email)} />
            {errors.email && <span className="mt-1 block text-xs text-destructive">{errors.email}</span>}
          </label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="text-sm font-medium">Serviço
              <input className={fieldClass} value={values.service} onChange={(event) => update("service", event.target.value)} />
            </label>
            <label className="text-sm font-medium">Localização
              <select className={fieldClass} value={values.location} onChange={(event) => update("location", event.target.value)}>
                <option value="">Por definir</option>
                <option value="Lisboa">Lisboa</option>
                <option value="Cascais">Cascais</option>
                <option value="Online">Online</option>
              </select>
            </label>
            <label className="text-sm font-medium">Horário
              <select className={fieldClass} value={values.schedule} onChange={(event) => update("schedule", event.target.value)}>
                <option value="">Por definir</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
              </select>
            </label>
          </div>
          <label className="text-sm font-medium">Mensagem recebida (opcional)
            <textarea rows={3} className={`${fieldClass} resize-y`} value={values.message} onChange={(event) => update("message", event.target.value)} />
          </label>
          <label className="text-sm font-medium">Notas internas (opcional)
            <textarea rows={3} className={`${fieldClass} resize-y`} value={values.internalNotes} onChange={(event) => update("internalNotes", event.target.value)} placeholder="Informação útil para o acompanhamento da equipa" />
          </label>
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="animate-spin" />}
              {saving ? "A guardar…" : "Guardar contacto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
