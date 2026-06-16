import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postSchema = z.object({
  title: z.string(),
  date: z.iso.datetime({ offset: true }),
  description: z.string(),
});

export type Post = z.infer<typeof postSchema>;

const projectSchema = z.object({
  path: z.string().optional(),
  date: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string().optional(),
  cover: z.string(),
  thumbnail: z.string(),
  agency: z
    .object({
      name: z.string(),
      url: z.string(),
    })
    .optional(),
  roles: z.array(z.string()).optional(),
  open_source: z
    .object({
      name: z.string(),
      url: z.string(),
    })
    .optional(),
  year: z.string().optional(),
  gallery: z.array(z.string()),
  visit: z
    .object({
      url: z.string(),
      label: z.string(),
    })
    .optional(),
});

export type Project = z.infer<typeof projectSchema>;

export const collections = {
  posts: defineCollection({
    loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
    schema: postSchema,
  }),
  projects: defineCollection({
    loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
    schema: projectSchema,
  }),
};
