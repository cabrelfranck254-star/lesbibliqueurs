import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, XCircle, BookOpen, ArrowRight, Phone, AlertCircle, CreditCard } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/participer")({
  head: () => ({
    meta: [
      { title: "Devenir Bibliqueur — Inscription & Test de sélection" },
      { name: "description", content: "Inscrivez-vous pour devenir un Bibliqueur. Passez le test de sélection biblique et rejoignez la communauté." },
      { property: "og:title", content: "Devenir Bibliqueur" },
      { property: "og:description", content: "Test de sélection et inscription officielle." },
    ],
  }),
  component: ParticiperPage,
});

const quiz = [
  { q: "Combien de livres compose la Bible ?", options: ["66", "73", "50", "100"], answer: 0 },
  { q: "Qui a construit l'arche selon la Genèse ?", options: ["Moïse", "Noé", "Abraham", "David"], answer: 1 },
  { q: "Combien de disciples Jésus a-t-il choisis ?", options: ["7", "10", "12", "24"], answer: 2 },
  { q: "Quel est le premier livre du Nouveau Testament ?", options: ["Genèse", "Matthieu", "Actes", "Jean"], answer: 1 },
  { q: "Qui a vaincu Goliath ?", options: ["Saül", "Samson", "David", "Salomon"], answer: 2 },
];

const formSchema = z.object({
  nom: z.string().trim().min(2, "Nom trop court").max(80),
  whatsapp: z.string().trim().min(8, "Numéro invalide").max(20),
  email: z.string().trim().email("Email invalide").max(150),
});

