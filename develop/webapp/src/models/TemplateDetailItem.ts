export type lang = "ja" | "en" | "zh" | "ko"
export type speaker = "0" | "1"

export interface TemplateDetailItem {
  text: string;
  lang: lang;
  speaker: speaker;
}