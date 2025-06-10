import React from "react";
import { COURSE_LIST } from "@/app/(page)/personal/omr/_utils/utils";
import ColTable from "../Manual/Coltable";
import {
  groupManualColumns,
  groupManualColumnsWithoutSubject,
} from "@/libs/utils/manual/tableData";
import FormSelect from "@/components/Commons/Form/Select/Select";
import { CommonItems } from "@/types/interface/common";

interface IUserInfo {
  userData: any;
  subject: string;
  index: number;
}

interface IItem {
  [key: string]: any;
}

const GroupUserInfo = ({ userData, subject, index }: IUserInfo) => {
  const select = COURSE_LIST[
    subject as keyof typeof COURSE_LIST
  ] as CommonItems[];

  let columns = groupManualColumnsWithoutSubject;

  const items: IItem[] = [
    {
      name: userData.name,
      birth: userData.birth,
      class: userData.class,
      number: userData.number,
    },
  ];

  // subject 조건에 따라 selectedSubject를 추가
  if (subject === "korean" || subject === "math" || subject === "inquiry") {
    items[0] = {
      ...items[0], // 기존 데이터 유지
      selectedSubject: (
        <FormSelect
          name={`users[${index}].selectedSubject`}
          items={select}
          sizeW="SS"
          className="text-center"
        />
      ),
    };
    columns = groupManualColumns;
  }

  return (
    <section className="w-[500px]">
      <ColTable items={items} columns={columns} isNumber={false} />
    </section>
  );
};

export default GroupUserInfo;
