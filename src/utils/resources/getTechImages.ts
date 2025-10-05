export function getTechImages(): Record<string, string> {
  const svgModules = import.meta.glob("/public/images/tech/*.svg", {
    eager: true,
    import: "default",
    query: "?raw",
  }) as Record<string, string>

  return Object.entries(svgModules).reduce((result, [ path, data ]) => {
    const fileName = path.split("/").pop()!.replace(".svg", "")

    if (fileName) {
      result[fileName] = data
    }

    return result
  }, {} as Record<string, string>)
}
