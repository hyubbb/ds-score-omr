import { ReactNode } from "react";

export interface IGroupList {
  number: number;
  groupName: ReactNode;
  region: string;
  groupCode: number;
  status: string;
}
