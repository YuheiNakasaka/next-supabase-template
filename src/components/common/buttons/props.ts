import { ReactNode } from "react";

export type ChildNode = ReactNode | string;

export type ButtonProps = {
  children: ChildNode;
  disabled?: boolean;
  onClick: () => void;
};
