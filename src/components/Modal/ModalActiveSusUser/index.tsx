import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
  getUserDetail,
  postActiveSus
} from 'src/services/clientService';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { formatdate } from 'src/util/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { setAll } from 'src/store/slices/userDetail/formSlice';
import { esES } from '@mui/x-date-pickers/locales/esES';
import {
  setSuscription,
  setUserSuscription
} from 'src/store/slices/userDetail/allUserSlice';

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
    if ((error.code && error.status) === 200) {
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
    id_Promocion: null,
    nameSuscripcion: null
  });

  const dispatch = useDispatch();
  const activeSus = () => {
    dispatch(
      setSuscription({ id: user.id_Suscripcion, nombre: user.nameSuscripcion })
    );
    postActiveSus(user).then(({ status, data }) => {
      setError(
        status === 200
          ? { ...error, code: 200, error: false, status: data.code }
          : { ...error, error: true }
      );
    });
  };
  const { idSuscription } = useSelector((state: any) => state.allUser);

  useEffect(() => {
    if (error.code === 200) {
      getUserDetail(id).then((res) => {
        dispatch(setAll(res));
      });
      getUser(idSuscription).then((res) => {
        dispatch(setUserSuscription(res));
      });
    }
  }, [error.code]);
  
  useEffect(() => {
    if (error.code === 200) {
      setUser({
        ...user,
        id_Cliente: id,
        fechaInicio: formatdate(new Date()),
        id_Suscripcion: null,
        id_Promocion: null
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
        <DialogTitle>Ingresar una nueva suscripcion al cliente</DialogTitle>

        <DialogContent>
          {(error.code && error.status) === 200 ? (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              La suscripcion se ingreso de manera correcta{' '}
              <strong>revisa las suscripciones!</strong>
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
                              id_Suscripcion: data.idSuscripcion,
                              nameSuscripcion: data.nombre
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
                <Grid item xs={12}>
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
              user.id_Suscripcion && user.id_Promocion && errorDate === null
                ? false
                : true
            }
            onClick={activeSus}
          >
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
