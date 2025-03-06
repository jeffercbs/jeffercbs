import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean(),
    cover: z.string(),
    medium: z.string(),
    tags: z.array(z.string()),
    created: z
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
    color: z.string().optional().default("gray"),
    type: z.string(),
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
