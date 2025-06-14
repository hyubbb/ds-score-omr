import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export const updateNameValues = (
  getValues: UseFormGetValues<any>,
  setValue: UseFormSetValue<any>,
) => {
  const koreanName = getValues("koreanName");
  koreanName.forEach((item: string, index: number) => {
    if (item === "") {
      setValue(`name.${index}`, ["", "", ""]);
    }
    if (getValues("name")?.[index]?.length === 0) {
      setValue(`koreanName.${index}`, "");
    }
  });
};

export const updateInquiryAnswers = (
  getValues: UseFormGetValues<any>,
  setValue: UseFormSetValue<any>,
) => {
  setValue("answers", [getValues("answers")[0], getValues("answers")[1]]);
};
