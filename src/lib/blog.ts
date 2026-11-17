import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPosts(lang: Lang): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => data.lang === lang && !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postPath(post: BlogPost): string {
  const slug = post.id.replace(/^(en|es)\//, '');
  return post.data.lang === 'en' ? `/blog/${slug}/` : `/es/blog/${slug}/`;
}

export async function getAlternatePost(post: BlogPost): Promise<BlogPost | undefined> {
  const other: Lang = post.data.lang === 'en' ? 'es' : 'en';
  const posts = await getCollection('blog', ({ data }) => data.lang === other && !data.draft);
  return posts.find(
    (candidate) => candidate.id.replace(/^(en|es)\//, '') === post.data.translation,
  );
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-CO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date);
}
