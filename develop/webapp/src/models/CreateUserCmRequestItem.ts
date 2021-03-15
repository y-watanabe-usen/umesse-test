// To parse this data:
//
//   import { Convert, CreateUserCmRequestItem } from "./file";
//
//   const CreateUserCmRequestItem = Convert.toCreateUserCmRequestItem(json);

export interface CreateUserCmRequestItem {
  materials?: Materials;
}

export interface Materials {
  narrations?: Narration[];
  startChime?: StartChime,
  endChime?: EndChime;
  bgm?: Bgm;
}

export interface Bgm {
  id?: string;
  category?: string,
  volume?: number;
}

export interface EndChime {
  id?: string;
  category?: string,
  volume?: number;
}

export interface Narration {
  id?: string;
  category?: string
  volume?: number;
}

export interface StartChime {
  id?: string;
  category?: string,
  volume?: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCreateUserCmRequestItem(json: string): CreateUserCmRequestItem {
    return JSON.parse(json);
  }

  public static createUserCmRequestItemToJson(value: CreateUserCmRequestItem): string {
    return JSON.stringify(value);
  }
}
