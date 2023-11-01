/* eslint-disable no-void */
import { useMutation } from "@tanstack/react-query";

import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { patchAdminProfile } from "@/services/api/requests/admin/admin.patch.api";
import { IPatchAdminProfileData, IPatchAdminProfileResponse } from "@/services/api/types/admin";
import { IPatchArtistProfileData, IPatchArtistProfileResponse } from "@/services/api/types/artist";
import { MEMBER_TYPE } from "@/types/enums/user.enum";
import getErrorModalInfo from "@/utils/getErrorModalInfo";

import { patchArtistProfile } from "../../api/requests/artist/artist.patch.api";

export const useUpdateAdminMyProfileInfo = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const mutation = useMutation<
  IPatchAdminProfileResponse,
  unknown,
  IPatchAdminProfileData,
  unknown
  >(
    ["admin", "my-profile"],
    patchAdminProfile,
    {
      onSuccess: (data) => {
        showToast("프로필 정보가 수정되었습니다.");
        dispatch(setUser({ ...data, type: MEMBER_TYPE.ADMIN }));
      },
      onError: () => {
        showAlertModal(getErrorModalInfo("알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도해 주세요.", "프로필 업데이트 에러"));
      },
    },
  );
  return mutation;
};

export const useUpdateAdminProfileImage = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const mutation = useMutation<
  IPatchAdminProfileResponse,
  unknown,
  IPatchAdminProfileData,
  unknown
  >(
    ["admin", "my-profile", "profile-image"],
    patchAdminProfile,
    {
      onSuccess: (data) => {
        showToast("프로필 이미지가 변경되었습니다.");
        dispatch(setUser({ ...data, type: MEMBER_TYPE.ADMIN }));
      },
      onError: () => {
        showAlertModal(getErrorModalInfo("알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도해 주세요.", "프로필 이미지 업데이트 에러"));
      },
    },
  );
  return mutation;
};

export const useUpdateArtistMyProfileInfo = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const mutation = useMutation<
  IPatchArtistProfileResponse,
  unknown,
  IPatchArtistProfileData,
  unknown
  >(
    ["artist", "my-profile"],
    patchArtistProfile,
    {
      onSuccess: (data) => {
        showToast("프로필 정보가 수정되었습니다.");
        dispatch(setUser({ ...data, type: MEMBER_TYPE.USER }));
      },
      onError: () => {
        showAlertModal(getErrorModalInfo("알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도해 주세요.", "프로필 업데이트 에러"));
      },
    },
  );
  return mutation;
};

export const useUpdateArtistMyProfileImage = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal();
  const mutation = useMutation<
  IPatchArtistProfileResponse,
  unknown,
  IPatchArtistProfileData,
  unknown
  >(
    ["artist", "my-profile", "profile-image"],
    patchArtistProfile,
    {
      onSuccess: (data) => {
        showToast("프로필 이미지가 변경되었습니다.");
        dispatch(setUser({ ...data, type: MEMBER_TYPE.USER }));
      },
      onError: () => {
        showAlertModal(getErrorModalInfo("알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도해 주세요.", "프로필 이미지 업데이트 에러"));
      },
    },
  );
  return mutation;
};
