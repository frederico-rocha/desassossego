import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  schedule: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  location: "",
  schedule: "",
  message: "",
};

const BookingSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const { t } = useLanguage();

  const validate = (v: FormState): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = t.booking.errorRequired;
    if (!v.email.trim()) e.email = t.booking.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
      e.email = t.booking.errorEmail;
    if (!v.location) e.location = t.booking.errorRequired;
    if (!v.schedule) e.schedule = t.booking.errorRequired;
    return e;
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length === 0) setSubmitted(true);
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg border bg-background font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all";
  const inputClass = (hasError?: boolean) =>
    `${inputBase} ${
      hasError
        ? "border-destructive focus:ring-destructive/20"
        : "border-input focus:ring-ring/20"
    }`;

  const FieldError = ({ message }: { message?: string }) => (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 mt-2 text-xs font-body text-destructive"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );

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
            noValidate
            className="bg-card rounded-xl p-8 md:p-10 border border-border shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {t.booking.name}
                </label>
                <input
                  type="text"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder={t.booking.namePlaceholder}
                  className={inputClass(!!errors.name)}
                  aria-invalid={!!errors.name}
                />
                <FieldError message={errors.name} />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {t.booking.email}
                </label>
                <input
                  type="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="email@exemplo.pt"
                  className={inputClass(!!errors.email)}
                  aria-invalid={!!errors.email}
                />
                <FieldError message={errors.email} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {t.booking.phone}
                </label>
                <input
                  type="tel"
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+351 912 345 678"
                  className={inputClass()}
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {t.booking.service}
                </label>
                <select
                  value={values.service}
                  onChange={(e) => update("service", e.target.value)}
                  className={inputClass()}
                >
                  <option value="">{t.booking.select}</option>
                  {t.services.items.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {t.booking.location}
                </label>
                <select
                  value={values.location}
                  onChange={(e) => update("location", e.target.value)}
                  className={inputClass(!!errors.location)}
                  aria-invalid={!!errors.location}
                >
                  <option value="" disabled>{t.booking.selectLocation}</option>
                  <option value="lisboa">{t.booking.locationLisboa}</option>
                  <option value="cascais">{t.booking.locationCascais}</option>
                  <option value="online">{t.booking.locationOnline}</option>
                </select>
                <FieldError message={errors.location} />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  {t.booking.schedule}
                </label>
                <select
                  value={values.schedule}
                  onChange={(e) => update("schedule", e.target.value)}
                  className={inputClass(!!errors.schedule)}
                  aria-invalid={!!errors.schedule}
                >
                  <option value="" disabled>{t.booking.selectSchedule}</option>
                  <option value="manha">{t.booking.scheduleMorning}</option>
                  <option value="tarde">{t.booking.scheduleAfternoon}</option>
                  <option value="noite">{t.booking.scheduleEvening}</option>
                </select>
                <FieldError message={errors.schedule} />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                {t.booking.message}
              </label>
              <textarea
                rows={4}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={t.booking.messagePlaceholder}
                className={`${inputClass()} resize-none`}
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
