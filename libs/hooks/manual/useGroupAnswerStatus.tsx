import { useRecoilState } from "recoil";
import { answerStatusState, groupUserInfoState } from "@/atoms/manual/atom";
import { useRouter } from "next/navigation";
import Button from "@/components/Commons/Form/Button/Button";
import { useQueryClient } from "@tanstack/react-query";

export const useGroupAnswerStatus = (data: any) => {
  const router = useRouter();

  const checkedStatus = (status: string) => {
    const result =
      status === "pending" ? (
        <span className="text-sm text-gray-500">입력 대기</span>
      ) : status === "complete" ? (
        <span className="text-sm font-semibold text-gray-800">입력 완료</span>
      ) : (
        <span className="text-sm text-gray-500">미응시</span>
      );

    return result;
  };

  const [userInfo, setUserInfo] = useRecoilState(groupUserInfoState);
  const queryClient = useQueryClient();
  const groupData = queryClient.getQueryData(["group", "manual"]) as {
    success: boolean;
    data: any;
  };

  const handleAnswerList = (id: string) => {
    const userInfo = groupData.data.find((item: any) => item.number == id);
    setUserInfo(userInfo);
    router.push(`/group/member/${id}/manual`);
  };

  const checkedUpdateStatus = (status: string, id: string) => {
    if (typeof window === "undefined") {
      return <span className="text-sm text-gray-500">로딩 중...</span>;
    }

    return status === "pending" ? (
      <Button
        variant="defaultBlack"
        size="sm"
        label="답안 입력"
        onClick={() => handleAnswerList(id)}
      />
    ) : status === "complete" ? (
      <Button
        variant="defaultOutlineLight"
        size="sm"
        label="답안 수정"
        onClick={() => router.push(`/group/member/${id}/manual`)}
      />
    ) : (
      <div className="flex h-[40px] items-center justify-center text-sm text-gray-500">
        <span>미응시</span>
      </div>
    );
  };

  return {
    checkedStatus,
    checkedUpdateStatus,
  };
};
