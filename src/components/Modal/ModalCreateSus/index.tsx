import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Suscripcion } from 'src/interface';
import { postSuscripcion } from 'src/services/clientService';

import { LETTER, NUMBER } from 'src/util/consts';

interface props {
  value: boolean;
  showModal(value: any): void;
  genericFunction(): any
}
export const ModalCreateSus: React.FC<props> = ({ value, showModal,genericFunction }) => {
  const [statusPost, setStatusPost] = useState(null);

  const handleClose = () => {
    if (statusPost === true) {
      setTimeout(() => {
        setStatusPost(null);
      }, 1000);
    }
    showModal(false);
  };
  const [suscripcion, setSuscripcion] = useState<Suscripcion>({
    idSuscripcion: null,
    nombre: null,
    descripcion: null,
    precio: null,
    dias: null
  });

  const createSus = () => {
    postSuscripcion(suscripcion).then(({ status }) => {
      setStatusPost(status === 200 ? true : false);
    });
  };

  useEffect(() => {
    if (statusPost === true) {
      genericFunction()
      setSuscripcion({
        ...suscripcion,
        idSuscripcion: null,
        nombre: null,
        descripcion: null,
        precio: null,
        dias: null
      });
    }
  }, [statusPost]);

  return (
    <div>
      <Dialog open={value} onClose={handleClose}>
        <DialogTitle>Ingresar una nueva suscripcion al cliente</DialogTitle>

        <DialogContent>
          {statusPost === true ? (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              La suscripcion se ingreso de manera correcta{' '}
              <strong>revisa las suscripciones!</strong>
            </Alert>
          ) : (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    id="lastname"
                    label="nombre"
                    type="text"
                    fullWidth
                    value={suscripcion.nombre}
                    inputProps={{
                      maxLength: 50
                    }}
                    variant="standard"
                    onChange={(e) =>
                      (LETTER.test(e.target.value) || e.target.value === '') &&
                      setSuscripcion({ ...suscripcion, nombre: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    id="identification"
                    label="Cedula"
                    type="text"
                    inputProps={{
                      maxLength: 10
                    }}
                    fullWidth
                    value={suscripcion.precio}
                    variant="standard"
                    onChange={(e) =>
                      (NUMBER.test(e.target.value) || e.target.value === '') &&
                      setSuscripcion({
                        ...suscripcion,
                        precio: Number(e.target.value)
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    id="identification"
                    label="Cedula"
                    type="text"
                    inputProps={{
                      maxLength: 10
                    }}
                    fullWidth
                    value={suscripcion.dias}
                    variant="standard"
                    onChange={(e) =>
                      (NUMBER.test(e.target.value) || e.target.value === '') &&
                      setSuscripcion({
                        ...suscripcion,
                        dias: Number(e.target.value)
                      })
                    }
                  />
                </Grid>
              </Grid>
            </div>
          )}

          {statusPost === false && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Se presento un error <strong>Vuelve a reintentar</strong>
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={
              suscripcion.nombre && suscripcion.precio && suscripcion.dias
                ? false
                : true
            }
            onClick={createSus}
          >
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
