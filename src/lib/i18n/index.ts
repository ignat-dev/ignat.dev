export const SUPPORTED_LOCALES: Array<string> = [ "en" ]

export const DEFAULT_LOCALE: typeof SUPPORTED_LOCALES[number] = "en"

type ArgType = string | number | ((key: string) => string)

export async function useTranslations(lang: typeof SUPPORTED_LOCALES[number] = DEFAULT_LOCALE) {
  const { default: locale } = (
    SUPPORTED_LOCALES.includes(lang)
      ? await import(`../../locales/${lang}.json`)
      : { default: {} }
  )

  return function t<T = ArgType>(key: string, ...args: Array<T | Record<string, T>>): string {
    let result = key.split(".").reduce((r, x) => r?.[x], locale)

    if (result && args.length) {
      return replaceAllPlaceholders(result, args)
    }

    return result ?? key
  }
}

function replaceAllPlaceholders<T>(value: string, args: Array<T | Record<string, T>>): string {
  return (
    typeof args[0] === "object"
      ? replaceNamedPlaceholders<T>(value, args[0] as Record<string, T>)
      : replaceIndexedPlaceholders<T>(value, args as Array<T>)
  )
}

function replaceIndexedPlaceholders<T>(value: string, args: Array<T>): string {
  return value.replace(/\{\{(\d+)\}\}/g, (m: string, i: number) => getPlaceholderValue(args[i], i) ?? m)
}

function replaceNamedPlaceholders<T>(value: string, dict: Record<string, T>): string {
  return value.replace(/\{\{(\w+)\}\}/g, (m: string, k: string) => getPlaceholderValue(dict[k], k) ?? m)
}

function getPlaceholderValue<T>(arg: T, key: string | number): string {
  if (typeof arg === "string") {
    return arg
  }

  if (typeof arg === "number") {
    return arg.toString()
  }

  if (typeof arg === "function") {
    return arg(`${key}`)?.toString() ?? ""
  }

  return ""
}
