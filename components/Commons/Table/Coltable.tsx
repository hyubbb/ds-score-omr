import { IColumns } from "@/types/interface/common";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import Spinner from "../Spinner/Spinner";
import { useRouter } from "next/navigation";

export interface IColTable {
  columns: IColumns[];
  items: any[];
  isCheckBox?: boolean;
  isNumber?: boolean;
  isScroll?: boolean;
  isXScroll?: boolean;
  baseNumber?: number;
  name?: string;
  checkboxId?: string;
  checkboxId2?: string;
  tableKey?: number | string;
  emptyMessage?: string;
  isNumberName?: string;
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
    afterPathname?: string;
    handler?: (item: any) => void;
    columnName?: string;
  };
  isLoading?: boolean;
  className?: string;
  borderTopLine?: boolean;
  headerBgColor?: string; // 헤더 배경색 프롭스 추가
  checkWithFullData?: boolean; // ✅ 선택한 항목의 전체 데이터 저장 여부(체크박스)
}

const ColTable = ({
  name,
  columns,
  items,
  isCheckBox = false,
  isNumber = true,
  isNumberName = "No.",
  isScroll = false,
  isXScroll = false,
  baseNumber = 0,
  checkboxId,
  checkboxId2,
  tableKey = 0,
  emptyMessage = "데이터가 존재하지 않습니다.",
  isNumberLink,
  isRowLink,
  isLoading,
  className,
  borderTopLine = true,
  headerBgColor,
  checkWithFullData = false,
}: IColTable) => {
  const { control, getValues } = useFormContext<FieldValues>();
  const { append, replace } = useFieldArray({
    control,
    name: name || "",
  });
  const router = useRouter();

  // 체크된 항목 ID의 배열
  const idList = (name && getValues(name)) || [];

  // let average = 0;

  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const onChangeAll = (evt: any) => {
    setSelectAllChecked(evt.target.checked);

    if (evt.target.checked) {
      if (checkboxId && checkboxId2) {
        // checkboxId와 checkboxId2가 있으면 해당 키만 저장
        const ids = items?.map((item) => ({
          [checkboxId]: item[checkboxId],
          [checkboxId2]: item[checkboxId2],
        }));
        replace([...ids]);
      } else if (checkWithFullData) {
        // checkWithFullData가 true이면 모든 데이터 저장
        replace([...items]);
      } else {
        // 기본적으로 checkboxId가 있으면 해당 ID만 저장
        const ids = items?.map((item) =>
          checkboxId ? item[checkboxId] : item.id,
        );
        replace([...ids]);
      }
    } else {
      // 전체 선택 해제 시 초기화
      replace([]);
    }
  };

  const onChangeEach = (evt: any, id: any, item: any) => {
    if (evt.target.checked) {
      if (checkWithFullData) {
        // checkWithFullData가 true면 전체 데이터를 저장
        append(item);
      } else if (checkboxId && checkboxId2) {
        // checkboxId & checkboxId2가 있으면 해당 속성만 저장
        append({
          [checkboxId]: item[checkboxId],
          [checkboxId2]: item[checkboxId2],
        });
      } else {
        // 기본적으로 ID만 저장
        append(id);
      }
    } else {
      // 체크 해제 시
      if (checkWithFullData) {
        // checkWithFullData가 true면 전체 데이터 중 ID가 일치하는 항목 제거
        replace(idList?.filter((list: any) => list.id !== item.id));
      } else if (checkboxId && checkboxId2) {
        // checkboxId & checkboxId2가 있는 경우 해당 키 값만 저장된 항목 제거
        replace(idList?.filter((list: any) => list[checkboxId] !== id));
      } else {
        // ID만 저장하는 경우 해당 ID를 필터링해서 제거
        replace(idList?.filter((checkedId: any) => checkedId !== id));
      }
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

  return (
    <div
      className={classNames(
        borderTopLine && "border-t-2 border-black",
        isScroll && "oveflow-y-auto max-h-[300px]",
        isXScroll && "overflow-x-auto",
        className,
      )}
    >
      <table className={classNames("voca w-full table-auto")}>
        <colgroup>
          {isCheckBox && (
            <col key={`table-col-ck-${tableKey}`} width={"50px"} />
          )}
          {isNumber && <col key={`table-col-no-${tableKey}`} width={"60px"} />}
          {columns?.map((column, idx) => {
            return (
              <col
                key={`table-col-${idx}`}
                // width={
                //   // average === 0 && column.width
                //   //   ? column.width + "px"
                //   //   : average !== 0 && column.width
                //   //   ? average + "px"
                //   //   : ""
                //   column.width + "px"
                // }
                width={`${column.width}px`}
              />
            );
          })}
        </colgroup>
        <thead>
          <tr className={classNames(isScroll && "sticky left-0 right-0 top-0")}>
            {isCheckBox && (
              <th
                className="bg-brand1/10 h-[40px] whitespace-nowrap px-0 pb-[12px] pt-[10px]"
                style={{
                  width: "50px",
                }}
              >
                <div className="m-0 flex items-center justify-center border-r p-0">
                  <input
                    id={`tableCheckAll-${tableKey}`}
                    type="checkbox"
                    onChange={(e) => onChangeAll(e)}
                    checked={selectAllChecked}
                    className="hidden [&:checked+label]:bg-checkbox-focus"
                  />
                  <label
                    htmlFor={`tableCheckAll-${tableKey}`}
                    // className="bg-checkbox-default hover:bg-checkbox-hover block h-[16px] w-[16px]"
                    className="block h-[16px] w-[16px] bg-checkbox-default hover:bg-checkbox-hover"
                  />
                </div>
              </th>
            )}
            {isNumber && (
              <th
                className="bg-brand1/10 h-[40px] whitespace-nowrap px-0 pb-[12px] pt-[10px]"
                style={{
                  width: "60px",
                }}
              >
                <div className="border-grayDB flex items-center justify-center border-r">
                  {isNumberName ? isNumberName : "No."}
                </div>
              </th>
            )}
            {columns?.map((column, idx) => {
              return (
                <th
                  className={classNames(
                    headerBgColor || "bg-brand1/10", // 기본값을 설정하고, 프롭스가 있으면 해당 값 사용
                    "h-[40px] whitespace-pre-line px-0 pb-[12px] pt-[10px]",
                  )}
                  key={`table-th-${idx}`}
                  // style={{
                  //   width: column.width,
                  // }}
                >
                  <div
                    className={
                      idx + 1 === columns.length ? "" : "border-grayDB border-r"
                    }
                  >
                    {column.header}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            <tr>
              <td
                colSpan={
                  isCheckBox && isNumber
                    ? columns.length + 2
                    : isCheckBox
                      ? columns.length + 1
                      : isNumber
                        ? columns.length + 1
                        : columns.length
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
          <>
            {Array.isArray(items) && (
              <tbody className="">
                {items?.length === 0 && (
                  <tr>
                    <td
                      colSpan={
                        isCheckBox && isNumber
                          ? columns.length + 2
                          : isCheckBox
                            ? columns.length + 1
                            : isNumber
                              ? columns.length + 1
                              : columns.length
                      }
                      className="w-full py-10 text-center"
                    >
                      <div className="flex min-h-[104px] flex-row items-center justify-center">
                        <p>{emptyMessage}</p>
                      </div>
                    </td>
                  </tr>
                )}
                {items?.map((item, idx) => {
                  // 여기서 depth1 체크를 제거
                  return (
                    <tr
                      key={`table-tr-td-${idx}`}
                      className={classNames(
                        "hover:bg-brand2/20 border-grayD9 border-b bg-inherit first:border-t",
                        idList?.includes(item?.id) && "bg-brand2/20",
                      )}
                      // tr의 onClick 이벤트 제거
                    >
                      {isCheckBox && (
                        <td className="check text-center">
                          <div className="flex items-center justify-center">
                            <input
                              id={`tableCheckEach-${tableKey}-${idx}`}
                              type="checkbox"
                              value={
                                checkboxId
                                  ? item[checkboxId] || ""
                                  : item?.id || ""
                              }
                              onChange={(evt) =>
                                onChangeEach(
                                  evt,
                                  checkboxId ? item[checkboxId] : item?.id,
                                  item,
                                )
                              }
                              checked={
                                checkWithFullData
                                  ? idList?.some(
                                      (checkedItem: any) =>
                                        checkedItem.id === item.id,
                                    ) // 전체 데이터를 저장하는 경우, id 기준으로 비교
                                  : checkboxId && checkboxId2
                                    ? idList?.some(
                                        (checkedItem: any) =>
                                          checkedItem[checkboxId] ===
                                            item[checkboxId] &&
                                          checkedItem[checkboxId2] ===
                                            item[checkboxId2],
                                      )
                                    : idList?.includes(
                                        checkboxId
                                          ? item[checkboxId]
                                          : item?.id,
                                      )
                              }
                              className={`hidden [&:checked+label]:bg-checkbox-focus`}
                            />
                            <label
                              htmlFor={`tableCheckEach-${tableKey}-${idx}`}
                              className="block h-[16px] w-[16px] bg-checkbox-default hover:bg-checkbox-hover"
                            />
                          </div>
                        </td>
                      )}
                      {isNumber && (
                        <td className="text-center">
                          {isNumberLink ? (
                            <Link
                              className="flex cursor-pointer items-center justify-center underline underline-offset-4"
                              href={{
                                pathname: `${isNumberLink.pathname}/${
                                  item[isNumberLink.slug]
                                }`,
                              }}
                            >
                              {baseNumber - idx}
                            </Link>
                          ) : (
                            <div className="flex items-center justify-center">
                              {baseNumber - idx}
                            </div>
                          )}
                        </td>
                      )}
                      {columns?.map((column, colIdx) => {
                        const depth1 = column?.name[0];
                        const depth2 = column?.name[1];

                        // 각 컬럼별로 클릭 가능 여부 체크
                        const isClickable =
                          isRowLink && isRowLink.columnName === depth1;

                        if (column.link) {
                          const _querystring =
                            column?.link?.querystring?.reduce((acc, cur) => {
                              return { ...acc, tab: [cur] };
                            }, {});
                          return column.link.url ? (
                            <td
                              key={`table-td-${colIdx}`}
                              className="px-2 pb-[10px] pt-[9px] text-center"
                              onClick={(e) => {
                                if (isClickable) {
                                  e.stopPropagation();
                                  router.push(
                                    `${isRowLink.pathname}/${item[isRowLink.slug]}${
                                      isRowLink.afterPathname
                                        ? `/${isRowLink.afterPathname}`
                                        : ""
                                    }`,
                                  );
                                  if (isRowLink?.handler) {
                                    isRowLink.handler(item);
                                  }
                                }
                              }}
                              style={{
                                cursor: isClickable ? "pointer" : "default",
                              }}
                            >
                              {item[column.link.url] !== "" ? (
                                <Link
                                  target={"_blank"}
                                  href={`https://${item[column.link.url]}`}
                                  className={
                                    depth2
                                      ? item[depth1][depth2]?.length >= 10
                                        ? "ellipsis1 cursor-pointer underline underline-offset-4"
                                        : "cursor-pointer underline underline-offset-4"
                                      : item[depth1]?.length >= 10
                                        ? "ellipsis1 cursor-pointer underline underline-offset-4"
                                        : "cursor-pointer underline underline-offset-4"
                                  }
                                  scroll={true}
                                >
                                  {depth2
                                    ? item[depth1][depth2]
                                    : item[depth1] || "-"}
                                </Link>
                              ) : (
                                <span>
                                  {depth2
                                    ? item[depth1][depth2]
                                    : item[depth1] || "-"}
                                </span>
                              )}
                            </td>
                          ) : (
                            <td
                              key={`table-td-${colIdx}`}
                              className="px-2 pb-[10px] pt-[9px] text-center"
                              onClick={(e) => {
                                if (isClickable) {
                                  e.stopPropagation();
                                  router.push(
                                    `${isRowLink.pathname}/${item[isRowLink.slug]}${
                                      isRowLink.afterPathname
                                        ? `/${isRowLink.afterPathname}`
                                        : ""
                                    }`,
                                  );
                                  if (isRowLink?.handler) {
                                    isRowLink.handler(item);
                                  }
                                }
                              }}
                              style={{
                                cursor: isClickable ? "pointer" : "default",
                              }}
                            >
                              <Link
                                href={{
                                  pathname: `${column.link.pathname}/${
                                    item[column.link.slug]
                                  }`,
                                  query: { ..._querystring },
                                }}
                                className={
                                  depth2
                                    ? item[depth1][depth2]?.length >= 10
                                      ? "ellipsis1 cursor-pointer underline underline-offset-4"
                                      : "cursor-pointer underline underline-offset-4"
                                    : item[depth1]?.length >= 10
                                      ? "ellipsis1 cursor-pointer underline underline-offset-4"
                                      : "cursor-pointer underline underline-offset-4"
                                }
                                scroll={true}
                              >
                                {depth2
                                  ? item[depth1][depth2]
                                  : item[depth1] || "-"}
                              </Link>
                            </td>
                          );
                        } else if (column.editor) {
                          return (
                            <td key={`table-td-editor-${colIdx}`}>
                              <span
                                className={classNames(
                                  "flex w-full flex-row flex-wrap items-center justify-center gap-1 text-center",
                                  isClickable && "cursor-pointer",
                                )}
                              >
                                {depth1 === "ALLITEM" ? (
                                  <div className="w-full px-2 pb-[10px] pt-[9px]">
                                    {column.editor(item)}
                                  </div>
                                ) : (
                                  <div className="w-full px-2 pb-[10px] pt-[9px]">
                                    {column.editor(
                                      depth2
                                        ? item[depth1][depth2]
                                        : item[depth1],
                                    )}
                                  </div>
                                )}
                              </span>
                            </td>
                          );
                        }
                        return (
                          <td
                            key={`table-td-${colIdx}`}
                            className="px-2 pb-[10px] pt-[9px] text-center"
                            onClick={(e) => {
                              if (isClickable) {
                                e.stopPropagation();
                                router.push(
                                  `${isRowLink.pathname}/${item[isRowLink.slug]}${
                                    isRowLink.afterPathname
                                      ? `/${isRowLink.afterPathname}`
                                      : ""
                                  }`,
                                );
                                if (isRowLink?.handler) {
                                  isRowLink.handler(item);
                                }
                              }
                            }}
                            style={{
                              cursor: isClickable ? "pointer" : "default",
                            }}
                          >
                            <span
                              className={
                                depth2
                                  ? item[depth1][depth2]?.length >= 10
                                    ? "ellipsis1"
                                    : ""
                                  : item[depth1]?.length >= 10
                                    ? "ellipsis1"
                                    : ""
                              }
                            >
                              {depth2
                                ? item[depth1][depth2]
                                : item[depth1] || "-"}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </>
        )}
      </table>
    </div>
  );
};

export default ColTable;
