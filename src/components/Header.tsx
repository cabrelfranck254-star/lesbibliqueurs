import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/participer", label: "Devenir Bibliqueur" },
  { to: "/billetterie", label: "Billetterie" },
  { to: "/competitions", label: "Compétitions" },
  { to: "/dons", label: "Faire un don" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="container-custom flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Les Bibliqueurs" className="h-12 w-12 rounded-full ring-2 ring-[var(--gold)]/40 group-hover:ring-[var(--gold)] transition" width={48} height={48} />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-xl font-semibold text-primary">Les Bibliqueurs</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">Émission Biblique</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-foreground/75 hover:text-primary rounded-md transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary rounded-md bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/participer"
          className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gold-gradient text-[var(--gold-foreground)] text-sm font-semibold shadow-gold hover:scale-105 transition-transform"
        >
          Participer
        </Link>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-primary" aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-custom py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-secondary rounded-md"
                activeProps={{ className: "px-3 py-3 text-base font-semibold text-primary bg-secondary rounded-md" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
