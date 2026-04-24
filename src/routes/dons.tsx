import { createFileRoute } from "@tanstack/react-router";
import { Heart, Sparkles } from "lucide-react";
import donsImg from "@/assets/dons.jpg";

export const Route = createFileRoute("/dons")({
  head: () => ({
    meta: [
      { title: "Faire un don — Œuvres caritatives | Les Bibliqueurs" },
      { name: "description", content: "Soutenez Les Bibliqueurs par un don volontaire. Votre générosité fait grandir l'œuvre et la diffusion de la Parole." },
      { property: "og:title", content: "Faire un don — Les Bibliqueurs" },
      { property: "og:description", content: "Soutenez la mission. Donnez avec joie." },
      { property: "og:image", content: "/dons.jpg" },
    ],
  }),
  component: DonsPage,
});

const montants = [1000, 2500, 5000, 10000, 25000];

function DonsPage() {
  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <img src={donsImg} alt="Mains tenant une lumière au-dessus d'une Bible" className="absolute inset-0 w-full h-full object-cover" width={1600} height={1024} />
        <div className="absolute inset-0 bg-[var(--gradient-overlay)]" />
        <div className="container-custom relative z-10 text-center text-white">
          <Heart className="h-14 w-14 text-[var(--gold)] mx-auto mb-4" fill="currentColor" />
          <h1 className="font-display text-5xl md:text-6xl mb-4">Œuvres caritatives</h1>
          <p className="font-display italic text-2xl text-[var(--gold-soft)] mb-2">« Que chacun donne comme il l'a résolu en son cœur »</p>
          <p className="text-sm text-white/70">— 2 Corinthiens 9:7</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-primary mb-4">Soutenez la mission</h2>
            <p className="text-muted-foreground text-lg">
              Votre don nous permet de continuer à produire l'émission, équiper les Bibliqueurs,
              soutenir les familles dans le besoin et propager la Parole de Dieu sur toutes les
              plateformes. Chaque contribution, petite ou grande, compte.
            </p>
          </div>

          <div className="bg-card p-10 rounded-3xl border border-border shadow-elegant">
            <h3 className="font-display text-2xl text-primary mb-6 text-center">Choisissez votre montant (FCFA)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {montants.map((m) => (
                <button
                  key={m}
                  onClick={() => alert(`Merci ! Pour faire votre don de ${m.toLocaleString()} FCFA, contactez-nous au 655 81 63 62.`)}
                  className="px-4 py-4 rounded-xl border-2 border-border hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 transition font-semibold"
                >
                  {m.toLocaleString()}
                </button>
              ))}
            </div>
            <button
              onClick={() => alert("Pour un don personnalisé, contactez-nous au 655 81 63 62 ou par WhatsApp.")}
              className="w-full py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] font-semibold shadow-gold hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2"
            >
              <Heart className="h-5 w-5" /> Faire un don
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {[
              { t: "Production", d: "Matériel audio/vidéo et diffusion en direct." },
              { t: "Communauté", d: "Soutien aux Bibliqueurs et aux familles." },
              { t: "Évangélisation", d: "Étendre la portée de l'émission partout." },
            ].map((item) => (
              <div key={item.t} className="p-6 rounded-2xl bg-secondary/40 text-center">
                <Sparkles className="h-6 w-6 text-[var(--gold)] mx-auto mb-2" />
                <div className="font-display text-xl text-primary mb-1">{item.t}</div>
                <div className="text-sm text-muted-foreground">{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
