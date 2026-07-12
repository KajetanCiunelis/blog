# CLAUDE.md

Wskazówki dla Claude Code przy pracy z tym repozytorium.

## Projekt

Dwujęzyczny blog osobisty/akademicki (PL + EN) Kajetana Ciunelisa — fizjoterapeuty i doktoranta AWF Warszawa. Następca strony w Quarto (`../Blog-kc`). Statyczny site w **Astro** z lokalnym panelem admina **Keystatic**.

- URL produkcyjny: https://kajetan.ciunelis.com/ (PL = root, EN = `/en/`)
- Hosting: GitHub Pages, repo `KajetanCiunelis/blog`. **Deploy = push do `master`** — GitHub Actions (`.github/workflows/deploy.yml`) buduje i wdraża automatycznie. NIE commituj `dist/`.
- Stare repo `KajetanCiunelis/Blog-kc` (Quarto) = archiwum, Pages wyłączone — nie ruszać.

## Komendy

- `npm run dev` — serwer deweloperski + **panel admina pod `/keystatic`** (http://localhost:4321/keystatic)
- `npm run build` — statyczny build do `dist/` + indeks wyszukiwarki Pagefind
- `npm run preview` — podgląd zbudowanej strony (z działającą wyszukiwarką)

Panel Keystatic działa TYLKO w `npm run dev` (storage: local — edytuje pliki w repo). Build produkcyjny jest w 100% statyczny, bez Reacta w przeglądarce.

## Architektura

```
├── astro.config.mjs        # site URL, integracje, redirecty starych URL-i .html
├── keystatic.config.ts     # schema panelu admina (kolekcje + single strony)
├── markdoc.config.mjs      # tagi Markdoc (callout) + podświetlanie kodu (shiki)
├── src/
│   ├── content.config.ts   # kolekcje Astro: posts, postsEn, poems, pages
│   ├── content/
│   │   ├── posts/          # posty PL (.mdoc) — slug pliku = URL /posts/<slug>/
│   │   ├── posts-en/       # posty EN — URL /en/posts/<slug>/
│   │   ├── poems/          # wiersze (frontmatter: title, lang, order)
│   │   └── pages/          # about-pl/en, publications-pl/en (single)
│   ├── layouts/Base.astro  # <head>: SEO, canonical, hreflang, OG, JSON-LD, dark mode
│   ├── components/         # Navbar, Footer, PostPage, BlogList, AboutPage itd.
│   ├── styles/global.css   # CAŁY design (brutalist: zero zaokrągleń/cieni)
│   └── pages/              # routy PL w root, EN w en/
└── public/                 # favicony, obrazy, CV, robots.txt
```

## Treść — format .mdoc (Markdoc)

Markdoc ≈ markdown, ale **NIE renderuje surowego HTML ani encji** (`&nbsp;` itp.). Nie używaj też składni Quarto (`:::`, `{.class}`). Dostępne rozszerzenia: tag `{% callout type="note" title="..." %}...{% /callout %}` i twarde łamanie wersu backslashem na końcu linii.

Frontmatter posta: `title`, `description` (max ~160 znaków), `date`, `categories`, `keywords`, `draft`, opcjonalnie `image`/`imageAlt` (og:image). JSON-LD, canonical i hreflang generują się automatycznie — NIE wklejaj ich do treści.

Obrazy postów: `public/images/posts/<slug>/` → w treści `![alt](/images/posts/<slug>/plik.png)`.

## Design

- Paleta: czerwień `#C41E3A`, krem `#F0EBE0`, czerń `#1A1A1A` (zmienne CSS w `global.css`)
- Font: Nunito (self-hosted przez `@fontsource-variable/nunito`)
- Dark mode: klasa `dark` na `<html>`, localStorage `theme`, fallback do prefers-color-scheme
- Brutalist: `border-radius: 0` wszędzie, bez cieni i gradientów

## SEO — zasady (przeniesione ze starej strony)

1. **NIE zmieniaj sluga opublikowanego posta** — zmiana = 404 i utrata pozycji w Google. Jeśli musisz, dodaj redirect w `astro.config.mjs`.
2. Slug krótki, bez daty, z frazą kluczową; title max 60 znaków; description max 160.
3. Nagłówki H2/H3 mają odpowiadać na zapytania Google.
4. Opisowy alt na każdym obrazku.
5. Canonical = forma z ukośnikiem (`/posts/slug/`) — generuje `Base.astro`, sitemap jest z nią spójna automatycznie.
6. Linkuj wewnętrznie między postami.

## Czego NIE robić

- NIE dodawaj Google Analytics ani żadnych trackerów (świadoma decyzja).
- NIE edytuj `dist/` — to wygenerowany output.
- NIE zmieniaj struktury URL-i (PL root, EN `/en/`, posty `/posts/<slug>/`).
- NIE dodawaj ciężkich bibliotek JS do frontendu — strona ma być szybka; React służy tylko panelowi Keystatic w dev.

## Po każdej zmianie

`npm run build` musi przechodzić bez błędów. Przy zmianach wizualnych sprawdź `npm run preview` w przeglądarce (light + dark mode, mobile).
