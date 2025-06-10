import classNames from "classnames";
import Image from "next/image";

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

const Button = ({
  type = "button",
  label,
  variant,
  size,
  disabled = false,
  iconUrl = "",
  onClick,
  isSelected = false,
  className,
  autoFocus = false,
}: IButton) => {
  return (
    <button
      type={type}
      className={classNames(
        CommonConfig,
        SizeConfig[size],
        disabled ? DisabledConfig[variant] : VariantConfig[variant],
        iconUrl && "flex items-center gap-2 align-middle",
        isSelected && SelectedConfig[variant],
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      autoFocus={autoFocus}
    >
      {iconUrl && (
        <Image src={iconUrl} alt="버튼 아이콘" width={24} height={24} />
      )}
      {label}
    </button>
  );
};

export default Button;

const CommonConfig = "text-sm rounded-[5px] border-[1px]";

const SizeConfig = {
  xs: "w-[55px] h-[25px] text-xs",
  sm: "w-[110px] h-[40px]",
  md: "w-[120px] h-[40px]",
  lg: "w-[140px] h-[40px]",
  exlg: "w-[170px] h-[40px]",
  ex2lg: "w-[180px] h-[50px]",
  fit: "h-[40px] px-2",
  full: "w-full h-[40px]",
};

const VariantConfig = {
  defaultOutlineLight:
    "border-grayDB bg-white hover:shadow-black hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:font-bold",
  defaultOutline:
    "border-gray70 bg-white hover:shadow-black hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:font-bold",
  defaultBlack:
    " bg-[var(--gray)] hover:shadow-black  hover:font-bold text-white",
  defaultGray:
    "border-[var(--border-gray2)] bg-[var(--bg-gray)] hover:shadow-black hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:font-bold text-black",
  defaultOutlineBold:
    "border-2 border-black bg-white font-bold hover:bg-black hover:text-white",
  secondary:
    "bg-[var(--bg-gray)] border-radius-[5px] border-[1px] border-solid border-[#DBDBDB]",
  primaryFill: "bg-[var(--primary)] text-white hover:font-bold",
  primaryOutline:
    "border-[var(--primary)] bg-white text-[var(--primary)] font-medium hover:bg-[var(--primary)] hover:text-white hover:font-bold",
};

const DisabledConfig = {
  defaultOutlineLight: "bg-grayF1 border-grayDB text-grayBF cursor-not-allowed",
  defaultOutline: "bg-grayF1 border-grayDB text-grayBF cursor-not-allowed",
  defaultBlack: "bg-grayF1 border-grayDB text-grayBF cursor-not-allowed",
  defaultGray: "bg-grayF1 border-grayDB text-grayBF cursor-not-allowed",
  defaultOutlineBold:
    "bg-white border-grayBF border-2 font-bold text-grayBF cursor-not-allowed",
  secondary: "bg-grayBF border-grayBF font-bold text-white cursor-not-allowed",
  primaryFill:
    "bg-grayBF border-grayBF font-bold text-white cursor-not-allowed",
  primaryOutline:
    "bg-white border-grayBF border-1 font-medium text-grayBF cursor-not-allowed",
};

const SelectedConfig = {
  defaultOutlineLight:
    "border-grayDB bg-white shadow-black shadow-[0_0_0_1px_rgba(0,0,0,0.1)] font-bold cursor-default",
  defaultOutline:
    "border-gray70 bg-white shadow-black shadow-[0_0_0_1px_rgba(0,0,0,0.1)] font-bold cursor-default",
  defaultOutlineBold:
    "border-2 border-black bg-white font-bold bg-black text-white cursor-default",
  secondary:
    "text-white border-gray50 bg-gray50 font-bold border-black bg-black cursor-default",
  primaryFill:
    "border-brand1 bg-brand1 text-white font-bold border-brand2 bg-brand2 cursor-default",
  primaryOutline:
    "border-brand1 bg-white text-brand1 font-medium bg-brand1 text-white cursor-default",
  defaultBlack: "border-black bg-[var(--gray)] text-white cursor-default",
  defaultGray:
    "border-[var(--border-gray)] bg-[var(--bg-gray)] text-black cursor-default",
};
