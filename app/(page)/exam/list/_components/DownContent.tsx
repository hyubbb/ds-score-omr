import React from "react";
import ExamSingle from "./typeByFile/PdfExamSingle";
import { DownloadData } from "../../_utils/data";
import WordExamSingle from "./typeByFile/WordExamSingle";
import HwpExamSingle from "./typeByFile/HwpExamSingle";

const DownContent = () => {
  return (
    <section>
      <div className="absolute left-[-99999px] top-[-99999px] w-[800px]">
        <div id="pdf-content" className="w-full bg-white">
          <ExamSingle initData={DownloadData} />
        </div>
        <div id="my-word" className="w-full bg-white">
          <WordExamSingle initData={DownloadData} />
        </div>
        <div id="my-hwp" className="w-full bg-white">
          <HwpExamSingle initData={DownloadData} />
        </div>
      </div>
    </section>
  );
};

export default DownContent;
