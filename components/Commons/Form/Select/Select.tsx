"use client";

import { bgcolor, height, width } from "@/components/Commons/Style/Size";
import { CommonItems } from "@/types/interface/common";
import { TSize } from "@/types/styletypes";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

export interface ISelect {
  name: string;
  items: CommonItems[];
  defaultLabel?: string;
  rules?: any;
  disabled?: boolean;
  sizeW?: TSize;
  sizeH?: TSize;
  className?: string;
  onSubmit?: (item?: any) => void;
}

const FormSelect = ({
  name,
  defaultLabel,
  sizeW = "S",
  sizeH = "S",
  items,
  disabled = false,
  rules,
  className,
  onSubmit,
}: ISelect) => {
  const selectDiv = useRef<any>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({ control, name, rules });

  const selectValue = getValues(name);

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  useEffect(() => {
    const clickOutside = (evt: MouseEvent) => {
      if (selectDiv.current && !selectDiv.current.contains(evt.target as Node))
        setShowOptions(false);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [selectDiv]);

  return (
    <div
      className={classNames("relative flex flex-col", width[sizeW], className)}
      ref={selectDiv}
    >
      <button
        id={name}
        type="button"
        disabled={disabled}
        className={classNames(
          "text-gray70 w-full text-ellipsis rounded border px-[10px]",
          hasError && showOptions
            ? "border-black"
            : hasError && !showOptions
              ? "border-warning"
              : !hasError && showOptions
                ? "border-black"
                : "border-grayDB",
          !disabled ? "bg-white hover:border-black" : "bg-grayF1",
          height[sizeH],
        )}
        onClick={() => {
          if (!showOptions && !disabled && items.length > 0) {
            setShowOptions(true);
          } else if (showOptions) setShowOptions(false);
        }}
      >
        <div className="flex items-center justify-between">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {items?.find((i) => i.value === selectValue)?.label
              ? items?.find((i) => i.value === selectValue)?.label
              : defaultLabel &&
                  items?.find((i) => i.value === selectValue)?.label
                ? items?.find((i) => i.value === selectValue)?.label
                : defaultLabel}
          </span>

          <div
            className={classNames(
              "flex-shrink-0",
              "m-1 flex h-4 w-4 transform items-center justify-center bg-no-repeat",
              showOptions && "rotate-180",
            )}
          >
            <img
              src="/icons/icon_arrow-down.svg"
              className="h-3 w-3"
              alt="drag"
            />
          </div>
        </div>
      </button>
      {showOptions && (
        <ul
          className={classNames(
            "border-gray50 scrollable absolute z-30 max-h-[250px] overflow-auto rounded-b-[4px] border-b border-e border-s [&>*:last-child]:rounded-b-[4px]",
            width[sizeW],
            showOptions && "border-t-white",
            sizeH === "XS" ? "mt-[37px]" : "mt-[43px]",
          )}
        >
          {items?.map(({ label, value }: CommonItems, idx: number) => {
            return (
              <li
                key={`select-${idx}`}
                onClick={() => {
                  field.onChange(value);
                  setShowOptions(false);
                  onSubmit && onSubmit(value);
                }}
                className={classNames(
                  "cursor-pointer overflow-auto p-[10px] [&>*:last-child]:rounded-b-[4px]",
                  selectValue === value
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white hover:bg-[var(--primary)] hover:text-white",
                )}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
      {hasError && (
        <span className="text-warning" key={`select_has_error_${hasError}`}>
          - {errorMessages as string}
        </span>
      )}
    </div>
  );
};

export default FormSelect;
