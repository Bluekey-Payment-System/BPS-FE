import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { useAppDispatch } from "@/redux/hooks";
import { adminSignIn } from "@/services/api/requests/auth/auth.post.api";
import { IPostAdminSignInRequest, IPostAdminSignInResponse } from "@/services/api/types/auth";
import getLatestYearMonthString from "@/utils/getLatestYearMonthString";

export const useAdminSignin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
        dispatch(data.member);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(`/admin/dashboard/${getLatestYearMonthString()}`);
      },
    },
  );

  return mutation;
};
