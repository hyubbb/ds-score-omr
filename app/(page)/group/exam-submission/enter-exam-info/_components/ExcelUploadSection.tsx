"use client";

import Button from "@/components/Commons/Form/Button/Button";
import Upload from "@/components/Commons/Form/Uploadfile/Upload";
import {
  handleExamInfoExcelDownLoad,
  handleExamInfoExcelUpload,
} from "../utils/excel";
import { UseFormSetValue } from "react-hook-form";

interface IFormValues {
  mockExamName: string;
  grade: string;
  answerMethod: string;
  participants: {
    registrationCode: string;
    userName: string;
    phoneNumber: string;
    classNumber: string;
    className: string;
  }[];
}

interface Props {
  count: number;
  setValue: UseFormSetValue<IFormValues>; // ✅ useForm에서 제공하는 타입 적용
}

const ExcelUploadSection = ({ count, setValue }: Props) => {
  return (
    <div className="flex items-center justify-end gap-4">
      <Button
        label="엑셀 다운로드"
        variant="defaultOutline"
        size="lg"
        onClick={handleExamInfoExcelDownLoad}
      />
      <Upload
        name="file"
        rules={{
          fileExtension: {
            value: ["xlsx"],
            message: "엑셀 파일만 업로드 가능합니다.",
          },
        }}
        isOnly={true}
        isThumbnail={false}
        showNoFileMessage={false}
        uploadLabel="엑셀 업로드"
        onFileChange={(file) => {
          handleExamInfoExcelUpload(file as File, count, setValue);
        }}
      />
    </div>
  );
};

export default ExcelUploadSection;
