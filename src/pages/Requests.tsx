import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import RequestsDashboard from "@/components/admin/RequestsDashboard";
import { Button } from "@/components/ui/button";


export default function Requests() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data.user);
      setCheckingSession(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setCheckingSession(false);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const roleQuery = useQuery({
    queryKey: ["my-admin-role", user?.id],
    enabled: Boolean(user),
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user!.id).eq("role", "admin").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const sendMagicLink = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setPending("email");
    window.sessionStorage.setItem("auth-return-to", "/gestao");
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setPending(null);
    if (authError) {
      setError("Não foi possível enviar a ligação. Verifique o email e tente novamente.");
      return;
    }
    setEmailSent(true);
  };


  const signOut = async () => {
    await supabase.auth.signOut();
    setEmailSent(false);
    setError("");
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Helmet>
        <title>Pedidos da clínica — Área reservada</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="description" content="Área reservada da Clínica desasSossego para acompanhamento de pedidos de consulta." />
      </Helmet>
      {checkingSession ? (
        <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="A verificar acesso" /></div>
      ) : !user ? (
        <div className="flex min-h-screen items-center justify-center px-5 py-10">
          <section className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <div className="text-center">
              <Link to="/" className="font-display text-3xl font-semibold text-primary">desasSossego</Link>
              <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary"><LockKeyhole className="h-6 w-6" /></div>
              <h1 className="mt-5 text-2xl font-semibold">Área reservada</h1>
              <p className="mt-2 text-sm text-muted-foreground">Acesso exclusivo aos membros autorizados da clínica.</p>
            </div>
            {emailSent ? (
              <div className="mt-7 rounded-lg bg-secondary p-5 text-center">
                <Mail className="mx-auto h-6 w-6 text-primary" />
                <h2 className="mt-3 text-lg font-semibold">Verifique o seu email</h2>
                <p className="mt-2 break-words text-sm text-muted-foreground">Enviámos uma ligação de acesso para <strong>{email}</strong>.</p>
                <Button variant="link" className="mt-3" onClick={() => setEmailSent(false)}>Usar outro email</Button>
              </div>
            ) : (
              <form onSubmit={sendMagicLink} className="mt-7">
                <label htmlFor="staff-email" className="text-sm font-medium">Email</label>
                <input id="staff-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="o.seu@email.pt" className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                <Button type="submit" className="mt-3 w-full" disabled={Boolean(pending)}>{pending === "email" ? <Loader2 className="animate-spin" /> : <Mail />}Enviar ligação de acesso</Button>
              </form>
            )}
            {error && <p role="alert" className="mt-4 text-center text-sm text-destructive">{error}</p>}
            <p className="mt-6 text-center text-xs text-muted-foreground">Se a sua conta não tiver autorização, os pedidos permanecem inacessíveis.</p>
          </section>
        </div>
      ) : roleQuery.isLoading ? (
        <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="A validar autorização" /></div>
      ) : roleQuery.isError ? (
        <div className="flex min-h-screen items-center justify-center px-5"><div className="max-w-md text-center"><h1 className="text-2xl font-semibold">Não foi possível validar o acesso</h1><Button className="mt-5" onClick={() => void roleQuery.refetch()}>Tentar novamente</Button><Button variant="link" className="ml-2" onClick={() => void signOut()}>Sair</Button></div></div>
      ) : !roleQuery.data ? (
        <div className="flex min-h-screen items-center justify-center px-5"><section className="w-full max-w-md rounded-xl border bg-card p-8 text-center"><LockKeyhole className="mx-auto h-8 w-8 text-primary" /><h1 className="mt-5 text-2xl font-semibold">Conta sem autorização</h1><p className="mt-3 break-words text-sm text-muted-foreground">A conta <strong>{user.email}</strong> não tem acesso aos pedidos da clínica.</p><Button className="mt-6" onClick={() => void signOut()}>Entrar com outra conta</Button><div><Button asChild variant="link" className="mt-2"><Link to="/">Voltar ao site</Link></Button></div></section></div>
      ) : (
        <RequestsDashboard user={user} />
      )}
    </main>
  );
}
