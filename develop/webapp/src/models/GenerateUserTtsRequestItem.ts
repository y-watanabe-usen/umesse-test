// To parse this data:
//
//   import { Convert } from "./file";
//
//   const generateUserTtsRequestItem = Convert.toGenerateUserTtsRequestItem(json);

export interface GenerateUserTtsRequestItem {
  text: string;
  lang: string;
  speaker: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toGenerateUserTtsRequestItem(json: string): GenerateUserTtsRequestItem[] {
    return JSON.parse(json);
  }

  public static generateUserTtsRequestItemToJson(value: GenerateUserTtsRequestItem[]): string {
    return JSON.stringify(value);
  }
}
