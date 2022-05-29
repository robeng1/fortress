import * as flat from "flat"
import { Theme } from "typings/theme/theme"
import { getCustomizableSections } from "utils/get-customizable-sections"
import { parseSection } from "utils/parse-section"

export interface CustomizableSectionAsOption {
  name?: string
  identifier?: string
}
export interface CustomizableSectionWithParsedJson {
  name?: string
  identifier?: string
  parsed: Record<string, any>
}

export interface MappedTheme {
  selects: CustomizableSectionWithParsedJson[]
  locale: Record<string, any>
}

const getRenderables = (theme: Theme): MappedTheme => {
  const sections = theme.sections || []
  const dls = theme.locales?.filter(
    (l) => l.symbol === "en.default.schema.json"
  )[0]
  const fl = flat.flatten(dls?.t) as Record<string, any>
  const customizables = getCustomizableSections(sections)
  const parsedWithSelects: CustomizableSectionWithParsedJson[] = []

  customizables.forEach((section) => {
    const parsed = parseSection(section.content)
    parsedWithSelects.push({
      name: fl[parsed.name.replace("t:", "")],
      identifier: section.identifier,
      parsed,
    })
  })
  return { selects: parsedWithSelects, locale: fl }
}
