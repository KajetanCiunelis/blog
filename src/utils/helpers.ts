/** Szacowany czas czytania na podstawie surowej treści (~200 słów/min). */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Data w formacie ludzkim, np. "7 marca 2026" / "7 March 2026". */
export function formatDate(date: Date, lang: 'pl' | 'en' = 'pl'): string {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'pl-PL', {
    dateStyle: 'long',
  }).format(date);
}

/** Data ISO (YYYY-MM-DD) do JSON-LD i atrybutów <time>. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Kotwica z tytułu (obsługuje polskie znaki). */
export function slugify(text: string): string {
  const map: Record<string, string> = {
    ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z',
  };
  return text
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (ch) => map[ch] ?? ch)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
