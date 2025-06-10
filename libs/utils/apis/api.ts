import { http } from "@/libs/http/http.interceptors.request";

// group-manage list 조회
export const fetchGroupManageData = async () => {
  const response = await http.get("/group-manage");
  return response.data.sort((a: any, b: any) => b.id - a.id);
};

// group-manage detail 조회
export const fetchGroupManageDetailData = async (groupId: string) => {
  const response = await http.get(`/group-manage/?id=${groupId}`);

  const data = response.data[0];

  const groupDetail = [
    {
      title: "단체명",
      value: data.groupName,
    },
    {
      title: "지역",
      value: data.region,
    },
    {
      title: "단체코드",
      value: data.groupCode,
    },
  ];

  return groupDetail;
};

// groupRelation 조회
export const fetchGroupRelationData = async (groupId: string) => {
  const response = await http.get(`/groupDetail/?group-manageId=${groupId}`);
  return response.data;
};

export const createGroup = async (data: any) => {
  const response = await http.post("/group-manage", data);
  return response;
};
