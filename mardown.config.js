import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import remarkToc from "remark-toc";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";

const markdownConfig = {
  rehypePlugins: [
    rehypeHeadingIds,
    rehypeSlug,
    [
      rehypeToc,
      {
        headings: ["h1", "h2", "h3"],
        cssClasses: {
          toc: "toc-post",
          link: "toc-link",
        },
      },
    ],
    [rehypeAutolinkHeadings, { behavior: "append" }],
  ],
  remarkPlugins: [
    remarkReadingTime,
    [remarkToc, { tight: true, ordered: true, maxDepth: 3 }],
  ],
};
export default markdownConfig;
