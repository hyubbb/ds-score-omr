"use server";

export async function fetchManualData() {
  return {
    koAnswerId: 28,
    mathAnswerId: 30,
    enAnswerId: null,
    koHistoryAnswerId: null,
    firstExAnswerId: null,
    secondExAnswerId: 1,
  };
}

export async function fetchSubjectStatusData() {
  return {
    koreanSubjectStatus: "ATTEMPTED",
    mathSubjectStatus: "ATTEMPTED",
    englishSubjectStatus: "ATTEMPTED",
    koreanHistorySubjectStatus: "ATTEMPTED",
    subFirstSubjectStatus: "ATTEMPTED",
    subSecondSubjectStatus: "ATTEMPTED",
  };
}
