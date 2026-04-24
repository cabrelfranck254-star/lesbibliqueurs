import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Les Bibliqueurs" },
      { name: "description", content: "Contactez Les Bibliqueurs : WhatsApp, email et localisation. Salle BC de Deido, Douala." },
      { property: "og:title", content: "Contact — Les Bibliqueurs" },
      { property: "og:description", content: "Écrivez-nous, appelez-nous ou venez nous rencontrer." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  nom: z.string().trim().min(2, "Nom trop court").max(80),
  email: z.string().trim().email("Email invalide").max(150),
  message: z.string().trim().min(10, "Message trop court").max(1000, "Message trop long"),
});

function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <>
      <section className="bg-hero-gradient text-white py-20">
        <div className="container-custom text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Contact</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4">Restons en contact</h1>
          <p className="text-white/85 max-w-xl mx-auto text-lg">
            Une question, une remarque, une collaboration ? Nous sommes à votre écoute.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl text-primary mb-8">Coordonnées</h2>
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Téléphone", value: "655 81 63 62 / 658 09 47 14", href: "tel:+237655816362" },
                { icon: MessageCircle, label: "WhatsApp", value: "Discutons sur WhatsApp", href: "https://wa.me/237655816362" },
                { icon: Mail, label: "Email", value: "contact@lesbibliqueurs.com", href: "mailto:contact@lesbibliqueurs.com" },
                { icon: MapPin, label: "Adresse", value: "Salle de fête BC de Deido, en face de la Boulangerie Saker, Douala", href: undefined },
              ].map((item) => {
                const content = (
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-[var(--gold)]/50 transition">
                    <div className="h-12 w-12 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-[var(--gold-foreground)]" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold mb-1">{item.label}</div>
                      <div className="text-foreground">{item.value}</div>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">{content}</a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                title="Localisation"
                src="https://www.google.com/maps?q=Deido,+Douala,+Cameroon&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="bg-card p-10 rounded-2xl border border-border shadow-elegant">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-[var(--gold)] mx-auto mb-4" />
                <h3 className="font-display text-3xl text-primary mb-2">Message envoyé !</h3>
                <p className="text-muted-foreground">Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-3xl text-primary mb-6">Envoyez-nous un message</h2>
                <form onSubmit={submit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nom</label>
                    <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} maxLength={80} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)]" />
                    {errors.nom && <p className="text-destructive text-sm mt-1">{errors.nom}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={150} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)]" />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={5} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)] resize-none" />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="w-full py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] font-semibold shadow-gold hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" /> Envoyer le message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
