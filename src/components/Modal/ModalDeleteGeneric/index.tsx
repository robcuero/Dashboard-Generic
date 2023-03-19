import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import React, { useState } from 'react';

interface props {
  value: any;
  showModal(value: any): void;
  send(): boolean;
}
export const ModalDeleteGeneric: React.FC<props> = ({
  value,
  showModal,
  send
}) => {
  const [status, setEstatus] = useState(false);

  const handleClose = () => {
    showModal(false);
    setTimeout(() => {
      setEstatus(false);
    }, 1000);
  };

  const genericFunction = () => {
    setEstatus(send());
  };

  return (
    <div>
      <Dialog open={value} onClose={handleClose}>
        <DialogTitle>Eliminar suscripcion</DialogTitle>
        <DialogContent>
          {status === true ? (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              La suscripcion se elimino de manera correcta{' '}
              <strong>correcta!</strong>
            </Alert>
          ) : (
            <div>
              <Alert severity="error">
                <AlertTitle>Estas seguro?</AlertTitle>
                Se Eliminara la suscripcion de manera
                <strong> permanente</strong>
              </Alert>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Salir</Button>
          {status === true ? (
            ''
          ) : (
            <Button onClick={genericFunction}>Eliminar</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
