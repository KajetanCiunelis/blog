import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('postsEn', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
  return rss({
    title: 'Kajetan Ciunelis — Blog (EN)',
    description: 'Blog on physiotherapy, evidence-based medicine and pseudoscience in healthcare.',
    site: new URL('/en/', context.site),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/en/posts/${p.id}/`,
      categories: p.data.categories,
    })),
    customData: '<language>en-GB</language>',
  });
}
