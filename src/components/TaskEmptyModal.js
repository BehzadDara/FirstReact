import ValidationModal from '../layouts/ValidationModal';

const Modal = ({ closeModal, open }) => {
  return (
    <ValidationModal
      open={open}
      closeModal={closeModal}
      title="Empty input"
      message="Please add text for the task."
    />
  );
};

export default Modal;
