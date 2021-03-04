type lang = "ja" | "en" | "zh" | "ko"
type speaker = "0" | "1"

export interface TemplateDetailItem {
  text: string;
  lang: lang;
  speaker: speaker;
}