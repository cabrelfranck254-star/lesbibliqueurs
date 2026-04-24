import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Calendar, MapPin } from "lucide-react";
import competitionsImg from "@/assets/competitions.jpg";

export const Route = createFileRoute("/competitions")({
  head: () => ({
    meta: [
      { title: "Compétitions — Historique & Champions | Les Bibliqueurs" },
      { name: "description", content: "Revivez la première édition de la compétition Les Bibliqueurs en vidéo intégrale." },
      { property: "og:title", content: "Historique des compétitions — Les Bibliqueurs" },
      { property: "og:description", content: "Première édition disponible en vidéo intégrale." },
      { property: "og:image", content: "/competitions.jpg" },
    ],
  }),
  component: CompetitionsPage,
});

function CompetitionsPage() {
  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <img src={competitionsImg} alt="Trophée doré" className="absolute inset-0 w-full h-full object-cover" width={1600} height={1024} />
        <div className="absolute inset-0 bg-[var(--gradient-overlay)]" />
        <div className="container-custom relative z-10 text-center text-white">
          <Trophy className="h-14 w-14 text-[var(--gold)] mx-auto mb-4" />
          <h1 className="font-display text-5xl md:text-6xl mb-4">Historique des compétitions</h1>
          <p className="text-white/85 max-w-xl mx-auto text-lg">
            Revivez les moments forts qui ont marqué l'histoire des Bibliqueurs.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Édition inaugurale</span>
            <h2 className="font-display text-4xl md:text-5xl text-primary mt-3 mb-4">Première édition</h2>
            <p className="text-muted-foreground text-lg">
              Découvrez l'intégralité de la toute première compétition des Bibliqueurs, un moment historique
              de partage, de défi et de célébration de la Parole.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant border border-border bg-card">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/RuIRwe65Ihw"
                  title="Première édition — Les Bibliqueurs"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center mt-6">
              <a
                href="https://youtu.be/RuIRwe65Ihw"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[var(--gold)] hover:underline font-semibold"
              >
                Ouvrir sur YouTube ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-custom text-center">
          <Calendar className="h-12 w-12 text-[var(--gold)] mx-auto mb-4" />
          <h2 className="font-display text-4xl text-primary mb-3">Prochaine édition</h2>
          <p className="text-2xl text-muted-foreground mb-2">Dimanche 24 mai 2026 · 16h – 18h</p>
          <p className="text-muted-foreground inline-flex items-center gap-2 justify-center">
            <MapPin className="h-4 w-4 text-[var(--gold)]" />
            Salle de fête BC de Deido, en face de la Boulangerie Saker, Douala
          </p>
        </div>
      </section>
    </>
  );
}
