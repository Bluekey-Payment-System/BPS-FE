/* eslint-disable @typescript-eslint/no-floating-promises */
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
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
import { ICommonErrorResponse } from "@/services/api/types/global";
import { REQUEST_AUTHORITY_STATUS } from "@/types/enums/authority.enum";
import { MEMBER_ROLE, MEMBER_TYPE, MemberType } from "@/types/enums/user.enum";
import { setCookie } from "@/utils/cookies";
import getErrorModalInfo from "@/utils/getErrorModalInfo";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";
import { isCommonError } from "@/utils/type.predicates";

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
        dispatch(setUser(data.member));
        if (data.member.role === REQUEST_AUTHORITY_STATUS.PENDING) {
          router.push("/admin/signin/pending");
        } else if (data.member.role === REQUEST_AUTHORITY_STATUS.REJECTED) {
          router.push("/admin/signin/rejected");
        } else {
          // eslint-disable-next-line no-void, @typescript-eslint/no-floating-promises
          getArtistNames();
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.push(`/admin/dashboard/${getLatestYearMonthString()}`);
        }
      },
      onError: (err) => {
        if (isAxiosError<ICommonErrorResponse>(err)) {
          if (isCommonError(err.response?.data)) {
            const errMessage = err.response?.data.code === "AU_002" ? err.response?.data.message : "아이디와 비밀번호를 확인하세요.";
            showAlertModal(getErrorModalInfo(errMessage, "로그인 실패"));
          }
        } else console.error(err);
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
      onError: (err) => {
        if (isAxiosError<ICommonErrorResponse>(err)) {
          if (isCommonError(err.response?.data)) {
            showAlertModal(getErrorModalInfo(err.response?.data.message ?? "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도하세요.", "로그인 실패"));
          }
        } else console.error(err);
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
