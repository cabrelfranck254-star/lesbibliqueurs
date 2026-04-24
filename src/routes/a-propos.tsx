import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Sparkles, CheckCircle2 } from "lucide-react";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Les Bibliqueurs" },
      { name: "description", content: "Découvrez le concept des Bibliqueurs : émission chrétienne interactive de jeux bibliques diffusée sur Facebook, YouTube et autres plateformes." },
      { property: "og:title", content: "À propos — Les Bibliqueurs" },
      { property: "og:description", content: "Notre mission, notre vision et le déroulement de l'émission." },
      { property: "og:image", content: "/about.jpg" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-hero-gradient text-white py-24">
        <div className="container-custom text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Notre histoire</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-6">À propos de l'émission</h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            Une émission chrétienne interactive qui célèbre la connaissance de la Bible à travers
            le jeu, la compétition et la communion fraternelle.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">
          <img src={aboutImg} alt="Communauté de jeunes étudiant la Bible" className="rounded-2xl shadow-elegant" width={1600} height={1024} loading="lazy" />
          <div>
            <h2 className="font-display text-4xl text-primary mb-6">Le concept</h2>
            <p className="text-muted-foreground text-lg mb-4">
              Les Bibliqueurs est une émission interactive entièrement basée sur la Bible. Diffusée
              en direct sur <strong>Facebook</strong>, <strong>YouTube</strong> et d'autres
              plateformes, elle réunit chaque session des passionnés de la Parole de Dieu autour de
              défis intellectuels, spirituels et ludiques.
            </p>
            <p className="text-muted-foreground text-lg">
              Notre objectif est simple : <strong className="text-primary">apprendre la Bible en s'amusant</strong>,
              fortifier la foi et créer une véritable communauté de Bibliqueurs à travers le monde.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-custom">
          <h2 className="font-display text-4xl text-primary text-center mb-14">Le déroulement</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Quiz bibliques", d: "Questions tirées de l'Ancien et du Nouveau Testament, en direct devant le public." },
              { n: "02", t: "Sélection des participants", d: "Test d'entrée pour intégrer la communauté officielle des Bibliqueurs." },
              { n: "03", t: "Compétition par niveaux", d: "Qualifications, demi-finales, grande finale et couronnement du champion." },
            ].map((s) => (
              <div key={s.n} className="bg-card p-8 rounded-2xl border border-border hover:border-[var(--gold)]/50 transition">
                <div className="text-gold-gradient font-display text-5xl font-bold mb-3">{s.n}</div>
                <h3 className="font-display text-2xl text-primary mb-2">{s.t}</h3>
                <p className="text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-custom grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-2xl bg-hero-gradient text-white shadow-elegant">
            <Target className="h-10 w-10 text-[var(--gold)] mb-4" />
            <h3 className="font-display text-3xl mb-4">Notre mission</h3>
            <p className="text-white/85">
              Faire connaître la Parole de Dieu à travers une expérience joyeuse, accessible et
              moderne, en mobilisant la jeunesse autour des Écritures.
            </p>
          </div>
          <div className="p-10 rounded-2xl bg-card border border-border">
            <Eye className="h-10 w-10 text-[var(--gold)] mb-4" />
            <h3 className="font-display text-3xl text-primary mb-4">Notre vision</h3>
            <p className="text-muted-foreground">
              Devenir l'émission chrétienne de référence en Afrique francophone et au-delà, où chaque
              chrétien peut grandir dans la connaissance biblique avec passion.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl text-primary text-center mb-10 flex items-center justify-center gap-3">
            <Sparkles className="h-7 w-7 text-[var(--gold)]" /> Pourquoi nous rejoindre
          </h2>
          <ul className="space-y-4">
            {[
              "Approfondir votre connaissance des Écritures de manière ludique",
              "Vivre une expérience télévisée unique en direct",
              "Rencontrer une communauté chrétienne dynamique",
              "Gagner des prix et la reconnaissance des Bibliqueurs",
              "Participer à une œuvre qui glorifie le Seigneur",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border">
                <CheckCircle2 className="h-5 w-5 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <div className="text-center mt-10">
            <Link to="/participer" className="inline-flex px-8 py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] font-semibold shadow-gold hover:scale-105 transition-transform">
              S'inscrire maintenant
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
