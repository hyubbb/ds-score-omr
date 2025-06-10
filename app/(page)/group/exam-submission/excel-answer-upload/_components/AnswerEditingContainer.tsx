"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useExcelAnswerContext } from "../_context/excel.answer.context";
import Button from "@/components/Commons/Form/Button/Button";
import FormSelect from "@/components/Commons/Form/Select/Select";
import ColTable from "@/components/Commons/Table/Coltable";
import Input from "@/components/Commons/Form/Input/Input"; // 사용자 입력 필드

// 국어 데이터 편집 컨테이너
const AnswerEditingContainer = () => {
  const methods = useForm<{
    selectedSubject: string;
    korean: {
      classNumber: string;
      birthDate: string;
      subject: string;
      name: string;
      answers: { id: string; value: string }[];
    }[];
  }>({
    defaultValues: {
      selectedSubject: "1",
      korean: [],
    },
  });

  const { setValue, register, watch } = methods;
  const { korean } = useExcelAnswerContext(); // Context API에서 국어 데이터 가져오기
  const [filteredData, setFilteredData] = useState<any[]>([]); // 선택 과목에 따른 필터링된 데이터

  // 선택과목 옵션
  const selectedSubjectOptions = [
    { label: "화법과 작문", value: "1" },
    { label: "언어와 매체", value: "2" },
  ];

  // 📌 Context 데이터를 React Hook Form에 저장
  useEffect(() => {
    if (korean) {
      try {
        const koreanArray = JSON.parse(korean); // 🔥 문자열을 배열로 변환
        const parsedData = koreanArray.map((item: string) => {
          const [studentInfo, answerString] = item.split(" ");
          const [classNumber, birthDate, subject, name] =
            studentInfo.split("_");

          return {
            classNumber,
            birthDate,
            subject,
            name,
            answers: answerString.split("").map((answer, index) => ({
              id: `question${index + 1}`,
              value: answer,
            })),
          };
        });

        setValue("korean", parsedData);
      } catch (error) {
        console.error("Error parsing korean data:", error);
      }
    }
  }, [korean, setValue]);

  // 선택과목 필터링
  useEffect(() => {
    const selectedSubject = watch("selectedSubject");
    const allData = watch("korean");
    if (allData) {
      setFilteredData(
        allData.filter((item: any) => item.subject === selectedSubject),
      );
    }
  }, [watch("selectedSubject"), watch("korean")]);

  // 컬럼 설정 (첫 번째 컬럼: 학생 정보, 이후 문항 번호)
  const columns = useMemo(
    () => [
      { header: "학생 정보", name: ["studentInfo"] },
      ...Array.from({ length: 45 }, (_, index) => ({
        header: String(index + 1),
        name: [`question${index + 1}`],
      })),
    ],
    [],
  );

  const onSubmit = (data: any) => {
    console.log("제출할 데이터:", data.korean);
    alert("수정된 엑셀 답안 제출 완료!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2>국어 답안 수정</h2>

        {/* 선택과목 셀렉트 */}
        <FormSelect
          name="selectedSubject"
          items={selectedSubjectOptions}
          className="p-4"
        />

        {/* 컬럼 테이블 */}
        <div className="max-w-[1200px]">
          <ColTable
            columns={columns}
            items={filteredData.map((student, studentIdx) => ({
              studentInfo: `${student.classNumber}_${student.birthDate} ${student.name}`,
              ...Object.fromEntries(
                student.answers.map((answer: any, idx: number) => [
                  `question${idx + 1}`,
                  <input
                    key={answer.id}
                    {...register(`korean.${studentIdx}.answers.${idx}.value`)}
                    defaultValue={answer.value} // 🔥 Form 상태와 연결됨
                    className="border"
                  />,
                ]),
              ),
            }))}
            emptyMessage="데이터가 없습니다."
            isNumber={false}
            isXScroll={true}
          />
        </div>

        {/* 제출 버튼 */}
        <Button
          label="답안 제출"
          variant="defaultGray"
          size="exlg"
          type="submit"
          className="font-16 mb-[20px] mt-6 self-start"
        />
      </form>
    </FormProvider>
  );
};

export default AnswerEditingContainer;

{
  /* <기능>
context api에서 값 가져와서 react-hook-form에 저장
답안 에디팅
과목별 탭?
페이지 네이션
답안제출(수정본 데이터) */
}
//과목별로 선택과목셀렉트 ,,,,다르고 문제번호도 다르고렌더링 다르게
//데이터 관리 어케하지??

//   {/* 데이터 출력 (테스트용) */}
//   <div>
//   <p>국어 데이터: </p>
//   <p>{methods.watch("korean")}</p>
//   <hr className="w-full p-4" />
//   <p>수학 데이터: </p>
//   <p>{methods.watch("math")}</p>
//   <hr className="w-full p-4" />
//   <p>영어 데이터: </p>
//   <p>{methods.watch("english")}</p>
//   <hr className="w-full p-4" />
//   <p>한국사 데이터: </p>
//   <p>{methods.watch("koreanHistory")}</p>
//   <hr className="w-full p-4" />
//   <p>탐구 데이터: </p>
//   <p>{methods.watch("inquiry")}</p>
// </div>

// korean에 이 값이 들어있음
// [
//   "047002_980530_2_이혜진 153442151233134245555335433423135543525243115",
//   "054002_980530_2_김휘수 124442151433143242323135433423135545524523115",
//   "064006_980530_1_정재은 154342151423145544323135433425131543524523115",
//   "075004_980530_1_김현민 154442151533142242423135433423145243524523115",
// ];
