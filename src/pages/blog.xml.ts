import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
  return rss({
    title: 'Kajetan Ciunelis — Blog',
    description:
      'Blog o fizjoterapii, medycynie opartej na dowodach i pseudonauce w ochronie zdrowia.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/posts/${p.id}/`,
      categories: p.data.categories,
    })),
    customData: '<language>pl</language>',
  });
}
