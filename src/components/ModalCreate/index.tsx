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
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Sale } from 'src/interface';
import { getSector, postSale } from 'src/services/clientService';
import { LETTER, NUMBER, SEPARATOR } from 'src/util/consts';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { formatdate } from 'src/util/formatDate';

interface props {
  value: boolean;
  showModal(value: any): void;
}
export const Modal: React.FC<props> = ({ value, showModal }) => {
  const [error, setError] = useState({
    code: null,
    error: false,
    status: null
  });
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
    telefono: '',
    correo: '',
    cedula: '',
    fechaNacimiento: '',
    fechaInicio: '',
    id_Suscripcion: null
  });
  const insertTarget = () => {
    postSale(user).then(({ status, data }) => {
      console.log(data, status);
      setError(
        status === 200
          ? { ...error, code: 200, error: false, status: data.code }
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
        telefono: '',
        correo: '',
        cedula: '',
        fechaNacimiento: '',
        fechaInicio: '',
        
      });
      setTimeout(() => {
        setError({ ...error, code: null, status });
      }, 10000);
    }
  }, [error.code]);

  const [birthay, setBirthay] = useState<any>();
  const onChange = (newValue: Dayjs | null) => {
    setBirthay(newValue);
    setUser({
      ...user,
      fechaNacimiento: formatdate(
        new Date(newValue.toString()).toLocaleDateString('en-US')
      )
    });
  };
  const [dateInitial, setDateInitial] = useState<any>();
  const onChangeDateInitial = (newValue: Dayjs | null) => {
    setDateInitial(newValue);
    console.log(formatdate(
      new Date(newValue.toString()).toLocaleDateString('en-US')
    ))
    setUser({
      ...user,
      fechaInicio: formatdate(
        new Date(newValue.toString()).toLocaleDateString('en-US')
      )
    });
  };

  return (
    <div>
      <Dialog open={value} onClose={handleClose}>
        <DialogTitle>Ingresar un nuevo cliente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa una nuevo cliente, no olvides de agregar la suscripcion
            cuando des click en "Ingresar" podras volver a ingresar mas ventas.
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
                      setUser({ ...user, id_Suscripcion: data.idSuscripcion })
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
            <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      disableFuture
                      label="Fecha de nacimiento"
                      inputFormat="MM/DD/YYYY"
                      value={dateInitial}
                      onChange={onChangeDateInitial}
                      renderInput={(params) => (
                        <TextField
                          style={{ marginTop: '8px' }}
                          variant="standard"
                          {...params}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
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
                    LETTER.test(e.target.value) &&
                    setUser({ ...user, nombre: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="lastname"
                  label="Apellido"
                  type="text"
                  fullWidth
                  value={user.apellido}
                  inputProps={{
                    maxLength: 50
                  }}
                  variant="standard"
                  onChange={(e) =>
                    LETTER.test(e.target.value) &&
                    setUser({ ...user, apellido: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="identification"
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
              </Grid>
              <Grid item xs={6}>
                {' '}
                <TextField
                  margin="dense"
                  id="phone"
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="mail"
                  label="Correo"
                  type="text"
                  inputProps={{
                    maxLength: 40
                  }}
                  fullWidth
                  value={user.correo}
                  variant="standard"
                  onChange={(e) =>
                    // LETTER.test(e.target.value) &&
                    setUser({ ...user, correo: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      disableFuture
                      label="Fecha de nacimiento"
                      inputFormat="MM/DD/YYYY"
                      value={birthay}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          style={{ marginTop: '8px' }}
                          variant="standard"
                          {...params}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </div>
          {error.error ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Se presento un error <strong>Vuelve a reintentar</strong>
            </Alert>
          ) : (
            ''
          )}

          {error.status === '100' ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              El usuario ya se encuentra registrado{' '}
              <strong>Vuelve a reintentar</strong>
            </Alert>
          ) : (
            ''
          )}
          {(error.code && error.status) === '200' ? (
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
              user.telefono &&
              user.cedula &&
              user.apellido &&
              user.id_Suscripcion &&
              user.correo &&
              user.fechaNacimiento
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
