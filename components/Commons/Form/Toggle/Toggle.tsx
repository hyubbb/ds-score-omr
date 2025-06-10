import classNames from "classnames";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import React from "react";
import { IUseForm } from "@/types/interface/common";

export interface IToggle extends IUseForm {
  disabled?: boolean;
}

export const Toggle = ({ name, disabled }: IToggle) => {
  const { control, getValues } = useFormContext<FieldValues>();
  const { field } = useController({ control, name, defaultValue: false });

  const isOn = getValues(name) ? true : false;

  return (
    <div
      className={classNames(
        ContainerConfig,
        BackgroundConfig[String(isOn) as keyof typeof BackgroundConfig],
      )}
    >
      <input
        name={name}
        disabled={disabled}
        type={"switch"}
        id={name}
        hidden
        onClick={() => field.onChange(!isOn)}
      />
      <label htmlFor={name} className={disabled ? "" : "cursor-pointer"}>
        <span
          className={classNames(
            TextCommonConfig,
            TextConfig[String(isOn) as keyof typeof TextConfig],
          )}
        >
          {isOn ? "ON" : "OFF"}
        </span>
        <span
          className={classNames(
            CircleCommonConfig,
            CircleConfig[String(isOn) as keyof typeof CircleConfig],
          )}
        />
      </label>
    </div>
  );
};

const ContainerConfig = "relative w-[65px] h-[25px] p-[3px] rounded-[15px]";

const BackgroundConfig = {
  true: "bg-white border-brand1 border-[1px] border-solid text-brand1",
  false: "bg-grayDB border-grayBF border-[1px] text-white border-solid",
};
const TextCommonConfig =
  "absolute text-primary-700 top-[3px] text-xs font-bold";
const TextConfig = {
  true: "left-[9px]",
  false: "right-[9px]",
};

const CircleCommonConfig =
  "absolute w-[30px] h-[30px] top-[-3px] rounded-[24px]";
const CircleConfig = {
  true: "right-[-1px] bg-brand1 border-brand1 border-[1px] border-solid",
  false: "left-[-1px] bg-white border-grayBF border-[1px] border-solid",
};
