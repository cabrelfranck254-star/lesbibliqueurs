
# Plan : Rendre le site déployable sur Netlify

## Contexte

Le projet est une app **React 19 + TanStack Start + Vite + Tailwind v4**, actuellement configurée pour Cloudflare Workers (SSR). Pour Netlify, on bascule en **SPA pure** (Single Page Application rendue côté client). Toutes les fonctionnalités existantes sont conservées : quiz Bibliqueur, formulaires Offrandes/Billetterie, upload preuve de paiement, intégration WhatsApp, animations, responsive.

Aucune page n'est supprimée. Aucun design n'est modifié.

## Ce qui sera livré

Après `bun run build`, vous obtiendrez un dossier **`/dist`** prêt à glisser-déposer sur Netlify, contenant :

```text
dist/
  index.html
  _redirects          ← /* /index.html 200
  assets/
    *.js
    *.css
    *.png / *.webp
```

Plus, à la racine du projet :

```text
netlify.toml          ← config build automatique
public/_redirects     ← copié dans dist/ automatiquement
```

## Étapes techniques

### 1. Basculer Vite en mode SPA (désactiver SSR Cloudflare)

- `vite.config.ts` : remplacer `@lovable.dev/vite-tanstack-config` par une config Vite standard avec :
  - `@vitejs/plugin-react`
  - `@tanstack/router-plugin/vite` (en mode `target: 'react'`)
  - `@tailwindcss/vite`
  - `vite-tsconfig-paths`
  - `build.outDir = 'dist'`
- Retirer le plugin Cloudflare et le SSR.

### 2. Convertir TanStack Start → TanStack Router (SPA)

- `src/router.tsx` : garder `createRouter` (déjà compatible).
- `src/routes/__root.tsx` : remplacer `createRootRoute` SSR (avec `shellComponent`, `HeadContent`, `Scripts`) par un `createRootRoute` client-only ; déplacer `<html>/<head>/<body>` dans `index.html`.
- Créer `src/main.tsx` : point d'entrée client qui monte `<RouterProvider />` dans `#root`.
- Créer `index.html` à la racine (style Vite standard) avec `<div id="root">` et `<script type="module" src="/src/main.tsx">`.
- Les `head()` par route continuent de fonctionner via `@tanstack/react-router` (méta dynamiques côté client) — pour SEO statique on garde les balises principales dans `index.html`.

### 3. Fichier `_redirects` (SPA fallback)

Créer **`public/_redirects`** :

```text
/*    /index.html   200
```

Vite copie automatiquement `public/` dans `dist/` au build → Netlify lit le fichier et redirige toutes les routes (`/participer`, `/dons`, etc.) vers `index.html` pour que TanStack Router prenne le relais. **Plus aucune 404 sur refresh ou deep-link.**

### 4. Fichier `netlify.toml` (build automatique)

À la racine :

```toml
[build]
  command = "bun run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 5. Nettoyage

- Supprimer `wrangler.jsonc` (Cloudflare, inutile pour Netlify).
- Retirer la dépendance `@cloudflare/vite-plugin` et `@tanstack/react-start` du `package.json`.
- Garder `/src` (organisation React standard) et `/public` (assets statiques) — ce sont les conventions Vite, indispensables.

### 6. Vérification finale

- Lancer `bun run build` → vérifier qu'il génère `dist/` sans erreur.
- Lister `dist/` pour confirmer présence de `index.html`, `_redirects`, dossier `assets/`.
- Tester `bun run preview` localement : naviguer sur `/`, `/participer`, `/dons`, `/billetterie`, `/contact`, `/a-propos`, `/competitions` + refresh sur chaque page.

## Comment déployer sur Netlify (instructions pour vous)

**Option A — Connect GitHub (recommandé) :**
1. Cliquez sur **GitHub** en haut à droite de Lovable → "Connect to GitHub".
2. Sur Netlify : *Add new site* → *Import from Git* → choisir le repo.
3. Build command et publish dir sont auto-détectés via `netlify.toml`. Cliquez *Deploy*.

**Option B — Drag & drop :**
1. Téléchargez le code via GitHub puis exécutez localement :
   ```bash
   bun install
   bun run build
   ```
2. Glissez le dossier **`dist/`** sur https://app.netlify.com/drop.

## Ce qui reste identique

- Toutes les pages, tous les formulaires, tout le design, toutes les couleurs, le logo, les animations, le responsive.
- Le site sur `lesbibliqueurs.lovable.app` continue de fonctionner sans changement visible.

## Limites à connaître

- **SPA = pas de SSR** : moins optimal pour le SEO que SSR, mais largement suffisant pour un site vitrine + formulaires. Les balises meta de base restent dans `index.html`.
- Si vous ajoutez un jour une vraie API backend, il faudra la déployer séparément (Netlify Functions ou Lovable Cloud).

Validez ce plan et je l'implémente directement.
