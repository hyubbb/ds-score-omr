import { IColumns } from "@/types/interface/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Commons/Spinner/Spinner";
import clsx from "clsx";

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

  return (
    <div
      className={clsx(isScroll && "oveflow-y-auto max-h-[300px]", className)}
    >
      <table
        className={clsx(
          "voca w-full table-auto",
          borderTopLine && "border-t-2 border-black",
        )}
      >
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
                // width={`${column.width}px`}
              />
            );
          })}
        </colgroup>
        <thead>
          <tr className={clsx(isScroll && "sticky left-0 right-0 top-0")}>
            {isCheckBox && (
              <th
                className="bg-brand1/10 h-[40px] whitespace-nowrap px-0 pb-[12px] pt-[10px]"
                style={{
                  width: "50px",
                }}
              >
                <div className="border-grayDB flex items-center justify-center border-r">
                  <input
                    id={`tableCheckAll-${tableKey}`}
                    type="checkbox"
                    onChange={(e) => onChangeAll(e)}
                    checked={selectAllChecked}
                    className="hidden [&:checked+label]:bg-checkbox-focus"
                  />
                  <label
                    htmlFor={`tableCheckAll-${tableKey}`}
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
                  No.
                </div>
              </th>
            )}
            {columns?.map((column, idx) => {
              return (
                <th
                  className={clsx(
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
                {items?.map((item, index) => {
                  return (
                    <tr
                      key={`table-tr-td-${index}`}
                      className={clsx(
                        "hover:bg-brand2/20 border-grayD9 border-b bg-inherit first:border-t",
                        idList?.includes(item?.id) && "bg-brand2/20",
                        // isRowLink && " cursor-pointer"
                      )}
                      onClick={(e) => {
                        const target = e.target as Element | null;

                        if (target) {
                          if (
                            target instanceof HTMLInputElement ||
                            target.closest(
                              'input[type="checkbox"], label, td.check',
                            )
                          ) {
                            return;
                          }
                          if (isRowLink) {
                            router.push(
                              `${isRowLink.pathname}/${item[isRowLink.slug]}`,
                            );
                          }
                          if (isRowLink?.handler) {
                            isRowLink.handler(item);
                          }
                        }
                      }}
                    >
                      {isCheckBox && (
                        <td className="check text-center">
                          <div className="flex items-center justify-center">
                            <input
                              id={`tableCheckEach-${tableKey}-${index}`}
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
                                )
                              }
                              checked={idList?.includes(
                                checkboxId ? item[checkboxId] : item?.id,
                              )}
                              className={`hidden [&:checked+label]:bg-checkbox-focus`}
                            />
                            <label
                              htmlFor={`tableCheckEach-${tableKey}-${index}`}
                              className="bg-checkbox-defalt block h-[16px] w-[16px] hover:bg-checkbox-hover"
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
                              {baseNumber - index}
                            </Link>
                          ) : (
                            <div className="flex items-center justify-center">
                              {baseNumber - index}
                            </div>
                          )}
                        </td>
                      )}
                      {columns?.map((column, idx) => {
                        const depth1 = column?.name[0];
                        const depth2 = column?.name[1];
                        if (column.link) {
                          const _querystring =
                            column?.link?.querystring?.reduce((acc, cur) => {
                              return { ...acc, tab: [cur] };
                            }, {});
                          return column.link.url ? (
                            <td
                              key={`table-td-${idx}`}
                              className="px-2 pb-[10px] pt-[9px] text-center"
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
                              key={`table-td-${idx}`}
                              className="px-2 pb-[10px] pt-[9px] text-center"
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
                            <td key={`table-td-editor-${idx}`}>
                              <span
                                className={clsx(
                                  "flex w-full flex-row flex-wrap items-center justify-center gap-1 text-center",
                                  isRowLink && "cursor-pointer",
                                )}
                              >
                                {depth1 === "ALLITEM" ? (
                                  <div className="w-full px-2 pb-[10px] pt-[9px]">
                                    {column.editor(index)}
                                  </div>
                                ) : (
                                  // 답안 입력 컴포넌트
                                  <div className="flex w-full items-center justify-center px-2 pb-[10px] pt-[9px]">
                                    {column.editor(index)}
                                  </div>
                                )}
                              </span>
                            </td>
                          );
                        }
                        return (
                          <td
                            key={`table-td-${idx}`}
                            className="px-2 pb-[10px] pt-[9px] text-center"
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
