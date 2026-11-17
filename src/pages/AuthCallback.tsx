import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let active = true;
    let completed = false;

    const finish = (hasSession: boolean) => {
      if (!active || completed || !hasSession) return;
      completed = true;
      const stored = window.sessionStorage.getItem("auth-return-to");
      const destination = stored?.startsWith("/") && !stored.startsWith("//") ? stored : "/gestao";
      window.sessionStorage.removeItem("auth-return-to");
      navigate(destination, { replace: true });
    };

    void supabase.auth.getSession().then(({ data }) => finish(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => finish(Boolean(session)));
    const timeout = window.setTimeout(() => active && !completed && setTimedOut(true), 10_000);

    return () => {
      active = false;
      window.clearTimeout(timeout);
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center px-6">
      <Helmet>
        <title>A concluir acesso — desasSossego</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-sm">
        {timedOut ? (
          <>
            <h1 className="text-2xl font-semibold">Não foi possível concluir o acesso</h1>
            <p className="mt-3 text-muted-foreground">Volte à área reservada e tente novamente.</p>
            <Button asChild className="mt-6"><Link to="/gestao">Voltar ao acesso</Link></Button>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" aria-hidden="true" />
            <h1 className="mt-5 text-2xl font-semibold">A concluir o acesso</h1>
            <p className="mt-3 text-muted-foreground">Só mais um momento.</p>
          </>
        )}
      </div>
    </main>
  );
}
