import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean(),
    cover: z.string(),
    medium: z.string(),
    created: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const ProjectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    repo: z.string(),
  }),
});

const coursesCollection = defineCollection({
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
