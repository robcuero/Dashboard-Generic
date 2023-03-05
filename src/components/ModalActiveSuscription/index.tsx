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
  postSale
} from 'src/services/clientService';
import { LETTER, NUMBER } from 'src/util/consts';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { formatdate } from 'src/util/formatDate';

interface props {
  value: boolean;
  showModal(value: any): void;
  id: any;
}
export const ModalActive: React.FC<props> = ({ value, showModal, id }) => {
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
    if ((error.code && error.status) === '200') {
      setTimeout(() => {
        setError({ ...error, code: null, error: null, status: null });
      }, 1000);
    }
    showModal(false);
  };
  const [user, setUser] = useState<Sale>({
    id_Cliente: id,
    fechaInicio: formatdate(new Date()),
    id_Suscripcion: null,
    id_Promocion: '1'
  });
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
      setUser({
        ...user,
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        cedula: '',
        fechaNacimiento: '',
        fechaInicio: ''
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
        <DialogTitle>Ingresar una nuevo suscripcion al cliente</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Ingresa una nueva suscripcion, no olvides de ingresar todos los
            campos y dar click en ingresar.
          </DialogContentText>
          {(error.code && error.status) === '200' ? (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              El registro se ingreso de manera correcta{' '}
              <strong>revisa la tabla!</strong>
            </Alert>
          ) : (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                              id_Promocion: value.id_Promocion
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
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        onError={(err) => setErrorDate(err)}
                        label="Fecha de inicio"
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
              </Grid>
            </div>
          )}

          {error.error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Se presento un error <strong>Vuelve a reintentar</strong>
            </Alert>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={user.id_Suscripcion && errorDate === null ? false : true}
            onClick={insertTarget}
          >
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
