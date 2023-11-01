import { useQuery } from "@tanstack/react-query";

import { getCheckPendingStatus } from "@/services/api/requests/notification-controller/notification-controller.get.api";
import { MemberRole } from "@/types/enums/user.enum";

const useCheckPendingStatus = (role: MemberRole) => {
  const response = useQuery(["check-pending-status"], getCheckPendingStatus, {
    refetchInterval: 3 * 60 * 1000,
    refetchIntervalInBackground: true,
    enabled: role === "SUPER_ADMIN",
  });
  return response;
};

export default useCheckPendingStatus;
