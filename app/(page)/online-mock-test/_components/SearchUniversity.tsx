import { UseFormReturn } from "react-hook-form";
import { useModal } from "@/libs/hooks/useModal";
import { useRecoilValue } from "recoil";
import { applyInfoData } from "@/atoms/online-mock-test/atom";
import { useEffect } from "react";
import ModalContent from "./ModalContent";

type FormValues = {
  국어: boolean;
  국어0: number;
  수학: boolean;
  수학0: number;
  영어: boolean;
  한국사: boolean;
  탐구: boolean;
  탐구0: number;
  탐구1: number;
  firstChoiceUniversity: {
    universityName: string;
    universityCode: string;
    departmentName: string;
    departmentCode: string;
  };
  secondChoiceUniversity: {
    universityName: string;
    universityCode: string;
    departmentName: string;
    departmentCode: string;
  };
};

type Props = {
  methods: UseFormReturn<FormValues>;
  setSelectedUniversity: React.Dispatch<React.SetStateAction<string[]>>;
};

const SearchUniversity = ({ methods, setSelectedUniversity }: Props) => {
  const { openModal, closeModal } = useModal();

  const applyInfo = useRecoilValue(applyInfoData);

  useEffect(() => {
    setSelectedUniversity([
      applyInfo.firstChoiceUniversity?.universityName &&
        applyInfo.firstChoiceUniversity?.departmentName &&
        `${applyInfo.firstChoiceUniversity.universityName}학교 ${applyInfo.firstChoiceUniversity.departmentName}과`,
      applyInfo.secondChoiceUniversity?.universityName &&
        applyInfo.secondChoiceUniversity?.departmentName &&
        `${applyInfo.secondChoiceUniversity.universityName}학교 ${applyInfo.secondChoiceUniversity.departmentName}과`,
    ]);
  }, [applyInfo, setSelectedUniversity]); // applyInfo 변경 시 자동 반영

  const searchUniversity = (num: number) => {
    const selectedKey =
      num === 1 ? "firstChoiceUniversity" : "secondChoiceUniversity";

    methods.reset((prev) => ({
      ...prev,
      [selectedKey]: {
        universityName: "",
        universityCode: "",
        departmentName: "",
        departmentCode: "",
      },
    }));

    openModal({
      title: "학교(학과) 검색",
      content: <ModalContent methods={methods} num={num} />,
      isBtn: true,
      btnName: "선택",
      callback: async () => {
        closeModal();
      },
      canClose: true,
    });
  };
  return { searchUniversity };
};

export default SearchUniversity;
