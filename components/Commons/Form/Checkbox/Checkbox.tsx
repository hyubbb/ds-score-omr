import { CommonItems, IUseForm } from "@/types/interface/common";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FieldValues, useController, useFormContext } from "react-hook-form";

export interface IFormCheckbox extends IUseForm {
  items: CommonItems[];
  disabled?: boolean;
  isAllCheckBox?: boolean;
  isAllDefault?: boolean;
  isLimited?: number;
  onChange?: (item?: any) => void;
}

const Checkboxes = ({
  items,
  name,
  rules,
  disabled = false,
  isAllCheckBox = false,
  isAllDefault = false,
  isLimited,
  onChange,
}: IFormCheckbox) => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<FieldValues>();

  const { field } = useController({
    control,
    name,
    rules,
  });

  const fileArray = getValues(name);
  const [selectAllChecked, setSelectAllChecked] =
    useState<boolean>(isAllDefault);
  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  const toggleSelectAll = (checked: boolean) => {
    setSelectAllChecked(checked);

    if (checked) {
      const allItemValues = items.map((item) => item.value);
      field.onChange(allItemValues);
      setValue(name, allItemValues);
      onChange && onChange(allItemValues);
    } else {
      field.onChange([]);
      setValue(name, []);
      onChange && onChange([]);
    }
  };

  const handleCheckboxChange = (value: string | number, checked: boolean) => {
    const valueCopy = [...fileArray];

    if (valueCopy.length < (isLimited ? isLimited : Infinity) && checked) {
      // 선택한 값이 이미 배열에 있다면 제거
      if (valueCopy.includes(value)) {
        const filteredArray = valueCopy.filter((v) => v !== value);
        field.onChange(filteredArray);
        setValue(name, filteredArray);
        onChange && onChange(filteredArray);
      } else {
        // 선택한 값이 배열에 없다면 추가 (비어있지 않은 값만 추가)
        if (value !== "") {
          valueCopy.push(value);
          field.onChange(valueCopy);
          setValue(name, valueCopy);
          onChange && onChange(valueCopy);
        }
      }
    } else {
      // 체크를 해제할 때는 해당 값 제거
      const filteredArray = valueCopy.filter((v) => v !== value);
      field.onChange(filteredArray);
      setValue(name, filteredArray);
      onChange && onChange(filteredArray);
    }

    const allChecked = valueCopy.every(
      (v) => v !== null && !v?.length && v !== undefined,
    );

    if (items?.length === fileArray?.length) {
      setSelectAllChecked(allChecked);
    } else {
      setSelectAllChecked(false);
    }
  };

  useEffect(() => {
    if (fileArray?.length <= 0) {
      setSelectAllChecked(false);
    }

    if (fileArray?.length === items.length) {
      setSelectAllChecked(true);
    }
  }, [fileArray]);

  return (
    <>
      <div className={clsx(`w-full`, "flex flex-wrap gap-4")} id={name}>
        {isAllCheckBox && (
          <div className="flex cursor-pointer items-center gap-2">
            <input
              onChange={(e) => toggleSelectAll(e.target.checked)}
              id={"allCheckBox"}
              checked={selectAllChecked}
              type="checkbox"
              disabled={disabled}
              className="hidden cursor-pointer [&:checked+label]:bg-[url('/icons/icon_check-focus.svg')]"
            />
            <label
              className="block h-[16px] w-[16px] cursor-pointer bg-[url('/icons/icon_check-default.svg')] hover:bg-[url('/admin/icon/icon_check-hover.svg')]"
              htmlFor={"allCheckBox"}
            ></label>
            <label
              htmlFor={"allCheckBox"}
              ref={field.ref}
              className="cursor-pointer"
            >
              전체
            </label>
          </div>
        )}
        {items?.map(({ label, value }: CommonItems) => (
          <div
            key={value}
            className={clsx(
              "flex items-center gap-2",
              disabled ? "cursor-not-allowed" : "cursor-pointer",
            )}
          >
            <input
              onChange={(e) => {
                handleCheckboxChange(value, e.target.checked);
              }}
              id={`${name}_${value}_${label}`}
              disabled={disabled}
              key={value}
              checked={fileArray?.includes(value)}
              type="checkbox"
              value={value}
              className={clsx(
                "hidden [&:checked+label]:bg-[url('/icons/icon_check-focus.svg')]",
                disabled ? "cursor-not-allowed" : "cursor-pointer",
              )}
            />
            <label
              className={clsx(
                "block h-[16px] min-w-[16px] bg-[url('/icons/icon_check-default.svg')]",
                disabled
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-[url('/icons/icon_check-hover.svg')]",
              )}
              htmlFor={`${name}_${value}_${label}`}
            ></label>
            <label
              htmlFor={`${name}_${value}_${label}`}
              ref={field.ref}
              className={clsx(
                "h-fit min-h-[16px] shrink-0 whitespace-pre-wrap leading-[22px]",
                "text-[#050505]",
                !disabled && "cursor-pointer",
              )}
            >
              {label}
            </label>
          </div>
        ))}
      </div>
      {hasError && (
        <span className="text-warning1">- {errorMessages as string}</span>
      )}
    </>
  );
};

export default Checkboxes;
