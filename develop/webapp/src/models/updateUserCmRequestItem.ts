// To parse this data:
//
//   import { Convert, UpdateUserCMRequestItem } from "./file";
//
//   const updateUserCMRequestItem = Convert.toUpdateUserCMRequestItem(json);

export interface UpdateUserCmRequestItem {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  industry?: Industry;
  scene?: Scene;
  uploadSystem?: string;
  manuscript?: string;
}

export interface Industry {
  industryCd?: string;
  industryName?: string;
}

export interface Scene {
  sceneCd?: string;
  sceneName?: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toUpdateUserCmRequestItem(json: string): UpdateUserCmRequestItem {
    return JSON.parse(json);
  }

  public static updateUserCmRequestItemToJson(value: UpdateUserCmRequestItem): string {
    return JSON.stringify(value);
  }
}