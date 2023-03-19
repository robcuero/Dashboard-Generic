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
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Sale } from 'src/interface';
import {
  getPromocion,
  getSuscripcion,
  getUser,
  postSale
} from 'src/services/clientService';
import { LETTER, NUMBER } from 'src/util/consts';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { formatdate } from 'src/util/formatDate';
import { useDispatch } from 'react-redux';
import { setUserSuscription } from 'src/store/slices/userDetail/allUserSlice';
import { setIdSelect } from 'src/store/slices/userDetail/formSlice';
import { esES } from '@mui/x-date-pickers';

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
  const [valueS, setValueS] = useState('');
  const [valueP, setValueP] = useState('');
  const [suscripcion, setSuscripcion] = useState<any>();
  const [promotion, setPromotion] = useState<any>();
  const [dateInitial, setDateInitial] = useState<any>();
  const [errorDate, setErrorDate] = useState(null);

  useEffect(() => {
    getSuscripcion().then((res) => {
      setSuscripcion(res);
    });

    getPromocion().then((res) => {
      setPromotion(res);
    });
    // eslint-disable-next-line
  }, []);

  const handleChangeSuscripcion = (event: SelectChangeEvent) => {
    setValueS(event.target.value as string);
  };

  const handleChangePromotion = (event: SelectChangeEvent) => {
    setValueP(event.target.value as string);
  };

  const handleClose = () => {
    if ((error.code && error.status) === 200) {
      setTimeout(() => {
        setError({ ...error, code: null, error: null, status: null });
      }, 1000);
    }
    showModal(false);
  };
  const [user, setUser] = useState<Sale>({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    cedula: '',
    peso: '70',
    altura: '170',
    direccion: 'Ingresa una direccion',
    fechaNacimiento: formatdate(new Date()),
    fechaInicio: formatdate(new Date()),
    id_Suscripcion: null,
    id_Promocion: null,
    id_Cliente: null
  });

  const dispatch = useDispatch();
  const insertTarget = () => {
    postSale(user).then(({ status, data }) => {
      setError(
        status === 200
          ? { ...error, code: 200, error: false, status: data.code }
          : { ...error, error: true }
      );
    });
  };
  useEffect(() => {
    if (error.code === 200) {
      dispatch(setIdSelect(user.id_Suscripcion));
      getUser(user.id_Suscripcion).then((res) => {
        dispatch(setUserSuscription(res));
      });
    }
  }, [error.code]);

  useEffect(() => {
    if (error.code === 200) {
      setUser({
        ...user,
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        cedula: '',
        peso: '70',
        altura: '170',
        direccion: 'Ingresa una direccion',
        fechaNacimiento: '',
        fechaInicio: formatdate(new Date()),
        id_Promocion: null,
        id_Cliente: null
      });
    }
  }, [error.code]);

  const onChangeDateInitial = (newValue: Dayjs | null) => {
    setDateInitial(newValue);
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
          {(error.code && error.status) === 200 ? (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              El registro se ingreso de manera correcta{' '}
              <strong>revisa la tabla!</strong>
            </Alert>
          ) : (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="demo-simple-select-label">
                      Suscripcion
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={valueS}
                      label="Age"
                      onChange={handleChangeSuscripcion}
                    >
                      {suscripcion?.map((data: any, index: number) => (
                        <MenuItem
                          onClick={() =>
                            setUser({
                              ...user,
                              id_Suscripcion: data.idSuscripcion
                            })
                          }
                          key={index}
                          value={index}
                        >
                          {data.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="demo-simple-select-label">
                      Promociones
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={valueP}
                      label="Age"
                      onChange={handleChangePromotion}
                    >
                      {promotion?.map((value: any, index: number) => (
                        <MenuItem
                          onClick={() =>
                            setUser({
                              ...user,
                              id_Promocion: value.idPromocion
                            })
                          }
                          key={index}
                          value={index}
                        >
                          {value.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider
                    localeText={
                      esES.components.MuiLocalizationProvider.defaultProps
                        .localeText
                    }
                    dateAdapter={AdapterDayjs}
                  >
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        onError={(err) => setErrorDate(err)}
                        label="Fecha de inicio"
                        inputFormat="YYYY/MM/DD"
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
                      (LETTER.test(e.target.value) || e.target.value === '') &&
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
                      (LETTER.test(e.target.value) || e.target.value === '') &&
                      setUser({ ...user, apellido: e.target.value })
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
              </Grid>
            </div>
          )}

          {error.error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Se presento un error <strong>Vuelve a reintentar</strong>
            </Alert>
          )}
          {error.status === 100 ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              El usuario ya se encuentra registrado{' '}
              <strong>Vuelve a reintentar</strong>
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
              user.id_Promocion &&
              errorDate === null
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
