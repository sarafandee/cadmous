# Cadmous College Website

Static marketing/admissions site for Cadmous College (IB World School). Next.js 16 App Router, fully static content today, with a data-access layer shaped so an admin/CMS can be slotted in later without rewriting pages.

## Stack

- **Next.js 16.2.3** (App Router, Turbopack, `output: 'standalone'`)
- **React 19.2.4**, **TypeScript 5.7** (strict), ESM
- **Tailwind CSS 4** (`@tailwindcss/postcss`) + `@tailwindcss/typography`
- **shadcn/ui** primitives (Radix) — `cn` lives at [src/lib/utils.ts](src/lib/utils.ts) per shadcn convention
- **next-intl 4** — locales: `ar` (default), `en`, `fr`; RTL for Arabic
- **react-hook-form + zod** for forms
- **pnpm 10.33.0** (pinned via corepack; Node 22 in Docker)
- No test framework

## Layout

```
src/
├── app/
│   ├── layout.tsx              # root layout — Header, Providers, Footer, fonts
│   ├── globals.css             # Tailwind + design tokens
│   └── [locale]/               # all routes — locale-prefixed
│       ├── layout.tsx          # NextIntlClientProvider, generateStaticParams
│       ├── page.tsx            # homepage
│       ├── news/  events/      # listing + [slug] detail
│       ├── contact/            # form + actions.ts (stub — no persistence)
│       ├── application/[appLang]/  # one route, generates 9 (locale × appLang) combos
│       └── {admissions, director, history, vision-mission, policies,
│             requirements, kindergarten, elementary, intermediate,
│             secondary-lebanese, integrative, international-programs}/
├── components/
│   ├── ui/                     # shadcn primitives — import cn from @/lib/utils
│   ├── layout/                 # Header/, Footer/ (Component.tsx + Component.client.tsx)
│   ├── CadmousUI/              # school-specific page shells (PageHeader, Section, etc.)
│   └── ApplicationWizard/      # multi-step form: steps/, schema.ts, actions.ts
├── lib/
│   ├── utils.ts                # cn (shadcn convention; aliased in components.json)
│   ├── canUseDOM.ts            # DOM-availability check
│   ├── deepMerge.ts  formatDateTime.ts  getURL.ts  toKebabCase.ts  useDebounce.ts
│   └── content/                # data access layer — stable public API
│       ├── types.ts            # NewsPost, SchoolEvent, LocalizedContent<T>
│       ├── news.ts             # async getAllNews, getNewsBySlug
│       ├── events.ts           # async getAllEvents, getEventBySlug
│       └── _static/            # current static-data impl — swap-out point for admin
│           ├── news.data.ts
│           └── events.data.ts
├── providers/                  # Theme, HeaderTheme, index (Providers wrapper)
├── i18n/                       # request.ts, routing.ts (locales + Locale type)
├── messages/                   # next-intl JSON dictionaries
└── proxy.ts                    # next-intl locale routing (Next 16 "proxy" convention)
```

Path alias: `@/*` → `./src/*`. shadcn `utils` alias: `@/lib/utils` (set in [components.json](components.json)).

## Data layer (built for the future admin)

The page → data path is the contract that has to survive a backend switch. The shape:

1. **Pages call async functions from `@/lib/content/*`** — `getAllNews(locale)`, `getNewsBySlug(locale, slug)`, `getAllEvents(locale)`, `getEventBySlug(locale, slug)`. All return `Promise<T>`. Always `await` them.
2. **Those functions live in `src/lib/content/{news,events}.ts`** — the *interface* layer. Function signatures and return types are the contract. Don't break them.
3. **Today they read from `src/lib/content/_static/*.data.ts`** — typed `Record<Locale, T[]>` exports. To edit content, edit these files.
4. **When the admin lands**, swap the function bodies (or replace the `_static/` import) with DB/CMS calls. Pages don't change. Per-route render strategy (`force-dynamic`, `revalidate`, ISR) gets reintroduced *then*, per resource, not blanket.

