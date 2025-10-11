import type { NavItem, RouteMap } from "@types"

export function convertRouteMapToNavItems(
  routeMap: RouteMap,
  translate?: (key: string) => string,
): Array<NavItem> {
  const result: Array<NavItem> = []

  for (const [ key, value ] of Object.entries(routeMap)) {
    if (key === "_") {
      continue
    }

    const label = translate?.(key) || key

    if (typeof value !== "string") {
      result.push({
        items: convertRouteMapToNavItems(value, translate),
        label,
        url: value["_"] as string | undefined,
      })
    } else {
      result.push({ label, url: value })
    }
  }

  return result
}
