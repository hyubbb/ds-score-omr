import { useAlert } from "@/libs/hooks/useAlert";
import Excel from "exceljs";

// ✅ 응시자 수 검사 함수
export const checkExamParticipantCount = (
  parsedData: any[],
  subject: string,
  count: number,
) => {
  const { openAlert, closeAlert } = useAlert();

  if (parsedData.length > count) {
    openAlert({
      content: `엑셀 업로드에 실패했습니다. 🚨 ${subject} 과목의 응시자가 ${count}명을 초과했습니다. 확인해주세요!`,
      isCancel: false,
      canClose: true,
      callBack: closeAlert,
    });
    // alert(
    //   `🚨 ${subject} 과목의 응시자가 ${count}명을 초과했습니다. 확인해주세요!`,
    // );
    return false;
  }
  return true;
};

// ✅ 국어 데이터를 JSON 형식으로 파싱하는 함수
export const parseKoreanData = async (
  file: File,
): Promise<
  {
    class: string;
    studentNumber: string;
    userName: string;
    phoneNumber: string;
    selectedSubjects: string;
    answers: string[];
  }[]
> => {
  const workbook = new Excel.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);
  const worksheet = workbook.worksheets[0]; // 첫 번째 시트 선택 (1교시)

  const koreanData: any = [];

  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1 || rowIndex === 2) return; // 헤더 스킵

    if (!row.hasValues) return; // 전체 파싱 중단

    const classNumber = String(row.getCell(4).value).padStart(2, "0"); // 반 (2자리 패딩)
    const studentNumber = String(row.getCell(5).value || "").trim(); // 학생 번호
    const phoneNumber = String(row.getCell(7).value || "").trim(); // 핸드폰번호
    const selectedSubjects = String(row.getCell(8).value || "").trim(); // 선택 과목
    const userName = String(row.getCell(6).value || "").trim(); // 학생 이름

    // 필수 데이터가 하나라도 없으면 해당 행 스킵
    if (
      !classNumber ||
      !studentNumber ||
      !phoneNumber ||
      !selectedSubjects ||
      !userName
    )
      return;

    // ✅ 문항 번호 배열로 변환 (9번 셀부터 53번까지)
    const answers = [];
    for (let i = 9; i <= 53; i++) {
      const answer = String(row.getCell(i)?.value || "").trim();
      if (answer) answers.push(answer);
    }

    // ✅ JSON 데이터 객체 생성 후 배열에 추가
    koreanData.push({
      class: classNumber,
      studentNumber,
      userName,
      phoneNumber: phoneNumber,
      selectedSubjects,
      answers,
    });
  });

  return koreanData; // ✅ JSON 형태로 반환
};

// ✅ 수학 데이터를 JSON 형식으로 파싱하는 함수
export const parseMathData = async (
  file: File,
): Promise<
  {
    class: string;
    studentNumber: string;
    userName: string;
    phoneNumber: string;
    selectedSubjects: string;
    answers: string[];
  }[]
> => {
  const workbook = new Excel.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);
  const worksheet = workbook.worksheets[1]; // 두 번째 시트 선택 (2교시)

  const mathData: any = [];

  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1 || rowIndex === 2) return; // 헤더 스킵

    if (!row.hasValues) return; // 전체 파싱 중단

    const classNumber = String(row.getCell(4).value).padStart(2, "0"); // 반 (2자리 패딩)
    const studentNumber = String(row.getCell(5).value || "").trim(); // 학생 번호
    const phoneNumber = String(row.getCell(7).value || "").trim(); // 폰번호
    const selectedSubjects = String(row.getCell(8).value || "").trim(); // 선택 과목
    const userName = String(row.getCell(6).value || "").trim(); // 학생 이름

    // 필수 데이터가 하나라도 없으면 해당 행 스킵
    if (
      !classNumber ||
      !studentNumber ||
      !phoneNumber ||
      !selectedSubjects ||
      !userName
    )
      return;

    // ✅ 문항 번호 배열로 변환 (9번 셀부터 38번까지)
    const answers = [];
    for (let i = 9; i <= 38; i++) {
      const answer = String(row.getCell(i)?.value || "").trim();
      answers.push(answer); // 빈 값도 포함됨
    }

    // ✅ JSON 데이터 객체 생성 후 배열에 추가
    mathData.push({
      class: classNumber,
      studentNumber,
      userName,
      phoneNumber: phoneNumber,
      selectedSubjects,
      answers,
    });
  });

  return mathData; // ✅ JSON 형태로 반환
};

// ✅ 영어 데이터를 JSON 형식으로 파싱하는 함수
export const parseEnglishData = async (
  file: File,
): Promise<
  {
    class: string;
    studentNumber: string;
    userName: string;
    phoneNumber: string;
    gender: string;
    preferredUniversity1: string;
    preferredUniversity2: string;
    answers: string[];
  }[]
