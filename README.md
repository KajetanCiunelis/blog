# kajetan.ciunelis.com — blog (Astro + Keystatic)

Statyczny, dwujęzyczny blog osobisty/akademicki. Następca wersji w Quarto.

## Codzienna praca — jak dodać post

1. Uruchom serwer deweloperski:

   ```
   npm run dev
   ```

2. Otwórz **panel admina**: http://localhost:4321/keystatic
   - „Posty (PL)" → **Add** → wypełnij tytuł, opis (SEO), datę, kategorie → pisz w edytorze jak w WordPressie (obrazki wklejasz/przeciągasz — same trafią do `public/images/posts/`).
   - Zapis w panelu = zapis pliku `.mdoc` w repo. Żadnej bazy danych.

3. Podgląd strony na żywo: http://localhost:4321

4. Gdy post gotowy — opublikuj przez git:

   ```
   git add -A
   git commit -m "Post: tytuł"
   git push
   ```

Alternatywnie: posty można pisać ręcznie jako pliki `src/content/posts/<slug>.mdoc` — panel i pliki to to samo źródło prawdy.

## Pozostałe komendy

| Komenda           | Co robi                                                        |
| ----------------- | -------------------------------------------------------------- |
| `npm run build`   | buduje stronę do `dist/` + indeks wyszukiwarki                  |
| `npm run preview` | serwuje zbudowaną stronę (tu działa wyszukiwarka Pagefind)      |

## Co się dzieje automatycznie

- **SEO**: canonical, hreflang PL/EN, Open Graph, Twitter Cards, JSON-LD (BlogPosting/Person), sitemapa (`/sitemap-index.xml`), robots.txt, RSS (`/blog.xml`).
- **Dark mode**: zapamiętywany w localStorage, domyślnie wg ustawień systemu.
- **Wyszukiwarka**: Pagefind — indeks budowany przy `npm run build`, zero zewnętrznych usług.
- **Stare URL-e** Quarto (`/blog.html` itd.): przekierowania do nowych adresów.

## Struktura treści

- `src/content/posts/` — posty PL (URL: `/posts/<slug>/`)
- `src/content/posts-en/` — posty EN (URL: `/en/posts/<slug>/`)
- `src/content/poems/` — wiersze (strona Poezja składa je wg pola `order`)
- `src/content/pages/` — treść stron „O mnie" i „Publikacje" (PL/EN)

⚠️ **Nie zmieniaj sluga opublikowanego posta** — to zmiana URL-a i utrata pozycji w Google.

## Hosting (na później)

Strona to czyste pliki statyczne (`dist/`) — wejdzie na darmowy GitHub Pages (limit 1 GB, obecna strona waży ~6 MB) albo Cloudflare Pages. Migracja domeny po dopieszczeniu strony.
