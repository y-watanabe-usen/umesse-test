// To parse this data:
//
//   import { Convert, UserCMRequestItem } from "./file";
//
//   const userCMRequestItem = Convert.toUserCMRequestItem(json);

export interface UserCMRequestItem {
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
  public static toUserCMRequestItem(json: string): UserCMRequestItem {
    return JSON.parse(json);
  }

  public static userCMRequestItemToJson(value: UserCMRequestItem): string {
    return JSON.stringify(value);
  }
}
