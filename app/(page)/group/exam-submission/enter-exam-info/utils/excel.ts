import Excel from "exceljs";

// 응시자정보입력 엑셀 양식 다운로드
export const handleExamInfoExcelDownLoad = () => {
  const fileName = "응시자파싱연습";
  const fileUrl = "/xlsx/응시자파싱연습.xlsx";

  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// 응시자정보입력 입력한 엑셀 파싱
// 파싱해서 recoil persist 해야 될 수도
// 지금은 새로고침하면 응시자 정보가 사라져서 문제임 !
export const handleExamInfoExcelUpload = async (
  file: File,
  count: number,
  setValue: Function,
) => {
  if (!file) return;

  try {
    // 1. 파일을 읽기 위한 Workbook 생성
    const workbook = new Excel.Workbook();
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      await workbook.xlsx.load(buffer); // 파일 읽기

      const worksheet = workbook.worksheets[0]; // 첫 번째 시트 사용

      // 2. 헤더 추출 (첫 번째 행)
      const headerRow = worksheet.getRow(1).values as string[];

      // 3. 엑셀에서 필요한 컬럼 인덱스 찾기
      const headersMap = {
        classNumber: headerRow.indexOf("반"),
        className: headerRow.indexOf("번호"),
        phoneNumber: headerRow.indexOf("휴대폰번호"),
        userName: headerRow.indexOf("이름"),
      };

      // 필수 헤더가 없으면 경고
      if (Object.values(headersMap).includes(-1)) {
        alert("엑셀 파일의 헤더가 잘못되었습니다. 올바른 양식을 사용해주세요.");
        return;
      }
      alert("파싱시작1");
      // 4. 데이터 변환 (첫 번째 행 제외) ------> 다시 봐야됨
      const participants = worksheet
        .getSheetValues()
        .slice(4) // 첫 번째 행(헤더) 이랑 ex 제거
        .map((row: any) => row.slice(1)) // A열(첫 번째 열) 제거
        .filter((row: any) => row && row.length > 0) // 빈 행 제거
        .filter(
          (row: any) =>
            row &&
            row.length > 0 &&
            row.some(
              (cell: any) =>
                cell !== null &&
                cell !== undefined &&
                cell.toString().trim() !== "",
            ),
        ) // ✅ 완전히 빈 행 + 공백/NULL 행 제거
        .map((row: any, index: number) => ({
          classNumber: String(row[headersMap.classNumber] || "").trim(), // 반
          className: String(row[headersMap.className] || "").trim(), // 번호
          phoneNumber: String(row[headersMap.phoneNumber] || "").trim(), // 휴대폰번호
          userName: String(row[headersMap.userName] || "").trim(), // 이름
          rowIndex: index + 5, // 엑셀의 실제 행 번호 (엑셀은 1부터 시작, slice(4) 했으므로 +5)
        }))
        .filter(
          (p) => {
            // ❌ 필수 정보가 하나라도 없으면 경고 메시지 띄움
            if (
              !p.classNumber ||
              !p.className ||
              !p.phoneNumber ||
              !p.userName
            ) {
              alert(
                `엑셀 데이터의 ${p.rowIndex}행에서 필수 정보가 누락되었습니다.\n(반, 번호, 휴대폰번호, 이름을 모두 입력해주세요!)`,
              );
              return false; // ❌ 누락된 데이터는 필터링해서 제거
            }
            return true; // ✅ 정상적인 데이터만 남김
          },

          // (p) => p.classNumber && p.className && p.phoneNumber && p.userName,
        ); // 필수 필드 체크

      // 5. 응시자 수 검사 (count보다 많으면 경고)
      if (participants.length > count) {
        alert(
          `${participants.length}엑셀의 응시자 수가 지정된 응시자 수보다 많습니다. 확인해주세요.`,
        );
        return;
      }

      console.log("participants", JSON.stringify(participants, null, 2));

      // 6. `useForm`의 participants 값 업데이트
      // setValue("participants", participants);
    };
  } catch (error) {
    console.error("엑셀 업로드 중 오류 발생:", error);
    alert("엑셀 파일을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
};

//(원본)
//  // ✅ 3. 엑셀에서 필요한 컬럼 인덱스 찾기
//  const headersMap = {
//   class: headerRow.indexOf("반"),
//   studentNumber: headerRow.indexOf("번호"),
//   birthday: headerRow.indexOf("생년월일"),
//   phoneNumber: headerRow.indexOf("휴대폰번호"),
//   userName: headerRow.indexOf("이름"),
// };

// // 필수 헤더가 없으면 경고
// if (Object.values(headersMap).includes(-1)) {
//   alert("엑셀 파일의 헤더가 잘못되었습니다. 올바른 양식을 사용해주세요.");
//   return;
// }

// // ✅ 4. 데이터 변환 (첫 번째 행 제외)
// const participants = worksheet
//   .getSheetValues()
//   .slice(4) // 첫 번째 행(헤더) 이랑 ex 제거
//   .filter((row: any) => row && row.length > 0) // 빈 행 제거
//   .map((row: any) => ({
//     class: String(row[headersMap.class] || "").trim(), // 반
//     studentNumber: String(row[headersMap.studentNumber] || "").trim(), // 번호
//     birthday: String(row[headersMap.birthday] || "").trim(), // 생년월일
//     phoneNumber: String(row[headersMap.phoneNumber] || "").trim(), // 휴대폰번호
//     userName: String(row[headersMap.userName] || "").trim(), // 이름
//   }))
//   .filter((p) => p.userName && p.class && p.studentNumber); // 필수 필드 체크
