import { Link, Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gold-gradient">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-[var(--gold-foreground)] shadow-gold hover:scale-105 transition-transform"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Les Bibliqueurs — Émission chrétienne interactive" },
      { name: "description", content: "L'émission chrétienne interactive basée sur les jeux et compétitions bibliques. Devenez Bibliqueur et participez en direct." },
      { name: "author", content: "Les Bibliqueurs" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Les Bibliqueurs — Émission chrétienne interactive" },
      { name: "twitter:title", content: "Les Bibliqueurs — Émission chrétienne interactive" },
      { property: "og:description", content: "L'émission chrétienne interactive basée sur les jeux et compétitions bibliques. Devenez Bibliqueur et participez en direct." },
      { name: "twitter:description", content: "L'émission chrétienne interactive basée sur les jeux et compétitions bibliques. Devenez Bibliqueur et participez en direct." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/8TmxZHrbmFMylTuf208w2v7UVMn2/social-images/social-1777050444674-1000059486.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/8TmxZHrbmFMylTuf208w2v7UVMn2/social-images/social-1777050444674-1000059486.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