function ParticiperPage() {
  const [step, setStep] = useState<"intro" | "quiz" | "form" | "done">("intro");
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({ nom: "", whatsapp: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const score = answers.reduce((a, ans, i) => a + (ans === quiz[i].answer ? 1 : 0), 0);
  const passed = score >= 3;

  function handleAnswer(idx: number) {
    const next = [...answers, idx];
    setAnswers(next);
    if (current + 1 < quiz.length) setCurrent(current + 1);
    else setStep("form");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep("done");
    toast.success("Votre inscription a été prise en compte.", {
      description: "Veuillez finaliser le paiement au 655 81 63 62 (Nghokeng David) pour valider votre place.",
      duration: 8000,
    });
  }

  return (
    <>
      <section className="bg-hero-gradient text-white py-20">
        <div className="container-custom text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Participation</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4">Devenez un Bibliqueur</h1>
          <p className="text-white/85 max-w-xl mx-auto text-lg">Test de sélection rapide, puis formulaire d'inscription officielle.</p>
        </div>
      </section>

      {/* Encadré frais d'inscription */}
      <section className="py-10 bg-[var(--gold)]/10 border-b-2 border-[var(--gold)]/30">
        <div className="container-custom max-w-3xl">
          <div className="bg-card rounded-2xl p-6 md:p-8 border-2 border-[var(--gold)] shadow-gold">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold">
                <CreditCard className="h-6 w-6 text-[var(--gold-foreground)]" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl text-primary font-bold">Frais d'inscription pour devenir bibliqueur</h2>
                <p className="text-3xl font-display text-[var(--gold)] font-bold mt-1">15 000 FCFA</p>
              </div>
            </div>
            <div className="bg-secondary/60 rounded-xl p-4 mb-4 text-sm">
              <p className="font-semibold text-foreground flex items-center gap-2 mb-1">
                <Phone className="h-4 w-4 text-[var(--gold)]" />
                Le paiement se fait via le numéro : <a href="tel:655816362" className="text-[var(--gold)] underline">655 81 63 62</a>
              </p>
              <p className="text-foreground"><strong>Nom :</strong> Nghokeng David — Mobile Money / Orange Money</p>
              <p className="text-muted-foreground mt-2 flex items-start gap-1">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                Veuillez effectuer le paiement avant validation de votre inscription.
              </p>
            </div>
            <button
              onClick={() => {
                toast.info("Paiement par Mobile Money", {
                  description: "Composez le transfert vers 655 81 63 62 (Nghokeng David), puis envoyez-nous la preuve sur WhatsApp.",
                  duration: 9000,
                });
                window.open("https://wa.me/237655816362?text=Bonjour%2C%20je%20souhaite%20payer%20mes%20frais%20d%27inscription%20pour%20devenir%20Bibliqueur.", "_blank");
              }}
              className="w-full py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] text-base font-bold shadow-gold hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2"
            >
              <CreditCard className="h-5 w-5" /> Payer maintenant
            </button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-2xl">
          {step === "intro" && (
            <div className="bg-card p-10 rounded-2xl border border-border shadow-elegant text-center">
              <BookOpen className="h-14 w-14 text-[var(--gold)] mx-auto mb-6" />
              <h2 className="font-display text-3xl text-primary mb-4">Test de sélection</h2>
              <p className="text-muted-foreground mb-8">
                5 questions bibliques rapides. Obtenez au moins 3 bonnes réponses pour valider votre candidature.
              </p>
              <button onClick={() => setStep("quiz")} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] font-semibold shadow-gold hover:scale-105 transition-transform">
                Commencer le test <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === "quiz" && (
            <div className="bg-card p-10 rounded-2xl border border-border shadow-elegant">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {current + 1} / {quiz.length}</span>
                <span>{Math.round(((current) / quiz.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-gold-gradient transition-all" style={{ width: `${(current / quiz.length) * 100}%` }} />
              </div>
              <h3 className="font-display text-2xl text-primary mb-6">{quiz[current].q}</h3>
              <div className="grid gap-3">
                {quiz[current].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="text-left px-5 py-4 rounded-xl border border-border hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 transition font-medium">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="bg-card p-10 rounded-2xl border border-border shadow-elegant">
              <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${passed ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>
                {passed ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                <div>
                  <div className="font-semibold">Score : {score}/{quiz.length}</div>
                  <div className="text-sm">{passed ? "Bravo ! Vous êtes éligible." : "Vous pouvez quand même vous inscrire — nous vous accompagnerons."}</div>
                </div>
              </div>

              <h2 className="font-display text-3xl text-primary mb-6">Formulaire d'inscription</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Nom complet</label>
                  <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} maxLength={80} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)]" />
                  {errors.nom && <p className="text-destructive text-sm mt-1">{errors.nom}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Téléphone (WhatsApp)</label>
                  <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} maxLength={20} placeholder="+237 6XX XX XX XX" className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)]" />
                  {errors.whatsapp && <p className="text-destructive text-sm mt-1">{errors.whatsapp}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={150} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)]" />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="bg-[var(--gold)]/10 border-2 border-[var(--gold)]/40 p-4 rounded-xl text-sm">
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-[var(--gold)]" />
                    Frais d'inscription : <span className="text-[var(--gold)] font-bold">15 000 FCFA</span>
                  </p>
                  <p className="text-foreground mt-1">
                    Paiement via Mobile Money au <strong>655 81 63 62</strong> (Nghokeng David).
                  </p>
                  <p className="text-muted-foreground mt-1">
                    ⚠️ Veuillez effectuer le paiement avant validation de votre inscription.
                  </p>
                </div>
                <button type="submit" className="w-full px-8 py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] text-base font-bold shadow-gold hover:scale-[1.02] transition-transform">
                  Valider mon inscription
                </button>
              </form>
            </div>
          )}

          {step === "done" && (
            <div className="bg-card p-12 rounded-2xl border border-border shadow-elegant text-center">
              <div className="h-20 w-20 rounded-full bg-gold-gradient mx-auto mb-6 flex items-center justify-center shadow-gold">
                <CheckCircle2 className="h-10 w-10 text-[var(--gold-foreground)]" />
              </div>
              <h2 className="font-display text-4xl text-primary mb-4">Inscription reçue !</h2>
              <p className="text-muted-foreground mb-2">Bienvenue dans la communauté des Bibliqueurs, <strong>{form.nom}</strong>.</p>
              <p className="text-muted-foreground mb-8">Nous vous contacterons sur WhatsApp pour la suite du processus.</p>
              <a href="https://wa.me/237655816362" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
                Nous contacter sur WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
