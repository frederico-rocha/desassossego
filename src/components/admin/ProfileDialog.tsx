import { useEffect, useState } from "react";
import { Loader2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  email: string;
  profile: Profile | null;
  onSaved: () => void;
};

export default function ProfileDialog({ open, onOpenChange, userId, email, profile, onSaved }: Props) {
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setFullName(profile?.full_name ?? "");
  }, [open, profile]);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fullName.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ full_name: fullName.trim() }).eq("user_id", userId);
    setSaving(false);
    if (error) {
      toast.error("Não foi possível atualizar o perfil.");
      return;
    }
    toast.success("Perfil atualizado.");
    onSaved();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">O meu perfil</DialogTitle>
          <DialogDescription>Dados da sua conta na área reservada.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 py-2">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="h-14 w-14 rounded-full border object-cover" />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary"><UserRound className="h-7 w-7" /></span>
          )}
          <div className="min-w-0"><p className="text-sm text-muted-foreground">Conta</p><p className="break-words text-sm font-medium">{email}</p></div>
        </div>
        <form onSubmit={save} className="grid gap-4">
          <label className="text-sm font-medium">Nome
            <input className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
          </label>
          <div className="flex justify-end"><Button type="submit" disabled={saving || !fullName.trim()}>{saving && <Loader2 className="animate-spin" />}Guardar perfil</Button></div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
