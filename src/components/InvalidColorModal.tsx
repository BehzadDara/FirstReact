import React from 'react';
import ValidationModal from '../layouts/ValidationModal.tsx';

interface ModalProps {
  closeModal: () => void;
  open: boolean;
}

const InvalidColorModal: React.FC<ModalProps> = ({ closeModal, open }) => {
  return (
    <ValidationModal
      open={open}
      closeModal={closeModal}
      title="Invalid Color"
      message="Please enter a valid color."
    />
  );
};

export default InvalidColorModal;
