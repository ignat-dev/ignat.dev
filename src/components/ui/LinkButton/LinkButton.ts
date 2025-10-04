import { getDeobfuscatedString } from "@utils/text"

export class LinkButton extends HTMLAnchorElement {
  constructor() {
    super()
    this.addEventListener("click", this.onClick)
  }

  private onClick(event: Event) {
    const target = event.currentTarget as HTMLAnchorElement
    const href = target.getAttribute("href")
    const data = target.getAttribute("data-href")

    if (!href?.startsWith("#") || !data) {
      return
    }

    target.setAttribute("href", getDeobfuscatedString(data))
    target.removeEventListener("click", this.onClick)
  }
}
