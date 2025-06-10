import { IColumns } from "@/types/interface/common";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import Spinner from "@/components/Commons/Spinner/Spinner";

export interface IColTable {
  columns: IColumns[];
  items: any[];
  isCheckBox?: boolean;
  isNumber?: boolean;
  isScroll?: boolean;
  baseNumber?: number;
  name?: string;
  checkboxId?: string;
  tableKey?: number | string;
  emptyMessage?: string;
  // no와 함께 링크 이동
  isNumberLink?: {
    pathname: string;
    slug: string;
    querystring?: string[];
  };
  // 넘버없이 링크 이동
  isRowLink?: {
    pathname: string;
    slug: string;
    querystring?: string[];
    handler?: (item: any) => void;
  };
  isLoading?: boolean;
  className?: string;
  borderTopLine?: boolean;
  headerBgColor?: string; // 헤더 배경색 프롭스 추가
  isSearch?: boolean;
  setIsActiveUniversity?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectUniversity?: React.Dispatch<
    React.SetStateAction<{
      universityName: string;
      universityCode: string;
    }>
  >;
  setSelectDepartment?: React.Dispatch<
    React.SetStateAction<{
      departmentName: string;
      departmentCode: string;
    }>
  >;
  codeTitle?: string;
}

const ColTable = ({
  name,
  columns,
  items,
  isCheckBox = false,
  isNumber = true,
  isScroll = false,
  baseNumber = 0,
  checkboxId,
  tableKey = 0,
  emptyMessage = "데이터가 존재하지 않습니다.",
  isNumberLink,
  isRowLink,
  isLoading,
  className,
  borderTopLine = true,
  headerBgColor,
  isSearch,
  setIsActiveUniversity,
  setSelectUniversity,
  setSelectDepartment,
  codeTitle,
}: IColTable) => {
  const { control, getValues } = useFormContext<FieldValues>();
  const { append, replace } = useFieldArray({
    control,
    name: name || "",
  });

  // 체크된 항목 ID의 배열
  const idList = (name && getValues(name)) || [];

  // let average = 0;

  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const onChangeAll = (evt: any) => {
    setSelectAllChecked(evt.target.checked);
    if (evt.target.checked) {
      const ids = items?.map((item) =>
        checkboxId ? item[checkboxId] : item.id,
      );
      replace([...ids]);
    } else {
      replace([]);
    }
  };

  const onChangeEach = (evt: any, id: any) => {
    if (evt.target.checked) {
      append(id);
    } else {
      replace(idList?.filter((checkedId: any) => checkedId !== id));
    }
  };

  useEffect(() => {
    if (idList?.length >= items?.length && items?.length !== 0) {
      setSelectAllChecked(true);
      // 체크된 항목의 배열 갯수가 조회된 항목의 갯수보다 작거나, 체크된 항목의 배열 갯수가 0이면 전체체크 해제
    } else if (idList?.length < items?.length || idList?.length === 0) {
      setSelectAllChecked(false);
    }
  }, [idList, items]);

  // if (items?.length === 0) {
  //   const totalWidth = columns.reduce((sum, column) => {
  //     return sum + (column.width || 0);
  //   }, 0);

  //   average = Math.floor(totalWidth / columns.length);
  // }

  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const handleRowClick = (item: any) => {
    if (codeTitle === "university") {
      setSelectedCode(item.universityCode);
      setSelectUniversity?.({
        universityName: item.universityName,
        universityCode: item.universityCode,
      });
      setIsActiveUniversity?.(true);
    } else if (codeTitle === "department") {
      setSelectedCode(item.departmentCode);
      setSelectDepartment?.({
        departmentName: item.departmentName,
        departmentCode: item.departmentCode,
      });
    }
  };

  return (
    <div
      className={classNames(
        borderTopLine && "border-t-2 border-black",
        isScroll && "oveflow-y-auto max-h-[300px]",
        className,
      )}
    >
      <table className={classNames("voca w-full table-auto")}>
        <thead>
          <tr className={classNames(isScroll && "sticky left-0 right-0 top-0")}>
            {isCheckBox && (
              <th
                className={classNames(
                  headerBgColor || "bg-brand1/10",
                  "h-[40px] whitespace-pre-line px-0 pb-[12px] pt-[10px]",
                )}
                style={{ width: "50px" }}
              />
            )}
            {isNumber && (
              <th
                className={classNames(
                  headerBgColor || "bg-brand1/10",
                  "h-[40px] whitespace-pre-line px-0 pb-[12px] pt-[10px]",
                )}
                style={{ width: "60px" }}
              >
                번호
              </th>
            )}
            {columns?.map((column, idx) => (
              <th
                className={classNames(
                  headerBgColor || "bg-brand1/10",
                  "h-[40px] whitespace-pre-line px-0 pb-[12px] pt-[10px]",
                )}
                key={`table-th-${idx}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            <tr>
              <td
                colSpan={
                  columns.length + (isCheckBox ? 1 : 0) + (isNumber ? 1 : 0)
                }
                className="w-full py-10 text-center"
              >
                <div className="relative min-h-[104px]">
                  <Spinner />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {items?.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (isCheckBox ? 1 : 0) + (isNumber ? 1 : 0)
                  }
                  className="w-full py-10 text-center"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              items?.map((item, idx) => (
                <tr
                  id={item.id ? item.id : undefined}
                  onClick={() => handleRowClick(item)}
                  key={`table-tr-td-${idx}`}
                  className={`border-grayD9 border-b p-2 first:border-t ${
                    selectedCode === item[codeTitle + "Code"]
                      ? "bg-blue-200"
                      : "bg-white"
                  }`}
                >
                  {isCheckBox && (
                    <td className="check text-center">
                      <input
                        id={`tableCheckEach-${tableKey}-${idx}`}
                        type="checkbox"
                        value={checkboxId ? item[checkboxId] : item?.id}
                        className="hidden"
                      />
                    </td>
                  )}
                  {isNumber && (
                    <td className="text-center">{baseNumber + idx + 1}</td>
                  )}
                  {columns.map((column, colIdx) => {
                    const depth1 = column?.name[0];
                    const depth2 = column?.name[1];
                    if (column.name[0] === "status") {
                      // 상태 처리
                      return (
                        <td
                          key={`table-td-${colIdx}`}
                          className="px-2 pb-[10px] pt-[9px] text-center"
                        >
                          {item.status}
                        </td>
                      );
                    } else if (column.name[0] === "apply") {
                      // 응시하기 처리
                      return (
                        <td
                          key={`table-td-${colIdx}`}
                          className="px-2 pb-[10px] pt-[9px] text-center"
                        >
                          {item.saveData}
                        </td>
                      );
                    }
                    return (
                      <td
                        key={`table-td-${colIdx}`}
                        className={`px-2 pb-[10px] pt-[9px] text-center ${depth1 === "name" && "mockExamName"} ${depth1 === "grade" && "grade"}`}
                      >
                        {depth2 ? item[depth1][depth2] : item[depth1] || "-"}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ColTable;
