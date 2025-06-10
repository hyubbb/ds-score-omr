import classNames from "classnames";
import Spinner from "@/components/Commons/Spinner/Spinner";

export interface IData {
  title: string;
  value: string | React.ReactNode;
  required?: boolean;
  description?: string; // 컬럼 사용에 대한 부가 설명이 필요한 경우
  isHidden?: boolean; // 해당 컬럼 자체를 조건부 렌더링하고 싶은 경우, hidden이 되는 조건 전달
}

export interface IRowTable {
  data: IData[];
  className?: string;
  isLoading?: boolean;
}

export const RowTable = ({ data, isLoading, className }: IRowTable) => {
  return (
    <div className={classNames("relative w-full border-t-2", className)}>
      {isLoading && <Spinner />}
      {data.map((item) => {
        if (!item.isHidden) {
          return (
            <div
              className="border-grayDB flex border-b-[1px] border-l-[1px] text-sm"
              key={item.title}
            >
              <div className="border-grayDB bg-brand1/10 flex w-[150px] shrink-0 items-center whitespace-pre-line border-r-[1px] px-[15px] py-5 font-medium">
                {item.required && <span className="text-warning mr-1">*</span>}
                {item.title}
              </div>

              <div className="border-grayDB flex grow flex-col gap-2 border-r-[1px] px-[15px] py-5">
                {item.value}
                {item.description && (
                  <span className="text-gray70">- {item.description}</span>
                )}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
