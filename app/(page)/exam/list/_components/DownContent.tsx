import React from "react";
import ExamSingle from "./type/PdfExamSingle";
import { DownloadData } from "../../_utils/data";
import WordExamSingle from "./type/WordExamSingle";
import HwpExamSingle from "./type/HwpExamSingle";

const DownContent = () => {
  return (
    <section>
      <div className="absolute left-[-99999px] top-[-99999px] w-[800px]">
        <div id="pdf-content" className="w-full border">
          <ExamSingle initData={DownloadData} />
        </div>
        <div id="my-word" className="hidden">
          <WordExamSingle initData={DownloadData} />
        </div>
        <div id="my-hwp" className="w-full border">
          <HwpExamSingle initData={DownloadData} />
        </div>
      </div>
    </section>
  );
};

export default DownContent;
