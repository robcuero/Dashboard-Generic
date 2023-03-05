import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteSuscription, deleteTarget } from 'src/services/clientService';

interface props {
  value: any;
  showModal(value: any): void;
  id: any;
  // sector: string;
  // updateUser(id: any): void;
}
export const ModalDeleteSuscription: React.FC<props> = ({
  value,
  showModal,
  id,
  // updateUser,
  // sector
}) => {
  const [error, setError] = useState({ code: null, error: false });

  const handleClose = () => {
    showModal(false);
    setError({ ...error, code: null });
  };

  const insertTarget = () => {
    deleteSuscription(id).then((status) => {
      setError(
        status === 200
          ? { ...error, code: 200, error: false }
          : { ...error, error: true }
      );
    });
  };

  // useEffect(() => {
  //   if (error.code === 200) {
  //     updateUser(sector);
  //   }
  // }, [error.code]);

  return (
    <div>
      <Dialog open={value} onClose={handleClose}>
        <DialogTitle>Eliminar cliente</DialogTitle>
        <DialogContent>
          {error.code === 200 ? (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              El registro se elimino de manera correcta{' '}
              <strong>revisa la tabla!</strong>
            </Alert>
          ) : (
            <div>
              <Alert severity="error">
                <AlertTitle>Estas seguro?</AlertTitle>
                Se Eliminara el cliente{' '}
                <strong>
                  ssss
                </strong>
              </Alert>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Salir</Button>
          {error.code === 200 ? (
            ''
          ) : (
            <Button onClick={insertTarget}>Eliminar</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
