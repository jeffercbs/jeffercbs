import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    videoId: z.string().optional(),
    cover: z.string().optional(),
    medium: z.string().optional(),
    tags: z.array(z.string()),
    type: z.string().default("article"),
    createdAt: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const ProjectsCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    image: z.string(),
    repo: z.string().optional(),
    link: z.string().optional(),
    cols: z.number().default(1).optional(),
    rows: z.number().default(1).optional(),
    tags: z.array(z.string()).optional(),
    type: z.string(),

    stack: z.object({
      framework: z.string(),
      case: z.string(),
      css: z.string(),
      database: z.string(),
      auth: z.string(),
      others: z.string().optional(),
    }),
    createdAt: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const coursesCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/data/courses" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: ProjectsCollection,
  courses: coursesCollection,
};
