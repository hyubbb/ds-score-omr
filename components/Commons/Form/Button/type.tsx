export type variantType =
  | "defaultOutlineLight"
  | "defaultOutline"
  | "defaultOutlineBold"
  | "secondary"
  | "primaryFill"
  | "primaryOutline"
  | "defaultBlack"
  | "defaultGray";

export type sizeType =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "exlg"
  | "ex2lg"
  | "fit"
  | "full";

export interface IButton {
  type?: "button" | "reset" | "submit";
  label: string;
  variant: variantType;
  size: sizeType;
  disabled?: boolean;
  iconUrl?: string;
  onClick?: (e?: any) => void;
  isSelected?: boolean;
  className?: string;
  autoFocus?: boolean;
}
