export const SUPPORTED_LOCALES: Array<string> = [ "en" ]

export const DEFAULT_LOCALE: typeof SUPPORTED_LOCALES[number] = "en"

export async function useTranslations(lang: typeof SUPPORTED_LOCALES[number] = DEFAULT_LOCALE) {
  const { default: locale } = (
    SUPPORTED_LOCALES.includes(lang)
      ? await import(`../../locales/${lang}.json`)
      : { default: {} }
  )

  return function t(key: string, ...args: Array<string | Record<string, string>>): string {
    let result = key.split(".").reduce((r, x) => r?.[x], locale)

    if (result && args.length) {
      return replaceAllPlaceholders(result, args)
    }

    return result ?? key
  }
}

function replaceAllPlaceholders(value: string, args: Array<string | Record<string, string>>): string {
  return (
    typeof args[0] === "object"
      ? replaceNamedPlaceholders(value, args[0] as Record<string, string>)
      : replaceIndexedPlaceholders(value, args as Array<string>)
  )
}

function replaceIndexedPlaceholders(value: string, args: Array<string>): string {
  return value.replace(/\{\{(\d+)\}\}/g, (m: string, i: number) => args[i] ?? m)
}

function replaceNamedPlaceholders(value: string, dict: Record<string, string>): string {
  return value.replace(/\{\{(\w+)\}\}/g, (m: string, k: string) => dict[k] ?? m)
}
