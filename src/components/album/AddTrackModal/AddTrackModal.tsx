import Modal from "@/components/common/Modals/Modal";
import { IAlbumInfo } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import AddTrackForm from "./AddTrackForm";

interface AddTrackModalProps {
  open: boolean;
  onClose: () => void;
  albumInfo?: IAlbumInfo;
}

const AddTrackModal = ({
  open, onClose, albumInfo,
}: AddTrackModalProps) => {
  // eslint-disable-next-line no-void
  void albumInfo;
  if (!albumInfo) return null;
  return (
    <Modal type={MODAL_TYPE.FORM} open={open} onClose={onClose}>
      <AddTrackForm albumInfo={albumInfo} onClose={onClose} />
    </Modal>
  );
};

export default AddTrackModal;
