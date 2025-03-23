import type { CollectionEntry } from "astro:content";

type articleType = CollectionEntry<"blog">;

export function filterUniqueTopics(articles: articleType[]) {
  const uniqueTags = new Set<string>();
  articles.forEach(({ data: { tags } }) => {
    tags.forEach((tag) => uniqueTags.add(tag));
  });

  return Array.from(uniqueTags);
}

export function filterArticlesByTags(topic: string, articles: articleType[]) {
  return articles.filter(({ data: { tags } }) => tags.includes(topic));
}
