import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const BookingSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

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
            {t.booking.title}
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            {t.booking.subtitle}
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
              {t.booking.sentTitle}
            </h3>
            <p className="text-muted-foreground font-body">
              {t.booking.sentBody}
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
                  {t.booking.name}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.booking.namePlaceholder}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {t.booking.email}
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
                  {t.booking.phone}
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
                  {t.booking.service}
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                >
                  <option value="">{t.booking.select}</option>
                  {t.services.items.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                {t.booking.clinic}
              </label>
              <select
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              >
                <option value="" disabled>{t.booking.selectClinic}</option>
                <option value="lisboa">{t.booking.clinicLisboa}</option>
                <option value="cascais">{t.booking.clinicCascais}</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                {t.booking.message}
              </label>
              <textarea
                rows={4}
                placeholder={t.booking.messagePlaceholder}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {t.booking.submit}
            </button>

            <p className="text-xs text-muted-foreground font-body mt-4 text-center">
              {t.booking.rgpd}
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
