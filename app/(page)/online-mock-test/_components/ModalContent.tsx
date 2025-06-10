import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { applyInfoData } from "@/atoms/online-mock-test/atom";
import Button from "@/components/Commons/Form/Button/Button";
import Input from "@/components/Commons/Form/Input/Input";
import ColTable from "./Coltable";

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
  num: number;
};
type UniversityType = {
  id: number;
  universityCode: string;
  universityName: string;
  departmentCategory: string;
  departmentCode: string;
  departmentName: string;
};
// [API] 지망 대학교 검색
const fetchUniversityList = async (universityName: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fo-user/mock-exam-attempt/search?universityName=${universityName}&size=1000`,
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const content = data.content;

    const filterUniversity = Array.from(
      new Map(
        content.map(
          ({
            universityCode,
            universityName,
          }: {
            universityCode: string;
            universityName: string;
          }) => [universityCode, { universityCode, universityName }],
        ),
      ).values(),
    );

    return content.length > 0 ? filterUniversity : [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

// [API] 지망 대학 학과 검색
const fetchDepartmentList = async (
  universityCode: string,
  departmentName: string | null,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/fo-user/mock-exam-attempt/${universityCode}?size=1000&departmentName=${departmentName}`,
    );
    const data = await response.json();
    const content = data.content.length > 0 && data.content;
    return content;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const ModalContent = ({ methods, num }: Props) => {
  const [universityList, setUniversityList] = useState<
    UniversityType[] | unknown[]
  >([]);
  const [departmentList, setDepartmentList] = useState<UniversityType[]>([]);
  // 클릭한 대학의 이름 + 코드
  const [selectUniversity, setSelectUniversity] = useState({
    universityName: "",
    universityCode: "",
  });
  // 클릭한 학과의 이름 + 코드
  const [selectDepartment, setSelectDepartment] = useState({
    departmentName: "",
    departmentCode: "",
  });
  // 대학교 클릭 여부 체크
  const [isActiveUniversity, setIsActiveUniversity] = useState(false);
  // recoil에 선택 대학 정보 저장
  const [applyInfo, setApplyInfo] = useRecoilState(applyInfoData);

  // 1. 대학교 이름 작성 -> 검색 버튼 클릭 -> 해당 대학의 정보 배열을 universityList에 셋팅
  const handleUniversitySearchBtn = async (num: number) => {
    const { firstChoiceUniversity, secondChoiceUniversity } =
      methods.getValues();
    const selectedChoice =
      num === 1 ? firstChoiceUniversity : secondChoiceUniversity;

    if (!selectedChoice.universityName) {
      alert("검색어를 입력하세요");
      return;
    }

    const data = await fetchUniversityList(selectedChoice.universityName); // 검색어에 따른 대학 정보 배열

    // 대학 결과가 있으면 universityList에 셋팅 / 없으면 빈 배열 셋팅
    if (data) {
      setUniversityList(data);
    } else {
      setUniversityList([]);
    }
  };

  // 2. 대학교 클릭 → 해당 학교의 코드로 학과 정보 fetch -> 해당 대학의 모든 학과 정보 배열을 departmentList에 셋팅
  useEffect(() => {
    // 클릭한 대학교의 코드가 있다면
    if (selectUniversity.universityCode) {
      const fetchDepartments = async () => {
        const data = await fetchDepartmentList(
          selectUniversity.universityCode,
          "",
        ); // 검색한 대학의 모든 학과 정보 배열
        setDepartmentList(data); // departmentList에 셋팅
      };
      fetchDepartments();
    }

    const { firstChoiceUniversity, secondChoiceUniversity } =
      methods.getValues();
    const selectedChoice =
      num === 1 ? firstChoiceUniversity : secondChoiceUniversity;

    selectedChoice.universityName = selectUniversity.universityName;
    selectedChoice.universityCode = selectUniversity.universityCode;

    // 대학 선택 시 Recoil 상태 업데이트
    setApplyInfo((prev) => ({
      ...prev,
      [num === 1 ? "firstChoiceUniversity" : "secondChoiceUniversity"]: {
        universityName: selectUniversity.universityName,
        universityCode: selectUniversity.universityCode,
      },
    }));
  }, [selectUniversity]);

  // 3. 학과 이름 작성 -> 검색 버튼 클릭 -> 해당 학과의 정보 배열을 departmentList에 셋팅
  const handleDepartmentSearchBtn = async (num: number) => {
    const { firstChoiceUniversity, secondChoiceUniversity } =
      methods.getValues();
    const selectedChoice =
      num === 1 ? firstChoiceUniversity : secondChoiceUniversity;

    const data = await fetchDepartmentList(
      selectUniversity.universityCode,
      selectedChoice.departmentName,
    ); // 검색한 학과 정보 배열

    // 학과 결과가 있으면 departmentList 셋팅 / 없으면 빈 배열 셋팅
    if (data) {
      setDepartmentList(data);
    } else {
      setDepartmentList([]);
    }
  };

  useEffect(() => {
    if (selectDepartment.departmentCode && selectDepartment.departmentName) {
      const { firstChoiceUniversity, secondChoiceUniversity } =
        methods.getValues();
      const selectedChoice =
        num === 1 ? firstChoiceUniversity : secondChoiceUniversity;

      selectedChoice.departmentName = selectDepartment.departmentName;
      selectedChoice.departmentCode = selectDepartment.departmentCode;

      // 학과 선택 시 Recoil 상태 업데이트
      setApplyInfo((prev) => ({
        ...prev,
        [num === 1 ? "firstChoiceUniversity" : "secondChoiceUniversity"]: {
          ...prev[
            num === 1 ? "firstChoiceUniversity" : "secondChoiceUniversity"
          ],
          departmentName: selectDepartment.departmentName,
          departmentCode: selectDepartment.departmentCode,
        },
      }));
    }
  }, [selectDepartment.departmentCode, selectDepartment.departmentName]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold">학교검색</h3>
          <div className="flex gap-2">
            <Input
              name={
                num === 1
                  ? "firstChoiceUniversity.universityName"
                  : "secondChoiceUniversity.universityName"
              }
            />
            <Button
              label="검색"
              variant="defaultOutline"
              size="md"
              onClick={() => handleUniversitySearchBtn(num)}
            />
          </div>
          <div>
            <ColTable
              isNumber={false}
              columns={[
                { header: "학교명", name: ["universityName"] },
                { header: "학교코드", name: ["universityCode"] },
              ]}
              items={universityList}
              isSearch={true}
              setSelectUniversity={setSelectUniversity}
              setIsActiveUniversity={setIsActiveUniversity}
              codeTitle={"university"}
            />
          </div>
        </div>
        {isActiveUniversity && (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">학과검색</h3>
            <div className="flex gap-2">
              <Input
                name={
                  num === 1
                    ? "firstChoiceUniversity.departmentName"
                    : "secondChoiceUniversity.departmentName"
                }
              />
              <Button
                label="검색"
                variant="defaultOutline"
                size="md"
                onClick={() => handleDepartmentSearchBtn(num)}
              />
            </div>
            <div>
              <ColTable
                isNumber={false}
                columns={[
                  { header: "학과명", name: ["departmentName"] },
                  { header: "학과코드", name: ["departmentCode"] },
                ]}
                items={departmentList}
                isSearch={true}
                setSelectDepartment={setSelectDepartment}
                codeTitle={"department"}
              />
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default ModalContent;
