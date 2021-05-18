import { CmItem } from "umesseapi/models/cm-item";

export interface CreateUserCmResponseItem extends CmItem {
  url?: string;
  progress?: number;
}