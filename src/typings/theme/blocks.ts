export interface Settings {
  [key: string]: any;
}
export interface Section {
  name: string;
  type: string;
  settings: Settings;
  blocks: Record<string, Section>;
  block_order: string[];
}
export interface JSONTemplate {
  sections: Record<string, Section>;
  order: string[];
}
