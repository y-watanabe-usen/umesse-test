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
  startChime?: StartChime;
  endChime?: EndChime;
  bgm?: Bgm;
}

export interface Bgm {
  contentsId?: string;
  volume?: number;
}

export interface EndChime {
  contentsId?: string;
  volume?: number;
}

export interface Narration {
  contentsId?: string;
  volume?: number;
}

export interface StartChime {
  contentsId?: string;
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
