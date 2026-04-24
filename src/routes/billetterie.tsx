import { createFileRoute } from "@tanstack/react-router";
import { Check, Crown, Ticket, Sparkles } from "lucide-react";

export const Route = createFileRoute("/billetterie")({
  head: () => ({
    meta: [
      { title: "Billetterie — Les Bibliqueurs · Réservez votre place" },
      { name: "description", content: "Réservez votre billet pour l'émission Les Bibliqueurs : Gratuit, Standard 2000 FCFA ou VIP 5000 FCFA. Dim. 24 mai 2026 à Douala." },
      { property: "og:title", content: "Billetterie — Les Bibliqueurs" },
      { property: "og:description", content: "3 formules disponibles. Gratuit, Standard, VIP." },
    ],
  }),
  component: BilletteriePage,
});

const tickets = [
  {
    type: "Gratuit",
    price: "0 FCFA",
    badge: "Inscription anticipée",
    icon: Ticket,
    features: ["Accès à la salle", "Place debout", "Programme officiel"],
    cta: "Réserver gratuitement",
    highlight: false,
  },
  {
    type: "Standard",
    price: "2 000 FCFA",
    badge: "Le plus populaire",
    icon: Sparkles,
    features: ["Accès à la salle", "Place assise garantie", "Collation incluse", "Programme officiel"],
    cta: "Acheter",
    highlight: true,
  },
  {
    type: "VIP",
    price: "5 000 FCFA",
    badge: "Expérience premium",
    icon: Crown,
    features: ["Accès prioritaire", "Place VIP réservée", "Réception privée", "Photo souvenir", "Goodies Bibliqueurs"],
    cta: "Réserver VIP",
    highlight: false,
  },
];

function BilletteriePage() {
  return (
    <>
      <section className="bg-hero-gradient text-white py-20">
        <div className="container-custom text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Billetterie</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4">Réservez votre place</h1>
          <p className="text-white/85 max-w-xl mx-auto text-lg">
            Trois formules pour vivre l'émission. Choisissez celle qui vous correspond.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm">
            📅 Dim. 24 mai 2026 · 16h–18h · Salle BC de Deido, Douala
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid md:grid-cols-3 gap-8">
          {tickets.map((t) => (
            <div
              key={t.type}
              className={`relative p-8 rounded-3xl border-2 transition-all hover:scale-[1.02] ${
                t.highlight
                  ? "bg-hero-gradient text-white border-[var(--gold)] shadow-gold"
                  : "bg-card border-border hover:border-[var(--gold)]/50 shadow-elegant"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-[var(--gold-foreground)] text-xs font-bold uppercase tracking-wider">
                  {t.badge}
                </div>
              )}
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-6 ${t.highlight ? "bg-[var(--gold)]" : "bg-gold-gradient"}`}>
                <t.icon className="h-7 w-7 text-[var(--gold-foreground)]" />
              </div>
              <h3 className={`font-display text-3xl mb-2 ${t.highlight ? "text-white" : "text-primary"}`}>{t.type}</h3>
              {!t.highlight && <div className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold mb-3">{t.badge}</div>}
              <div className={`font-display text-5xl font-bold mb-6 ${t.highlight ? "text-gold-gradient" : "text-primary"}`}>{t.price}</div>

              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${t.highlight ? "text-white/90" : "text-foreground"}`}>
                    <Check className={`h-5 w-5 flex-shrink-0 ${t.highlight ? "text-[var(--gold)]" : "text-[var(--gold)]"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => alert(`Paiement bientôt disponible pour le billet ${t.type}. Contactez-nous au 655 81 63 62.`)}
                className={`w-full py-3 rounded-full font-semibold transition ${
                  t.highlight
                    ? "bg-gold-gradient text-[var(--gold-foreground)] shadow-gold hover:scale-105"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="container-custom max-w-3xl mt-16">
          <div className="bg-secondary/60 rounded-2xl p-8 text-center">
            <p className="text-foreground font-semibold mb-2">💳 Paiement sécurisé bientôt disponible</p>
            <p className="text-muted-foreground text-sm">
              En attendant l'intégration du paiement en ligne, contactez-nous directement par WhatsApp
              au <a className="text-primary font-semibold underline" href="https://wa.me/237655816362">655 81 63 62</a> pour réserver votre billet.
              Un QR code vous sera envoyé après confirmation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
