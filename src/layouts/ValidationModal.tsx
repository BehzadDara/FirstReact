import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface ValidationModalProps {
  open: boolean;
  title: string;
  message: string;
  closeModal: () => void;
}

const ValidationModal: React.FC<ValidationModalProps> = ({ open, title, message, closeModal }) => {
  return (
    <Dialog
      open={open} 
      onClose={closeModal}
      sx={{
        '& .MuiDialog-paper': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          textAlign: 'center',
        },
      }}
    >
      <DialogTitle id="validation-modal-title">{title}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeModal}
          color="primary"
          sx={{
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#c82333',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ValidationModal;
