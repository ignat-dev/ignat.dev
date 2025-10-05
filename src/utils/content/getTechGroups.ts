import type { TechGroup } from "@types"
import { getCollection } from "astro:content"

export async function getTechGroups(): Promise<Array<TechGroup>> {
  return (
    (await getCollection("technologies"))
      .reduce((result, { data: { type, ...item } }) => {
        const group = result.find((x) => x.type === type)

        if (!group) {
          result.push({ type, items: [ item ] })
        } else {
          group.items.push(item)
        }

        return result
      }, [] as Array<TechGroup>)
      .map((group) => {
        group.items.sort((x, y) => x.sort - y.sort)

        return group
      })
  )
}
