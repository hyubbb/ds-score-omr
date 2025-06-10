import { useRecoilState } from "recoil";
import { subjectAnswerState } from "@/atoms/manual/atom";
import { useRouter } from "next/navigation";
import Button from "@/components/Commons/Form/Button/Button";
import { groupManualListState } from "@/atoms/group/atom";

export const useAnswerStatus = () => {
  const [subjectAnswer, setSubjectAnswer] = useRecoilState(subjectAnswerState);

  const router = useRouter();

  const checkedStatus = (status: string) => {
    const result =
      status == "NOT_ATTEMPTED" ? (
        <span className="text-sm text-gray-500">미응시</span>
      ) : status === null ? (
        <span className="text-sm text-gray-500">대기</span>
      ) : (
        <span className="text-sm font-semibold text-gray-800">완료</span>
      );

    return result;
  };

  const checkedUpdateStatus = (subject: string, status: string) => {
    if (typeof window === "undefined") {
      return <span className="text-sm text-gray-500">로딩 중...</span>;
    }

    return status === "NOT_ATTEMPTED" ? (
      <div className="flex h-[40px] items-center justify-center text-sm text-gray-500">
        <span>미응시</span>
      </div>
    ) : status !== null ? (
      <Button
        variant="defaultOutlineLight"
        size="sm"
        label="수정하기"
        onClick={() => router.push(`./manual/${subject}`)}
      />
    ) : (
      <Button
        variant="primaryFill"
        size="sm"
        label="입력하기"
        onClick={() => router.push(`./manual/${subject}`)}
      />
    );
  };

  const checkedOMRUpdateStatus = (subject: string, status: string) => {
    if (typeof window === "undefined") {
      return <span className="text-sm text-gray-500">로딩 중...</span>;
    }

    return status === "NOT_ATTEMPTED" ? (
      <div className="flex h-[40px] items-center justify-center text-sm text-gray-500">
        <span>미응시</span>
      </div>
    ) : status !== null ? (
      <Button
        variant="defaultOutlineLight"
        size="sm"
        label="수정하기"
        onClick={() => router.push(`/personal/omr/list/${subject}`)}
      />
    ) : (
      <Button
        variant="primaryFill"
        size="sm"
        label="확인하기"
        onClick={() => router.push(`/personal/omr/list/${subject}`)}
      />
    );
  };

  return {
    subjectAnswer,
    checkedStatus,
    checkedUpdateStatus,
    checkedOMRUpdateStatus,
  };
};
