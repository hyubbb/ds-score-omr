import Spinner from "@/components/Commons/Spinner/Spinner";
import FormSelect from "@/components/Commons/Form/Select/Select";
import classNames from "classnames";
import Button from "@/components/Commons/Form/Button/Button";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export interface IData {
  title: string;
  value: string | React.ReactNode;
  label?: string;
  required?: boolean;
  description?: string; // 컬럼 사용에 대한 부가 설명이 필요한 경우
  isHidden?: boolean; // 해당 컬럼 자체를 조건부 렌더링하고 싶은 경우, hidden이 되는 조건 전달
}

export interface IOption {
  label: string;
  value: string | number;
}

export interface IRowTable {
  data: IData[];
  className?: string;
  isLoading?: boolean;
  options?: any;
}

const RowTable = ({ data, options, isLoading, className }: IRowTable) => {
  const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({}); // 각 필드별 수정 상태 관리
  const { watch, setValue } = useFormContext();

  // 각 필드의 선택 값을 독립적으로 관리
  const selectedSubjects = {
    first: watch("course1"),
    second: watch("course2"),
  };

  // 선택과목 옵션 배열 반{options}
  const getOptionsForSubject = (title: string) => {
    // 선택과목이 2개일 때
    // if (title.includes("1선택")) {
    //   return options as IOption[];
    // }
    // if (title.includes("2선택")) {
    //   return options as IOption[];
    // }
    // // 선택과목이 1개일 때
    // if (title.includes("선택과목")) {
    //   return (options as IOption[]) || [];
    // }
    return (options as IOption[]) || [];
    // return [];
  };

  // 선택과목 useForm필드 이름 반환
  const getFieldName = (title: string) => {
    // 선택과목이 2개일 때
    if (title.includes("제1")) return "course1";
    if (title.includes("제2")) return "course2";
    // 선택과목이 1개일 때
    if (title.includes("선택과목")) return "course";
    return "";
  };

  // 선택과목 값에 맞는 watch 값 반환
  const getSelectedSubject = (title: string) => {
    const fieldName = getFieldName(title);
    const value = watch(fieldName);

    return options?.find((opt: any) => opt.value == value)?.label;
  };

  return (
    <div className={classNames("relative w-full border-t-2", className)}>
      {isLoading && <Spinner />}
      {data.map((item) => {
        if (!item.isHidden) {
          const fieldName = getFieldName(item.title);
          const isEditing = isEdit[fieldName];

          return (
            <div
              className="border-grayDB flex border-b-[1px] border-l-[1px] text-sm"
              key={item.title}
            >
              <div className="border-grayDB bg-brand1/10 flex w-[150px] shrink-0 items-center whitespace-pre-line border-r-[1px] px-[15px] py-5 font-medium">
                {item.required && <span className="text-warning mr-1">*</span>}
                {item.title}
              </div>

              <div className="flex grow flex-col gap-2 border-r-[1px] px-[15px] py-5">
                {item.title.includes("선택") ? (
                  <div className="flex items-center gap-4 whitespace-nowrap">
                    {isEditing ? (
                      // 수정 모드인 경우
                      <FormSelect
                        name={fieldName}
                        defaultLabel={item.value as string}
                        items={options as IOption[]}
                        sizeW="S"
                        sizeH="XS"
                      />
                    ) : (
                      // 수정 모드가 아닌 경우
                      <span>
                        {/* 여기서 item.value는 items의 선택과목의 value 인데 label의 개념으로 사용되고,
                            보여주는 문자열이고, 
                          초기값의 진짜 value는 defaultValues에 있는 값이다.
                        */}
                        {getSelectedSubject(item.title)}
                      </span>
                    )}
                    <Button
                      size={isEditing ? "sm" : "xs"}
                      variant="defaultOutlineBold"
                      label={isEditing ? "저장" : "수정"}
                      onClick={() => {
                        if (isEditing) {
                          // 저장 시, react-hook-form에 값 저장
                          setValue(fieldName, watch(fieldName));
                        }
                        setIsEdit((prev) => ({
                          ...prev,
                          [fieldName]: !isEditing,
                        }));
                      }}
                    />
                  </div>
                ) : (
                  // 선택과목이 아닌 다른 응시정보 ( 성명, 생년월일, 수험번호, 성별 )
                  item.value
                )}

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

export default RowTable;
