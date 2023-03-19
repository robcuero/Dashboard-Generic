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
import { deleteTarget } from 'src/services/clientService';

interface props {
  value: any;
  showModal(value: any): void;
  selectTarget: any;
  sector: string;
  updateUser(id: any): void;
}
export const ModalDelete: React.FC<props> = ({
  value,
  showModal,
  selectTarget,
  updateUser,
  sector
}) => {
  const [error, setError] = useState({ code: null, error: false });

  const handleClose = () => {
    showModal(false);
    setError({ ...error, code: null });
  };

  const insertTarget = () => {
    deleteTarget(selectTarget[0].id).then((status) => {
      setError(
        status === 200
          ? { ...error, code: 200, error: false }
          : { ...error, error: true }
      );
    });
  };

  useEffect(() => {
    if (error.code === 200) {
      updateUser(sector);
    }
  }, [error.code]);

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
                  {selectTarget[0].nombre} {selectTarget[0].apellido}{' '}
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
