import { useState } from "react";

import AlbumInfoModal from "@/components/dashboard/AlbumInfoModal/AlbumInfoModal";
import { MOCK_ALBUM_TRACKS } from "@/constants/mock";
import useAlertModal from "@/hooks/useAlertModal";
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
  return (
    <>
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
