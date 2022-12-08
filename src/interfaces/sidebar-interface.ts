import { ReactNode } from "react";

export interface Item {
  titlePage: string;
  linkPage: string;
  iconPage?: ReactNode;
}

export interface ItemWithChildren extends Item {
  children?: Item[];
}