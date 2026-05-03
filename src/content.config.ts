import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const seoSchema = z.object({
    title: z.string().min(5).max(120).optional(),
    description: z.string().max(160).optional(),
    video: z
        .object({
            src: z.string().url()
        })
        .optional(),
    image: z
        .object({
            src: z.string(),
            alt: z.string().optional()
        })
        .optional(),
    pageType: z.enum(['website', 'article']).default('website')
});

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        publishDate: z
            .string()
            .or(z.date())
            .transform((val) => new Date(val)),
        draft: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        medium: z.string().url().optional(),
        seo: seoSchema.optional()
    })
});

const pages = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
    schema: z.object({
        title: z.string(),
        seo: seoSchema.optional()
    })
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        publishDate: z.coerce.date(),
        isFeatured: z.boolean().default(true),
        link: z.string().url().optional(),
        repo: z.string().url().optional(),
        seo: seoSchema.optional()
    })
});

export const collections = { blog, pages, projects };
