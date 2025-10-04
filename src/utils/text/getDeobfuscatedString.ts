export function getDeobfuscatedString(value: string): string {
  const globalScope = globalThis as any

  if (typeof globalScope !== "undefined") {
    let decoded = ""

    // Prefer the browser `atob` when available (client-side).
    if (typeof globalScope.atob === "function") {
      decoded = globalScope.atob(value)
    }

    // Fallback for Node/SSR environments using Buffer.
    if (typeof globalScope.Buffer === "function") {
      decoded = globalScope.Buffer.from(value, "base64").toString("utf-8")
    }

    if (decoded) {
      return decoded.split("").reverse().join("")
    }
  }

  throw new Error("No base64 decoder available in this environment.")
}
