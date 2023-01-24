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
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Sale } from 'src/interface';
import { getSector, postEdit } from 'src/services/clientService';
import { LETTER, NUMBER, SEPARATOR } from 'src/util/consts';

interface props {
  value: boolean;
  showModal(value: any): void;
  selectTarget: any;
  sector: string;
  updateUser(id: any): void;
}
export const ModalEdit: React.FC<props> = ({
  value,
  showModal,
  selectTarget,
  updateUser,
  sector
}) => {
  const [error, setError] = useState({ code: null, error: false });
  const [age, setAge] = useState('');
  const [data, setData] = useState<any>();

  useEffect(() => {
    getSector().then((res) => {
      setData(res);
    });
    // eslint-disable-next-line
  }, []);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleClose = () => {
    showModal(false);
    setTimeout(() => {
      setError({ ...error, code: null });
    }, 1000);
  };

  const [user, setUser] = useState<Sale>({
    idTarjeta: null,
    nombre: null,
    apellido: null,
    telefono: null,
    cedula: null,
    total: 0,
    abono: 0,
    id_Sector: null
  });

  useEffect(() => {
    setUser({
      ...user,
      idTarjeta: selectTarget[0].id,
      nombre: selectTarget[0].nombre,
      apellido: selectTarget[0].apellido,
      abono: 0,
      total: selectTarget[0].total,
      telefono: selectTarget[0].telefono,
      subtotal: selectTarget[0].subtotal,
      cedula: selectTarget[0].cedula,
      id_Sector: sector
    });
  }, [selectTarget]);
  const insertTarget = () => {
    postEdit(user).then((status) => {
      setError(
        status === 200
          ? { ...error, code: 200, error: false }
          : { ...error, error: true }
      );
    });
  };
  useEffect(() => {
    if (error.code === 200) {
      setUser({
        ...user,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        cedula: user.cedula,
        total: user.total,
        abono: user.abono
      });
      updateUser(user.id_Sector);
    }
  }, [error.code]);
  console.log('2222ss', user.telefono);
  console.log('NUMBER.test(e.target.value)', NUMBER.test(user.telefono));

  return (
    <div>
      <Dialog open={value} onClose={handleClose}>
        <DialogTitle>Ingresar Nuevo Abono</DialogTitle>
        <DialogContent>
          {error.code === 200 ? (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              El registro se ingreso de manera correcta{' '}
              <strong>revisa la tabla!</strong>
            </Alert>
          ) : (
            <div>
              <DialogContentText>
                Ingresa un nuevo abono, no olvides de agregar el Sector cuando
                des click en "Ingresar" podras volver a ingresar mas ventas.
              </DialogContentText>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel id="demo-simple-select-label">Sector</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  {data?.map((data: any, index: number) => (
                    <MenuItem
                      onClick={() =>
                        setUser({ ...user, id_Sector: data.idSector })
                      }
                      key={index}
                      value={index}
                    >
                      {data.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={4} md={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre"
                    type="email"
                    value={user.nombre}
                    fullWidth
                    variant="standard"
                    onChange={(e) =>
                      (LETTER.test(e.target.value) || e.target.value === '') &&
                      setUser({ ...user, nombre: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={8} md={6}>
                  <TextField
                    margin="dense"
                    id="name"
                    label="Apellido"
                    type="text"
                    value={user.apellido}
                    fullWidth
                    variant="standard"
                    onChange={(e) =>
                      (LETTER.test(e.target.value) || e.target.value === '') &&
                      setUser({ ...user, apellido: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <TextField
                margin="dense"
                id="name"
                label="Cedula"
                type="text"
                value={user.cedula}
                inputProps={{
                  maxLength: 10
                }}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  NUMBER.test(e.target.value) &&
                  setUser({ ...user, cedula: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="name"
                label="Telefono"
                type="tel"
                inputProps={{
                  maxLength: 10
                }}
                fullWidth
                variant="standard"
                value={user.telefono}
                onChange={(e) =>
                  NUMBER.test(e.target.value) &&
                  setUser({ ...user, telefono: e.target.value })
                }
              />
              <TextField
                disabled
                margin="dense"
                id="name"
                label="Total"
                type="number"
                defaultValue={user.total}
                fullWidth
                variant="standard"
              />

              <Typography my={2} variant="h4">
                Ingresar abono
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6}>
                  <div></div>
                </Grid>
                <Grid item xs={4} md={6}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                    helperText="El abono no puede ser mayor que el total"
                    error={user.abono <= user.subtotal ? false : true}
                    margin="dense"
                    id="name"
                    label="Nuevo Abono"
                    defaultValue={0}
                    type="number"
                    fullWidth
                    value={user.abono.toString()}
                    onChange={(e) =>
                      (SEPARATOR.test(e.target.value) ||
                        Number(e.target.value) === 0) 
                        &&
                      setUser({ ...user, abono: Number(e.target.value) })
                    }
                    variant="standard"
                    inputProps={{
                      style: {
                        fontSize: '30px',
                        textAlign: 'right'
                      },
                      min: 0
                    }}
                  />
                </Grid>
              </Grid>
              <Typography
                align="right"
                variant="h2"
                sx={{
                  pr: 1,
                  mb: 1
                }}
              >
                Deuda actual ${user.subtotal - user.abono}
              </Typography>
            </div>
          )}

          {error.error ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Se presento un error <strong>Vuelve a reintentar</strong>
            </Alert>
          ) : (
            ''
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Salir</Button>
          {error.code === 200 ? (
            ''
          ) : (
            <Button
              disabled={
                user.nombre &&
                user.total &&
                user.cedula &&
                user.apellido &&
                user.id_Sector &&
                user.abono <= user.subtotal
                  ? false
                  : true
              }
              onClick={insertTarget}
            >
              Ingresar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
