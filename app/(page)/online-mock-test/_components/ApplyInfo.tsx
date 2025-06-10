import React from "react";
import { RowTable } from "./RowTable";

interface InfoType {
  title: string | React.ReactNode;
  value: string | React.ReactNode;
}

interface DataType {
  title: string;
  data: InfoType[];
}

const ApplyInfo = ({ title, data }: DataType) => {
  return (
    <div>
      <div className="subTitle text-lg font-semibold">
        {title}
        {title === "개인정보" && (
          <span className="text-sm font-light">
            * 응시 개인 정보 변경은 마이페이지 내 회원정보 수정을 통해
            가능합니다.
          </span>
        )}
      </div>
      <RowTable data={data} />
    </div>
  );
};

export default ApplyInfo;
