export function getObfuscatedString(value: string): string {
  const globalScope = globalThis as any

  if (typeof globalScope !== "undefined"){
    const reversed = value.split("").reverse().join("")

    // Prefer the browser `btoa` when available (client-side).
    if (typeof globalScope.btoa === "function") {
      return globalScope.btoa(reversed)
    }

    // Fallback for Node/SSR environments using Buffer.
    if (typeof globalScope.Buffer === "function") {
      return globalScope.Buffer.from(reversed, "utf-8").toString("base64")
    }
  }

  throw new Error("No base64 encoder available in this environment.")
}
