import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import useAlertModal from "@/hooks/useAlertModal";
import useLazyQuery from "@/hooks/useLazyQuery";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { getDropdownArtists } from "@/services/api/requests/artist/artist.get.api";
import { adminSignIn, artistSignIn } from "@/services/api/requests/auth/auth.post.api";
import {
  IPostAdminSignInRequest,
  IPostAdminSignInResponse,
  IPostArtistSignInRequest,
  IPostArtistSignInResponse,
} from "@/services/api/types/auth";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_ROLE, MEMBER_TYPE, MemberType } from "@/types/enums/user.enum";
import { setCookie } from "@/utils/cookies";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

const useAdminSignin = () => {
  const dispatch = useAppDispatch();
  const { refetch: getArtistNames } = useLazyQuery([MEMBER_ROLE.ARTIST, "names"], getDropdownArtists);
  const router = useRouter();
  const { showAlertModal } = useAlertModal();
  const mutation = useMutation<IPostAdminSignInResponse, unknown, IPostAdminSignInRequest, unknown>(
    ["admin", "signin"],
    adminSignIn,
    {
      onSuccess: (data) => {
        setCookie("token", data.jwtInformation.accessToken, {
          maxAge: 900000,
          path: "/",
          // secure: true,
          // httpOnly: true,
        });
        // eslint-disable-next-line no-void, @typescript-eslint/no-floating-promises
        getArtistNames();
        dispatch(setUser(data.member));
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/admin/dashboard/${getLatestYearMonthString()}`);
      },
      onError: () => {
        showAlertModal({
          type: MODAL_TYPE.ERROR,
          title: "로그인 실패",
          message: "아이디와 비밀번호를 확인하세요",
        });
      },
    },
  );

  return mutation;
};

const useArtistSignin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showAlertModal } = useAlertModal();
  // eslint-disable-next-line max-len
  const mutation = useMutation<IPostArtistSignInResponse, unknown, IPostArtistSignInRequest, unknown>(
    ["artist", "signin"],
    artistSignIn,
    {
      onSuccess: (data) => {
        setCookie("token", data.jwtInformation.accessToken, {
          maxAge: 900000,
          // secure: true,
          // httpOnly: true,
        });
        dispatch(setUser(data.member));
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/artists/${data.member.memberId}/dashboard/${getLatestYearMonthString()}`);
      },
      onError: () => {
        showAlertModal({
          type: MODAL_TYPE.ERROR,
          title: "로그인 실패",
          message: "아이디와 비밀번호를 확인하세요",
        });
      },
    },
  );

  return mutation;
};

const useSignin = (type: MemberType) => {
  const adminSigninMutation = useAdminSignin();
  const artistSigninMutation = useArtistSignin();
  if (type === MEMBER_TYPE.USER) {
    return artistSigninMutation;
  }
  return adminSigninMutation;
};

export default useSignin;
