import Button from "@/components/Commons/Form/Button/Button";
import React, { useEffect, useState } from "react";
import { fetchApi } from "../../../../../../../../service/api";

type TGetGroupList = {
  data: {
    id: number;
    codeType: string;
    codeStatus: string;
    registrationCode: string;
  }[];
  success: boolean;
};

const ModalContainer = ({
  examStateList,
  closeModal,
}: {
  examStateList: any;
  closeModal: () => void;
}) => {
  const [list, setList] = useState<TGetGroupList["data"]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, success } = (await fetchApi(
        `/api/manual/group/list`,
      )) as TGetGroupList;
      if (success) {
        setList(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium tracking-wider">
              번호
            </th>
            <th scope="col" className="px-6 py-3 font-medium tracking-wider">
              응시코드
            </th>
            <th scope="col" className="px-6 py-3 font-medium tracking-wider">
              상태
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-center">
          {list?.map((item: TGetGroupList["data"][0], index: number) => (
            <tr key={index}>
              <td className="whitespace-nowrap p-2">{index + 1}</td>
              <td className="whitespace-nowrap p-2">{item.registrationCode}</td>
              <td className="whitespace-nowrap p-2">{item.codeStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <Button
          label="닫기"
          variant="defaultGray"
          size="sm"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default ModalContainer;
