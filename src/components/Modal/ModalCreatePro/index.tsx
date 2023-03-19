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
import { Promotion, Suscripcion } from 'src/interface';
import { postPromotion, postSuscripcion } from 'src/services/clientService';

import { LETTER, NUMBER } from 'src/util/consts';

interface props {
  value: boolean;
  showModal(value: any): void;
  genericFunction(): any;
}
export const ModalCreatePro: React.FC<props> = ({
  value,
  showModal,
  genericFunction
}) => {
  const [statusPost, setStatusPost] = useState(null);

  const handleClose = () => {
    if (statusPost === true) {
      setTimeout(() => {
        setStatusPost(null);
      }, 1000);
    }
    showModal(false);
  };
  const [promotion, setPromotion] = useState<Promotion>({
    idPromocion: null,
    nombre: null,
    porcentaje: null
  });

  const createSus = () => {
    postPromotion(promotion).then(({ status }) => {
      setStatusPost(status === 200 ? true : false);
    });
  };

  useEffect(() => {
    if (statusPost === true) {
      genericFunction();
      setPromotion({
        ...promotion,
        idPromocion: null,
        nombre: null,
        porcentaje: null
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
                    value={promotion.nombre}
                    inputProps={{
                      maxLength: 50
                    }}
                    variant="standard"
                    onChange={(e) =>
                      (LETTER.test(e.target.value) || e.target.value === '') &&
                      setPromotion({ ...promotion, nombre: e.target.value })
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
                    value={promotion.porcentaje}
                    variant="standard"
                    onChange={(e) =>
                      (NUMBER.test(e.target.value) || e.target.value === '') &&
                      setPromotion({
                        ...promotion,
                        porcentaje: Number(e.target.value)
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
            disabled={promotion.nombre && promotion.porcentaje ? false : true}
            onClick={createSus}
          >
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
