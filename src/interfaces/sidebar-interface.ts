import { ReactNode } from "react";

export type ItemWithChildren = {
  titlePage: string;
  iconPage?: ReactNode;
  linkPage: string;
  children?: ItemWithoutChildren[];
};

export type ItemWithoutChildren = {
  titlePage: string;
  linkPage: string;
  iconPage?: ReactNode;
};