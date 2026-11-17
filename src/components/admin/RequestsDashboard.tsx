import { useMemo, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Bell,
  CalendarCheck2,
  ChevronRight,
  ClipboardList,
  Globe2,
  LogOut,
  MessageCircle,
  Phone,
  Plus,
  Search,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import {
  formatRequestDate,
  sourceLabels,
  statusLabels,
  type ContactRequest,
  type ContactSource,
  type ContactStatus,
} from "@/lib/contact-requests";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ManualContactDialog from "./ManualContactDialog";
import RequestDetailsDialog from "./RequestDetailsDialog";
import ProfileDialog from "./ProfileDialog";

const selectClass = "h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20";

function SourceBadge({ source }: { source: ContactSource }) {
  const Icon = source === "website" ? Globe2 : source === "phone" ? Phone : MessageCircle;
  return <Badge variant={source === "website" ? "secondary" : "outline"} className="gap-1.5"><Icon className="h-3.5 w-3.5" />{sourceLabels[source]}</Badge>;
}

export default function RequestsDashboard({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const [manualOpen, setManualOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"all" | ContactSource>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ContactStatus>("all");

  const requestsQuery = useQuery({
    queryKey: ["contact-requests"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_requests").select("*").order("received_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const profileQuery = useQuery({
    queryKey: ["my-profile", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const updateRequest = useMutation({
    mutationFn: async ({ id, status, internalNotes }: { id: string; status?: ContactStatus; internalNotes?: string }) => {
      const payload: { status?: ContactStatus; internal_notes?: string } = {};
      if (status) payload.status = status;
      if (internalNotes !== undefined) payload.internal_notes = internalNotes;
      const { error } = await supabase.from("contact_requests").update(payload).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["contact-requests"] });
      if (variables.internalNotes !== undefined) {
        setSelectedId(null);
        toast.success("Pedido atualizado.");
      }
    },
    onError: () => toast.error("Não foi possível atualizar o pedido."),
  });

  const requests = useMemo(() => requestsQuery.data ?? [], [requestsQuery.data]);
  const filteredRequests = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt");
    return requests.filter((request) => {
      if (sourceFilter !== "all" && request.source !== sourceFilter) return false;
      if (statusFilter !== "all" && request.status !== statusFilter) return false;
      if (!term) return true;
      return [request.name, request.email, request.phone, request.service, request.location, request.message]
        .filter(Boolean)
        .some((value) => value!.toLocaleLowerCase("pt").includes(term));
    });
  }, [requests, search, sourceFilter, statusFilter]);

  const selectedRequest = requests.find((request) => request.id === selectedId) ?? null;
  const stats: { label: string; value: number; icon: LucideIcon }[] = [
    { label: "Total de pedidos", value: requests.length, icon: ClipboardList },
    { label: "Novos por acompanhar", value: requests.filter((request) => request.status === "new").length, icon: Bell },
    { label: "Agendados", value: requests.filter((request) => request.status === "scheduled").length, icon: CalendarCheck2 },
    { label: "Telefone e WhatsApp", value: requests.filter((request) => request.source !== "website").length, icon: Phone },
  ];

  const refreshRequests = () => void queryClient.invalidateQueries({ queryKey: ["contact-requests"] });

  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b bg-card">
        <div className="container mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <div>
            <Link to="/" className="font-display text-2xl font-semibold text-primary">desasSossego</Link>
            <p className="mt-1 text-sm text-muted-foreground">Área reservada · Pedidos da clínica</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setProfileOpen(true)}><UserRound />O meu perfil</Button>
            <Button variant="ghost" onClick={() => void supabase.auth.signOut()}><LogOut />Sair</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold md:text-4xl">Pedidos de consulta</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Acompanhe os pedidos do site e registe os contactos recebidos por telefone e WhatsApp.</p>
          </div>
          <Button onClick={() => setManualOpen(true)} className="w-full sm:w-auto"><Plus />Registar contacto</Button>
        </div>

        <section aria-label="Resumo dos pedidos" className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="min-w-0 rounded-xl border bg-card p-4 shadow-sm md:p-5">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
            </div>
          ))}
        </section>

        <section aria-label="Filtros" className="mt-8 grid gap-3 rounded-xl border bg-card p-4 md:grid-cols-[1fr_180px_180px]">
          <label className="relative block">
            <span className="sr-only">Pesquisar pedidos</span>
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar nome, email ou telefone" className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
          </label>
          <select aria-label="Filtrar por origem" className={selectClass} value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value as "all" | ContactSource)}>
            <option value="all">Todas as origens</option>
            {Object.entries(sourceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <select aria-label="Filtrar por estado" className={selectClass} value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "all" | ContactStatus)}>
            <option value="all">Todos os estados</option>
            {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </section>

        <section aria-label="Lista de pedidos" className="mt-5 overflow-hidden rounded-xl border bg-card shadow-sm">
          {requestsQuery.isLoading ? (
            <p className="p-10 text-center text-muted-foreground">A carregar pedidos…</p>
          ) : requestsQuery.isError ? (
            <div className="p-10 text-center"><p className="text-destructive">Não foi possível carregar os pedidos.</p><Button variant="outline" className="mt-4" onClick={() => void requestsQuery.refetch()}>Tentar novamente</Button></div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-10 text-center"><ClipboardList className="mx-auto h-8 w-8 text-muted-foreground" /><h2 className="mt-4 text-xl font-semibold">{requests.length === 0 ? "Ainda não há pedidos registados" : "Nenhum pedido corresponde aos filtros"}</h2><p className="mt-2 text-sm text-muted-foreground">{requests.length === 0 ? "Os novos pedidos do site aparecem aqui automaticamente." : "Altere a pesquisa ou os filtros."}</p></div>
          ) : (
            <div className="divide-y">
              {filteredRequests.map((request) => (
                <article key={request.id} className="grid gap-4 p-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_150px_auto] md:items-center md:p-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><h2 className="break-words text-lg font-semibold">{request.name}</h2><SourceBadge source={request.source} /></div>
                    <p className="mt-1 text-xs text-muted-foreground">{formatRequestDate(request.received_at)}</p>
                  </div>
                  <div className="min-w-0 text-sm text-muted-foreground">
                    {request.phone && <a href={`tel:${request.phone}`} className="block break-words hover:text-primary">{request.phone}</a>}
                    {request.email && <a href={`mailto:${request.email}`} className="mt-1 block break-words hover:text-primary">{request.email}</a>}
                    {!request.phone && !request.email && <span>Sem contacto indicado</span>}
                  </div>
                  <label>
                    <span className="sr-only">Estado do pedido de {request.name}</span>
                    <select className={`${selectClass} w-full`} value={request.status} disabled={updateRequest.isPending} onChange={(event) => updateRequest.mutate({ id: request.id, status: event.target.value as ContactStatus })}>
                      {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedId(request.id)} className="justify-self-start md:justify-self-end">Detalhes<ChevronRight /></Button>
                </article>
              ))}
            </div>
          )}
        </section>
        <p className="mt-5 text-xs text-muted-foreground">Informação confidencial. Consulte e registe apenas os dados necessários para acompanhar cada pedido.</p>
      </main>

      <ManualContactDialog open={manualOpen} onOpenChange={setManualOpen} userId={user.id} onSaved={refreshRequests} />
      <RequestDetailsDialog
        request={selectedRequest}
        open={Boolean(selectedId)}
        onOpenChange={(open) => !open && setSelectedId(null)}
        saving={updateRequest.isPending}
        onSave={(id, status, internalNotes) => updateRequest.mutate({ id, status, internalNotes })}
      />
      <ProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        userId={user.id}
        email={user.email ?? ""}
        profile={profileQuery.data ?? null}
        onSaved={() => void queryClient.invalidateQueries({ queryKey: ["my-profile", user.id] })}
      />
    </div>
  );
}
