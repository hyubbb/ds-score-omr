"use client";
import PageTitle from "@/components/Manual/PageTitle";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAlert } from "@/libs/hooks/useAlert";
import { useModal } from "@/libs/hooks/useModal";
import { dummyOmrData, dummyUserData } from "./dummy";
import ModalContainer from "./_components/ModalContainer";

const page = ({ params }: { params: { page: string } }) => {
  const currentPage = params.page as "personal" | "group";
  const methods = useForm({
    defaultValues: {
      examType: "1",
    },
  });

  const { handleSubmit } = methods;
  const { openAlert, closeAlert } = useAlert();

  const { openModal, closeModal } = useModal();

  const userData = dummyUserData;
  const omrData = dummyOmrData;

  // 사용자 데이터 타입 정의 (기존 타입 + 점수 필드)
  type UserDataType = (typeof userData)[0] & { score?: string };

  // 사용자 데이터 상태 관리 (점수 업데이트를 위해 필요)
  const [userDataState, setUserDataState] = useState<UserDataType[]>(userData);

  // omrData를 상태로 관리
  const [omrDataState, setOmrDataState] = useState(omrData);

  /**
   * 매칭 결과를 저장하는 상태
   * omr: OMR 데이터
   * matched: 매칭된 사용자 데이터
   * differences: 각 필드별 불일치 여부
   */
  const [matchedResults, setMatchedResults] = useState<
    Array<{
      omr: (typeof omrData)[0];
      matched: UserDataType;
      differences: {
        userName: boolean;
        phoneNumber: boolean;
        class: boolean;
        studentNumber: boolean;

        // name: boolean;
        // birth: boolean;
        // phone: boolean;
        // class: boolean;
        // number: boolean;
      };
    }>
  >([]);

  /**
   * 두 데이터 간의 유사도를 계산하는 함수
   * 각 필드별로 가중치를 다르게 부여하여 계산
   * 이름(3점), 생년월일(2점), 전화번호(2점), 반(1점), 번호(1점)
   */
  const calculateSimilarity = (
    user: UserDataType,
    omr: (typeof omrData)[0],
  ) => {
    let score = 0;
    if (user.userName === omr.userName) score += 1; // 이름은 가장 중요한 식별자
    if (user.phoneNumber === omr.phoneNumber) score += 1; // 생년월일은 두 번째로 중요
    if (user.class === omr.class) score += 1; // 전화번호도 동일한 가중치
    if (user.studentNumber === omr.studentNumber) score += 1; // 반과 번호는 상대적으로 덜 중요
    return score;
  };

  /**
   * OMR 데이터와 가장 잘 매칭되는 사용자 데이터를 찾는 함수
   * 모든 사용자 데이터와 비교하여 가장 높은 유사도를 가진 데이터를 반환
   */
  const findPotentialMatches = (omr: (typeof omrData)[0]) => {
    // 최소 2개 이상의 필드가 일치하는 데이터만 반환
    return userData.filter((user) => {
      const score = calculateSimilarity(user, omr);
      return score >= 2; // 2개 이상 일치하는 경우만 반환
    });
  };

  /**
   * 초기 매칭 결과 계산 (컴포넌트 마운트 시 1회 실행)
   * 모든 OMR 데이터에 대해 가장 적합한 사용자 데이터를 찾아 매칭
   */
  useEffect(() => {
    const initialMatchedResults = omrData.map((omr) => {
      const potentialMatches = findPotentialMatches(omr);
      // 일치하는 데이터가 없는 경우 첫 번째 사용자 데이터로 초기화
      const bestMatch =
        potentialMatches.length > 0 ? potentialMatches[0] : userData[0];

      const differences = {
        userName: omr.userName !== bestMatch.userName,
        phoneNumber: omr.phoneNumber !== bestMatch.phoneNumber,
        class: omr.class !== bestMatch.class,
        studentNumber: omr.studentNumber !== bestMatch.studentNumber,
      };

      return { omr, matched: bestMatch, differences };
    });

    setMatchedResults(initialMatchedResults);
  }, []);

  /**
   * 완전 일치하는 데이터의 점수 자동 업데이트
   * matchedResults가 변경될 때마다 실행되어 점수 동기화
   */
  useEffect(() => {
    const newUserData = [...userDataState];
    let hasUpdates = false;

    matchedResults.forEach((result) => {
      // 모든 필드가 일치하는 경우에만 점수 업데이트
      if (!Object.values(result.differences).some(Boolean)) {
        const userIndex = newUserData.findIndex(
          (user) => user.userName === result.matched.userName,
        );
        // 점수가 없는 경우에만 업데이트
        if (userIndex !== -1 && !newUserData[userIndex].score) {
          newUserData[userIndex] = {
            ...newUserData[userIndex],
            // score: result.omr.score,
          };
          hasUpdates = true;
        }
      }
    });

    // 변경사항이 있는 경우에만 상태 업데이트
    if (hasUpdates) {
      setUserDataState(newUserData);
    }
  }, [matchedResults]);

  // 현재 활성화된 탭 상태 관리
  const [activeTab, setActiveTab] = useState<"mismatched" | "matched">(
    "mismatched",
  );

  /**
   * 미매칭 데이터 필터링
   * 하나 이상의 필드가 불일치하는 데이터 추출
   */
  const mismatchedResults = matchedResults.filter((result) => {
    const diffCount = Object.values(result.differences).filter(Boolean).length;
    return diffCount >= 1;
  });

  /**
   * 완전 일치 데이터 필터링
   * 모든 필드가 일치하는 데이터 추출
   */
  const perfectMatchResults = matchedResults.filter((result) => {
    const diffCount = Object.values(result.differences).filter(Boolean).length;
    return diffCount === 0;
  });

  // 불일치 항목을 한글로 변환하는 함수
  const getFieldLabel = (field: string) => {
    switch (field) {
      case "userName":
        return "이름";
      case "phoneNumber":
        return "전화번호";
      case "class":
        return "반";
      case "studentNumber":
        return "번호";
      default:
        return field;
    }
  };

  // 불일치 항목들을 찾는 함수
  const getMismatchedFields = (differences: Record<string, boolean>) => {
    return Object.entries(differences)
      .filter(([_, isDiff]) => isDiff)
      .map(([field]) => getFieldLabel(field))
      .join(", ");
  };

  /**
   * 미매칭 데이터 상세 보기 모달 표시
   * OMR 데이터와 매칭될 사용자 데이터를 비교하여 보여줌
   * 차이나는 부분을 빨간색으로 강조
   */
  const handleDetailView = (result: (typeof matchedResults)[0]) => {
    // 현재 OMR 데이터와 일치하는 사용자 데이터 찾기
    const potentialMatches = userData
      .map((user) => {
        let matchCount = 0;
        const differences = {
          userName: user.userName !== result.omr.userName,
          phoneNumber: user.phoneNumber !== result.omr.phoneNumber,
          class: user.class !== result.omr.class,
          studentNumber: user.studentNumber !== result.omr.studentNumber,
        };

        // 일치하는 필드 수 계산
        Object.values(differences).forEach((isDiff) => {
          if (!isDiff) matchCount++;
        });

        return {
          user,
          differences,
          matchCount,
        };
      })
      .filter((match) => match.matchCount >= 2) // 2개 이상 일치하는 데이터만 필터링
      .sort((a, b) => b.matchCount - a.matchCount); // 일치하는 개수가 많은 순으로 정렬

    openModal({
      content: (
        <ModalContainer
          potentialMatches={potentialMatches}
          getMismatchedFields={getMismatchedFields}
          handleMatch={handleMatch}
          result={result}
        />
      ),
      isBtn: false,
    });
  };

  /**
   * 매칭 처리 함수
   * 1. matchedResults에서 OMR 데이터를 선택된 사용자 데이터로 업데이트
   * 2. 모달 닫기
   */
  const handleMatch = (result: (typeof matchedResults)[0]) => {
    // matchedResults 업데이트
    const newMatchedResults = matchedResults.map((item) => {
      // 이름과 과목이 모두 일치하는 경우에만 매칭 처리
      if (
        item.omr.userName === result.omr.userName &&
        item.omr.subject === result.omr.subject
      ) {
        const updatedOmr = {
          ...item.omr,
          userName: result.matched.userName,
          phoneNumber: result.matched.phoneNumber,
          class: result.matched.class,
          studentNumber: result.matched.studentNumber,
        };

        return {
          omr: updatedOmr,
          matched: result.matched,
          differences: {
            userName: false,
            phoneNumber: false,
            class: false,
            studentNumber: false,
          },
        };
      }
      return item;
    });

    // omrDataState도 함께 업데이트
    const newOmrData = omrDataState.map((item) => {
      if (
        item.userName === result.omr.userName &&
        item.subject === result.omr.subject
      ) {
        return {
          ...item,
          userName: result.matched.userName,
          phoneNumber: result.matched.phoneNumber,
          class: result.matched.class,
          studentNumber: result.matched.studentNumber,
        };
      }
      return item;
    });

    setMatchedResults(newMatchedResults);
    setOmrDataState(newOmrData);
    closeModal();
  };

  return (
    <div className="flex w-full flex-col gap-4 overflow-x-auto">
      <PageTitle>성적조회</PageTitle>
      <div className="flex flex-col gap-6">
        {/* 사용자 데이터 전체 목록 */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-bold">사용자 데이터 목록</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">이름</th>
                  <th className="border p-2">전화번호</th>
                  <th className="border p-2">반</th>
                  <th className="border p-2">번호</th>
                  <th className="border p-2">점수</th>
                </tr>
              </thead>
              <tbody>
                {userDataState.map((user, index) => (
                  <tr key={index}>
                    <td className="border p-2">{user.userName}</td>
                    <td className="border p-2">{user.phoneNumber}</td>
                    <td className="border p-2">{user.class}</td>
                    <td className="border p-2">{user.studentNumber}</td>
                    <td className="border p-2">{user.score || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* OMR 데이터 전체 목록 추가 */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-bold">OMR 데이터 목록</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">이름</th>
                  <th className="border p-2">과목</th>
                  <th className="border p-2">전화번호</th>
                  <th className="border p-2">반</th>
                  <th className="border p-2">번호</th>
                </tr>
              </thead>
              <tbody>
                {omrDataState.map((omr, index) => (
                  <tr key={index}>
                    <td className="border p-2">{omr.userName}</td>
                    <td className="border p-2">{omr.subject}</td>
                    <td className="border p-2">{omr.phoneNumber}</td>
                    <td className="border p-2">{omr.class}</td>
                    <td className="border p-2">{omr.studentNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 탭 버튼 */}
        <div className="flex gap-4 border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "mismatched"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("mismatched")}
          >
            미매칭 답안 ({mismatchedResults.length})
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "matched"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("matched")}
          >
            매칭 답안 ({perfectMatchResults.length})
          </button>
        </div>

        {/* OMR 데이터 매칭 결과 */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-bold">
            {activeTab === "matched"
              ? "매칭된 OMR 데이터"
              : "미매칭 OMR 데이터"}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">이름</th>
                  <th className="border p-2">과목</th>
                  <th className="border p-2">전화번호</th>
                  <th className="border p-2">반</th>
                  <th className="border p-2">번호</th>
                  <th className="border p-2">점수</th>
                  <th className="border p-2">작업</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === "matched"
                  ? perfectMatchResults
                  : mismatchedResults
                ).map((result, index) => (
                  <tr key={index} className="bg-gray-50">
                    <td className="border p-2">{result.omr.userName}</td>
                    <td className="border p-2">{result.omr.subject}</td>
                    <td className="border p-2">{result.omr.phoneNumber}</td>
                    <td className="border p-2">{result.omr.class}</td>
                    <td className="border p-2">{result.omr.studentNumber}</td>
                    <td className="border p-2">{result.omr?.score || "-"}</td>
                    <td className="border p-2">
                      {activeTab === "mismatched" && (
                        <button
                          onClick={() => handleDetailView(result)}
                          className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                        >
                          상세보기
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
