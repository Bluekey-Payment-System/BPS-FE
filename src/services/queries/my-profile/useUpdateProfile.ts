/* eslint-disable no-void */
import { useMutation } from "@tanstack/react-query";

import { useAppDispatch } from "@/redux/hooks";
import { IUserState, setUser } from "@/redux/slices/userSlice";
import { IAdminProfile, IArtistProfile } from "@/types/dto";
import { MEMBER_ROLE, MEMBER_TYPE } from "@/types/enums/user.enum";

interface IPatchAdminMyProfileRequest extends Partial<{
  profileImage: File,
  email: string,
  nickname: string,
}> { }

interface IPatchAdminMyProfileResponse extends IAdminProfile { }

interface IPatchArtistMyProfileRequest extends Omit<IPatchAdminMyProfileRequest, "nickname"> { }

interface IPatchArtistMyProfileResponse extends IArtistProfile { }

const patchAdminMyProfile = (
  body: IPatchAdminMyProfileRequest,
): Promise<IPatchAdminMyProfileResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      void body;
      return resolve({
        memberId: 1,
        role: MEMBER_ROLE.ADMIN,
        type: MEMBER_TYPE.ADMIN,
        email: "example@bluekey_domain.com",
        loginId: "dfjalke",
        nickname: "블루키",
        profileImage: "https://s3...",
      });
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
        isSameKoNameWithEnName: false,
      });
    }, 2000);
  });
};

export const useUpdateAdminMyProfile = () => {
  const dispatch = useAppDispatch();
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
        dispatch(setUser(data as unknown as IUserState));
      },
    },
  );
  return mutation;
};

export const useUpdateArtistMyProfile = () => {
  const dispatch = useAppDispatch();
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
        dispatch(setUser(data as unknown as IUserState));
      },
    },
  );
  return mutation;
};
