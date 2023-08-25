/* eslint-disable no-void */
import { useMutation } from "@tanstack/react-query";

import useAlertModal from "@/hooks/useAlertModal";
import useToast from "@/hooks/useToast";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { IAdminProfile, IArtistProfile } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_ROLE, MEMBER_TYPE } from "@/types/enums/user.enum";

interface IPatchAdminMyProfileRequest {
  profileImage: File | null,
  email?: string,
  nickname?: string,
}

interface IPatchAdminMyProfileResponse extends IAdminProfile { }

interface IPatchArtistMyProfileRequest extends Omit<IPatchAdminMyProfileRequest, "nickname"> { }

interface IPatchArtistMyProfileResponse extends IArtistProfile { }

const patchAdminMyProfile = (
  body: IPatchAdminMyProfileRequest,
): Promise<IPatchAdminMyProfileResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      void body;
      return resolve({
        memberId: 1,
        role: MEMBER_ROLE.ADMIN,
        type: MEMBER_TYPE.ADMIN,
        email: "example@bluekey_domain.com",
        loginId: "sapidjsaio",
        nickname: "블루키",
        profileImage: "https://s3...",
      });
      reject(new Error("에러가 발생했습니다."));
    }, 2000);
  });
};

const patchArtistMyProfile = (
  body: IPatchArtistMyProfileRequest,
): Promise<IPatchArtistMyProfileResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      void body;
      return resolve({
        memberId: 1,
        role: MEMBER_ROLE.ARTIST,
        type: MEMBER_TYPE.USER,
        email: "example@bluekey_domain.com",
        loginId: "dfjalke",
        name: "블루키",
        enName: "bluekey",
        profileImage: "https://s3...",
      });
    }, 2000);
  });
};

export const useUpdateAdminMyProfileInfo = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { showAlertModal } = useAlertModal({
    type: MODAL_TYPE.ERROR,
    title: "프로필 수정 에러",
    message: "알 수 없는 에러가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
  });
  const mutation = useMutation<
  IPatchAdminMyProfileResponse,
  unknown,
  IPatchAdminMyProfileRequest,
  unknown
  >(
    ["admin", "my-profile"],
    patchAdminMyProfile,
    {
      onSuccess: (data) => {
        showToast("프로필 정보가 수정되었습니다.");
        dispatch(setUser(data));
      },
      onError: () => {
        showAlertModal();
      },
    },
  );
  return mutation;
};

export const useUpdateAdminProfileImage = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const mutation = useMutation<
  IPatchAdminMyProfileResponse,
  unknown,
  Pick<IPatchAdminMyProfileRequest, "profileImage">,
  unknown
  >(
    ["admin", "my-profile", "profile-image"],
    patchAdminMyProfile,
    {
      onSuccess: (data) => {
        showToast("프로필 이미지가 변경되었습니다.");
        dispatch(setUser(data));
      },
    },
  );
  return mutation;
};

export const useUpdateArtistMyProfileInfo = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const mutation = useMutation<
  IPatchArtistMyProfileResponse,
  unknown,
  IPatchArtistMyProfileRequest,
  unknown
  >(
    ["artist", "my-profile"],
    patchArtistMyProfile,
    {
      onSuccess: (data) => {
        showToast("프로필 정보가 수정되었습니다.");
        dispatch(setUser(data));
      },
    },
  );
  return mutation;
};

export const useUpdateArtistMyProfileImage = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const mutation = useMutation<
  IPatchArtistMyProfileResponse,
  unknown,
  Pick<IPatchArtistMyProfileRequest, "profileImage">,
  unknown
  >(
    ["artist", "my-profile", "profile-image"],
    patchArtistMyProfile,
    {
      onSuccess: (data) => {
        showToast("프로필 이미지가 변경되었습니다.");
        dispatch(setUser(data));
      },
    },
  );
  return mutation;
};
