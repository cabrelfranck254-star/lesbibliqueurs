import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Calendar, Users, PlayCircle } from "lucide-react";
import competitionsImg from "@/assets/competitions.jpg";

export const Route = createFileRoute("/competitions")({
  head: () => ({
    meta: [
      { title: "Compétitions — Historique & Champions | Les Bibliqueurs" },
      { name: "description", content: "Découvrez l'historique des compétitions Les Bibliqueurs : champions, scores, vidéos et galerie photos." },
      { property: "og:title", content: "Historique des compétitions" },
      { property: "og:description", content: "Saisons, champions et moments forts." },
      { property: "og:image", content: "/competitions.jpg" },
    ],
  }),
  component: CompetitionsPage,
});

const editions = [
  { saison: "Saison 3", date: "Décembre 2025", champion: "Marie Ngassa", participants: 48, video: "https://youtube.com" },
  { saison: "Saison 2", date: "Juin 2025", champion: "Pasteur Junior", participants: 36, video: "https://youtube.com" },
  { saison: "Saison 1", date: "Janvier 2025", champion: "David Mbarga", participants: 24, video: "https://youtube.com" },
];

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
            Les champions, les scores et les moments inoubliables qui ont marqué l'histoire des Bibliqueurs.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom">
          <div className="grid gap-8">
            {editions.map((e) => (
              <article key={e.saison} className="grid md:grid-cols-3 gap-6 bg-card p-8 rounded-2xl border border-border hover:border-[var(--gold)]/50 hover:shadow-elegant transition">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold mb-2">{e.date}</div>
                  <h3 className="font-display text-3xl text-primary mb-2">{e.saison}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" /> {e.participants} participants</div>
                </div>
                <div className="md:border-l md:border-r border-border md:px-6 flex items-center">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Champion</div>
                    <div className="font-display text-2xl text-primary flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-[var(--gold)]" /> {e.champion}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <a href={e.video} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition">
                    <PlayCircle className="h-5 w-5" /> Revoir la finale
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-custom">
          <h2 className="font-display text-4xl text-primary text-center mb-3">Galerie</h2>
          <p className="text-center text-muted-foreground mb-12">Quelques moments forts capturés en images</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-2xl bg-hero-gradient relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center text-[var(--gold)] opacity-30 group-hover:opacity-60 transition">
                  <Trophy className="h-16 w-16" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[var(--navy-deep)]/80 to-transparent">
                  <div className="text-white text-xs">Photo #{i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom text-center">
          <Calendar className="h-12 w-12 text-[var(--gold)] mx-auto mb-4" />
          <h2 className="font-display text-4xl text-primary mb-3">Prochaine édition</h2>
          <p className="text-2xl text-muted-foreground mb-2">Dimanche 24 mai 2026 · 16h – 18h</p>
          <p className="text-muted-foreground">Salle de fête BC de Deido, en face de la Boulangerie Saker, Douala</p>
        </div>
      </section>
    </>
  );
}
