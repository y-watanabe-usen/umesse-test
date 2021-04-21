// To parse this data:
//
//   import { Convert, GenerateUserTtsRequestItem } from "./file";
//
//   const generateUserTtsRequestItem = Convert.toGenerateUserTtsRequestItem(json);

export interface GenerateUserTtsRequestItem {
  id?: string;
  category?: string;
  details?: GenerateUserTtsRequestDetailItem[];
}

export interface GenerateUserTtsRequestDetailItem {
  text?: string;
  speaker?: string;
  lang?: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toGenerateUserTtsRequestItem(json: string): GenerateUserTtsRequestItem {
    return JSON.parse(json);
  }

  public static generateUserTtsRequestItemToJson(value: GenerateUserTtsRequestItem): string {
    return JSON.stringify(value);
  }
}
