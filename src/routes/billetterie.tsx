import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Check, Crown, Ticket, Sparkles, Phone, AlertCircle, ArrowLeft, MessageCircle, CheckCircle2, Upload, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

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

type Ticket = {
  type: string;
  price: string;
  priceValue: number;
  badge: string;
  icon: typeof Ticket;
  features: string[];
  cta: string;
  highlight: boolean;
  free: boolean;
};

const tickets: Ticket[] = [
  {
    type: "Gratuit",
    price: "0 FCFA",
    priceValue: 0,
    badge: "Inscription anticipée",
    icon: Ticket,
    features: ["Accès à la salle", "Place debout", "Programme officiel"],
    cta: "Réserver gratuitement",
    highlight: false,
    free: true,
  },
  {
    type: "Standard",
    price: "2 000 FCFA",
    priceValue: 2000,
    badge: "Le plus populaire",
    icon: Sparkles,
    features: ["Accès à la salle", "Place assise garantie", "Collation incluse", "Programme officiel"],
    cta: "Réserver une place maintenant",
    highlight: true,
    free: false,
  },
  {
    type: "VIP",
    price: "5 000 FCFA",
    priceValue: 5000,
    badge: "Expérience premium",
    icon: Crown,
    features: ["Accès prioritaire", "Place VIP réservée", "Réception privée", "Photo souvenir", "Goodies Bibliqueurs"],
    cta: "Réserver VIP",
    highlight: false,
    free: false,
  },
];

const reservationSchema = z.object({
  fullName: z.string().trim().min(2, "Nom trop court").max(100, "Nom trop long"),
  whatsapp: z.string().trim().min(8, "Numéro WhatsApp invalide").max(20, "Numéro trop long"),
  email: z.string().trim().email("Email invalide").max(255, "Email trop long").optional().or(z.literal("")),
  quantity: z.number().min(1, "Minimum 1 place").max(20, "Maximum 20 places"),
  city: z.string().trim().min(2, "Ville requise").max(100, "Ville trop longue"),
});

type Step = "select" | "form" | "payment";

