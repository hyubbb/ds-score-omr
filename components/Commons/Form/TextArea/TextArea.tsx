import { bgcolor, width } from "@/components/Commons/Style/Size";
import { TColor, TSize } from "@/types/styletypes";
import classNames from "classnames";
import { useFormContext, useWatch } from "react-hook-form";
import DeleteIcon from "../../Icons/DeleteIcon";
import AlertIcon from "../../Icons/AlertIcon";

export interface IFormTextArea {
  name: string;
  size?: TSize;
  color?: TColor;
  placeholder?: string;
  rules?: any;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
}

const TextArea = ({
  name,
  rules,
  size = "M",
  color = "white",
  placeholder = "내용을 입력해주세요.",
  className,
  disabled = false,
  maxLength = 0,
}: IFormTextArea) => {
  const {
    register,
    control,
    resetField,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  const checkValue = useWatch({ control, name });

  const valueLength = checkValue?.length ? checkValue?.length : 0;

  const isLength = checkValue?.length > 0;

  const clearValue = () => {
    resetField(name, { keepError: true, defaultValue: "" });
  };

  return (
    <div
      className={classNames(
        "flex flex-col gap-2 whitespace-nowrap",
        width[size],
      )}
    >
      <div className={classNames("relative flex flex-col", width[size])}>
        <textarea
          wrap="hard"
          disabled={disabled}
          placeholder={placeholder}
          className={classNames(
            CommonAreaConfig,
            width[size],
            className,
            hasError && "border-warning",
            disabled ? "bg-grayF1" : `${bgcolor[color]} hover:border-black`,
            "outline-none",
          )}
          {...(register &&
            register(name, {
              ...rules,
              onChange: (e: any) => {
                maxLength > 0 &&
                  setValue(name, e.target.value.slice(0, maxLength));
              },
            }))}
        ></textarea>
        {!hasError && isLength && !disabled && (
          <span
            className="absolute bottom-[10px] right-[10px]"
            onClick={() => clearValue()}
          >
            <DeleteIcon />
          </span>
        )}
        {hasError && (
          <span className="absolute bottom-[10px] right-[10px]">
            <AlertIcon />
          </span>
        )}
      </div>

      <div
        className={classNames(
          width[size],
          "flex flex-row",
          hasError ? "justify-between" : "justify-end",
        )}
      >
        {hasError && (
          <span className="text-warning">- {errorMessages as string}</span>
        )}
        {maxLength > 0 && (
          <p className={"text-right"}>{`${valueLength}/${maxLength}자`}</p>
        )}
      </div>
    </div>
  );
};

export default TextArea;

const CommonAreaConfig =
  "h-[200px] p-[10px]  relative border-grayDB border rounded placeholder:text-gray-400 resize-none pr-[35px] text-pretty text-justify";
