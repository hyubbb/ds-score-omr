import clsx from "clsx";
import Image from "next/image";
import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

export interface IIcon {
  title: string;
  style?: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  onClick?: (e: any) => void;
  size?: number;
}

export const Icon = ({ title, style, onClick, size = 24 }: IIcon) => {
  return (
    <Image
      className={clsx(onClick && "cursor-pointer", "aspect-square h-auto")}
      src={`/icons/icon_${title}.svg`}
      alt={`${title}아이콘`}
      style={style}
      onClick={onClick}
      width={size}
      height={size}
    />
  );
};
