import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  dateModified: z.coerce.date().optional(),
  categories: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
    schema: postSchema,
  }),
  postsEn: defineCollection({
    loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts-en' }),
    schema: postSchema,
  }),
  poems: defineCollection({
    loader: glob({ pattern: '**/*.mdoc', base: './src/content/poems' }),
    schema: z.object({
      title: z.string(),
      lang: z.enum(['pl', 'en']).default('pl'),
      order: z.number().default(99),
    }),
  }),
  pages: defineCollection({
    loader: glob({ pattern: '**/*.mdoc', base: './src/content/pages' }),
    schema: z.object({
      title: z.string(),
      intro: z.string().optional(),
      education: z
        .array(z.object({ degree: z.string(), meta: z.string() }))
        .optional(),
    }),
  }),
};
