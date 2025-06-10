import React from "react";
import { SectionTitle } from "./SectionTitle";
import RowTable from "./RowTable";
import { useRecoilValue } from "recoil";
import { queryClient } from "@/libs/utils/query/queryClient";
import { TUserInfoType } from "@/types/personal/types";
import { COURSE_LIST } from "@/app/(page)/personal/omr/_utils/utils2";
import { userInfoState } from "@/atoms/user/atom";
import { SUBMISSION_TYPE } from "@/libs/utils/subjectChange";

interface IUserInfo {
  subject: string;
}

const UserInfo = ({ subject }: IUserInfo) => {
  const userInfo = useRecoilValue(userInfoState);

  const items = [
    { title: "성명", value: userInfo?.userName },
    { title: "전화번호", value: userInfo?.phoneNumber },
    { title: "수험번호", value: userInfo?.examNumber },
    {
      title: "성별",
      value:
        userInfo?.gender === "MALE"
          ? "남자"
          : userInfo?.gender === "FEMALE"
            ? "여자"
            : "-",
    },
  ];

  // subject의 값이 inquiry일 경우 선택과목 값을 추가
  if (subject === "inquiry") {
    // filter 대신 find를 사용하고, 값이 없을 경우를 대비한 기본값 처리
    const major1 = COURSE_LIST.inquiry.filter(
      (item) => item.value == userInfo.subFirstSubject,
    )[0]?.label;

    const major2 = COURSE_LIST.inquiry.filter(
      (item) => item.value == userInfo.subSecondSubject,
    )[0]?.label;

    items.push({
      title: "제1선택",
      value: major1,
    });

    items.push({
      title: "제2선택",
      value: major2,
    });
  } else if (subject === "math" || subject === "korean") {
    const subjectCourses = COURSE_LIST[subject as keyof typeof COURSE_LIST];
    // subjectCourses가 배열인지 확인
    if (Array.isArray(subjectCourses)) {
      const type = SUBMISSION_TYPE[subject] as keyof TUserInfoType;
      const major = subjectCourses.filter(
        (item) => item.value == userInfo?.[type],
      )[0]?.label;

      items.push({
        title: "선택과목",
        value: major,
      });
    }
  }

  return (
    <section className="flex flex-col items-center">
      <SectionTitle>응시정보</SectionTitle>
      <RowTable
        data={items}
        options={COURSE_LIST[subject as keyof typeof COURSE_LIST]}
        className="max-w-[760px] border-black"
      />
    </section>
  );
};

export default UserInfo;
