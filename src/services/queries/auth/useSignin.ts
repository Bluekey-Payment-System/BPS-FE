import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import useAlertModal from "@/hooks/useAlertModal";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { adminSignIn, artistSignIn } from "@/services/api/requests/auth/auth.post.api";
import {
  IPostAdminSignInRequest,
  IPostAdminSignInResponse,
  IPostArtistSignInRequest,
  IPostArtistSignInResponse,
} from "@/services/api/types/auth";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import { MEMBER_TYPE, MemberType } from "@/types/enums/user.enum";
import { setCookie } from "@/utils/cookies";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

const useAdminSignin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showAlertModal } = useAlertModal({
    type: MODAL_TYPE.ERROR,
    title: "로그인 실패",
    message: "아이디와 비밀번호를 확인하세요",
  });
  const mutation = useMutation<
  IPostAdminSignInResponse,
  unknown,
  IPostAdminSignInRequest,
  unknown
  >(
    ["admin", "signin"],
    adminSignIn,
    {
      onSuccess: (data) => {
        setCookie("token", data.jwtInformation.accessToken);
        dispatch(setUser({ ...data.member, profileImage: null }));
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/admin/dashboard/${getLatestYearMonthString()}`, undefined, { shallow: true });
      },
      onError: () => {
        showAlertModal();
      },
    },
  );

  return mutation;
};

const useArtistSignin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showAlertModal } = useAlertModal({
    type: MODAL_TYPE.ERROR,
    title: "로그인 실패",
    message: "아이디와 비밀번호를 확인하세요",
  });
  const mutation = useMutation<
  IPostArtistSignInResponse,
  unknown,
  IPostArtistSignInRequest,
  unknown
  >(
    ["artist", "signin"],
    artistSignIn,
    {
      onSuccess: (data) => {
        dispatch(setUser({ ...data.member, profileImage: null }));
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/artists/${data.member.memberId}/dashboard/${getLatestYearMonthString()}`);
      },
      onError: () => {
        showAlertModal();
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
