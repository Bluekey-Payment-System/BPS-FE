import Modal from "@/components/common/Modals/Modal";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import AddTrackForm from "./AddTrackForm";

interface AddTrackModalProps {
  open: boolean;
  onClose: () => void;
  albumId: number;
}

const AddTrackModal = ({
  open, albumId, onClose,
}: AddTrackModalProps) => {
  // eslint-disable-next-line no-void
  void albumId;
  return (
    <Modal type={MODAL_TYPE.FORM} open={open} onClose={onClose}>
      <AddTrackForm />
    </Modal>
  );
};

export default AddTrackModal;
