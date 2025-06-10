import React from "react";

const ModalContainer = ({
  potentialMatches,
  getMismatchedFields,
  handleMatch,
  result,
}: {
  potentialMatches: any;
  getMismatchedFields: any;
  handleMatch: any;
  result: any;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {potentialMatches.length > 0 ? (
        potentialMatches.map((match: any, index: any) => (
          <div key={index} className="my-4">
            <div className="mb-2 text-lg font-semibold">
              {index + 1}. {match.matchCount}개 항목 일치 (
              {getMismatchedFields(match.differences)} 불일치)
            </div>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">이름</th>
                  <th className="border p-2">생년월일</th>
                  <th className="border p-2">전화번호</th>
                  <th className="border p-2">반</th>
                  <th className="border p-2">번호</th>
                  <th className="border p-2">작업</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className={`border p-2 ${
                      match.differences.userName ? "font-bold" : ""
                    }`}
                  >
                    {match.user.userName}
                  </td>
                  <td
                    className={`border p-2 ${
                      match.differences.phoneNumber ? "font-bold" : ""
                    }`}
                  >
                    {match.user.phoneNumber}
                  </td>
                  <td
                    className={`border p-2 ${
                      match.differences.class ? "font-bold" : ""
                    }`}
                  >
                    {match.user.class}
                  </td>
                  <td
                    className={`border p-2 ${
                      match.differences.class ? "font-bold" : ""
                    }`}
                  >
                    {match.user.class}
                  </td>
                  <td
                    className={`border p-2 ${
                      match.differences.studentNumber ? "font-bold" : ""
                    }`}
                  >
                    {match.user.studentNumber}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() =>
                        handleMatch({ ...result, matched: match.user })
                      }
                      className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
                    >
                      매칭하기
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div>일치하는 데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default ModalContainer;
