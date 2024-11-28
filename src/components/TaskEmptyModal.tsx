import React from 'react';
import ValidationModal from '../layouts/ValidationModal.tsx';

interface ModalProps {
  closeModal: () => void;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ closeModal, open }) => {
  return (
    <ValidationModal
      open={open}
      closeModal={closeModal}
      title="Empty Input"
      message="Please add text for the task."
    />
  );
};

export default Modal;
