"use client";

import React, { useState, useEffect } from "react";

// ✅ 목데이터 (API가 없을 경우 사용)
const mockTestTakersInfo = {
  groupTestTakersInfo: {
    groupCode: "a1234567",
    mockExamName: "The Premium 3월 모의고사",
    grade: "FRESHMAN",
    answerMethod: "INPUT_TEXT",
    participants: [
      {
        examCode: "a123456789",
        userName: "김철수",
        phoneNumber: "01012345678",
        class: "2",
        studentNumber: "4",
      },
      {
        examCode: "a123456788",
        userName: "이영희",
        phoneNumber: "01098765432",
        class: "2",
        studentNumber: "5",
      },
    ],
  },
};

const mockTestTakersInfoAndAnswers = {
  groupTestTakersInfoAndAnswers: {
    groupCode: "a1234567",
    mockExamName: "The Premium 3월 모의고사",
    grade: "FRESHMAN",
    answerMethod: "INPUT_TEXT",
    participants: [
      {
        subject: "korean",
        userName: "김철수",
        class: "2",
        studentNumber: "4",
        phoneNumber: "01012345678",
        selectedSubjects: "1",
        answers: ["1", "2"],
      },
      {
        subject: "math",
        userName: "김철수",
        class: "2",
        studentNumber: "4",
        phoneNumber: "01012345678",
        selectedSubjects: "1",
        answers: ["1", "2"],
      },
      {
        subject: "english",
        userName: "김철수",
        class: "2",
        studentNumber: "4",
        phoneNumber: "01012345678",
        selectedSubjects: "1",
        gender: "1",
        firstChoice: { universityCode: "U001", departmentCode: "D001" },
        secondChoice: { universityCode: "U002", departmentCode: "D002" },
        answers: ["1", "2"],
      },
      {
        subject: "ko-history",
        userName: "홍길동",
        class: "1",
        studentNumber: "1",
        phoneNumber: "01011112222",
        answers: ["1", "2"],
      },
      {
        subject: "math",
        userName: "홍길순",
        class: "1",
        studentNumber: "1",
        phoneNumber: "01011113333",
        answers: ["3", "4"],
      },
    ],
  },
};

const MatchingPage = () => {
  // ✅ 상태 관리
  const [tab, setTab] = useState("unmatched"); // 탭 전환
  const [unmatchedAnswers, setUnmatchedAnswers] = useState<any[]>([]);
  const [matchedAnswers, setMatchedAnswers] = useState<any[]>([]);

  useEffect(() => {
    processMatching();
  }, []);

  // ✅ 미매칭 데이터 처리
  const processMatching = () => {
    const participants = mockTestTakersInfo.groupTestTakersInfo.participants;
    const answerParticipants =
      mockTestTakersInfoAndAnswers.groupTestTakersInfoAndAnswers.participants;

    const matched: any[] = [];
    const unmatched: any[] = [];

    answerParticipants.forEach((answer) => {
      const matchedParticipant = participants.find(
        (p) =>
          p.userName === answer.userName &&
          p.phoneNumber === answer.phoneNumber &&
          p.class === answer.class &&
          p.studentNumber === answer.studentNumber,
      );

      if (matchedParticipant) {
        matched.push({ ...answer, examCode: matchedParticipant.examCode });
      } else {
        unmatched.push(answer);
      }
    });

    setMatchedAnswers(matched);
    setUnmatchedAnswers(unmatched);
  };

  // ✅ 미매칭된 데이터를 매칭할 때
  const handleMatch = (participant: any) => {
    setMatchedAnswers((prev) => [...prev, participant]);
    setUnmatchedAnswers((prev) => prev.filter((p) => p !== participant));
  };

  // ✅ 매칭 완료 시 JSON 데이터 출력
  const handleCompleteMatching = () => {
    const finalizedData = {
      groupFinalizedTestTakersInfoAndAnswers: {
        ...mockTestTakersInfo.groupTestTakersInfo,
        participants: matchedAnswers,
      },
    };
    console.log("매칭 완료 데이터:", JSON.stringify(finalizedData, null, 2));
    alert("매칭이 완료되었습니다. 콘솔을 확인하세요.");
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">단체장 답안 검수</h1>

      {/* ✅ 탭 선택 */}
      <div className="mb-4 flex border-b">
        <button
          className={`p-2 px-4 ${tab === "unmatched" ? "border-b-2 border-black font-bold" : "text-gray-500"}`}
          onClick={() => setTab("unmatched")}
        >
          미매칭 답안
        </button>
        <button
          className={`p-2 px-4 ${tab === "matched" ? "border-b-2 border-black font-bold" : "text-gray-500"}`}
          onClick={() => setTab("matched")}
        >
          매칭 완료 답안
        </button>
      </div>

      {/* ✅ 미매칭 답안 */}
      {tab === "unmatched" && (
        <div className="mb-6 rounded-lg border p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold">미매칭 답안</h2>
          {unmatchedAnswers.length === 0 ? (
            <p className="text-gray-500">미매칭된 답안이 없습니다.</p>
          ) : (
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">이름</th>
                  <th className="border p-2">과목</th>
                  <th className="border p-2">반</th>
                  <th className="border p-2">번호</th>
                  <th className="border p-2">자동 매칭</th>
                </tr>
              </thead>
              <tbody>
                {unmatchedAnswers.map((p, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{p.userName}</td>
                    <td className="border p-2">{p.subject}</td>
                    <td className="border p-2">{p.class}</td>
                    <td className="border p-2">{p.studentNumber}</td>
                    <td className="border p-2">
                      <button
                        className="rounded bg-blue-500 px-3 py-1 text-white"
                        onClick={() => handleMatch(p)}
                      >
                        매칭
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ✅ 매칭 완료 답안 */}
      {tab === "matched" && (
        <div className="rounded-lg border p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold">매칭 완료 답안</h2>
          {matchedAnswers.length === 0 ? (
            <p className="text-gray-500">매칭 완료된 답안이 없습니다.</p>
          ) : (
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">이름</th>
                  <th className="border p-2">과목</th>
                  <th className="border p-2">반</th>
                  <th className="border p-2">번호</th>
                  <th className="border p-2">시험 코드</th>
                </tr>
              </thead>
              <tbody>
                {matchedAnswers.map((p, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{p.userName}</td>
                    <td className="border p-2">{p.subject}</td>
                    <td className="border p-2">{p.class}</td>
                    <td className="border p-2">{p.studentNumber}</td>
                    <td className="border p-2">{p.examCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ✅ 매칭 완료 버튼 */}
      <div className="mt-4 text-right">
        <button
          className="rounded bg-green-500 px-4 py-2 text-white"
          onClick={handleCompleteMatching}
        >
          매칭 완료
        </button>
      </div>
    </div>
  );
};

export default MatchingPage;
