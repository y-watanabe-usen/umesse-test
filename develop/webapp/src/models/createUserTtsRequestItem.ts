// To parse this data:
//
//   import { Convert, CreateUserTtsRequestItem } from "./file";
//
//   const createUserTtsRequestItem = Convert.toCreateUserTtsRequestItem(json);

export interface CreateUserTtsRequestItem {
  id?: string;
  category?: string;
  details?: CreateUserTtsRequestDetailItem[];
}

export interface CreateUserTtsRequestDetailItem {
  title?: string;
  description?: string;
  lang?: string;
  manuscript?: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCreateUserTtsRequestItem(json: string): CreateUserTtsRequestItem {
    return JSON.parse(json);
  }

  public static createUserTtsRequestItemToJson(value: CreateUserTtsRequestItem): string {
    return JSON.stringify(value);
  }
}
