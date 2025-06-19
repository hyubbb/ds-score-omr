"use client";
import { downloadModeState } from "@/atoms/download/atom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// 여백
// blank: NARROWLY("좁게") | COMMONLY("보통") | WIDELY("넓게");

// 줄 간격
// lineInterval: NARROWLY("좁게") | WIDELY("넓게");

// 글자 크기
// fontSize: MINIMUM("최소") | COMMONLY("보통") | WIDELY("넓게");

const getStyles = (data: any): React.CSSProperties => ({
  padding:
    data?.blank === "NARROWLY"
      ? "2px"
      : data?.blank === "COMMONLY"
        ? "4px"
        : "6px",
  fontSize:
    data?.fontSize === "MINIMUM"
      ? "10px"
      : data?.fontSize === "COMMONLY"
        ? "12px"
        : "14px",
  lineHeight: data?.lineInterval === "NARROWLY" ? "1" : "1.2",
});

const BlankSpace = (num: number) => {
  return Array.from({ length: num }, (_, index) => (
    <span key={index} className="inline-block w-[10px]">
      &nbsp;
    </span>
  ));
};

const Type1 = ({
  question,
  number,
  mode,
  styles,
}: {
  question: any;
  number: number;
  mode: "exam" | "answer";
  styles: React.CSSProperties;
}) => (
  <div
    className="question-avoid"
    style={{
      width: "100%",
      pageBreakInside: "avoid",
      marginBottom: "8px",
    }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          {/* 번호와 질문 */}
          <td className="pb-[5px]">
            <div
              style={{
                width: "70%",
                lineHeight: styles.lineHeight,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span>{number}.</span>
              <span>{question.content}</span>
            </div>
          </td>

          {/* 답변 */}
          <td
            style={{
              width: "30%",
              textAlign: "right",
            }}
          >
            {mode === "answer" ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: `<span style="
                    color: red; 
                    display: inline-block; 
                    border-bottom: 1px solid black;
                    padding-bottom: 5px;
                  ">
                    ${question.answer}
                  </span>`,
                }}
              />
            ) : (
              <div
                style={{
                  display: "inline-block",
                  borderBottom: "1px solid black",
                }}
              >
                {BlankSpace(12)}
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

// 2번영역
const Type2 = ({
  question,
  number,
  mode,
  styles,
}: {
  question: any;
  number: number;
  mode: "exam" | "answer";
  styles: React.CSSProperties;
}) => (
  <div
    className="question-avoid"
    style={{
      width: "100%",
      pageBreakInside: "avoid",
      marginBottom: "8px",
    }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          {/* 번호와 질문 */}
          <td
            style={{
              width: "70%",
              lineHeight: styles.lineHeight,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>{number}.</span>
            <span>{question.content}</span>
          </td>

          {/* 답변 */}
          <td
            style={{
              width: "30%",
              textAlign: "right",
            }}
          >
            {mode === "answer" ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: `<span style="
                    color: red; 
                    display: inline-block; 
                    border-bottom: 1px solid black;
                    padding-bottom: 5px;
                  ">
                    ${question.answer}
                  </span>`,
                }}
              />
            ) : (
              <div
                style={{
                  display: "inline-block",
                  borderBottom: "1px solid black",
                }}
              >
                {BlankSpace(12)}
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Type3 = ({
  question,
  number,
  mode,
  styles,
  isType3,
}: {
  question: any;
  number: number;
  mode: "exam" | "answer";
  styles: React.CSSProperties;
  isType3: boolean;
}) => {
  // const content = mode === "answer" ? question.content : question.answer;
  const firstAnswerRemover = (sentence: string, answer: string) => {
    const lineHeight = styles.lineHeight ? +styles.lineHeight + 0.5 : "1.5";
    const commonStyle = `color: red; display: inline-block; border-bottom: 1px solid black; padding-bottom: 5px; line-height:${lineHeight};`;

    return sentence
      .replace(/(\S)?_/, (match, p1) => {
        if (!isType3) {
          // 앞 문자를 유지하면서 answer만 치환
          return `${p1 || ""}<span style="${commonStyle}">${answer}</span>`;
        } else {
          // 앞 문자를 제거하고 answer 치환
          return `<span style="${commonStyle}">${answer}</span>`;
        }
      })
      .replace(/_/g, ""); // 나머지 "_"를 모두 제거
  };

  return (
    <>
      <div
        className="question-avoid"
        style={{
          width: "100%",
          marginBottom: "10px",
          pageBreakInside: "avoid", // 인쇄에서 찢어짐 방지
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr style={{ verticalAlign: "top" }}>
              <td
                style={{
                  width: "30px",
                  lineHeight: styles?.lineHeight
                    ? +styles?.lineHeight + 0.5
                    : "1.5",
                }}
              >
                <span>{number}.</span>
              </td>
              <td
                style={{
                  width: "calc(100% - 30px)",
                  verticalAlign: "top ",
                  lineHeight: styles.lineHeight,
                }}
              >
                {mode === "answer" ? (
                  <span
                    style={{ display: "block" }}
                    dangerouslySetInnerHTML={{
                      __html: firstAnswerRemover(
                        question.content,
                        question.answer,
                      ),
                    }}
                  />
                ) : (
                  <span style={{ display: "block" }}>{question.content}</span>
                )}
                <span style={{ display: "block", marginTop: "4px" }}>
                  {question.koreanMeaning}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const numberIcon = ["①", "②", "③", "④"];

const Type4 = ({
  question,
  number,
  mode,
  styles,
}: {
  question: any;
  number: number;
  mode: "exam" | "answer";
  styles: React.CSSProperties;
}) => {
  const replaceFirstUnderlineWithHTML = (
    sentence: string,
    answer: string,
    number: number,
    styles: React.CSSProperties,
  ) => {
    return sentence
      .replace(
        "_",
        `<span style="color: red; display: inline-block; border-bottom: 1px solid black; padding-bottom: 5px; line-height:${styles.lineHeight ? +styles.lineHeight + 0.5 : "1.5"};">${answer}</span>`,
      )
      .replace(/_/g, "");
  };

  return (
    <div
      className="question-avoid"
      style={{
        width: "100%",
        marginBottom: "10px",
        pageBreakInside: "avoid", // 인쇄에서 찢어짐 방지
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          pageBreakInside: "avoid",
        }}
      >
        <tbody>
          <tr style={{ verticalAlign: "top" }}>
            <td
              style={{
                width: "30px",
                lineHeight: styles?.lineHeight
                  ? +styles?.lineHeight + 0.5
                  : "1.5",
              }}
            >
              <span>{number}.</span>
            </td>
            <td
              style={{
                width: "calc(100% - 30px)",
                verticalAlign: "top",
                lineHeight: styles.lineHeight,
              }}
            >
              <div>
                {mode === "answer" ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: replaceFirstUnderlineWithHTML(
                        question.content,
                        question.answer,
                        question.choices
                          .split(", ")
                          .map((choice: any) => choice.trim().toLowerCase())
                          .indexOf(question.answer.toLowerCase()),
                        styles,
                      ),
                    }}
                  />
                ) : (
                  <span>{question.content}</span>
                )}
              </div>
              <div>
                <span>{question.koreanMeaning}</span>
              </div>
              <div className="mt-2 flex items-start">
                {question.choices &&
                  question.choices
                    .split(", ")
                    .map((choice: string, index: number) => {
                      return (
                        <div
                          key={choice + index}
                          className="inline-block w-[25%]"
                        >
                          <span>{numberIcon[index]}&nbsp;</span>

                          <span>{choice}</span>
                        </div>
                      );
                    })}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ExamSingle = ({
  initData,
}: {
  initData?: {
    testName: string;
    blank: string;
    lineInterval: string;
    fontSize: string;
    details: {
      testDetailId: number;
      testType: string;
      questions: any[];
    }[];
  };
}) => {
  const [data, setData] = useState<any>(null);
  const [mode, setMode] = useRecoilState(downloadModeState);
  const [questionLength, setQuestionLength] = useState<number>(0);
  let questionNumber = 1; // 문제 번호 시작
  // testType별 컴포넌트 매핑
  const typeComponents: { [key: string]: React.ComponentType<any> } = {
    Type1,
    Type2,
    Type3,
    Type4,
  };

  useEffect(() => {
    const questionLength = data?.details?.reduce(
      (acc: any, curr: any) => acc + curr.questions.length,
      0,
    );
    setQuestionLength(questionLength);
  }, [data]);

  useEffect(() => {
    const questionLength = data?.details?.reduce(
      (acc: any, curr: any) => acc + curr.questions.length,
      0,
    );
    setQuestionLength(questionLength);
  }, [data]);

  useEffect(() => {
    // setData(temp);
    setData(initData);
  }, [initData]);

  const styles = getStyles(data);

  return (
    <div className="flex w-full flex-col gap-2 p-8 text-black">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            {/* 왼쪽 셀 */}
            <td
              style={{ textAlign: "left", width: "30%", paddingBottom: "4px" }}
            >
              <span>
                {data?.testDate
                  ?.map((item: any, index: any) =>
                    index > 0 ? String(item).padStart(2, "0") : item,
                  ) // 월과 일을 2자리로 포맷
                  .join("-") || ""}
              </span>
            </td>
            <td style={{ width: "40%" }}></td>
            {/* 오른쪽 셀 */}
            <td style={{ textAlign: "right", width: "30%" }}>
              <div className="flex justify-end">
                {data?.logo && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_WEB_URL}/icons/desonglogo.png`}
                    alt="logo"
                    width={120}
                    height={20}
                  />
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <section>
        <div className="relative mb-6 flex h-full w-full justify-between border-[3px] border-black px-8 py-8 font-bold leading-[1]">
          {/* 왼쪽 영역 */}
          <div className="flex w-[150px] flex-col justify-between">
            <div>
              소요시간{BlankSpace(2)} {data?.testTime || <span>____</span>} 분
            </div>
            <div>{BlankSpace(4)}</div>
            <div>
              맞은 개수{BlankSpace(2)} / {questionLength}
            </div>
          </div>

          {/* 중앙 영역 */}
          <div className="absolute left-1/2 top-[60px] flex -translate-x-1/2 -translate-y-1/2 transform items-center text-3xl font-bold">
            {data?.testName}
          </div>

          {/* 오른쪽 영역 */}
          <div className="flex w-[150px] flex-col gap-4 text-right">
            <div>단체명 : {data?.academyName || <span>_______</span>}</div>
            <div className="text-right">
              {data?.className || <span>_____</span>}반 _____번
            </div>
            <div>이름 : {data?.name || <span>_________</span>}</div>
          </div>
        </div>
      </section>
      {/* 여백 | 줄 간격 | 글자크기 옵션 클래스 설정 */}
      <section
        className={` ${styles.padding} ${styles.fontSize} ${styles.lineHeight}`}
      >
        <div className="flex flex-col gap-5">
          {data?.details?.map((detail: any, sectionIndex: number) => {
            const SectionComponent = typeComponents[detail.testType];
            const startNumber = questionNumber; // 시작 번호 저장
            const endNumber = startNumber + detail.questions.length - 1; // 끝 번호 계산
            questionNumber = endNumber + 1; // 다음 섹션의 시작 번호 갱신
            const isType3 = data?.typeThirdCondition;
            const sectionNumber =
              startNumber === endNumber
                ? `${startNumber}`
                : `${startNumber}~${endNumber}`;
            if (detail?.questions?.length == 0) {
              return <div key={detail.testDetailId + sectionIndex}></div>;
            }
            return (
              <div key={detail.testDetailId + sectionIndex}>
                <div className="page-break-avoid mb-2 font-bold">
                  <span>
                    {`[${sectionNumber}]`}{" "}
                    {detail.testType === "Type1" &&
                      "다음 빈칸에 들어갈 적절한 뜻을 쓰시오."}
                    {detail.testType === "Type2" &&
                      "다음 빈칸에 들어갈 적절한 단어를 쓰시오."}
                    {detail.testType === "Type3" &&
                      "다음 빈칸에 들어갈 적절한 단어를 쓰시오."}
                    {detail.testType === "Type4" &&
                      "다음 빈칸에 들어갈 적절한 단어를 고르시오."}
                  </span>
                </div>
                {detail.questions.map((question: any, index: any) => {
                  return (
                    <SectionComponent
                      key={startNumber + index}
                      question={question}
                      number={startNumber + index}
                      mode={mode.mode as "exam" | "answer"}
                      styles={styles}
                      isType3={isType3}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ExamSingle;
