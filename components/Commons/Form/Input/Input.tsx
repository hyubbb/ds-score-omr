import AlertIcon from "@/components/Commons/Icons/AlertIcon";
import DeleteIcon from "@/components/Commons/Icons/DeleteIcon";
import { bgcolor, height, width } from "@/components/Commons/Style/Size";
import { TColor, TSize } from "@/types/styletypes";
import classNames from "classnames";
import { forwardRef, useImperativeHandle } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export interface IFormInput {
  name: string;
  rules?: any;
  type?: "text" | "number" | "password" | "email";
  label?: string;
  sizeW?: TSize;
  sizeH?: TSize;
  color?: TColor;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: boolean;
  className?: string;
  onKeyDown?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  max?: number;
  min?: number;
  deleteIcon?: boolean;
  alertIcon?: boolean;
  isErrorMessages?: boolean;
}

const Input = ({
  name,
  rules,
  sizeW = "M",
  sizeH = "XS",
  color = "white",
  label,
  type = "text",
  placeholder,
  className,
  disabled = false,
  autoComplete = false,
  onKeyDown,
  onKeyUp,
  max,
  min,
  deleteIcon = true,
  alertIcon = true,
  isErrorMessages = true,
}: IFormInput) => {
  const {
    register,
    resetField,
    control,
    formState: { errors },
  } = useFormContext();

  function getNestedErrorMessage(errors: any, name: string) {
    const nameParts = name.split(".");
    let nestedErrors = errors;
    nameParts.forEach((part) => {
      if (nestedErrors && nestedErrors[part]) {
        nestedErrors = nestedErrors[part];
      } else {
        nestedErrors = null;
      }
    });

    return nestedErrors ? nestedErrors.message : "";
  }
  const errorMessages = getNestedErrorMessage(errors, name);
  const hasError = !!(errors && errorMessages);

  const checkValue = useWatch({ control, name });

  const isLength = checkValue?.length > 0;

  const clearValue = () => {
    resetField(name, { keepError: true, defaultValue: "" });
  };

  return (
    <div className={classNames("flex flex-col gap-2", width[sizeW], className)}>
      {label && (
        <div>
          <span>{label}</span>
        </div>
      )}
      <div
        className={classNames(
          "relative flex flex-col",
          width[sizeW],
          height[sizeH],
          className,
        )}
      >
        <input
          id={name}
          max={max}
          min={min}
          disabled={disabled}
          aria-label={label}
          type={type}
          placeholder={placeholder}
          maxLength={rules?.maxLength?.value}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          autoComplete={autoComplete ? "off" : "on"}
          className={classNames(
            CommonConfig,
            width[sizeW],
            height[sizeH],
            hasError && "border-warning",
            disabled ? "bg-grayF1" : `${bgcolor[color]} hover:border-black`,
            "outline-none",
            className,
          )}
          {...(register && register(name, rules))}
        ></input>
        {!hasError && isLength && !disabled && deleteIcon && (
          <span
            className="absolute right-[10px] top-[50%] translate-y-[-50%]"
            onClick={() => clearValue()}
          >
            <DeleteIcon />
          </span>
        )}
        {hasError && alertIcon && (
          <span className="absolute right-[10px] top-[50%] translate-y-[-50%]">
            <AlertIcon />
          </span>
        )}
      </div>
      {hasError && isErrorMessages && (
        <span
          className="text-warning break-keep"
          key={`input_has_error_${hasError}`}
        >
          {errorMessages as string}
        </span>
      )}
    </div>
  );
};

export default Input;

const CommonConfig =
  "h-[40px] pl-[10px] pr-[10px] relative border-grayDB border rounded placeholder:text-gray-400 text-black";
