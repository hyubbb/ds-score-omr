"use client";
import { downloadModeState } from "@/atoms/download/atom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const getStyles = (data: InitData | null): React.CSSProperties => ({
  padding:
    data?.blank === "NARROWLY"
      ? "2px"
      : data?.blank === "COMMONLY"
        ? "4px"
        : "6px",
  fontSize:
    data?.fontSize === "MINIMUM"
      ? "14px"
      : data?.fontSize === "COMMONLY"
        ? "16px"
        : "18px",
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
    <span key={index} style={{ textDecoration: "underline" }}>
      &nbsp;
    </span>
  ));
};

const replaceFirstUnderlineWithHTML = (
  sentence: string,
  answer: string,
  number: number,
) => {
  return sentence
    .replace(
      "_",
      `<span style=\"color: red; text-decoration: underline; text-underline-color:black;  display: contents; line-height: 1;\">${answer}</span>`,
    )
    .replace(/_/g, "");
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
  <div style={{ position: "relative", padding: "0px", margin: "0px" }}>
    <table
      style={{
        width: "100%",
      }}
    >
      <tbody
        style={{ fontSize: styles.fontSize, lineHeight: styles.lineHeight }}
      >
        <tr>
          <td
            style={{
              width: "60%",
              wordBreak: "break-word",
              textAlign: "left",
            }}
          >
            <span>{number}. &nbsp;</span>
            <span>{question.content}</span>
          </td>
          <td
            style={{
              textAlign: "right",
              color: mode === "answer" ? "red" : "black",
            }}
          >
            {BlankSpace(15)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

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
  const firstAnswerRemover = (sentence: string, answer: string) => {
    const lineHeight = styles.lineHeight ? +styles.lineHeight + 0.5 : "1.5";
    const commonStyle = `color: red;text-decoration: underline; text-underline-color:black; display: contents;  line-height:${lineHeight};`;

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
    <table
      style={{
        width: "100%",
        pageBreakAfter: "avoid",
        margin: 0,
      }}
    >
      <tbody
        style={{ fontSize: styles.fontSize, lineHeight: styles.lineHeight }}
      >
        <tr>
          <td
            rowSpan={3}
            style={{
              width: "30px",
              whiteSpace: "nowrap",
              textAlign: "left",
              verticalAlign: "top",
            }}
          >
            <span>{number}.</span>
          </td>
          <td style={{ wordBreak: "break-word" }}>
            {mode === "answer" ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: firstAnswerRemover(question.content, question.answer),
                }}
              />
            ) : (
              <span>{question.content}</span>
            )}
          </td>
        </tr>
        <tr>
          <td
            colSpan={2}
            style={{
              wordBreak: "break-word",
            }}
          >
            <span>{question.koreanMeaning}</span>
          </td>
        </tr>
      </tbody>
    </table>
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
}) => (
  <table
    style={{
      width: "100%",
      pageBreakAfter: "avoid",
      margin: 0,
    }}
  >
    <tbody style={{ fontSize: styles.fontSize, lineHeight: styles.lineHeight }}>
      {/* 질문 번호와 내용 */}
      <tr>
        <td
          rowSpan={3}
          style={{
            width: "30px",
            whiteSpace: "nowrap",
            textAlign: "left",
            verticalAlign: "top",
          }}
        >
          <span>{number}.</span>
        </td>
        <td
          style={{
            width: "100%",
            wordBreak: "break-word",
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
            <span>{question.content}</span>
          )}
        </td>
      </tr>
      {/* 한국어 뜻 */}
      <tr>
        <td colSpan={2}>
          <span>{question.koreanMeaning}</span>
        </td>
      </tr>
      {/* 선택지 */}
      <tr>
        <td colSpan={2}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                        key={`${choice}-${index}`}
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <span>{numberIcon[index]}&nbsp;</span>
                        <span style={{ marginLeft: "4px" }}>{choice}</span>
                      </td>
                    ))}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
);

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
  testDate?: any;
  logo?: string;
  testTime?: string;
  name?: string;
  blank: string; // 여백 옵션
  lineInterval: string; // 줄 간격 옵션
  fontSize: string; // 글자 크기 옵션
  typeThirdCondition: boolean;
  details: TestDetail[]; // 테스트 세부 정보 배열
};

const WordExamSingle = ({ initData }: { initData: any }) => {
  const [data, setData] = useState<InitData | null>(initData || null);
  const [mode, _] = useRecoilState(downloadModeState);
  let questionNumber = 1; // 문제 번호 시작
  const [questionLength, setQuestionLength] = useState<number>(0);
  const styles: React.CSSProperties = getStyles(data);
  const isType3 = initData?.typeThirdCondition;
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
    setData(initData);
  }, [initData]);

  return (
    <>
      {data?.testName && data.logo && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            padding: styles.padding,
          }}
        >
          <tbody>
            <tr>
              {/* 왼쪽 셀 */}
              <td
                style={{
                  textAlign: "left",
                  width: "30%",
                  paddingBottom: "4px",
                }}
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
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <table
        style={{
          width: "100%",
          border: "3px solid black",
          borderCollapse: "collapse",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          lineHeight: "1.5",
        }}
      >
        <tbody>
          <tr>
            {/* Left Section */}
            <td
              style={{
                width: "33%",
                textAlign: "left",
                padding: "10px",
                verticalAlign: "top",
              }}
            >
              <div>
                소요시간{" "}
                <span style={{ marginLeft: "10px" }}>
                  {data?.testTime || "__"} 분
                </span>
              </div>
              <div>
                <span>&nbsp;</span>
              </div>
              <div>
                맞은 개수{" "}
                <span style={{ marginLeft: "10px" }}>
                  / {questionLength || "__"}
                </span>
              </div>
            </td>

            {/* Center Section */}
            <td
              style={{
                width: "33%",
                textAlign: "center",
                fontSize: "24px",
                verticalAlign: "middle",
              }}
            >
              {data?.testName || "D:VOCA test"}
            </td>

            {/* Right Section */}
            <td
              style={{
                width: "33%",
                textAlign: "right",
                padding: "10px",
                verticalAlign: "top",
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
      <div
        style={{
          ...tableStyles,
          fontSize: styles.fontSize,
          padding: styles.padding,
        }}
      >
        {/* 테이블 내용 */}
        {data?.details?.map((detail: TestDetail, sectionIndex: number) => {
          const SectionComponent = typeComponents[detail.testType];
          const startNumber = questionNumber; // 시작 번호 저장
          const endNumber = startNumber + detail.questions.length - 1; // 끝 번호 계산
          questionNumber = endNumber + 1; // 다음 섹션의 시작 번호 갱신

          const sectionNumber =
            startNumber === endNumber
              ? `${startNumber}`
              : `${startNumber}~${endNumber}`;
          if (detail?.questions?.length === 0) {
            return <div key={detail.testDetailId + sectionIndex}></div>;
          }

          return (
            <div key={detail.testDetailId + sectionIndex}>
              <div
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  lineHeight: "1",
                  width: "100%",
                }}
              >
                <span>
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
              </div>
              <div style={{ padding: 0, margin: 0, width: "100%" }}>
                {detail.questions.map((question, index) => (
                  <SectionComponent
                    key={startNumber + index}
                    question={question}
                    number={startNumber + index}
                    mode={mode.mode as "exam" | "answer"}
                    styles={styles}
                    ㅈ
                    isType3={isType3}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WordExamSingle;
