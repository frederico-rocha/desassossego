import { useEffect, useState } from "react";
import { Loader2, Mail, Phone } from "lucide-react";
import {
  formatRequestDate,
  sourceLabels,
  statusLabels,
  type ContactRequest,
  type ContactStatus,
} from "@/lib/contact-requests";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  request: ContactRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, status: ContactStatus, internalNotes: string) => void;
  saving: boolean;
};

export default function RequestDetailsDialog({ request, open, onOpenChange, onSave, saving }: Props) {
  const [status, setStatus] = useState<ContactStatus>("new");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (request) {
      setStatus(request.status);
      setNotes(request.internal_notes);
    }
  }, [request]);

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="pr-8 font-display text-2xl break-words">{request.name}</DialogTitle>
          <DialogDescription>{sourceLabels[request.source]} · {formatRequestDate(request.received_at)}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 pt-2">
          <div className="flex flex-wrap gap-3">
            {request.phone && <Button asChild variant="outline" size="sm"><a href={`tel:${request.phone}`}><Phone />{request.phone}</a></Button>}
            {request.email && <Button asChild variant="outline" size="sm"><a href={`mailto:${request.email}`}><Mail /><span className="max-w-[240px] truncate">{request.email}</span></a></Button>}
          </div>
          <dl className="grid gap-4 rounded-lg bg-secondary p-4 text-sm sm:grid-cols-3">
            <div><dt className="text-muted-foreground">Serviço</dt><dd className="mt-1 font-medium break-words">{request.service || "—"}</dd></div>
            <div><dt className="text-muted-foreground">Localização</dt><dd className="mt-1 font-medium break-words">{request.location || "—"}</dd></div>
            <div><dt className="text-muted-foreground">Horário</dt><dd className="mt-1 font-medium break-words">{request.schedule || "—"}</dd></div>
          </dl>
          <div>
            <h3 className="text-sm font-semibold">Mensagem</h3>
            <p className="mt-2 whitespace-pre-wrap break-words rounded-lg border bg-background p-4 text-sm text-muted-foreground">{request.message || "Sem mensagem."}</p>
          </div>
          <label className="text-sm font-medium">Estado
            <select className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" value={status} onChange={(event) => setStatus(event.target.value as ContactStatus)}>
              {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">Notas internas
            <textarea rows={5} className="mt-1.5 w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Registe o seguimento dado pela equipa" />
          </label>
          <div className="flex justify-end">
            <Button onClick={() => onSave(request.id, status, notes.trim())} disabled={saving}>
              {saving && <Loader2 className="animate-spin" />}
              Guardar alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
