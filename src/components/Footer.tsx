import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-hero-gradient text-white mt-24">
      <div className="container-custom py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Les Bibliqueurs" className="h-12 w-12 rounded-full ring-2 ring-[var(--gold)]/60" width={48} height={48} loading="lazy" />
            <div>
              <div className="font-display text-lg font-semibold">Les Bibliqueurs</div>
              <div className="text-xs text-[var(--gold-soft)] uppercase tracking-widest">Apprendre en s'amusant</div>
            </div>
          </div>
          <p className="text-sm text-white/75">L'émission chrétienne interactive qui révèle les champions de la Bible.</p>
        </div>

        <div>
          <h4 className="text-[var(--gold)] font-semibold uppercase text-xs tracking-widest mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/a-propos" className="text-white/80 hover:text-[var(--gold)] transition">À propos</Link></li>
            <li><Link to="/participer" className="text-white/80 hover:text-[var(--gold)] transition">Devenir Bibliqueur</Link></li>
            <li><Link to="/billetterie" className="text-white/80 hover:text-[var(--gold)] transition">Billetterie</Link></li>
            <li><Link to="/competitions" className="text-white/80 hover:text-[var(--gold)] transition">Compétitions</Link></li>
            <li><Link to="/dons" className="text-[var(--gold)] font-bold hover:text-white transition">Faire une offrande ici</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[var(--gold)] font-semibold uppercase text-xs tracking-widest mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-[var(--gold)]" /><span>655 81 63 62 / 658 09 47 14</span></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-[var(--gold)]" /><span>contact@lesbibliqueurs.com</span></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[var(--gold)]" /><span>Salle de fête BC de Deido, en face de la Boulangerie Saker, Douala</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[var(--gold)] font-semibold uppercase text-xs tracking-widest mb-4">Suivez-nous</h4>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/share/1Cj1D72FNC/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook (page principale)" className="h-10 w-10 rounded-full bg-white/10 hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] flex items-center justify-center transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/share/18Mx2Nyz9k/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook (page secondaire)" className="h-10 w-10 rounded-full bg-white/10 hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] flex items-center justify-center transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://m.youtube.com/@dleandric1745" target="_blank" rel="noreferrer" aria-label="YouTube" className="h-10 w-10 rounded-full bg-white/10 hover:bg-[var(--gold)] hover:text-[var(--navy-deep)] flex items-center justify-center transition">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-white/60 mt-6">📅 Dimanche 24 mai 2026 · 16h–18h</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-custom py-5 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Les Bibliqueurs. Tous droits réservés. · « Que la parole de Christ habite parmi vous abondamment » — Col. 3:16
        </div>
      </div>
    </footer>
  );
}
