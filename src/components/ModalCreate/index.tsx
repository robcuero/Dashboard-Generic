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
import { Sale } from 'src/interface';
import { getSector, postSale } from 'src/services/clientService';
import { LETTER, NUMBER, SEPARATOR } from 'src/util/consts';

interface props {
  value: boolean;
  showModal(value: any): void;
}
export const Modal: React.FC<props> = ({ value, showModal }) => {
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
  };
  const [user, setUser] = useState<Sale>({
    nombre: '',
    apellido: '',
    telefono: '099999999',
    abono: 0,
    total: 0,
    cedula: '2300000000',
    id_Sector: null
  });
  const insertTarget = () => {
    postSale(user).then((status) => {
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
        nombre: '',
        apellido: '',
        telefono: '099999999',
        cedula: '2300000000',
        total: 0,
        abono: 0
      });
      setTimeout(() => {
        setError({ ...error, code: null });
      }, 10000);
    }
  }, [error.code]);
  console.log(user,user.nombre);
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

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre"
              type="text"
              value={user.nombre}
              inputProps={{
                maxLength: 50
              }}
              fullWidth
              variant="standard"
              onChange={(e) =>
                (LETTER.test(e.target.value)) &&
                setUser({ ...user, nombre: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="name"
              label="Apellido"
              type="text"
              fullWidth
              value={user.apellido}
              inputProps={{
                maxLength: 50
              }}
              variant="standard"
              onChange={(e) =>
                (LETTER.test(e.target.value)) &&
                setUser({ ...user, apellido: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="name"
              label="Cedula"
              type="text"
              inputProps={{
                maxLength: 10
              }}
              fullWidth
              value={user.cedula}
              variant="standard"
              onChange={(e) =>
                (NUMBER.test(e.target.value) || e.target.value === '') &&
                setUser({ ...user, cedula: e.target.value })
              }
            />

            <TextField
              margin="dense"
              id="name"
              label="Telefono"
              type="text"
              inputProps={{
                maxLength: 10
              }}
              fullWidth
              value={user.telefono}
              variant="standard"
              onChange={(e) =>
                (NUMBER.test(e.target.value) || e.target.value === '') &&
                setUser({ ...user, telefono: e.target.value })
              }
            />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              margin="dense"
              id="name"
              label="Total"
              type="number"
              fullWidth
              value={user.total.toString()}
              onChange={(e) =>
                (SEPARATOR.test(e.target.value) ||
                  Number(e.target.value) === 0) &&
                setUser({ ...user, total: Number(e.target.value) })
              }
              inputProps={{
                min: 0
              }}
              variant="standard"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
              error={user.abono <= user.total ? false : true}
              helperText="El abono no puede ser mayor que el total"
              margin="dense"
              id="name"
              label="Abono"
              type="number"
              fullWidth
              value={user.abono.toString()}
              onChange={(e) =>
                (SEPARATOR.test(e.target.value) ||
                  Number(e.target.value) === 0) &&
                setUser({ ...user, abono: Number(e.target.value) })
              }
              variant="standard"
              inputProps={{
                min: 0
              }}
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
              El registro se ingreso de manera correcta{' '}
              <strong>revisa la tabla!</strong>
            </Alert>
          ) : (
            ''
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={
              user.nombre &&
              user.total &&
              user.cedula &&
              user.apellido &&
              user.id_Sector &&
              user.abono <= user.total
                ? false
                : true
            }
            onClick={insertTarget}
          >
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
