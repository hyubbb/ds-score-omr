export const getManualSingleTableData = (
  answerData: any,
  subjectStatusData: any,
  checkedStatus: Function,
  checkedUpdateStatus: Function,
) => {
  const Dummy_answerData: Record<string, number | null> = {
    koAnswerId: 1,
    mathAnswerId: 1,
    enAnswerId: 1,
    koHistoryAnswerId: null,
    firstExAnswerId: 1,
    secondExAnswerId: 1,
  };

  const koAnswerId =
    subjectStatusData?.koreanSubjectStatus === "ATTEMPTED"
      ? answerData?.koAnswerId
        ? answerData?.koAnswerId
        : null
      : "NOT_ATTEMPTED";
  const mathAnswerId =
    subjectStatusData?.mathSubjectStatus === "ATTEMPTED"
      ? answerData?.mathAnswerId
        ? answerData?.mathAnswerId
        : null
      : "NOT_ATTEMPTED";
  const englishAnswerId =
    subjectStatusData?.englishSubjectStatus === "ATTEMPTED"
      ? answerData?.enAnswerId
        ? answerData?.enAnswerId
        : null
      : "NOT_ATTEMPTED";
  const historyAnswerId =
    subjectStatusData?.koreanHistorySubjectStatus === "ATTEMPTED"
      ? answerData?.koHistoryAnswerId
        ? answerData?.koHistoryAnswerId
        : null
      : "NOT_ATTEMPTED";
  const inquiryAnswerId =
    subjectStatusData?.subFirstSubjectStatus === "ATTEMPTED" ||
    subjectStatusData?.subSecondSubjectStatus === "ATTEMPTED"
      ? answerData?.firstExAnswerId || answerData?.secondExAnswerId
        ? answerData?.firstExAnswerId || answerData?.secondExAnswerId
        : null
      : "NOT_ATTEMPTED";

  return [
    {
      number: 1,
      subject: "국어",
      statusText: checkedStatus(koAnswerId),
      updateStatus: checkedUpdateStatus("korean", koAnswerId),
    },
    {
      number: 2,
      subject: "수학",
      statusText: checkedStatus(mathAnswerId),
      updateStatus: checkedUpdateStatus("math", mathAnswerId),
    },
    {
      number: 3,
      subject: "영어",
      statusText: checkedStatus(englishAnswerId),
      updateStatus: checkedUpdateStatus("english", englishAnswerId),
    },
    {
      number: 4,
      subject: "한국사",
      statusText: checkedStatus(historyAnswerId),
      updateStatus: checkedUpdateStatus("history", historyAnswerId),
    },
    {
      number: 4,
      subject: "탐구",
      statusText: checkedStatus(inquiryAnswerId),
      updateStatus: checkedUpdateStatus("inquiry", inquiryAnswerId),
    },
  ];
};

export const manualSingleColumns = [
  // { header: "번호", name: ["number"], width: "120", align: "center" },
  { header: "영역", name: ["subject"], width: "120", align: "center" },
  {
    header: "입력 현황",
    name: ["statusText"],
    width: "120",
    align: "center",
  },
  {
    header: "답안 입력 / 수정",
    name: ["updateStatus"],
    width: "120",
    align: "center",
  },
];

export const manualOMRColumns = [
  { header: "영역", name: ["subject"], width: "120", align: "center" },
  {
    header: "확인 현황",
    name: ["statusText"],
    width: "180",
    align: "center",
  },
  {
    header: "답안입력 결과 확인 / 수정",
    name: ["updateStatus"],
    width: "180",
    align: "center",
  },
];
export const manualGroupColumns = [
  { header: "이름", name: ["name"], width: "120", align: "center" },
  { header: "생년월일", name: ["birth"], width: "120", align: "center" },
  { header: "반", name: ["class"], width: "120", align: "center" },
  { header: "번호", name: ["number"], width: "120", align: "center" },
  {
    header: "입력 현황",
    name: ["statusText"],
    width: "180",
    align: "center",
  },
  {
    header: "답안 입력 / 수정",
    name: ["updateStatus"],
    width: "180",
    align: "center",
  },
];

export const groupManualColumns = [
  { header: "이름", name: ["name"], width: "120", align: "center" },
  { header: "생년월일", name: ["birth"], width: "120", align: "center" },
  { header: "반", name: ["class"], width: "120", align: "center" },
  { header: "번호", name: ["number"], width: "120", align: "center" },
  {
    header: "선택과목",
    name: ["selectedSubject"],
    width: "180",
    align: "center",
  },
];

export const groupManualColumnsWithoutSubject = [
  { header: "이름", name: ["name"], width: "120", align: "center" },
  { header: "생년월일", name: ["birth"], width: "120", align: "center" },
  { header: "반", name: ["class"], width: "120", align: "center" },
  { header: "번호", name: ["number"], width: "120", align: "center" },
];
