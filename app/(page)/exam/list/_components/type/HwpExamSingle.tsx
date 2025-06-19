"use client";
import { downloadModeState } from "@/atoms/download/atom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const getStyles = (data: InitData | null): React.CSSProperties => ({
  padding:
    data?.blank === "NARROWLY"
      ? "2px"
      : data?.blank === "COMMONLY"
        ? "4px"
        : "6px",
  fontSize:
    data?.fontSize === "MINIMUM"
      ? "12px"
      : data?.fontSize === "COMMONLY"
        ? "14px"
        : "16px",
  lineHeight: data?.lineInterval === "NARROWLY" ? "1" : "1.2",
});

const tableStyles: React.CSSProperties = {
  width: "100%",
  tableLayout: "fixed",
  borderCollapse: "collapse",
};

// 여백, 줄 간격, 글자 크기 옵션
const BlankSpace = (num: number) => {
  return Array.from({ length: num }, (_, index) => (
    <span key={index}>&nbsp;</span>
  ));
};

const firstAnswerRemover = (
  sentence: string,
  answer: string,
  isType3: boolean,
  styles: React.CSSProperties,
) => {
  const commonStyle = `color: red; text-decoration: underline; display: inline-block;`;

  // 1. 치환 (공백은 일단 추가해둠)
  let replaced = sentence.replace(/(\S)?_/, (match, p1) => {
    const answerSpan = `<span style="${commonStyle}">${answer}</span><span style="white-space: pre;"> </span>`;
    if (!isType3) {
      return `${p1 || ""}${answerSpan}`;
    } else {
      return answerSpan;
    }
  });

  // 2. 나머지 _ 제거
  replaced = replaced.replace(/_/g, "");

  // 3. 후처리: 공백(span 포함)이 구두점 앞에 오면 제거
  replaced = replaced.replace(
    /<span style="white-space: pre;">\s*<\/span>(?=[.,!?)]|\s*[”’」])/g,
    "",
  );

  return `<span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">${replaced}</span>`;
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
}) => {
  const handler = (sentence: string, answer: string) => {
    return sentence
      .replace(
        /_/,
        `<span style="color: red; text-decoration: underline; display: inline-block; line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">${answer}</span><span style="white-space: pre;"> </span>`,
      )
      .replace(/_/g, "");
  };
  return (
    <div>
      <table
        style={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse",
        }}
      >
        <tbody
          style={{ fontSize: styles.fontSize, lineHeight: styles.lineHeight }}
        >
          <tr>
            <td
              style={{
                width: "40px",
                verticalAlign: "middle",
                whiteSpace: "nowrap",
                textAlign: "left",
                lineHeight: styles.lineHeight,
                fontSize: styles.fontSize,
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: `<span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
              ${number}.
            </span>`,
                }}
              ></span>
            </td>
            <td
              style={{
                width: "53%",
                wordBreak: "break-word",
                textAlign: "left",
                lineHeight: styles.lineHeight,
                fontSize: styles.fontSize,
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: `<span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
              ${question.content}
            </span>`,
                }}
              ></span>
            </td>

            <td
              style={{
                width: "40%",
                textAlign: "right",
                borderBottom: mode !== "answer" ? "1px solid black" : "none",
              }}
            >
              {mode === "answer" ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<span style="color: red; text-decoration: underline; display: inline-block; line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">${question.answer}</span><span style="white-space: pre;"> </span>`,
                  }}
                />
              ) : (
                BlankSpace(10)
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Type2 = Type1;

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
  // const handler = (sentence: string, answer: string) => {
  //   return `
  //   <span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
  //     ${sentence
  //       .replace(
  //         /(\S)_/,
  //         (_, p1) =>
  //           `<span style="color: red; text-decoration: underline; display: inline-block;">${answer}</span><span style="white-space: pre;"> </span>`,
  //       )
  //       .replace(/_/g, "")}
  //   </span>
  // `;
  // };

  return (
    <div style={{ marginBottom: "12px" }}>
      <table
        style={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse",
        }}
      >
        <tbody
          style={{ fontSize: styles.fontSize, lineHeight: styles.lineHeight }}
        >
          <tr>
            <td
              rowSpan={3}
              style={{
                width: "40px",
                whiteSpace: "nowrap",
                textAlign: "left",
                verticalAlign: "top",
                lineHeight: styles.lineHeight,
                fontSize: styles.fontSize,
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: `<span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
              ${number}.
            </span>`,
                }}
              ></span>
            </td>
            <td
              style={{
                width: "100%",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                textAlign: "left",
              }}
            >
              {mode === "answer" ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: firstAnswerRemover(
                      question.content,
                      question.answer,
                      isType3,
                      styles,
                    ),
                  }}
                />
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
              ${question.content}
            </span>`,
                  }}
                ></span>
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={1}
              style={{
                wordBreak: "break-word",
                paddingTop: "5px",
                lineHeight: styles.lineHeight,
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: `<span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
              ${question.koreanMeaning}
            </span>`,
                }}
              ></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

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
  const numberIcon = ["①", "②", "③", "④"];

  const replaceFirstUnderlineWithHTML = (
    sentence: string,
    answer: string,
    number: number,
  ) => {
    const commonStyle = `color: red; text-decoration: underline; display: inline-block;`;

    // 1. 첫 번째 _만 치환하면서 공백도 추가
    let replaced = sentence.replace(
      "_",
      `<span style="${commonStyle}">${answer}</span><span style="white-space: pre;"> </span>`,
    );

    // 2. 나머지 남아있는 _ 제거
    replaced = replaced.replace(/_/g, "");

    // 3. 구두점 앞에 붙은 공백 span 제거
    replaced = replaced.replace(
      /<span style="white-space: pre;">\s*<\/span>(?=[.,!?)]|\s*[”’」])/g,
      "",
    );

    return `
      <span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
        ${replaced}
      </span>
    `;
  };

  return (
    <div style={{ marginBottom: "12px" }}>
      <table style={{ width: "100%" }}>
        <tbody
          style={{ fontSize: styles.fontSize, lineHeight: styles.lineHeight }}
        >
          {/* 질문 번호와 내용 */}
          <tr>
            <td
              rowSpan={3}
              style={{
                width: "40px",
                whiteSpace: "nowrap",
                textAlign: "left",
                verticalAlign: "top",
                lineHeight: styles.lineHeight,
                fontSize: styles.fontSize,
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: `<span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
              ${number}.
            </span>`,
                }}
              ></span>
            </td>
            <td
              style={{
                width: "100%",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                textAlign: "left",
              }}
            >
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
                    ),
                  }}
                />
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
              ${question.content}
            </span>`,
                  }}
                ></span>
              )}
            </td>
          </tr>
          {/* 한국어 뜻 */}
          <tr>
            <td
              colSpan={1}
              style={{
                wordBreak: "break-word",
                paddingTop: "5px",
                lineHeight: styles.lineHeight,
                fontSize: styles.fontSize,
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: `<span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize};">
              ${question.koreanMeaning}
            </span>`,
                }}
              ></span>
            </td>
          </tr>
          {/* 선택지 */}
          <tr>
            <td colSpan={1}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  tableLayout: "fixed", // 고정된 테이블 레이아웃
                }}
              >
                <tbody
                  style={{
                    fontSize: styles.fontSize,
                    lineHeight: styles.lineHeight,
                  }}
                >
                  <tr>
                    {question.choices &&
                      question.choices
                        .split(", ")
                        .map((choice: string, index: number) => (
                          <td
                            key={choice + index}
                            style={{
                              textAlign: "left",
                              whiteSpace: "nowrap",
                              width: "25%",
                            }}
                          >
                            <span
                              style={{
                                lineHeight: styles.lineHeight,
                                fontSize: styles.fontSize,
                              }}
                            >
                              {numberIcon[index]}&nbsp;
                            </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: `
      <span style="line-height: ${styles.lineHeight}; font-size: ${styles.fontSize}; margin-left: 4px;">
        ${choice}
      </span>
    `,
                              }}
                            ></span>
                          </td>
                        ))}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

