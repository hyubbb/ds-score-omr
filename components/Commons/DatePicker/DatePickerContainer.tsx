import Button from "@/components/Commons/Form/Button/Button";
import { Calendar } from "@/components/Commons/DatePicker/Calendar";
import { IUseForm, PeriodType } from "@/types/interface/common";
import { FieldValues, useController, useFormContext } from "react-hook-form";

export interface IDatePickerContainer extends IUseForm {
  periodList?: PeriodType[];
  isTotal?: boolean;
  isToday?: boolean;
  isFuture?: boolean;
  disabled?: boolean;
  isMain?: boolean;
  isDateTime?: boolean; //YYYY-MM-DD hh:mm
}

export const DatePickerContainer = ({
  periodList = ["오늘", "1개월", "3개월", "기간설정"],
  isMain = false,
  isToday = false,
  isTotal = false,
  isFuture = false,
  isDateTime = true,
  disabled,
  name,
}: IDatePickerContainer) => {
  const { control, setValue, getValues } = useFormContext<FieldValues>();
  const { field } = useController({
    control,
    name,
    defaultValue: {
      start_at: null,
      end_at: null,
      period: null,
    },
  });
  const date = getValues(name) || {
    start_at: null,
    end_at: null,
    period: null,
  };

  const handleTime = (period: string) => {
    // 같은 버튼을 다시 클릭했을 경우 선택 해제
    if (date.period === period) {
      setValue(name, {
        search_start_date: new Date("2024-01-01 00:00"),
        search_end_date: new Date(),
        period: null,
      });
      return;
    }

    let startDate: Date;
    let endDate: Date;

    switch (period) {
      case "오늘":
        startDate = endDate = new Date();
        break;
      case "1개월":
        startDate = isFuture
          ? new Date()
          : new Date(new Date().setMonth(new Date().getMonth() - 1));
        endDate = isFuture
          ? new Date(new Date().setMonth(new Date().getMonth() + 1))
          : new Date();
        break;
      case "3개월":
        startDate = isFuture
          ? new Date()
          : new Date(new Date().setMonth(new Date().getMonth() - 3));
        endDate = isFuture
          ? new Date(new Date().setMonth(new Date().getMonth() + 3))
          : new Date();
        break;
      case "전체":
        startDate = new Date("2023-01-01");
        endDate = new Date();
        break;
      case "기간설정":
        startDate = new Date("2025-01-01 00:00");
        endDate = new Date();
        break;
      case "일":
        startDate = endDate = new Date();
        break;
      default:
        return;
    }

    setValue(
      name,
      isDateTime
        ? {
            search_start_date_time: startDate,
            search_end_date_time: endDate,
            period: period,
          }
        : {
            search_start_date: startDate,
            search_end_date: endDate,
            period: period,
          },
    );
  };

  return (
    <>
      {periodList && (
        <div className="flex flex-row gap-2">
          <span className="text-brand3 subtitle mr-4 flex items-center">
            기간
          </span>
          {isToday && (
            <Button
              label={"오늘"}
              size="md"
              variant="defaultOutlineLight"
              onClick={() => handleTime("오늘")}
              isSelected={date?.period === "오늘"}
            />
          )}
          {isMain
            ? ["일", "주", "월", "기간설정"]?.map((item) => {
                return (
                  <Button
                    key={item}
                    label={item}
                    size="md"
                    variant="defaultOutlineLight"
                    onClick={() => handleTime(item)}
                    isSelected={date?.period === item}
                  />
                );
              })
            : periodList?.map((item) => {
                return (
                  <Button
                    key={item}
                    label={item}
                    size="md"
                    variant="defaultOutlineLight"
                    onClick={() => handleTime(item)}
                    isSelected={date?.period === item}
                  />
                );
              })}
          {isTotal && (
            <Button
              label={"전체"}
              size="md"
              variant="defaultOutlineLight"
              onClick={() => handleTime("전체")}
              isSelected={date?.period === "전체"}
            />
          )}
        </div>
      )}
      {date.period === "기간설정" && (
        <div className="flex grow flex-row items-center gap-2">
          <Calendar
            name={
              isDateTime
                ? `${name}.search_start_date_time`
                : `${name}.search_start_date`
            }
            disabled={disabled}
            startDate={
              isDateTime
                ? date?.search_start_date_time
                : date?.search_start_date
            }
            endDate={
              isDateTime ? date?.search_end_date_time : date?.search_end_date
            }
            maxDate={
              isDateTime ? date?.search_end_date_time : date?.search_end_date
            }
            isTime={isDateTime}
          />
          <div>~</div>
          <Calendar
            name={
              isDateTime
                ? `${name}.search_end_date_time`
                : `${name}.search_end_date`
            }
            disabled={disabled}
            startDate={
              isDateTime
                ? date?.search_start_date_time
                : date?.search_start_date
            }
            endDate={
              isDateTime ? date?.search_end_date_time : date?.search_end_date
            }
            minDate={
              isDateTime
                ? date?.search_start_date_time
                : date?.search_start_date
            }
            isTime={isDateTime}
          />
        </div>
      )}
    </>
  );
};
