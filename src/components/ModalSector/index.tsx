import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Sale, Sector } from 'src/interface';
import { getSector, postSale, postSector } from 'src/services/clientService';
import { LETTER, NUMBER, SEPARATOR } from 'src/util/consts';

interface props {
  value: boolean;
  showModal(value: any): void;
}
export const ModalSector: React.FC<props> = ({ value, showModal }) => {
  const [error, setError] = useState({ code: null, error: false });

  const handleClose = () => {
    showModal(false);
  };
  const [sector, setSector] = useState<Sector>({
    nombre: '',
    cobrador: '',
    id_Sector: null
  });
  const insertTarget = () => {
    postSector(sector).then((status) => {
      setError(
        status === 200
          ? { ...error, code: 200, error: false }
          : { ...error, error: true }
      );
    });
  };
  useEffect(() => {
    if (error.code === 200) {
      setSector({
        ...sector,
        nombre: '',
        cobrador: ''
      });
      setTimeout(() => {
        setError({ ...error, code: null });
      }, 10000);
    }
  }, [error.code]);

  return (
    <div>
      <Dialog open={value} onClose={handleClose}>
        <DialogTitle>Ingresar Nueva Venta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa una nueva venta, no olvides de agregar el Sector cuando des
            click en "Ingresar" podras volver a ingresar mas ventas.
          </DialogContentText>

          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre"
              type="text"
              value={sector.nombre}
              inputProps={{
                maxLength: 50
              }}
              fullWidth
              variant="standard"
              onChange={(e) =>
                LETTER.test(e.target.value) &&
                setSector({ ...sector, nombre: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="name"
              label="Cobrador"
              type="text"
              fullWidth
              value={sector.cobrador}
              inputProps={{
                maxLength: 50
              }}
              variant="standard"
              onChange={(e) =>
                LETTER.test(e.target.value) &&
                setSector({ ...sector, cobrador: e.target.value })
              }
            />
          </div>
          {error.error ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Se presento un error <strong>Vuelve a reintentar</strong>
            </Alert>
          ) : (
            ''
          )}
          {error.code === 200 ? (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              El registro se ingreso de manera correcta ingresa{' '}
              <strong>revisa la tabla!</strong>
            </Alert>
          ) : (
            ''
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={sector.nombre && sector.cobrador ? false : true}
            onClick={insertTarget}
          >
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