function BilletteriePage() {
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    quantity: 1,
    city: "",
  });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSelect(t: Ticket) {
    setSelected(t);
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    const result = reservationSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Formulaire validé !", {
      description: selected?.free
        ? "Votre place est réservée. Présentez-vous à l'entrée."
        : "Suivez les instructions de paiement et joignez votre capture.",
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Fichier trop volumineux (max 5 Mo)."); return; }
    if (!file.type.startsWith("image/")) { toast.error("Veuillez sélectionner une image."); return; }
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
    if (!selected) return "";
    const total = selected.priceValue * formData.quantity;
    const msg = `🎟️ *NOUVELLE RÉSERVATION — LES BIBLIQUEURS*

👤 *Nom :* ${formData.fullName}
📱 *WhatsApp :* ${formData.whatsapp}
${formData.email ? `📧 *Email :* ${formData.email}\n` : ""}🏙️ *Ville :* ${formData.city}

🎫 *Forfait :* ${selected.type}
🔢 *Nombre de places :* ${formData.quantity}
💰 *Total :* ${total.toLocaleString("fr-FR")} FCFA

${selected.free ? "✅ Billet gratuit — merci de valider mon inscription." : `📞 Versé au : 655 81 63 62 (Nghokeng David)\n📎 Je joins ci-dessous la capture d'écran de la preuve de paiement.`}

Merci de me confirmer la réservation 🙏`;
    return encodeURIComponent(msg);
  }

  function handleSendWhatsApp() {
    if (!selected?.free && !proofFile) {
      toast.error("Veuillez d'abord joindre la capture d'écran de votre paiement.");
      return;
    }
    if (proofFile) {
      const url = URL.createObjectURL(proofFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `paiement-${formData.fullName.replace(/\s+/g, "-")}.${proofFile.name.split(".").pop()}`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Capture téléchargée !", {
        description: "Joignez-la dans la conversation WhatsApp qui s'ouvre.",
        duration: 8000,
      });
    }
    window.open(`https://wa.me/237655816362?text=${buildWhatsAppMessage()}`, "_blank");
  }

  function resetFlow() {
    setStep("select");
    setSelected(null);
    setFormData({ fullName: "", whatsapp: "", email: "", quantity: 1, city: "" });
    setProofFile(null);
    setProofPreview(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="bg-hero-gradient text-white py-20">
        <div className="container-custom text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-semibold">Billetterie</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4">
            {step === "select" && "Réservez votre place"}
            {step === "form" && "Vos informations"}
            {step === "payment" && "Finalisez votre réservation"}
          </h1>
          <p className="text-white/85 max-w-xl mx-auto text-lg">
            {step === "select" && "Trois formules pour vivre l'émission. Choisissez celle qui vous correspond."}
            {step === "form" && `Forfait sélectionné : ${selected?.type} · ${selected?.price}`}
            {step === "payment" && "Dernière étape pour valider votre billet."}
          </p>

          {/* Stepper */}
          <div className="mt-8 flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm">
            {[
              { id: "select", label: "1. Forfait" },
              { id: "form", label: "2. Formulaire" },
              { id: "payment", label: "3. Paiement" },
            ].map((s, i) => {
              const order = ["select", "form", "payment"];
              const active = order.indexOf(step) >= i;
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <div
                    className={`px-3 py-1.5 rounded-full font-semibold transition ${
                      active ? "bg-gold-gradient text-[var(--gold-foreground)]" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {s.label}
                  </div>
                  {i < 2 && <div className={`h-0.5 w-4 md:w-8 ${active ? "bg-[var(--gold)]" : "bg-white/20"}`} />}
                </div>
              );
            })}
          </div>

          {step === "select" && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm">
              📅 Dim. 24 mai 2026 · 16h–18h · Salle BC de Deido, Douala
            </div>
          )}
        </div>
      </section>

      {/* STEP 1: Sélection */}
      {step === "select" && (
        <>
          <section className="py-8 bg-[var(--gold)]/10 border-y-2 border-[var(--gold)]/30">
            <div className="container-custom max-w-4xl">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="h-14 w-14 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold">
                  <Phone className="h-6 w-6 text-[var(--gold-foreground)]" />
                </div>
                <div className="flex-1">
                  <p className="font-display text-xl text-primary font-semibold">
                    Le paiement se fait via le numéro : <a href="tel:655816362" className="text-[var(--gold)] underline">655 81 63 62</a>
                  </p>
                  <p className="text-foreground text-sm mt-1">
                    <strong>Nom :</strong> Nghokeng David — Mobile Money / Orange Money
                  </p>
                  <p className="text-muted-foreground text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
                    <AlertCircle className="h-4 w-4" /> Sélectionnez d'abord votre forfait, remplissez le formulaire, puis suivez les instructions de paiement.
                  </p>
                </div>
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
                        <Check className="h-5 w-5 flex-shrink-0 text-[var(--gold)]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelect(t)}
                    className={`w-full py-4 rounded-full text-base font-bold transition ${
                      t.highlight
                        ? "bg-gold-gradient text-[var(--gold-foreground)] shadow-gold hover:scale-105"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
                    }`}
                  >
                    {t.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* STEP 2: Formulaire */}
      {step === "form" && selected && (
        <section className="py-16 md:py-24">
          <div className="container-custom max-w-2xl">
            <button
              onClick={() => setStep("select")}
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
            >
              <ArrowLeft className="h-4 w-4" /> Changer de forfait
            </button>

            <div className="bg-card border-2 border-border rounded-3xl p-8 md:p-10 shadow-elegant">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="h-14 w-14 rounded-xl bg-gold-gradient flex items-center justify-center">
                  <selected.icon className="h-7 w-7 text-[var(--gold-foreground)]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">Forfait choisi</p>
                  <h2 className="font-display text-2xl text-primary">{selected.type} · {selected.price}</h2>
                </div>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Nom complet *</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-[var(--gold)] focus:outline-none transition"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Numéro WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-[var(--gold)] focus:outline-none transition"
                    placeholder="6XX XX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email (optionnel)</label>
                  <input
                    type="email"
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-[var(--gold)] focus:outline-none transition"
                    placeholder="vous@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Ville *</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-[var(--gold)] focus:outline-none transition"
                      placeholder="Douala"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Nombre de places *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={20}
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-[var(--gold)] focus:outline-none transition"
                    />
                  </div>
                </div>

                {!selected.free && (
                  <div className="bg-secondary/60 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-foreground font-semibold">Total à payer :</span>
                    <span className="font-display text-2xl text-[var(--gold)] font-bold">
                      {(selected.priceValue * formData.quantity).toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gold-gradient text-[var(--gold-foreground)] font-bold text-base shadow-gold hover:scale-[1.02] transition"
                >
                  Continuer vers le paiement →
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* STEP 3: Paiement */}
      {step === "payment" && selected && (
        <section className="py-16 md:py-24">
          <div className="container-custom max-w-2xl">
            <div className="bg-card border-2 border-[var(--gold)] rounded-3xl p-8 md:p-10 shadow-gold">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 rounded-full bg-gold-gradient items-center justify-center mb-4 shadow-gold">
                  <CheckCircle2 className="h-8 w-8 text-[var(--gold-foreground)]" />
                </div>
                <h2 className="font-display text-3xl text-primary mb-2">
                  {selected.free ? "Réservation enregistrée !" : "Réservation enregistrée !"}
                </h2>
                <p className="text-muted-foreground">
                  Bonjour <strong className="text-foreground">{formData.fullName}</strong>, voici les instructions pour finaliser.
                </p>
              </div>

              {/* Récap */}
              <div className="bg-secondary/60 rounded-2xl p-6 mb-6 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Forfait :</span><strong className="text-foreground">{selected.type}</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Nombre de places :</span><strong className="text-foreground">{formData.quantity}</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Ville :</span><strong className="text-foreground">{formData.city}</strong></div>
                {!selected.free && (
                  <div className="flex justify-between pt-2 mt-2 border-t border-border">
                    <span className="text-foreground font-semibold">Total :</span>
                    <strong className="text-[var(--gold)] text-lg">{(selected.priceValue * formData.quantity).toLocaleString("fr-FR")} FCFA</strong>
                  </div>
                )}
              </div>

              {selected.free ? (
                <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 mb-6">
                  <h3 className="font-display text-xl text-primary mb-3">📍 Présentez-vous à l'entrée</h3>
                  <p className="text-foreground text-sm leading-relaxed">
                    Votre billet gratuit est confirmé. Rendez-vous le <strong>dimanche 24 mai 2026 dès 15h30</strong> à la Salle BC de Deido, Douala. Munissez-vous de votre nom complet pour la vérification.
                  </p>
                </div>
              ) : (
                <div className="bg-[var(--gold)]/10 border-2 border-[var(--gold)]/40 rounded-2xl p-6 mb-6">
                  <h3 className="font-display text-xl text-primary mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[var(--gold)]" /> Instructions de paiement
                  </h3>
                  <ol className="space-y-3 text-sm text-foreground">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-gradient text-[var(--gold-foreground)] flex items-center justify-center text-xs font-bold">1</span>
                      <span>Effectuez le paiement de <strong className="text-[var(--gold)]">{(selected.priceValue * formData.quantity).toLocaleString("fr-FR")} FCFA</strong> via Mobile Money / Orange Money.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-gradient text-[var(--gold-foreground)] flex items-center justify-center text-xs font-bold">2</span>
                      <span>Numéro destinataire : <a href="tel:655816362" className="text-[var(--gold)] font-bold underline">655 81 63 62</a> — <strong>Nghokeng David</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-gradient text-[var(--gold-foreground)] flex items-center justify-center text-xs font-bold">3</span>
                      <span>Cliquez sur le bouton ci-dessous pour nous envoyer la <strong>preuve de paiement</strong> sur WhatsApp.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gold-gradient text-[var(--gold-foreground)] flex items-center justify-center text-xs font-bold">4</span>
                      <span>Vous recevrez votre <strong>QR code de validation</strong> par retour WhatsApp.</span>
                    </li>
                  </ol>
                </div>
              )}

              {/* Upload preuve (sauf gratuit) */}
              {!selected.free && (
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
              )}

              {/* Bouton WhatsApp en bas */}
              <button
                onClick={handleSendWhatsApp}
                disabled={!selected.free && !proofFile}
                className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-full bg-[#25D366] text-white font-bold text-base shadow-elegant hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <MessageCircle className="h-5 w-5" />
                {selected.free ? "Confirmer sur WhatsApp" : "Envoyer sur WhatsApp pour finaliser"}
              </button>

              {!selected.free && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  ℹ️ La capture sera téléchargée sur votre appareil. Joignez-la dans la conversation WhatsApp.
                </p>
              )}

              <button
                onClick={resetFlow}
                className="w-full mt-3 py-3 rounded-full bg-secondary text-foreground font-semibold text-sm hover:bg-secondary/80 transition"
              >
                Faire une nouvelle réservation
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
