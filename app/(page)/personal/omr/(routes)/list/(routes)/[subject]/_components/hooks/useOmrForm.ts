import { useForm } from "react-hook-form";
import { useAlert } from "@/libs/hooks/useAlert";
import { useAnswer } from "@/app/(page)/personal/omr/(routes)/list/(routes)/[subject]/_components/hooks/useAnswer";
import { TUserManualData } from "@/types/personal/types";
import { SUBJECT_ID } from "@/libs/utils/subjectChange";
import { validateOmrForm } from "../utils/validation";
import { updateNameValues, updateInquiryAnswers } from "../utils/transform";

interface OmrFormProps {
  omrData: Array<{
    subjectCode: number;
    [key: string]: any;
  }>;
  subjectIndex: number;
  userAttemptId: string | null;
  userManualData: TUserManualData;
}

export const useOmrForm = ({
  omrData,
  subjectIndex,
  userAttemptId,
  userManualData,
}: OmrFormProps) => {
  const { openAlert, closeAlert } = useAlert();
  const methods = useForm({
    defaultValues:
      omrData.find((item) => +item.subjectCode === subjectIndex) || {},
    mode: "onChange",
  });

  const { watch, setValue, getValues } = methods;
  const currentSubject = watch("subjectEn");

  const { handleSubmit } = useAnswer({
    methods,
    subject: currentSubject,
    attemptId: userAttemptId || undefined,
    answerId:
      userManualData[SUBJECT_ID[currentSubject] as keyof TUserManualData] ||
      undefined,
    type: "omr",
  });

  const validateForm = () => {
    const result = validateOmrForm(getValues, currentSubject);
    if (!result.isValid) {
      openAlert({
        content: result.message,
        canClose: true,
        callBack: closeAlert,
      });
    }
    return result.isValid;
  };

  return {
    methods,
    watch,
    setValue,
    getValues,
    validateForm,
    updateNameValues: () => updateNameValues(getValues, setValue),
    updateInquiryAnswers: () => updateInquiryAnswers(getValues, setValue),
    handleSubmit,
  };
};
