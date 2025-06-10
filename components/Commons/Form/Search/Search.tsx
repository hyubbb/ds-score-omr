"use client";

import Input from "@/components/Commons/Form/Input/Input";
import { TSize } from "@/types/styletypes";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { height, width } from "../../Style/Size";
import Button from "../Button/Button";

export const Search = ({
  name,
  targetName,
  placeholder,
  service,
  printData,
  baseBody,
  sizeW = "M",
  sizeH = "XS",
  disabled,
  errorMessage,
  onClick,
  onDelete,
  buttonLabel,
  data,
  isRequired = true,
  showOptionsList = true,
}: {
  name: string;
  targetName: string;
  printData: (item: any) => React.ReactNode;
  service?: any;
  placeholder?: string;
  baseBody?: any;
  sizeW?: TSize;
  sizeH?: TSize;
  disabled?: boolean;
  errorMessage?: string;
  onClick?: (item?: any) => void;
  onDelete?: (item?: any) => void;
  buttonLabel?: string;
  data?: any;
  isRequired?: boolean;
  showOptionsList?: boolean;
}) => {
  const autoRef = useRef<HTMLUListElement>(null);
  const scrollRef = useRef<any>(null);
  const selectDiv = useRef<any>(null);
  const [autoIndex, setAutoIndex] = useState<number>(-1);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [nowData, setNowData] = useState<any[]>([]); // 현재 검색 데이터
  const [resultData, setResultData] = useState<any>(); // 검색 결과 데이터
  const [initWordData, setInitWordData] = useState<any[]>(); // 독립적인 초기 데이터
  const [isSelected, setIsSelected] = useState(false); // 값을 선택했는지 여부 관리

  const { getValues, resetField, control } = useFormContext();
  const { field } = useController({ control, name: targetName });

  // `data`가 변경될 때마다 `initWordData`와 `nowData`를 초기화
  useEffect(() => {
    if (data) {
      setInitWordData(data); // 초기 데이터 설정
      setNowData(data); // 현재 데이터도 초기화
    }
  }, [data]);

  const targetSelect = (idx: number) => {
    if (nowData[idx]) {
      const clickedItem = nowData[idx];
      setResultData(clickedItem);
      field.onChange(clickedItem.id);
      resetField(name, {
        keepError: false,
        defaultValue: clickedItem.vocaOriginal,
      });
    } else {
      setResultData(getValues(name));
      field.onChange(getValues(name));
    }
    setShowOptions(false);
    setIsSelected(true); // 선택된 값으로 변경
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!isSelected) {
        targetSelect(autoIndex);
        setIsSelected(true);
        onClick?.(resultData || getValues(name));
      } else {
        setIsSelected(false);
      }
    }

    if (showOptions && nowData?.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          setAutoIndex((prevIndex) =>
            Math.min(prevIndex + 1, nowData.length - 1),
          );
          autoRef.current?.scrollTo({
            top: (autoIndex + 1) * 40, // 리스트 항목 높이 기준으로 스크롤
            behavior: "smooth",
          });
          break;
        case "ArrowUp":
          setAutoIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          autoRef.current?.scrollTo({
            top: (autoIndex - 1) * 40,
            behavior: "smooth",
          });
          break;
        case "Escape":
          setNowData([]);
          setAutoIndex(-1);
          setShowOptions(false);
          break;
        case "Backspace":
          if (getValues(name) === "") {
            setNowData(initWordData || []);
            setAutoIndex(-1);
            setShowOptions(true); // 전체 데이터 표시
          }
          break;
        default:
          break;
      }
    }
  };

  const targetSearch = (keyword: string) => {
    const result = initWordData?.filter((item: any) =>
      item.vocaOriginal.includes(keyword),
    );
    setNowData(result || []);
  };

  useEffect(() => {
    // 검색 결과 데이터 업데이트 hook
    if (getValues(name) === "") {
      setNowData(initWordData || []); // 초기화
    } else {
      targetSearch(getValues(name)); // 검색 수행
    }
  }, [getValues(name)]);

  return (
    <>
      <div
        className={classNames(
          "relative flex justify-between gap-4",
          width[sizeW],
        )}
        ref={selectDiv}
      >
        {/* <div className="flex flex-row items-center"> */}
        {/* {!disabled && (
            <button
              type="button"
              className="absolute right-[10px] top-[50%] translate-y-[-50%]"
              onClick={() => {
                resetField(name, { keepError: false, defaultValue: "" });
                resetField(targetName, {
                  keepError: false,
                  defaultValue: "",
                });
                setResultData(null);
                onDelete && onDelete();
              }}
            >
              <DeleteIcon />
            </button>
          )} */}

        <Input
          name={name}
          type="text"
          placeholder={placeholder}
          sizeW={sizeW}
          sizeH={sizeH}
          autoComplete={true}
          disabled={disabled}
          rules={{
            required: isRequired
              ? errorMessage
                ? errorMessage
                : "필수값입니다."
              : false,
            onChange: (e: any) => {
              const value = e.target.value;
              if (value === "") {
                // 입력값이 빈 문자열일 경우 초기화
                setAutoIndex(-1);
                setIsSelected(false); // 선택 상태 초기화
                setShowOptions(false); // 검색 결과 닫기
                setNowData(initWordData || []); // 전체 데이터 초기화
                resetField(targetName, {
                  keepError: false,
                  defaultValue: "", // targetName 필드 초기화
                });
                setResultData(null); // 선택된 결과 데이터 초기화
              } else {
                // 입력값이 있을 경우 검색 수행
                // targetSearch(value);
                setShowOptions(true);
              }
            },
          }}
          onKeyDown={handleKeyDown}
        />
        {/* </div> */}

        {showOptionsList &&
          showOptions &&
          getValues(name) !== "" &&
          !disabled && (
            <ul
              ref={autoRef}
              className={classNames(
                showOptions &&
                  "border-grayDB roundScrollable absolute left-0 top-[56px] z-[50] flex max-h-[200px] flex-col overflow-auto rounded border-b border-e border-s border-t shadow-2xl",
                width[sizeW],
              )}
            >
              {nowData?.length > 0 ? (
                <>
                  {nowData.map((data, idx) => {
                    return (
                      <li
                        ref={autoIndex === idx - 1 ? scrollRef : undefined}
                        key={`select-${idx - 1}`}
                        onClick={(e) => {
                          e.preventDefault();
                          targetSelect(idx);
                        }}
                        className={classNames(
                          "cursor-pointer p-[10px] hover:bg-gray-300",
                          autoIndex === idx ? "bg-gray-300" : "bg-white",
                        )}
                      >
                        {printData(data)}
                      </li>
                    );
                  })}
                </>
              ) : (
                <li
                  className={classNames(
                    "flex items-center justify-center p-[10px]",
                    "bg-white text-center",
                  )}
                >
                  데이터가 존재하지 않습니다.
                </li>
              )}
            </ul>
          )}
        {buttonLabel && (
          <Button
            label={buttonLabel}
            variant="defaultBlack"
            size="lg"
            className="h-[40px]"
            onClick={onClick}
          />
        )}
      </div>
    </>
  );
};
