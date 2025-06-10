import { Icon } from "@/components/Commons/Icons/Icon";
import { ReactNode } from "react";

export interface ITableInfo {
  totText?: string;
  isTotCnt?: boolean; // 데이터 갯수 필요없이 title만 사용하는 경우 false
  totCnt?: number;
  message?: string;
  content?: ReactNode | string;
}

export const TableInfo = ({
  totText = "전체",
  isTotCnt = true,
  totCnt = 0,
  message = "",
  content,
}: ITableInfo) => {
  return (
    <>
      <div className={ContainerConfig}>
        <span className={TotcntConfig}>
          <span className="flex">
            <Icon title="arrow-next" />
            {totText}
          </span>
          {isTotCnt && (
            <span>
              <span className="text-brand1">{totCnt}</span> 건
            </span>
          )}
        </span>

        <span className={MessageConfig}>{message}</span>

        <div>{content}</div>
      </div>
    </>
  );
};

const ContainerConfig = "mt-5 mb-[10px] flex justify-between items-end";

const TotcntConfig = "flex font-bold gap-1";

const MessageConfig = "text-sm";
