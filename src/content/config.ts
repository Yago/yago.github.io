// eslint-disable-next-line import/no-unresolved
import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  date: z.string().datetime({ offset: true }),
  description: z.string(),
});

export type Post = z.infer<typeof postSchema>;

export const posts = {
  posts: defineCollection({
    type: 'content',
    schema: postSchema,
  }),
};

const projectSchema = z.object({
  path: z.string(),
  published: z.boolean(),
  date: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
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
  visit: z.object({
    url: z.string(),
    label: z.string(),
  }),
});

export type Project = z.infer<typeof projectSchema>;

export const projects = {
  posts: defineCollection({
    type: 'content',
    schema: projectSchema,
  }),
};
