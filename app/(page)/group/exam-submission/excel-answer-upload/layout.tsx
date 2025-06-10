import ExcelAnswerContextProvider from "./_context/excel.answer.context";

const ExcelAnswerUploadLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ExcelAnswerContextProvider>{children}</ExcelAnswerContextProvider>;
};

export default ExcelAnswerUploadLayout;
