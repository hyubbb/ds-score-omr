import { Icon } from "@/components/Commons/Icons/Icon";
import { IUseForm } from "@/types/interface/common";
import classNames from "classnames";
import { FieldValues, useController, useFormContext } from "react-hook-form";

export interface IPagination extends IUseForm {
  totalCnt: number;
  pageSize: number;
  onClick?: (idx: number) => void;
}

export const Pagination = ({
  name,
  pageSize,
  totalCnt,
  onClick,
}: IPagination) => {
  const { control, setValue, getValues } = useFormContext<FieldValues>();
  const { field } = useController({ control, name });

  const currentPageNum = getValues(name);

  let startPageNum: number = 0;
  let endPageNum: number = 0;

  startPageNum = Math.floor((currentPageNum - 1) / pageSize) * pageSize + 1;
  endPageNum = Math.min(startPageNum + pageSize - 1, totalCnt);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {pageSize && totalCnt ? (
        <div className={ContainerConfig}>
          <div
            className={classNames(
              ArrowButtonConfig,
              currentPageNum !== 1 && "cursor-pointer hover:border-black",
            )}
            onClick={() => {
              if (currentPageNum !== 1) {
                setValue(name, 1);
                onClick && onClick(1);
                goToTop();
              }
            }}
          >
            <Icon title={"pagination-left"} size={6} />
            <Icon title={"pagination-left"} size={6} />
          </div>

          <div
            className={classNames(
              ArrowButtonConfig,
              currentPageNum !== 1 && "cursor-pointer hover:border-black",
            )}
            onClick={() => {
              if (currentPageNum !== 1) {
                currentPageNum !== 1 && setValue(name, currentPageNum - 1);
                currentPageNum !== 1 && onClick && onClick(currentPageNum - 1);
                goToTop();
              }
            }}
          >
            <Icon title={"pagination-left"} size={6} />
          </div>

          {Array(endPageNum % pageSize === 0 ? pageSize : endPageNum % pageSize)
            .fill(0)
            .map((_, index) => {
              const isActive = currentPageNum === index + startPageNum;
              return (
                <div
                  key={index + 1}
                  className={classNames(
                    NumButtonConfig,
                    isActive
                      ? "cursor-default border-black text-black"
                      : "text-grayDB cursor-pointer",
                  )}
                  onClick={() => {
                    setValue(name, index + startPageNum);
                    onClick && onClick(index + startPageNum);
                    goToTop();
                  }}
                >
                  {index + startPageNum}
                </div>
              );
            })}

          <div
            className={classNames(
              ArrowButtonConfig,
              currentPageNum !== totalCnt &&
                "cursor-pointer hover:border-black",
            )}
            onClick={() => {
              if (currentPageNum !== totalCnt) {
                currentPageNum !== totalCnt &&
                  setValue(name, currentPageNum + 1);
                currentPageNum !== totalCnt &&
                  onClick &&
                  onClick(currentPageNum + 1);
                goToTop();
              }
            }}
          >
            <Icon title={"pagination-right"} size={6} />
          </div>

          <div
            className={classNames(
              ArrowButtonConfig,
              currentPageNum !== totalCnt &&
                "cursor-pointer hover:border-black",
            )}
            onClick={() => {
              if (currentPageNum !== totalCnt) {
                setValue(name, totalCnt);
                onClick && onClick(totalCnt);
                goToTop();
              }
            }}
          >
            <Icon title={"pagination-right"} size={6} />
            <Icon title={"pagination-right"} size={6} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const ContainerConfig = "flex mt-10  gap-[10px] justify-center";

const ArrowButtonConfig =
  "w-[30px] h-[30px] border-[1px] text-grayDB flex items-center justify-center";

const NumButtonConfig =
  "w-[30px] h-[30px] border-[1px] flex items-center justify-center hover:border-black";
