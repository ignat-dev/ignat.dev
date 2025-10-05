import type { technologySchema } from "@content/config"
import type { z } from "astro:content"

export interface TechGroup {
  items: Array<Omit<z.infer<typeof technologySchema>, "type">>
  type: z.infer<typeof technologySchema>["type"]
}