For new content types: add a type to [types.ts](src/lib/content/types.ts), an `_static/<thing>.data.ts`, and a `<thing>.ts` exposing async getters. Match the existing `Locale` validation pattern (`asLocale` helper) so URL-string locales narrow safely.

**Forms are stubs.** [contact/actions.ts](src/app/[locale]/contact/actions.ts) and [ApplicationWizard/actions.ts](src/components/ApplicationWizard/actions.ts) validate via Zod, then `console.log`. No email, no DB write. Wiring these is part of the same backend project as the admin.

## Routing & i18n

- All routes are under `src/app/[locale]/`. `[locale]` is one of `ar | en | fr` (see [src/i18n/routing.ts](src/i18n/routing.ts)). `ar` is the default.
- The locale layout calls `generateStaticParams` to emit all three; pages await `params` (Next 16 convention) and call `setRequestLocale(locale)`.
- **Application form**: single dynamic route `[locale]/application/[appLang]/` (9 combos pre-rendered). `appLang` is the *form* language (orthogonal to the UI `locale`).
- Built routes currently render server-side on every request (Next labels them `ƒ`). That's fine while content is static; once content becomes mutable via the admin, switch to ISR/dynamic per resource.

## Styling

- Tailwind config: [tailwind.config.mjs](tailwind.config.mjs); design tokens (navy-50…900, crimson-400/500, semantic colors, breakpoint vars) live as CSS variables in [src/app/globals.css](src/app/globals.css).
- Brand: navy-dominant with crimson accents. A `ThemeProvider` exists but there's no functional light/dark toggle in the UI.
- Fonts: Geist Sans/Mono (default), Manrope, Noto Sans Arabic (Google Fonts).
- shadcn `cn` helper imported from `@/lib/utils`.

## Build & deploy

- **Dev**: `pnpm dev` (Turbopack)
- **Build**: `pnpm build` → `next build` then `next-sitemap` postbuild generates `public/robots.txt` + `public/sitemap.xml` (both gitignored).
- **Lint**: `pnpm lint` (ESLint 9 flat config, `next/core-web-vitals` + `next/typescript`). Note: lint currently errors with a circular-structure crash from `eslint-config-next` + ESLint 9 — pre-existing, unrelated to source.
- **Production**: standalone output → [Dockerfile](Dockerfile) multi-stage on `node:22.17.0-alpine`, runs as `nextjs:1001`, `CMD node server.js`, port 3000.
- **Deploy target**: Dokploy. Use the `dokploy-ali` MCP tools (per parent [../CLAUDE.md](../CLAUDE.md)), not `dokploy-innavera`.

## Known gotchas

- **No backend yet.** The site is content-static; forms log to console. Don't ship application/contact forms publicly until they're wired.
- **Inline content in `page.tsx` files** for non-news/events pages (kindergarten, vision-mission, etc.) — large `T` translation objects per file. This is deliberate while there's no CMS. Move them to `lib/content/` when the admin lands.
- **No tests.** If you change form logic or content-layer getters, verify by hand or add tests as part of the change.
- **Images**: only `images.unsplash.com` is whitelisted in [next.config.ts](next.config.ts). Add hostnames there if you reference new remotes.

## Conventions

- Server components by default; mark `'use client'` only when needed (forms, theme toggle, interactive UI).
- Use the `@/` alias, not relative `../../`.
- New content types: extend `@/lib/content/` — async getter + `_static/` data file. Don't read from data files directly in pages.
- Match the existing locale shape (`LocalizedContent<T>` = `Record<Locale, T[]>` in [lib/content/types.ts](src/lib/content/types.ts)). All three locales must be populated.
- Don't reintroduce `export const dynamic = 'force-dynamic'` on a page without a reason — pick the rendering strategy (static, ISR, dynamic) deliberately, per route, when the backend lands.
