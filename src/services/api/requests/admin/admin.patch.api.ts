import { IPatchAdminProfileData, IPatchAdminProfileResponse } from "../../types/admin";
import { patchRequest } from "../requests.api";

export const patchAdminProfile = async (
  patchData: IPatchAdminProfileData,
) => {
  const formData = new FormData();
  const dataList: { [key : string]: string } = {};

  Object.entries(patchData).forEach((item) => {
    const [key, value] = item;
    if (key === "file") {
      formData.append("file", key);
    }
    dataList[key] = value;
  });
  formData.append("data", JSON.stringify(dataList));

  const response = await patchRequest<IPatchAdminProfileResponse, FormData>("/admin/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
