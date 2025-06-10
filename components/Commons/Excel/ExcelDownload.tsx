import * as Excel from "exceljs";
import { saveAs } from "file-saver";
import { FC } from "react";
import Button from "../Form/Button/Button";
import { formatDateExcel } from "@/libs/utils/format/formatDate";

interface IExcelBtnHeaders {
  label: string;
  width: number; // TH width, 단위는 cell의 width나 height 단위는 픽셀이 아닌 엑셀의 너비 기준이다.
  name: string[];
  editor?: (data?: any) => string | number;
  style?: {
    color?: string; // hex 코드로 # 없이 string 으로만
    format?: string; // number 를 format화 할 필요가 있을 때 "0,000" 이런식으로 적어줌
    // 추가적으로 style 이 점점 필요할 경우 여기에 추가하도록
  };
}

// 헤더 스타일
const styleHeaderCell = (cell: Excel.Cell) => {
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "ffebebeb" },
  };
  cell.border = {
    bottom: { style: "thin", color: { argb: "-100000f" } },
    right: { style: "thin", color: { argb: "-100000f" } },
  };
  cell.font = {
    name: "Arial",
    size: 12,
    bold: true,
    color: { argb: "ff252525" },
  };
  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
};

// 셀 스타일
const styleDataCell = (
  cell: Excel.Cell,
  style?: { color?: string; format?: string },
) => {
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "ffffffff" },
  };
  cell.border = {
    bottom: { style: "thin", color: { argb: "-100000f" } },
    right: { style: "thin", color: { argb: "-100000f" } },
  };
  cell.font = {
    name: "Arial",
    size: 10,
    color: { argb: "ff252525" },
  };
  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  // 특정 열에 따라 추가적인 스타일 적용
  if (style) {
    if (style.color) {
      cell.font = {
        color: { argb: style.color },
      };
    }
    if (style.format) {
      cell.numFmt = style.format;
    }
  }
};

// 작성 예시(data example) 셀 스타일
const styleDataExampleCell = (
  cell: Excel.Cell,
  style?: { color?: string; format?: string },
) => {
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFF00" },
    bgColor: { argb: "FF0000FF" },
  };
  cell.border = {
    bottom: { style: "thin", color: { argb: "-100000f" } },
    right: { style: "thin", color: { argb: "-100000f" } },
  };
  cell.font = {
    name: "Arial",
    size: 10,
    color: { argb: "ff252525" },
  };
  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };

  // 특정 열에 따라 추가적인 스타일 적용
  if (style) {
    if (style.color) {
      cell.font = {
        color: { argb: style.color },
      };
    }
    if (style.format) {
      cell.numFmt = style.format;
    }
  }
};

// 엑셀 다운로드 버튼 컴포넌트
const ExcelDownloadButton: FC<{
  list: any[]; // 엑셀에 추가된 데이터
  headers: IExcelBtnHeaders[]; // 헤더에 들어갈 내용
  fileName: string; // 다운로드될 때 엑셀 파일 이름
  headerHeight?: number; // 헤더의 높이
  buttonLabel?: string; // 다운로드 버튼 이름
  isTemplateFile?: boolean; // 파일 양식 다운로드인 경우, data example 행 스타일 적용을 위해 사용
  disabled?: boolean; // disabled
}> = ({
  list,
  headers,
  fileName,
  headerHeight = 30.75,
  buttonLabel = "엑셀 다운로드",
  isTemplateFile = false,
  disabled,
}) => {
  const excel_headers: string[] = headers.map(
    (header: IExcelBtnHeaders) => header.label,
  );
  const excel_widths: number[] = headers.map(
    (header: IExcelBtnHeaders) => header.width,
  );

  const downloadList = async (rows: any[]) => {
    try {
      // workbook 생성
      const wb = new Excel.Workbook();
      // sheet 생성
      const sheet = wb.addWorksheet(fileName);

      // 상단 헤더(TH) 추가
      const headerRow = sheet.addRow(excel_headers);
      // 헤더의 높이값 지정
      headerRow.height = headerHeight;
      // 각 헤더 cell에 스타일 지정
      headerRow.eachCell((cell, colNum) => {
        styleHeaderCell(cell);
        sheet.getColumn(colNum).width = excel_widths[colNum - 1];
      });

      // 각 Data cell에 데이터 삽입 및 스타일 지정
      rows.forEach((dataList) => {
        // name 값을 기준으로 데이터를 찾아서 들어감
        const rowDatas = headers.map((header) => {
          const depth1 = header?.name[0];
          const depth2 = header?.name[1];

          if (header.editor) {
            return header.editor(
              depth2 ? dataList[depth1][depth2] : dataList[depth1],
            );
          } else {
            return depth2 ? dataList[depth1][depth2] : dataList[depth1];
          }
        });
        const appendRow = sheet.addRow(rowDatas);

        appendRow.eachCell((cell, colNum) => {
          const style = headers[colNum - 1]?.style;
          // 양식 파일인 경우, 작성 예시 행 스타일로 적용시킴
          isTemplateFile
            ? styleDataExampleCell(cell, style)
            : styleDataCell(cell, style);
        });
      });

      // 파일 생성
      const fileData = await wb.xlsx.writeBuffer();
      const blob = new Blob([fileData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `${fileName}_${formatDateExcel(new Date(Date.now()))}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      label={buttonLabel}
      variant="defaultOutline"
      size="fit"
      className="h-[46px]"
      iconUrl="/admin/icon/icon_excel.png"
      onClick={() => downloadList(list)}
      disabled={disabled}
    />
  );
};

export default ExcelDownloadButton;
