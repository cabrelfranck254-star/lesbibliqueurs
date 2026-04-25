import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Sparkles, Phone, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import donsImg from "@/assets/dons.jpg";

export const Route = createFileRoute("/dons")({
  head: () => ({
    meta: [
      { title: "Offrandes — Soutenez Les Bibliqueurs par votre contribution" },
      { name: "description", content: "Soutenez Les Bibliqueurs par une offrande libre. Votre générosité fait grandir l'œuvre et la diffusion de la Parole." },
      { property: "og:title", content: "Offrandes — Les Bibliqueurs" },
      { property: "og:description", content: "Soutenez la mission. Contribuez librement." },
      { property: "og:image", content: "/dons.jpg" },
    ],
  }),
  component: DonsPage,
});

const montantsSuggeres = [1000, 2500, 5000, 10000, 25000];

function DonsPage() {
  const [montant, setMontant] = useState<string>("");

  function handleContribuer() {
    const m = Number(montant);
    if (!montant || isNaN(m) || m <= 0) {
      toast.error("Veuillez saisir un montant valide.", {
        description: "Entrez le montant que vous souhaitez contribuer en FCFA.",
      });
      return;
    }
      toast.success("Votre offrande a été prise en compte.", {
        description: `Merci ! Effectuez votre versement de ${m.toLocaleString()} FCFA au 655 81 63 62 (Nghokeng David) pour finaliser.`,
      duration: 9000,
    });
    window.open(
      `https://wa.me/237655816362?text=${encodeURIComponent(`Bonjour, je souhaite contribuer à la collecte des Bibliqueurs pour un montant de ${m.toLocaleString()} FCFA.`)}`,
      "_blank"
    );
  }

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <img src={donsImg} alt="Mains tenant une lumière au-dessus d'une Bible" className="absolute inset-0 w-full h-full object-cover" width={1600} height={1024} />
        <div className="absolute inset-0 bg-[var(--gradient-overlay)]" />
        <div className="container-custom relative z-10 text-center text-white">
          <Heart className="h-14 w-14 text-[var(--gold)] mx-auto mb-4" fill="currentColor" />
          <h1 className="font-display text-5xl md:text-6xl mb-4">Offrandes</h1>
          <p className="font-display italic text-2xl text-[var(--gold-soft)] mb-2">« Que chacun donne comme il l'a résolu en son cœur »</p>
          <p className="text-sm text-white/70">— 2 Corinthiens 9:7</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl text-primary mb-4">Soutenez la mission</h2>
            <p className="text-muted-foreground text-lg">
              Votre contribution nous permet de continuer à produire l'émission, équiper les Bibliqueurs,
              soutenir les familles dans le besoin et propager la Parole de Dieu sur toutes les
              plateformes. Chaque contribution, petite ou grande, compte.
            </p>
          </div>

          <div className="bg-card p-8 md:p-10 rounded-3xl border-2 border-[var(--gold)]/40 shadow-elegant">
            <h3 className="font-display text-2xl text-primary mb-2 text-center">Choisissez librement votre montant</h3>
            <p className="text-center text-muted-foreground text-sm mb-6">Saisissez le montant que vous souhaitez contribuer (FCFA)</p>

            {/* Suggestions rapides */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-6">
              {montantsSuggeres.map((m) => (
                <button
                  key={m}
                  onClick={() => setMontant(String(m))}
                  className={`px-3 py-3 rounded-xl border-2 text-sm font-semibold transition ${
                    montant === String(m)
                      ? "border-[var(--gold)] bg-[var(--gold)]/10 text-primary"
                      : "border-border hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
                  }`}
                >
                  {m.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Champ libre */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">Montant libre (FCFA)</label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="numeric"
                  min={100}
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  placeholder="Ex. 5000"
                  className="w-full px-4 py-4 rounded-xl border-2 border-input bg-background text-lg font-semibold focus:outline-none focus:border-[var(--gold)]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">FCFA</span>
              </div>
            </div>

            {/* Mention paiement */}
            <div className="bg-[var(--gold)]/10 border-2 border-[var(--gold)]/40 rounded-xl p-4 mb-6 text-sm">
              <p className="font-semibold text-foreground flex items-center gap-2 mb-1">
                <Phone className="h-4 w-4 text-[var(--gold)]" />
                Les contributions se font via le numéro : <a href="tel:655816362" className="text-[var(--gold)] underline">655 81 63 62</a>
              </p>
              <p className="text-foreground"><strong>Nom :</strong> Nghokeng David — Mobile Money / Orange Money</p>
              <p className="text-muted-foreground mt-1 flex items-start gap-1">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                Effectuez le versement, puis confirmez par WhatsApp pour le suivi.
              </p>
            </div>

            <button
              onClick={handleContribuer}
              className="w-full py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] text-base font-bold shadow-gold hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2"
            >
              <Heart className="h-5 w-5" /> Contribuer
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
