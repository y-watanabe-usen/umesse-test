// To parse this data:
//
//   import { Convert } from "./file";
//
//   const createUserTtsRequestItem = Convert.toCreateUserTtsRequestItem(json);

export interface CreateUserTtsRequestItem {
  title: string;
  description?: string;
  lang: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCreateUserTtsRequestItem(json: string): CreateUserTtsRequestItem[] {
    return JSON.parse(json);
  }

  public static createUserTtsRequestItemToJson(value: CreateUserTtsRequestItem[]): string {
    return JSON.stringify(value);
  }
}
