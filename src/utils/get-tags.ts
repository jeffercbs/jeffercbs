import type { CollectionEntry } from "astro:content";

type articleType = CollectionEntry<"blog">;

export function filterUniqueTopics(articles: articleType[]) {
  const uniqueTags = new Set<string>();
  articles.forEach(({ data: { tags } }) => {
    tags.forEach((tag) => uniqueTags.add(tag));
  });

  return Array.from(uniqueTags);
}

export function filterTop10Topics(articles: articleType[]) {
  const tagCount = new Map<string, number>();

  articles.forEach(({ data: { tags } }) => {
    tags.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1]);
}

export function filterArticlesByTags(topic: string, articles: articleType[]) {
  return articles.filter(({ data: { tags } }) => tags.includes(topic));
}