> => {
  const workbook = new Excel.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);
  const worksheet = workbook.worksheets[2]; // 세 번째 시트 선택 (영어)

  const englishData: any = [];

  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1 || rowIndex === 2) return; // 헤더 스킵

    if (!row.hasValues) return; // 전체 파싱 중단

    const classNumber = String(row.getCell(4).value).padStart(2, "0"); // 반 (2자리 패딩)
    const studentNumber = String(row.getCell(5).value || "").trim(); // 학생 번호
    const phoneNumber = String(row.getCell(7).value || "").trim(); // 생년월일
    const gender = String(row.getCell(8).value || "").trim(); // 성별
    const userName = String(row.getCell(6).value || "").trim(); // 학생 이름
    const preferredUniversity1 = String(row.getCell(9).value || "").trim(); // 1지망 대학
    const preferredUniversity2 = String(row.getCell(11).value || "").trim(); // 2지망 대학

    // 필수 데이터가 하나라도 없으면 해당 행 스킵
    if (
      !classNumber ||
      !studentNumber ||
      !phoneNumber ||
      !gender ||
      !userName ||
      !preferredUniversity1 ||
      !preferredUniversity2
    )
      return;

    // ✅ 문항 번호 배열로 변환 (13번 셀부터 57번까지)
    const answers = [];
    for (let i = 13; i <= 57; i++) {
      const answer = String(row.getCell(i)?.value || "").trim();
      answers.push(answer); // 빈 값도 포함됨
    }

    // ✅ JSON 데이터 객체 생성 후 배열에 추가
    englishData.push({
      class: classNumber,
      studentNumber,
      userName,
      phoneNumber: phoneNumber,
      gender,
      preferredUniversity1,
      preferredUniversity2,
      answers,
    });
  });

  return englishData; // ✅ JSON 형태로 반환
};

// ✅ 한국사 데이터를 JSON 형식으로 파싱하는 함수
export const parseKoreanHistoryData = async (
  file: File,
): Promise<
  {
    class: string;
    studentNumber: string;
    userName: string;
    phoneNumber: string;
    answers: string[];
  }[]
> => {
  const workbook = new Excel.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);
  const worksheet = workbook.worksheets[3]; // 네 번째 시트 선택 (4교시 - 한국사)

  const koreanHistoryData: any = [];

  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1 || rowIndex === 2) return; // 헤더 스킵

    if (!row.hasValues) return; // 전체 파싱 중단

    const classNumber = String(row.getCell(4).value).padStart(2, "0"); // 반 (2자리 패딩)
    const studentNumber = String(row.getCell(5).value || "").trim(); // 학생 번호
    const phoneNumber = String(row.getCell(7).value || "").trim(); // 폰번호
    const userName = String(row.getCell(6).value || "").trim(); // 학생 이름

    // 필수 데이터가 하나라도 없으면 해당 행 스킵
    if (!classNumber || !studentNumber || !phoneNumber || !userName) return;

    // ✅ 문항 번호 배열로 변환 (9번 셀부터 53번까지)
    const answers = [];
    for (let i = 9; i <= 53; i++) {
      const answer = String(row.getCell(i)?.value || "").trim();
      answers.push(answer); // 빈 값도 포함됨
    }

    // ✅ JSON 데이터 객체 생성 후 배열에 추가
    koreanHistoryData.push({
      class: classNumber,
      studentNumber,
      userName,
      phoneNumber: phoneNumber,
      answers,
    });
  });

  return koreanHistoryData; // ✅ JSON 형태로 반환
};

// ✅ 탐구 데이터를 JSON 형식으로 파싱하는 함수
export const parseInquiryData = async (
  file: File,
): Promise<
  {
    class: string;
    studentNumber: string;
    userName: string;
    phoneNumber: string;
    selectedSubjects1: string;
    selectedSubjects2: string;
    answers: string[];
  }[]
> => {
  const workbook = new Excel.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer);
  const worksheet = workbook.worksheets[4]; // 다섯 번째 시트 선택 (탐구 과목)

  const inquiryData: any = [];

  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1 || rowIndex === 2) return; // 헤더 스킵

    if (!row.hasValues) return; // 전체 파싱 중단

    const classNumber = String(row.getCell(4).value).padStart(2, "0"); // 반 번호 (2자리 패딩)
    const studentNumber = String(row.getCell(5).value || "").trim(); // 학생 번호
    const phoneNumber = String(row.getCell(7).value || "").trim(); // 폰번호
    const userName = String(row.getCell(6).value || "").trim(); // 학생 이름
    const selectedSubjects1 = String(row.getCell(8).value || "").trim(); // 선택 과목 1
    const selectedSubjects2 = String(row.getCell(9).value || "").trim(); // 선택 과목 2

    // 필수 데이터가 하나라도 없으면 해당 행 스킵
    if (
      !classNumber ||
      !studentNumber ||
      !phoneNumber ||
      !selectedSubjects1 ||
      !selectedSubjects2 ||
      !userName
    )
      return;

    // ✅ 문항 번호 배열로 변환 (10번 셀부터 49번까지)
    const answers = [];

    // 선택 과목 1의 문항 번호 (10번 셀부터 29번 셀까지)
    for (let i = 10; i <= 29; i++) {
      const answer = String(row.getCell(i)?.value || "").trim();
      answers.push(answer); // 빈 값도 포함됨
    }

    // 선택 과목 2의 문항 번호 (30번 셀부터 49번 셀까지)
    for (let i = 30; i <= 49; i++) {
      const answer = String(row.getCell(i)?.value || "").trim();
      answers.push(answer); // 빈 값도 포함됨
    }

    // ✅ JSON 데이터 객체 생성 후 배열에 추가
    inquiryData.push({
      class: classNumber,
      studentNumber,
      userName,
      phoneNumber: phoneNumber,
      selectedSubjects1,
      selectedSubjects2,
      answers,
    });
  });

  return inquiryData; // ✅ JSON 형태로 반환
};