type Question = {
  content: string; // 질문 내용
  answer: string; // 정답
  koreanMeaning?: string; // 한국어 뜻 (선택적)
  choices?: string; // 선택지 (Type4에만 필요)
};

type TestDetail = {
  testDetailId: number; // 테스트 세부 항목 ID
  testType: "Type1" | "Type2" | "Type3" | "Type4"; // 테스트 유형
  questions: Question[]; // 질문 배열
};

type InitData = {
  testName?: string;
  academyName?: string;
  className?: string;
  testDate: any;
  testTime: string;
  name: string;
  blank: string; // 여백 옵션
  lineInterval: string; // 줄 간격 옵션
  fontSize: string; // 글자 크기 옵션
  typeThirdCondition: boolean;
  details: TestDetail[]; // 테스트 세부 정보 배열
  logo?: string;
};

const HwpExamSingle = ({ initData }: { initData?: any }) => {
  const [data, setData] = useState<InitData | null>(initData || null);
  const [mode, setMode] = useRecoilState(downloadModeState);
  let questionNumber = 1; // 문제 번호 시작
  const [questionLength, setQuestionLength] = useState<number>(0);
  const styles: React.CSSProperties = getStyles(data);
  // testType별 컴포넌트 매핑
  const typeComponents: {
    [key in TestDetail["testType"]]: React.ComponentType<{
      question: Question;
      number: number;
      mode: "exam" | "answer";
      styles: React.CSSProperties;
      isType3: boolean;
    }>;
  } = {
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
    setData(initData ?? null);
  }, [initData]);

  return (
    <div style={{ padding: styles.padding }}>
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
              <div>
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

      <table
        style={{
          width: "100%",
          border: "3px solid black !important",
          borderCollapse: "collapse",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          lineHeight: "1.5",
          tableLayout: "fixed", // 고정 레이아웃
        }}
      >
        <tbody>
          <tr>
            {/* Left Section */}
            <td
              colSpan={1}
              style={{
                width: "30%",
                textAlign: "left",
                padding: "10px",
                verticalAlign: "top",
                borderTop: "2px solid black",
                borderBottom: "2px solid black",
                borderLeft: "2px solid black",
              }}
            >
              <div>
                소요시간{" "}
                <span style={{ marginLeft: "10px" }}>
                  {data?.testTime || "__"} 분
                </span>
              </div>
              <div>{BlankSpace(6)}</div>
              <div>
                맞은 개수{" "}
                <span style={{ marginLeft: "10px" }}>
                  {BlankSpace(6)}/ {questionLength || "__"}
                </span>
              </div>
            </td>

            {/* Center Section */}
            <td
              style={{
                width: "40%",
                textAlign: "center",
                fontSize: "24px",
                verticalAlign: "middle",
                borderTop: "2px solid black",
                borderBottom: "2px solid black",
              }}
            >
              {data?.testName || "D:VOCA test"}
            </td>

            {/* Right Section */}
            <td
              style={{
                width: "30%",
                textAlign: "right",
                padding: "10px",
                verticalAlign: "top",
                borderTop: "2px solid black",
                borderBottom: "2px solid black",
                borderRight: "2px solid black",
              }}
            >
              <div>단체명: {data?.academyName || "________"}</div>
              <div>
                {data?.className || "___"}반{" "}
                <span style={{ marginLeft: "10px" }}>___번</span>
              </div>
              <div>이름: {data?.name || "________"}</div>
            </td>
          </tr>
        </tbody>
      </table>

      <table
        style={{
          ...tableStyles,
          fontSize: styles.fontSize,
          padding: styles.padding,
        }}
      >
        {/* 테이블 내용 */}
        <tbody
          style={{
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          {data?.details?.map((detail: TestDetail, sectionIndex: number) => {
            const SectionComponent = typeComponents[detail.testType];
            const startNumber = questionNumber; // 시작 번호 저장
            const endNumber = startNumber + detail.questions.length - 1; // 끝 번호 계산
            questionNumber = endNumber + 1; // 다음 섹션의 시작 번호 갱신
            const isType3 = data?.typeThirdCondition;
            const sectionNumber =
              startNumber === endNumber
                ? `${startNumber}`
                : `${startNumber}~${endNumber}`;
            if (detail?.questions?.length === 0) {
              return <div key={detail.testDetailId + sectionIndex}></div>;
            }

            return (
              <React.Fragment key={detail.testDetailId + sectionIndex}>
                <tr
                  style={{
                    paddingTop: "10px",
                    width: "100%",
                  }}
                >
                  <td
                    colSpan={1}
                    style={{
                      fontWeight: "bold",
                      textAlign: "left",
                      lineHeight: "1",
                      paddingTop: "10px",
                    }}
                  >
                    <span
                      style={{
                        paddingTop: "10px",
                        fontWeight: "bold",
                        fontSize: styles.fontSize,
                        lineHeight: styles.lineHeight,
                      }}
                    >
                      [{sectionNumber}]{" "}
                      {detail.testType === "Type1" &&
                        "다음 빈칸에 들어갈 적절한 뜻을 쓰시오."}
                      {detail.testType === "Type2" &&
                        "다음 빈칸에 들어갈 적절한 단어를 쓰시오."}
                      {detail.testType === "Type3" &&
                        "다음 빈칸에 들어갈 적절한 단어를 쓰시오."}
                      {detail.testType === "Type4" &&
                        "다음 빈칸에 들어갈 적절한 단어를 고르시오."}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colSpan={1} style={{ lineHeight: "1" }}>
                    {detail.questions.map((question, index) => (
                      <SectionComponent
                        key={startNumber + index}
                        question={question}
                        number={startNumber + index}
                        mode={mode.mode as "exam" | "answer"}
                        styles={styles}
                        isType3={isType3}
                      />
                    ))}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HwpExamSingle;
