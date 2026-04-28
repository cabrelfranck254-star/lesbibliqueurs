import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Users, Radio, Calendar, MapPin, Sparkles, BookOpen, Heart } from "lucide-react";
import heroImg from "@/assets/hero-biblique.jpg";
import competitionsImg from "@/assets/competitions.jpg";
import logoBibliqueurs from "@/assets/logo-bibliqueurs.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Les Bibliqueurs — Émission chrétienne interactive de jeux bibliques" },
      { name: "description", content: "Rejoignez Les Bibliqueurs : jeux bibliques en direct, compétitions, quiz et apprentissage spirituel. Diffusion sur Facebook et YouTube. Dimanche 24 mai 2026." },
      { property: "og:title", content: "Les Bibliqueurs — Émission chrétienne interactive" },
      { property: "og:description", content: "Apprendre la Bible en s'amusant. Compétitions, quiz et émission en direct." },
      { property: "og:image", content: "/hero-biblique.jpg" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="Bible ouverte sous des rayons de lumière dorés" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-[var(--gradient-overlay)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)]/90 via-[var(--navy-deep)]/50 to-transparent" />

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-[var(--gold)]/30 mb-4">
              <Sparkles className="h-4 w-4 text-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold-soft)]">Émission Chrétienne Interactive</span>
            </div>

            <h1 className="mb-6">
              <span className="sr-only">Les Bibliqueurs</span>
              <img
                src={logoBibliqueurs}
                alt="Logo Les Bibliqueurs — Bible ouverte avec croix dorée"
                className="w-[280px] md:w-[420px] lg:w-[520px] h-auto drop-shadow-[0_8px_30px_rgba(212,175,55,0.35)]"
                width={520}
                height={340}
              />
            </h1>

            <p className="font-display italic text-2xl md:text-3xl text-[var(--gold-soft)] mb-4">
              « Apprendre la Bible. Vivre la lumière. »
            </p>

            <p className="text-lg text-white/85 max-w-2xl mb-10">
              Une émission inédite de jeux et compétitions bibliques diffusée en direct sur Facebook, YouTube
              et bien plus. Devenez un Bibliqueur, défiez votre connaissance des Écritures et brillez.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link to="/participer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] text-base font-bold shadow-gold hover:scale-105 transition-transform">
                Devenir bibliqueur
              </Link>
              <Link to="/billetterie" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[var(--navy-deep)] text-base font-bold hover:bg-white/90 hover:scale-105 transition shadow-lg">
                Réserver une place maintenant
              </Link>
              <Link to="/competitions" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-semibold hover:text-[var(--gold)] transition">
                Voir les compétitions →
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/85 text-sm">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[var(--gold)]" /> Dim. 24 mai 2026 · 16h–18h</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--gold)]" /> Salle BC de Deido, Douala</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONCEPT */}
      <section className="py-24 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Le concept</span>
            <h2 className="font-display text-4xl md:text-5xl text-primary mt-3 mb-4">Une expérience biblique inédite</h2>
            <p className="text-muted-foreground text-lg">Trois piliers, une mission : célébrer la Parole de Dieu à travers le jeu, la compétition et la communauté.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Jeux bibliques en direct", text: "Quiz, défis et énigmes tirés des Écritures, animés en direct devant un public." },
              { icon: Trophy, title: "Compétitions par niveaux", text: "Sélection, qualifications, finales : montez les échelons et devenez champion biblique." },
              { icon: Users, title: "Communauté Bibliqueurs", text: "Rejoignez des centaines de passionnés de la Bible à travers le Cameroun et au-delà." },
            ].map((item) => (
              <div key={item.title} className="group relative p-8 rounded-2xl bg-card border border-border hover:border-[var(--gold)]/50 hover:shadow-elegant transition-all">
                <div className="h-14 w-14 rounded-xl bg-gold-gradient flex items-center justify-center mb-6 shadow-gold">
                  <item.icon className="h-7 w-7 text-[var(--gold-foreground)]" />
                </div>
                <h3 className="font-display text-2xl text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-hero-gradient text-white">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "500+", l: "Bibliqueurs inscrits" },
            { n: "12", l: "Compétitions organisées" },
            { n: "+800", l: "Vues en direct" },
            { n: "3", l: "Plateformes de diffusion" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-5xl md:text-6xl text-gold-gradient font-bold">{s.n}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-white/75">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPETITIONS PREVIEW */}
      <section className="py-24 bg-background">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <img src={competitionsImg} alt="Trophée doré et couronne de laurier sur une Bible ouverte" className="rounded-2xl shadow-elegant" width={1600} height={1024} loading="lazy" />
            <div className="absolute -bottom-6 -right-6 bg-gold-gradient rounded-2xl p-6 shadow-gold hidden md:block">
              <Trophy className="h-10 w-10 text-[var(--gold-foreground)]" />
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Compétitions</span>
            <h2 className="font-display text-4xl md:text-5xl text-primary mt-3 mb-6">La gloire d'être un champion biblique</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Chaque saison, les Bibliqueurs s'affrontent à travers plusieurs niveaux de quiz, énigmes et
              défis spirituels. Les finalistes reçoivent trophées, prix et la reconnaissance d'une
              communauté entière.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/competitions" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
                Voir l'historique
              </Link>
              <Link to="/a-propos" className="px-6 py-3 rounded-full border border-primary/30 text-primary font-semibold hover:bg-primary/5 transition">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-20">
        <div className="container-custom">
          <div className="rounded-3xl bg-hero-gradient p-10 md:p-16 text-center text-white shadow-elegant relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at top, oklch(0.78 0.14 85 / 0.4), transparent 70%)" }} />
            <div className="relative">
              <Radio className="h-12 w-12 text-[var(--gold)] mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl mb-4">Prêt à devenir un Bibliqueur ?</h2>
              <p className="text-white/85 max-w-xl mx-auto mb-8 text-lg">
                Rejoignez l'aventure. Inscrivez-vous, passez le test de sélection et entrez dans la
                lumière de la compétition.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/billetterie" className="px-8 py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] font-bold shadow-gold hover:scale-105 transition-transform">
                  Réserver une place maintenant
                </Link>
                <Link to="/participer" className="px-8 py-4 rounded-full bg-white text-[var(--navy-deep)] font-bold hover:scale-105 transition shadow-lg">
                  Devenir bibliqueur
                </Link>
                <Link to="/dons" className="px-8 py-4 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white font-semibold hover:bg-white/20 transition inline-flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Soutenir l'œuvre
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
