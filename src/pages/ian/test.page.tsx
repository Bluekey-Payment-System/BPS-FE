/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-void */
import { useState } from "react";

import AlbumInfoModal from "@/components/dashboard/AlbumInfoModal/AlbumInfoModal";
import { MOCK_ALBUM_TRACKS } from "@/constants/mock";
import useAlertModal from "@/hooks/useAlertModal";
import {
  getAdminDashboardBar, getAdminDashboardCards, getAdminDashboardDoughnut, getAdminDashboardTable,
} from "@/services/api/requests/admin/admin.get.api";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);

  const alertModalProps = {
    open: isOpen,
    type: MODAL_TYPE.ERROR,
    title: "로그인 에러",
    message: "로그인에 실패했습니다. 아이디/비밀번호를 다시 한번 확인해주세요.",
    onClose: () => { setIsOpen(false); },
  };
  const { showAlertModal } = useAlertModal(alertModalProps);

  const testAsync = async () => {
    const adminCard = await getAdminDashboardCards("202307");
    console.log(adminCard);
    const adminBar = await getAdminDashboardBar("202305", "202307");
    console.log(adminBar);
    const adminDoughnut = await getAdminDashboardDoughnut("202307", 5);
    console.log(adminDoughnut);
    const adminTable = await getAdminDashboardTable("202307", 1, 1, "TRACK", "TRACK", "");
    console.log(adminTable);
  };

  const handleClickTestButton = () => {
    void testAsync();
  };

  return (
    <>
      <button onClick={handleClickTestButton}>테스트 버튼</button>
      <button onClick={() => { showAlertModal(); }}>경고 모달 열기</button>
      <AlbumInfoModal
        data={MOCK_ALBUM_TRACKS}
        open={isOpen}
        onClose={() => { setIsOpen(false); }}
      />
      <button onClick={() => { setIsOpen(true); }}>모달 열기 버튼</button>
    </>
  );
};

export default Test;
