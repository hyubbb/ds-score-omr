import { CommonItems } from "@/types/interface/common";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

export interface IFormRadio {
  name: string;
  items: CommonItems[];
  rules?: any;
  disabled?: boolean;
}

const Radio = ({ name, rules, items, disabled }: IFormRadio) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <div className="flex flex-row flex-wrap gap-[10px]">
        {items?.map(({ label, value, disabled }: CommonItems) => (
          <div
            key={value}
            className={clsx(
              ContainerCommonConfig,
              !disabled && "cursor-pointer",
            )}
          >
            <input
              id={label}
              type="radio"
              value={value}
              disabled={disabled}
              {...register(name, rules)}
              className={clsx(HiddenInputConfig, !disabled && "cursor-pointer")}
            />

            <label
              htmlFor={label}
              className={clsx(
                SizeCommonConfig,
                TriggerCommonConfig,
                !disabled &&
                  "cursor-pointer hover:bg-[url('/icons/icon_radio-hover.svg')]",
              )}
            ></label>
            <label
              htmlFor={label}
              className={clsx(!disabled && "cursor-pointer")}
            >
              {label}
            </label>
          </div>
        ))}
      </div>
      {hasError && (
        <span className="text-warning">- {errorMessages as string}</span>
      )}
    </>
  );
};

export default Radio;

const ContainerCommonConfig = "flex items-center gap-2";

const HiddenInputConfig =
  "hidden [&:checked+label]:bg-[url('/icons/icon_radio-focus.svg')]";

const SizeCommonConfig = "w-[16px] h-[16px]";

const TriggerCommonConfig = " bg-[url('/icons/icon_radio-default.svg')]";
