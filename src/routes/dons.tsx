import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Heart, Sparkles, Phone, AlertCircle, Upload, MessageCircle, Image as ImageIcon, X, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
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

const donorSchema = z.object({
  nom: z.string().trim().min(2, "Nom requis").max(80),
  whatsapp: z.string().trim().min(8, "Numéro invalide").max(20),
  ville: z.string().trim().min(2, "Ville requise").max(80),
});

type Step = "amount" | "form" | "payment";

function DonsPage() {
  const [step, setStep] = useState<Step>("amount");
  const [montant, setMontant] = useState<string>("");
  const [donor, setDonor] = useState({ nom: "", whatsapp: "", ville: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const m = Number(montant);

  function handleNextFromAmount() {
    if (!montant || isNaN(m) || m <= 0) {
      toast.error("Veuillez saisir un montant valide.");
      return;
    }
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmitDonor(e: React.FormEvent) {
    e.preventDefault();
    const result = donorSchema.safeParse(donor);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Coordonnées enregistrées.", {
      description: `Effectuez votre offrande de ${m.toLocaleString()} FCFA et joignez la capture.`,
      duration: 7000,
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
      toast.error("Veuillez sélectionner une image.");
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
`💝 *NOUVELLE OFFRANDE — LES BIBLIQUEURS*

👤 *Nom du contributeur :* ${donor.nom}
📱 *WhatsApp :* ${donor.whatsapp}
🏙️ *Ville :* ${donor.ville}

💰 *Montant :* ${m.toLocaleString()} FCFA
📞 Versé au : 655 81 63 62 (Nghokeng David)

📎 Je joins ci-dessous la capture d'écran de la preuve de versement.

Que Dieu vous bénisse 🙏`
    );
  }

  function handleSendWhatsApp() {
    if (!proofFile) {
      toast.error("Veuillez d'abord joindre la capture d'écran de votre versement.");
      return;
    }
    const url = URL.createObjectURL(proofFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `offrande-${donor.nom.replace(/\s+/g, "-")}.${proofFile.name.split(".").pop()}`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Capture téléchargée !", {
      description: "Joignez-la dans la conversation WhatsApp qui s'ouvre.",
      duration: 8000,
    });

    window.open(`https://wa.me/237655816362?text=${buildWhatsAppMessage()}`, "_blank");
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

          {/* Stepper */}
          <div className="mt-8 flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm">
            {[
              { id: "amount", label: "1. Montant" },
              { id: "form", label: "2. Coordonnées" },
              { id: "payment", label: "3. Paiement" },
            ].map((s, i) => {
              const order = ["amount", "form", "payment"];
              const active = order.indexOf(step) >= i;
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <div className={`px-3 py-1.5 rounded-full font-semibold transition ${active ? "bg-gold-gradient text-[var(--gold-foreground)]" : "bg-white/10 text-white/60"}`}>
                    {s.label}
                  </div>
                  {i < 2 && <div className={`h-0.5 w-4 md:w-8 ${active ? "bg-[var(--gold)]" : "bg-white/20"}`} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-2xl">

          {/* STEP 1 : Montant */}
          {step === "amount" && (
            <>
              <div className="text-center mb-10">
                <h2 className="font-display text-4xl text-primary mb-4">Soutenez la mission</h2>
                <p className="text-muted-foreground text-lg">
                  Votre contribution nous permet de produire l'émission, équiper les Bibliqueurs et propager la Parole. Chaque don, petit ou grand, compte.
                </p>
              </div>

              <div className="bg-card p-8 md:p-10 rounded-3xl border-2 border-[var(--gold)]/40 shadow-elegant">
                <h3 className="font-display text-2xl text-primary mb-2 text-center">Choisissez librement votre montant</h3>
                <p className="text-center text-muted-foreground text-sm mb-6">Saisissez le montant que vous souhaitez offrir (FCFA)</p>

                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-6">
                  {montantsSuggeres.map((mt) => (
                    <button
                      key={mt}
                      onClick={() => setMontant(String(mt))}
                      className={`px-3 py-3 rounded-xl border-2 text-sm font-semibold transition ${
                        montant === String(mt)
                          ? "border-[var(--gold)] bg-[var(--gold)]/10 text-primary"
                          : "border-border hover:border-[var(--gold)] hover:bg-[var(--gold)]/5"
                      }`}
                    >
                      {mt.toLocaleString()}
                    </button>
                  ))}
                </div>

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

                <button
                  onClick={handleNextFromAmount}
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
            </>
          )}

          {/* STEP 2 : Coordonnées */}
          {step === "form" && (
            <div className="bg-card p-8 md:p-10 rounded-3xl border-2 border-border shadow-elegant">
              <button onClick={() => setStep("amount")} className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
                <ArrowLeft className="h-4 w-4" /> Modifier le montant
              </button>

              <div className="bg-secondary/60 rounded-xl p-4 mb-6 flex items-center justify-between">
                <span className="text-foreground font-semibold">Votre offrande :</span>
                <span className="font-display text-2xl text-[var(--gold)] font-bold">{m.toLocaleString()} FCFA</span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl text-primary mb-2">Vos coordonnées</h2>
              <p className="text-muted-foreground text-sm mb-6">Pour pouvoir vous remercier et confirmer la réception de votre offrande.</p>

              <form onSubmit={handleSubmitDonor} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Nom complet</label>
                  <input value={donor.nom} onChange={(e) => setDonor({ ...donor, nom: e.target.value })} maxLength={80} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)]" />
                  {errors.nom && <p className="text-destructive text-sm mt-1">{errors.nom}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Téléphone WhatsApp</label>
                  <input value={donor.whatsapp} onChange={(e) => setDonor({ ...donor, whatsapp: e.target.value })} maxLength={20} placeholder="+237 6XX XX XX XX" className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)]" />
                  {errors.whatsapp && <p className="text-destructive text-sm mt-1">{errors.whatsapp}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Ville</label>
                  <input value={donor.ville} onChange={(e) => setDonor({ ...donor, ville: e.target.value })} maxLength={80} placeholder="Douala" className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:border-[var(--gold)]" />
                  {errors.ville && <p className="text-destructive text-sm mt-1">{errors.ville}</p>}
                </div>
                <button type="submit" className="w-full py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] text-base font-bold shadow-gold hover:scale-[1.02] transition-transform">
                  Continuer vers le paiement →
                </button>
              </form>
            </div>
          )}

          {/* STEP 3 : Paiement */}
          {step === "payment" && (
            <div className="bg-card p-8 md:p-10 rounded-3xl border-2 border-[var(--gold)] shadow-gold">
              <div className="text-center mb-6">
                <div className="inline-flex h-16 w-16 rounded-full bg-gold-gradient items-center justify-center mb-3 shadow-gold">
                  <Heart className="h-8 w-8 text-[var(--gold-foreground)]" fill="currentColor" />
                </div>
                <h2 className="font-display text-3xl text-primary mb-2">Finalisez votre offrande</h2>
                <p className="text-muted-foreground">Merci <strong className="text-foreground">{donor.nom}</strong> pour votre générosité 🙏</p>
              </div>

              <div className="bg-secondary/60 rounded-2xl p-6 mb-6 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Contributeur :</span><strong className="text-foreground">{donor.nom}</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Ville :</span><strong className="text-foreground">{donor.ville}</strong></div>
                <div className="flex justify-between pt-2 mt-2 border-t border-border">
                  <span className="text-foreground font-semibold">Montant à verser :</span>
                  <strong className="text-[var(--gold)] text-lg">{m.toLocaleString()} FCFA</strong>
                </div>
              </div>

              <div className="bg-[var(--gold)]/10 border-2 border-[var(--gold)]/40 rounded-2xl p-6 mb-6">
                <h3 className="font-display text-xl text-primary mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-[var(--gold)]" /> Instructions de versement
                </h3>
                <ol className="space-y-3 text-sm text-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-gradient text-[var(--gold-foreground)] flex items-center justify-center text-xs font-bold">1</span>
                    <span>Versez <strong className="text-[var(--gold)]">{m.toLocaleString()} FCFA</strong> via Mobile Money / Orange Money.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-gradient text-[var(--gold-foreground)] flex items-center justify-center text-xs font-bold">2</span>
                    <span>Numéro : <a href="tel:655816362" className="text-[var(--gold)] font-bold underline">655 81 63 62</a> — <strong>Nghokeng David</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-gradient text-[var(--gold-foreground)] flex items-center justify-center text-xs font-bold">3</span>
                    <span>Importez la <strong>capture d'écran</strong> de la confirmation ci-dessous.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-gradient text-[var(--gold-foreground)] flex items-center justify-center text-xs font-bold">4</span>
                    <span>Cliquez sur le bouton WhatsApp pour envoyer toutes vos infos automatiquement.</span>
                  </li>
                </ol>
              </div>

              {/* Upload preuve */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-[var(--gold)]" />
                  Capture d'écran du versement *
                </label>

                {!proofPreview ? (
                  <label className="block cursor-pointer border-2 border-dashed border-[var(--gold)]/50 rounded-xl p-8 text-center hover:bg-[var(--gold)]/5 transition">
                    <Upload className="h-8 w-8 text-[var(--gold)] mx-auto mb-2" />
                    <p className="text-sm font-semibold text-foreground">Cliquez pour importer</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG · max 5 Mo</p>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border-2 border-[var(--gold)]">
                    <img src={proofPreview} alt="Aperçu preuve" className="w-full max-h-64 object-contain bg-secondary/30" />
                    <button onClick={removeProof} className="absolute top-2 right-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg hover:scale-110 transition" aria-label="Retirer">
                      <X className="h-4 w-4" />
                    </button>
                    <div className="px-3 py-2 bg-green-50 border-t border-green-200 text-xs text-green-800 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Capture prête : {proofFile?.name}
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

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Effectuez le versement <strong>avant</strong> de cliquer sur le bouton WhatsApp pour pouvoir y joindre la preuve.</span>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
