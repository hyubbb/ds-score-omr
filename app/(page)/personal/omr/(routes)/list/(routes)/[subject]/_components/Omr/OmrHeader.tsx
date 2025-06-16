import React from "react";
import { SUBJECT_KR } from "@/app/(page)/personal/omr/_utils/utils";
import { SUBJECT_EN } from "@/app/(page)/personal/omr/_utils/utils2";
import TitleText from "@/app/(page)/personal/omr/(routes)/list/_components/TitleText";

interface OmrHeaderProps {
  subjectIndex: number;
}

const OmrHeader: React.FC<OmrHeaderProps> = ({ subjectIndex }) => {
  return (
    <TitleText
      color={`${SUBJECT_EN[subjectIndex]}`}
      bgColor={`${SUBJECT_EN[subjectIndex]}`}
    >
      {SUBJECT_KR[subjectIndex]}
    </TitleText>
  );
};

export default OmrHeader;
