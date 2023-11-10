import Modal from "@/components/common/Modals/Modal";
import { ITrackInfo } from "@/types/dto";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import AddTrackForm from "./AddTrackForm";

interface AddTrackModalProps {
  open: boolean;
  onClose: () => void;
  albumId: number;
  trackInfo?: ITrackInfo;
}

const AddTrackModal = ({
  open, onClose, albumId, trackInfo,
}: AddTrackModalProps) => {
  // eslint-disable-next-line no-void
  void albumId;
  if (!albumId) return null;
  return (
    <Modal type={MODAL_TYPE.FORM} open={open} onClose={onClose}>
      <AddTrackForm albumId={albumId} onClose={onClose} trackInfo={trackInfo} />
    </Modal>
  );
};

export default AddTrackModal;
