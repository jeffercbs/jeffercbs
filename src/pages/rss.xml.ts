import { getI18n } from "@/i18n";
import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";

const i18n = getI18n({ currentLocale: "es" });
type blogTypes = CollectionEntry<"blog">;

export async function GET(context: any) {
  const blog: blogTypes[] = await getCollection("blog");

  return rss({
    title: i18n.TITLE_SEO,
    description: i18n.DESCRIPTION_SEO,
    site: context.site,
    items: blog.map(({ data, id }) => ({
      title: data.title,
      pubDate: data.createdAt,
      description: data.description,
      link: `${context.site}/blog/p/${id}`,
    })),
  });
}
