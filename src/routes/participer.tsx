import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { z } from "zod";
import { CheckCircle2, XCircle, BookOpen, ArrowRight, Phone, AlertCircle, CreditCard, Upload, MessageCircle, Image as ImageIcon, X } from "lucide-react";
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
  ville: z.string().trim().min(2, "Ville requise").max(80),
});

type Step = "intro" | "quiz" | "form" | "payment" | "done";

function ParticiperPage() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({ nom: "", whatsapp: "", email: "", ville: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const score = answers.reduce((a, ans, i) => a + (ans === quiz[i].answer ? 1 : 0), 0);
  const passed = score >= 3;

  function handleAnswer(idx: number) {
    const next = [...answers, idx];
    setAnswers(next);
    if (current + 1 < quiz.length) setCurrent(current + 1);
    else setStep("form");
  }

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep("payment");
    toast.success("Formulaire enregistré.", {
      description: "Procédez au paiement et joignez votre capture d'écran.",
      duration: 6000,
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Fichier trop volumineux (max 5 Mo).");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image (JPG, PNG).");
      return;
    }
    setProofFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setProofPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function removeProof() {
    setProofFile(null);
    setProofPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function buildWhatsAppMessage() {
    return encodeURIComponent(
`🎓 *NOUVELLE INSCRIPTION BIBLIQUEUR*

👤 *Nom complet :* ${form.nom}
📱 *WhatsApp :* ${form.whatsapp}
📧 *Email :* ${form.email}
🏙️ *Ville :* ${form.ville}

📊 *Score au test :* ${score}/${quiz.length} ${passed ? "✅" : "⚠️"}

💳 *Paiement effectué :* 15 000 FCFA
📞 Vers : 655 81 63 62 (Nghokeng David)

📎 Je joins ci-dessous la capture d'écran de la preuve de paiement.

Merci de valider mon inscription.`
    );
  }

  function handleSendWhatsApp() {
    if (!proofFile) {
      toast.error("Veuillez d'abord joindre votre capture d'écran de paiement.");
      return;
    }
    // Téléchargement local de la preuve pour faciliter l'envoi sur WhatsApp
    const url = URL.createObjectURL(proofFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `preuve-paiement-${form.nom.replace(/\s+/g, "-")}.${proofFile.name.split(".").pop()}`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Capture téléchargée !", {
      description: "Joignez-la dans la conversation WhatsApp qui vient de s'ouvrir.",
      duration: 8000,
    });

    window.open(`https://wa.me/237655816362?text=${buildWhatsAppMessage()}`, "_blank");
    setStep("done");
  }

  return (
    <>
      <section className="bg-hero-gradient text-white py-20">
        <div className="container-custom text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Participation</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4">Devenez un Bibliqueur</h1>
          <p className="text-white/85 max-w-xl mx-auto text-lg">
            Suivez les 3 étapes : test de sélection, formulaire d'inscription, puis paiement.
          </p>

          <div className="flex items-center justify-center gap-2 md:gap-4 mt-8 text-xs md:text-sm">
            {[
              { key: "quiz", label: "1. Test", active: step === "intro" || step === "quiz" },
              { key: "form", label: "2. Formulaire", active: step === "form" },
              { key: "payment", label: "3. Paiement", active: step === "payment" || step === "done" },
            ].map((s) => (
              <div
                key={s.key}
                className={`px-3 py-1.5 rounded-full border transition ${
                  s.active
                    ? "bg-[var(--gold)] text-[var(--gold-foreground)] border-[var(--gold)] font-semibold"
                    : "border-white/30 text-white/70"
                }`}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-2xl">
          {step === "intro" && (
            <div className="bg-card p-10 rounded-2xl border border-border shadow-elegant text-center">
              <BookOpen className="h-14 w-14 text-[var(--gold)] mx-auto mb-6" />
              <h2 className="font-display text-3xl text-primary mb-4">Étape 1 — Test de sélection</h2>
              <p className="text-muted-foreground mb-2">
                5 questions bibliques rapides. Obtenez au moins 3 bonnes réponses pour valider votre candidature.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Après le test, vous remplirez un formulaire d'inscription, puis vous procéderez au paiement.
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
                <span>{Math.round((current / quiz.length) * 100)}%</span>
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

              <h2 className="font-display text-3xl text-primary mb-2">Étape 2 — Formulaire d'inscription</h2>
              <p className="text-muted-foreground text-sm mb-6">Remplissez vos coordonnées. Le paiement viendra à l'étape suivante.</p>
              <form onSubmit={handleSubmitForm} className="space-y-5">
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
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Ville</label>
                  <input value={form.ville} onChange={(e) => setForm({ ...form, ville: e.target.value })} maxLength={80} placeholder="Douala" className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)]" />
                  {errors.ville && <p className="text-destructive text-sm mt-1">{errors.ville}</p>}
                </div>
                <button type="submit" className="w-full px-8 py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] text-base font-bold shadow-gold hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2">
                  Continuer vers le paiement <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-card p-8 md:p-10 rounded-2xl border-2 border-[var(--gold)] shadow-gold">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold">
                  <CreditCard className="h-6 w-6 text-[var(--gold-foreground)]" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl md:text-3xl text-primary font-bold">Étape 3 — Paiement des frais d'inscription</h2>
                  <p className="text-3xl font-display text-[var(--gold)] font-bold mt-1">15 000 FCFA</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-700 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                  <strong>Inscription enregistrée pour {form.nom}.</strong> Il ne reste plus qu'à payer pour valider votre place.
                </div>
              </div>

              <div className="bg-secondary/60 rounded-xl p-4 mb-5 text-sm">
                <p className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-[var(--gold)]" />
                  Numéro de paiement : <a href="tel:655816362" className="text-[var(--gold)] underline">655 81 63 62</a>
                </p>
                <p className="text-foreground"><strong>Bénéficiaire :</strong> Nghokeng David</p>
                <p className="text-foreground"><strong>Moyen :</strong> Mobile Money / Orange Money</p>
                <p className="text-foreground mt-2"><strong>Montant :</strong> 15 000 FCFA</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm">
                <p className="text-amber-900 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Étapes :</strong> 1) Effectuez le transfert. 2) Faites une capture d'écran de la confirmation. 3) Importez-la ci-dessous. 4) Cliquez sur le bouton WhatsApp pour envoyer toutes les infos automatiquement.
                  </span>
                </p>
              </div>

              {/* Upload preuve de paiement */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-[var(--gold)]" />
                  Capture d'écran de la preuve de paiement *
                </label>

                {!proofPreview ? (
                  <label className="block cursor-pointer border-2 border-dashed border-[var(--gold)]/50 rounded-xl p-8 text-center hover:bg-[var(--gold)]/5 transition">
                    <Upload className="h-8 w-8 text-[var(--gold)] mx-auto mb-2" />
                    <p className="text-sm font-semibold text-foreground">Cliquez pour importer</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG · max 5 Mo</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border-2 border-[var(--gold)]">
                    <img src={proofPreview} alt="Aperçu preuve de paiement" className="w-full max-h-64 object-contain bg-secondary/30" />
                    <button
                      onClick={removeProof}
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg hover:scale-110 transition"
                      aria-label="Retirer la capture"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="px-3 py-2 bg-green-50 border-t border-green-200 text-xs text-green-800 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Capture prête à être envoyée : {proofFile?.name}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleSendWhatsApp}
                disabled={!proofFile}
                className="w-full py-4 rounded-full bg-[#25D366] text-white text-base font-bold shadow-elegant hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <MessageCircle className="h-5 w-5" /> Envoyer sur WhatsApp pour finaliser
              </button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                ℹ️ La capture sera téléchargée sur votre appareil. Joignez-la à la conversation WhatsApp qui s'ouvre.
              </p>

              <button
                onClick={() => setStep("form")}
                className="w-full mt-3 py-3 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-[var(--gold)] transition"
              >
                ← Revenir au formulaire
              </button>
            </div>
          )}

          {step === "done" && (
            <div className="bg-card p-12 rounded-2xl border border-border shadow-elegant text-center">
              <div className="h-20 w-20 rounded-full bg-gold-gradient mx-auto mb-6 flex items-center justify-center shadow-gold">
                <CheckCircle2 className="h-10 w-10 text-[var(--gold-foreground)]" />
              </div>
              <h2 className="font-display text-4xl text-primary mb-4">Inscription envoyée !</h2>
              <p className="text-muted-foreground mb-2">
                Bienvenue dans la communauté des Bibliqueurs, <strong>{form.nom}</strong>.
              </p>
              <p className="text-muted-foreground mb-8">
                N'oubliez pas de <strong>joindre la capture téléchargée</strong> dans WhatsApp pour finaliser la validation de votre paiement.
              </p>
              <a href="https://wa.me/237655816362" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">
                <MessageCircle className="h-4 w-4" /> Rouvrir WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
