import { config, fields, collection, singleton } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

// Komponenty dostępne w edytorze treści
const contentComponents = {
  callout: wrapper({
    label: 'Ramka (callout)',
    description: 'Wyróżniona ramka z notatką, wskazówką lub ostrzeżeniem',
    schema: {
      type: fields.select({
        label: 'Typ',
        options: [
          { label: 'Notatka', value: 'note' },
          { label: 'Wskazówka', value: 'tip' },
          { label: 'Uwaga', value: 'warning' },
          { label: 'Ważne', value: 'important' },
        ],
        defaultValue: 'note',
      }),
      title: fields.text({ label: 'Tytuł (opcjonalnie)' }),
    },
  }),
};

const postSchema = {
  title: fields.slug({
    name: { label: 'Tytuł', validation: { isRequired: true } },
    slug: {
      label: 'Slug (adres URL)',
      description:
        'NIE zmieniaj sluga opublikowanego posta — zmiana = 404 i utrata pozycji w Google.',
    },
  }),
  description: fields.text({
    label: 'Opis (SEO)',
    description: 'Max ~160 znaków — ten tekst Google wyświetla w wynikach.',
    multiline: true,
    validation: { isRequired: true },
  }),
  date: fields.date({ label: 'Data publikacji', validation: { isRequired: true } }),
  dateModified: fields.date({ label: 'Data modyfikacji (opcjonalnie)' }),
  categories: fields.array(fields.text({ label: 'Kategoria' }), {
    label: 'Kategorie',
    description: 'Precyzyjne tagi, np. "fizjoterapia", "praca magisterska"',
    itemLabel: (props) => props.value,
  }),
  keywords: fields.array(fields.text({ label: 'Fraza' }), {
    label: 'Słowa kluczowe (frazy long-tail)',
    itemLabel: (props) => props.value,
  }),
  draft: fields.checkbox({ label: 'Szkic (nie publikuj)', defaultValue: false }),
  image: fields.image({
    label: 'Obrazek og:image (opcjonalnie)',
    description: 'Podgląd posta w social media. Najlepiej PNG/JPG.',
    directory: 'public/images/posts',
    publicPath: '/images/posts/',
  }),
  imageAlt: fields.text({ label: 'Opis (alt) obrazka' }),
  content: fields.markdoc({
    label: 'Treść',
    components: contentComponents,
    options: {
      image: { directory: 'public/images/posts', publicPath: '/images/posts/' },
    },
  }),
};

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'kajetan.ciunelis.com' },
    navigation: {
      Blog: ['posts', 'postsEn'],
      Strony: ['aboutPl', 'aboutEn', 'publicationsPl', 'publicationsEn'],
      Poezja: ['poems'],
    },
  },
  collections: {
    posts: collection({
      label: 'Posty (PL)',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['date', 'draft'],
      schema: postSchema,
    }),
    postsEn: collection({
      label: 'Posts (EN)',
      slugField: 'title',
      path: 'src/content/posts-en/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['date', 'draft'],
      schema: postSchema,
    }),
    poems: collection({
      label: 'Wiersze',
      slugField: 'title',
      path: 'src/content/poems/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Tytuł' } }),
        lang: fields.select({
          label: 'Język strony',
          options: [
            { label: 'Polski', value: 'pl' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'pl',
        }),
        order: fields.integer({
          label: 'Kolejność (1 = pierwszy na stronie)',
          defaultValue: 99,
        }),
        content: fields.markdoc({
          label: 'Treść wiersza',
          description: 'Łamanie wersów: Shift+Enter',
        }),
      },
    }),
  },
  singletons: {
    aboutPl: singleton({
      label: 'O mnie (PL)',
      path: 'src/content/pages/about-pl',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Tytuł', defaultValue: 'Kajetan Ciunelis' }),
        intro: fields.text({ label: 'Wstęp (bio)', multiline: true }),
        education: fields.array(
          fields.object({
            degree: fields.text({ label: 'Kierunek / stopień' }),
            meta: fields.text({ label: 'Uczelnia i lata' }),
          }),
          { label: 'Edukacja', itemLabel: (props) => props.fields.degree.value }
        ),
        content: fields.markdoc({ label: 'Dodatkowa treść (opcjonalnie)' }),
      },
    }),
    aboutEn: singleton({
      label: 'About (EN)',
      path: 'src/content/pages/about-en',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Kajetan Ciunelis' }),
        intro: fields.text({ label: 'Intro (bio)', multiline: true }),
        education: fields.array(
          fields.object({
            degree: fields.text({ label: 'Degree' }),
            meta: fields.text({ label: 'Institution and years' }),
          }),
          { label: 'Education', itemLabel: (props) => props.fields.degree.value }
        ),
        content: fields.markdoc({ label: 'Extra content (optional)' }),
      },
    }),
    publicationsPl: singleton({
      label: 'Publikacje (PL)',
      path: 'src/content/pages/publications-pl',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Tytuł', defaultValue: 'Publikacje' }),
        content: fields.markdoc({ label: 'Treść' }),
      },
    }),
    publicationsEn: singleton({
      label: 'Publications (EN)',
      path: 'src/content/pages/publications-en',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title', defaultValue: 'Publications' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
