import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import React from 'react';

interface props {
  value: any;
  showModal(value: any): void;
  type: string;
}
export const ModalMessage: React.FC<props> = ({ value, showModal, type }) => {
  const handleClose = () => {
    showModal(false);
  };

  return (
    <div>
      <Dialog open={value} onClose={handleClose}>
        <DialogTitle>Actualizar datos</DialogTitle>
        <DialogContent>
          {type === 'success' ? (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              La actualizacion se realizo de manera <strong>correcta!</strong>
            </Alert>
          ) : (
            <div>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Ocurrio un error <strong> intentalo de nuevo!</strong>
              </Alert>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Salir</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
