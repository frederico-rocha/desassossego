import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const BookingSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="reservar" className="section-padding bg-secondary">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Reservar Consulta
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Preencha o formulário e entraremos em contacto consigo em menos de 24 horas.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl p-12 border border-border text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Send className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
              Pedido Enviado
            </h3>
            <p className="text-muted-foreground font-body">
              Obrigado pelo seu contacto. A nossa equipa entrará em contacto consigo brevemente.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-xl p-8 md:p-10 border border-border shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="O seu nome"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@exemplo.pt"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+351 912 345 678"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  Serviço pretendido
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                >
                  <option value="">Selecionar...</option>
                  <option>Psicologia Clínica</option>
                  <option>Terapia de Casal</option>
                  <option>Terapia Familiar</option>
                  <option>Psicologia Infantojuvenil</option>
                  <option>Desenvolvimento Pessoal</option>
                  <option>Consulta Online</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Clínica preferida
              </label>
              <select
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              >
                <option value="" disabled>Selecionar clínica...</option>
                <option value="lisboa">Lisboa — Av. António Serpa, 32</option>
                <option value="cascais">Cascais — Av. 25 de Abril, 672</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Mensagem (opcional)
              </label>
              <textarea
                rows={4}
                placeholder="Descreva brevemente o motivo da consulta..."
                className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Enviar Pedido de Consulta
            </button>

            <p className="text-xs text-muted-foreground font-body mt-4 text-center">
              Os seus dados são tratados com total confidencialidade, em conformidade com o RGPD.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
