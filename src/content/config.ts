import { defineCollection, z } from "astro:content"
import { file } from "astro/loaders"

export const technologySchema = z.object({
  id: z.string(),
  name: z.string(),
  link: z.string().url().optional(),
  sort: z.number(),
  type: z.enum([ "ai", "backend", "cloud", "frontend", "fullstack" ]),
})

export const collections = {
  technologies: defineCollection({
    loader: file("src/content/technologies.json"),
    schema: technologySchema,
  }),
}
