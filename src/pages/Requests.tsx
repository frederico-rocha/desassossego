import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import RequestsDashboard from "@/components/admin/RequestsDashboard";
import { Button } from "@/components/ui/button";

function GoogleLogo() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
  );
}

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

  const socialSignIn = async (provider: "google" | "lovable") => {
    setError("");
    setPending(provider);
    window.sessionStorage.setItem("auth-return-to", "/gestao");
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: `${window.location.origin}/auth/callback`,
      extraParams: provider === "google" ? { prompt: "select_account" } : {},
    });
    if (result.error) {
      setPending(null);
      setError("Não foi possível iniciar sessão. Tente novamente.");
      return;
    }
    if (!result.redirected) setPending(null);
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
            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />ou<span className="h-px flex-1 bg-border" /></div>
            <div className="grid gap-3">
              <Button type="button" variant="outline" className="w-full border-[hsl(var(--google-border))] bg-[hsl(var(--google-background))] font-medium text-[hsl(var(--google-foreground))] hover:opacity-90" onClick={() => void socialSignIn("google")} disabled={Boolean(pending)}>{pending === "google" ? <Loader2 className="animate-spin" /> : <GoogleLogo />}Entrar com Google</Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => void socialSignIn("lovable")} disabled={Boolean(pending)}>{pending === "lovable" ? <Loader2 className="animate-spin" /> : <LovableMark className="h-[18px] w-[18px]" />}Entrar com Lovable</Button>
            </div>
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
