import React, { forwardRef, Ref, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/Commons/Style/DatePickerCustom.css";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { ko } from "date-fns/locale";
import clsx from "clsx";

interface ICustomInput {
  value?: string;
  onClick?: () => void;
}

interface CustomTimeInputProps {
  date: Date;
}

export interface ICalendar extends IUseForm {
  name: string;
  disabled?: boolean;
  isTime?: boolean;
  maxDate?: Date;
  minDate?: Date;
  startDate?: Date;
  endDate?: Date;
  className?: string;
  onClick?: (item?: any) => void;
  rules?: any;
}

export const Calendar = ({
  name,
  isTime,
  disabled,
  maxDate,
  minDate,
  startDate,
  endDate,
  className,
  onClick,
  rules,
}: ICalendar) => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
  } = useFormContext<FieldValues>();
  const { field } = useController({ control, name, rules });

  const selectedDate = getValues(name);

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  const range = (start: number, end: number, step = 1) => {
    let array = [];
    for (let i = start; i < end; ++i) {
      if (!(i % step)) {
        array.push(i);
      }
    }
    return array;
  };

  const years = range(1940, getYear(new Date()) + 5, 1);
  const months = range(1, 13, 1).map((item) =>
    String(item).length === 1 ? `0${item}` : String(item),
  );

  const CustomInput = forwardRef(
    ({ value, onClick }: ICustomInput, ref: Ref<HTMLButtonElement>) => (
      <>
        <button
          className={clsx(
            isTime ? "w-[250px]" : "w-[160px]",
            "flex h-[40px] items-center justify-between rounded border-[1px] pr-[10px] text-sm after:pt-1 after:content-[url('/icons/icon_calendar.svg')]",
            !disabled &&
              "bg-white hover:cursor-pointer hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:shadow-black focus:border-[2px] focus:border-black",
            disabled && "bg-grayF1 cursor-default",
            className,
            hasError ? "border-warning" : "border-grayDB",
          )}
          onClick={onClick}
          ref={ref as Ref<HTMLButtonElement>}
        >
          <div></div>
          {value}
        </button>
        {hasError && (
          <span className="text-warning" key={`calendar_has_error_${hasError}`}>
            - {errorMessages as string}
          </span>
        )}
      </>
    ),
  );
  CustomInput.displayName = "CustomInput";

  const CustomSelect = forwardRef(
    ({ value, onClick }: ICustomInput, ref: Ref<HTMLButtonElement>) => (
      <>
        <button
          className={clsx(
            isTime ? "w-[250px]" : "w-[160px]",
            "flex h-[40px] items-center justify-between rounded border-[1px] pr-[10px] text-sm after:pt-1 after:content-[url('/icons/icon_calendar.svg')]",
            !disabled &&
              "bg-white hover:cursor-pointer hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:shadow-black focus:border-[2px] focus:border-black",
            disabled && "bg-grayF1 cursor-default",
            className,
            hasError ? "border-warning" : "border-grayDB",
          )}
          onClick={onClick}
          ref={ref as Ref<HTMLButtonElement>}
        >
          <div></div>
          {value}
        </button>
        {hasError && (
          <span className="text-warning" key={`calendar_has_error_${hasError}`}>
            - {errorMessages as string}
          </span>
        )}
      </>
    ),
  );
  CustomSelect.displayName = "CustomSelect";

  const CustomTimeInput: React.FC<CustomTimeInputProps> = ({ date }) => {
    const [hour, setHour] = useState(date.getHours() % 12 || 12); // Handling 12-hour format
    const [minute, setMinute] = useState(date.getMinutes());
    const [period, setPeriod] = useState(date.getHours() >= 12 ? "PM" : "AM");

    const updateDate = (
      newHour: number,
      newMinute: number,
      newPeriod: string,
    ) => {
      const newDate = new Date(date);
      const adjustedHour =
        newPeriod === "PM" && newHour !== 12
          ? newHour + 12
          : newHour === 12 && newPeriod === "AM"
            ? 0
            : newHour;
      newDate.setHours(adjustedHour);
      newDate.setMinutes(newMinute);
      setValue(name, newDate);
    };

    const handleHourChange = (option: number) => {
      setHour(option);
      updateDate(option, minute, period);
    };

    const handleMinuteChange = (option: number) => {
      setMinute(option);
      updateDate(hour, option, period);
    };

    const handlePeriodChange = (option: string) => {
      updateDate(hour, minute, option);
    };

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const [isHourOpen, setIsHourOpen] = useState(false);
    const [isMinuteOpen, setIsMinuteOpen] = useState(false);
    const [isPeriodOpen, setIsPeriodOpen] = useState(false);

    const toggleHourDropdown = () => setIsHourOpen(!isHourOpen);
    const toggleMinuteDropdown = () => setIsMinuteOpen(!isMinuteOpen);
    const togglePeriodDropdown = () => setIsPeriodOpen(!isPeriodOpen);

    return (
      <div className="flex items-center gap-4 pl-[32px]">
        {/* Custom Hour Dropdown */}
        <div className="custom-select-wrapper relative">
          <div
            className={`custom-select flex h-[40px] w-[70px] cursor-pointer items-center justify-center gap-2 border bg-white ${
              isHourOpen ? "active" : ""
            }`}
            onClick={toggleHourDropdown}
          >
            {String(hour).padStart(2, "0")}
            <div
              className={clsx(
                "flex-shrink-0",
                "h-[14px] w-[14px] bg-[url('/icons/icon_arrow-down.svg')]",
                !isHourOpen && "rotate-180 transform",
              )}
            ></div>
          </div>
          {isHourOpen && (
            <div className="custom-select-list absolute left-0 right-0 top-full z-10 mt-1 max-h-[200px] overflow-y-auto border bg-white">
              {hours.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    handleHourChange(option);
                    setIsHourOpen(false);
                  }}
                  className="custom-select-option cursor-pointer px-2 py-1 hover:bg-gray-200"
                >
                  {String(option).padStart(2, "0")}
                </div>
              ))}
            </div>
          )}
        </div>
        :
        <div className="custom-select-wrapper relative">
          <div
            className={`custom-select flex h-[40px] w-[70px] cursor-pointer items-center justify-center gap-2 border bg-white ${
              isMinuteOpen ? "active" : ""
            }`}
            onClick={toggleMinuteDropdown}
          >
            {String(minute).padStart(2, "0")}
            <div
              className={clsx(
                "flex-shrink-0",
                "h-[14px] w-[14px] bg-[url('/icons/icon_arrow-down.svg')]",
                !isMinuteOpen && "rotate-180 transform",
              )}
            ></div>
          </div>
          {isMinuteOpen && (
            <div className="custom-select-list absolute left-0 right-0 top-full z-10 mt-1 max-h-[200px] overflow-y-auto border bg-white">
              {minutes.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    handleMinuteChange(option);
                    setIsMinuteOpen(false);
                  }}
                  className="custom-select-option cursor-pointer px-2 py-1 hover:bg-gray-200"
                >
                  {String(option).padStart(2, "0")}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="custom-select-wrapper relative">
          <div
            className={`custom-select flex h-[40px] w-[70px] cursor-pointer items-center justify-center gap-2 border bg-white ${
              isPeriodOpen ? "active" : ""
            }`}
            onClick={togglePeriodDropdown}
          >
            {period}
            <div
              className={clsx(
                "flex-shrink-0",
                "h-[14px] w-[14px] bg-[url('/icons/icon_arrow-down.svg')]",
                !isPeriodOpen && "rotate-180 transform",
              )}
            ></div>
          </div>
          {isPeriodOpen && (
            <div className="custom-select-list absolute left-0 right-0 top-full z-10 mt-1 max-h-[200px] overflow-y-auto border bg-white">
              {["AM", "PM"].map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    handlePeriodChange(option);
                    setIsPeriodOpen(false);
                  }}
                  className="custom-select-option cursor-pointer px-2 py-1 hover:bg-gray-200"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const filterPassedTime = minDate
    ? (time: Date) => {
        const currentDate = new Date(minDate);
        const selectedDate = new Date(time);
        return currentDate.getTime() <= selectedDate.getTime();
      }
    : undefined;

  const filterPassedDate = minDate
    ? (date: Date) => {
        const currentDate = new Date(minDate);
        const selectedDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        return currentDate.getTime() <= selectedDate.getTime();
      }
    : undefined;

  return (
    <DatePicker
      disabled={disabled}
      selected={selectedDate}
      onChange={(date: Date) => {
        setValue(`${name}.period`, "기간설정");
        setValue(name, date);
        onClick && onClick(date);
        clearErrors(name);
      }}
      customInput={<CustomInput />}
      customTimeInput={<CustomTimeInput date={selectedDate} />}
      showTimeInput={isTime}
      dateFormat={isTime ? "yyyy-MM-dd hh:mm aa" : "yyyy-MM-dd"}
      showTwoColumnMonthYearPicker={true}
      dropdownMode="scroll"
      filterDate={filterPassedDate}
      filterTime={filterPassedTime}
      timeIntervals={10}
      locale={ko}
      timeCaption="시간"
      timeFormat="HH : mm : ss"
      maxDate={maxDate}
      minDate={minDate}
      startDate={startDate}
      endDate={endDate}
      popperPlacement="bottom-start"
      popperClassName={"react-datepicker-popper"}
      renderCustomHeader={({
        date,
        changeYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex h-[56px] w-full justify-between bg-white px-4 py-2 text-sm">
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(Number(value))}
            className="h-[40px] w-[70px] appearance-none bg-[url('/icons/icon_arrow-down.svg')] bg-[80%_50%] bg-no-repeat px-2 py-[10px]"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="flex h-[40px] w-[70px] items-center justify-center px-2 py-[10px]">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="h-[16px] w-[16px] after:content-[url('/icons/icon_arrow-left-primary.svg')]"
            ></button>

            <div className="px-2">{months[getMonth(date)]}</div>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="h-[16px] w-[16px] after:content-[url('/icons/icon_arrow-right-primary.svg')]"
            ></button>
          </div>
        </div>
      )}
    />
  );
};
