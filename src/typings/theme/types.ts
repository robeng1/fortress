export interface PageSettings {
  [key: string]: any
}

export interface PageBlock {
  id?: string
  type: string
  disabled: boolean
  settings: PageSettings
}

export interface PageSection {
  id?: string
  type: string
  settings: PageSettings
  disabled: boolean
  blocks: Record<string, PageBlock>
  block_order: string[]
}
export interface PageTemplate {
  sections: Record<string, PageSection>
  order: string[]
}

export interface SelectOption {
  label: string
  value: string
}

export interface SettingsType {
  type?: string
  id?: string
  default?: any
  label?: string
  options?: SelectOption[]
  info?: string
  content?: string
  min?: number
  max?: number
  step?: number
  unit?: string
  placeholder?: string
  accept?: string[]
}

export interface BlockType {
  type: string
  name: string
  settings: SettingsType[]
}

export interface SchemaType {
  name?: string
  tag?: string
  class?: string
  settings?: SettingsType[]
  blocks?: BlockType[]
  max_blocks?: number
}

export interface ConfigSchemaType {
  name?: string
  settings?: SettingsType[]
}
