import { useQuery } from "@tanstack/react-query";

import { checkPendingStatus } from "@/services/api/requests/notification-controller/notification-controller.get.api";

const useCheckPendingStatus = () => {
  const response = useQuery(["check-pending-status"], checkPendingStatus, {
    refetchInterval: 3 * 60 * 1000,
    refetchIntervalInBackground: true,
  });
  return response;
};

export default useCheckPendingStatus;
