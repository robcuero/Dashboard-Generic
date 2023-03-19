import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  Stack,
  AlertTitle,
  Alert
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Sale } from 'src/interface';
import { useEffect, useState } from 'react';
import { LETTER, NUMBER } from 'src/util/consts';
import { esES } from '@mui/x-date-pickers/locales/esES';
import { Dayjs } from 'dayjs';
import { formatdate } from 'src/util/formatDate';
import { useDispatch } from 'react-redux';
import { postActiveSus, updateUser } from 'src/services/clientService';
import { setClient } from 'src/store/slices/userDetail/formSlice';
import { ModalMessage } from 'src/components/Modal/ModaMessage';
function EditProfileTab(user) {
  const client = user.user.cliente;
console.log('aaaaaa',client)
  const [infoUser, setInfoUser] = useState<Sale>({
    idCliente: client.idCliente,
    nombre: client.nombre,
    apellido: client.apellido,
    cedula: client.cedula,
    correo: client.correo,
    altura: client.altura,
    peso: client.peso,
    direccion: client.direccion,
    fechaNacimiento: client.fechaNacimiento,
    telefono: client.telefono
  });
  const [dateInitial, setDateInitial] = useState<any>();
  const [errorDate, setErrorDate] = useState(null);

  useEffect(() => {
    setDateInitial(infoUser.fechaNacimiento);
  }, []);

  const onChangeDateInitial = (newValue: Dayjs | null) => {
    setDateInitial(newValue);
    setInfoUser({
      ...infoUser,
      fechaNacimiento: formatdate(
        new Date(newValue.toString()).toLocaleDateString('en-US')
      )
    });
  };

  const [error, setError] = useState({
    code: null,
    error: false,
    status: null
  });
  const [open, setOpen] = useState(false);
  const showModal = (value: boolean) => {
    setOpen(value);
  };

  const dispatch = useDispatch();
  const updateClient = () => {
    updateUser(infoUser).then(({ status, data }) => {
      if (data.code === 100) {
        dispatch(setClient(data));
        showModal(true);
      }
      setError(
        data.code === 100 && status === 200
          ? { ...error, code: data.code, error: false, status: data.code }
          : { ...error, error: true }
      );
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Datos Personales
              </Typography>
              <Typography variant="subtitle2">
                Manage informations related to your personal details
              </Typography>
            </Box>
          </Box>
          <Divider />
          <div style={{ display: 'flex' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2} mt={2}>
                      Nombre:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <TextField
                        onChange={(e) =>
                          (LETTER.test(e.target.value) ||
                            e.target.value === '') &&
                          setInfoUser({ ...infoUser, nombre: e.target.value })
                        }
                        id="standard-basic"
                        variant="standard"
                        value={infoUser.nombre}
                      />
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2} mt={2}>
                      Cedula:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <Text color="black">
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          value={infoUser.cedula}
                          onChange={(e) =>
                            (NUMBER.test(e.target.value) ||
                              e.target.value === '') &&
                            setInfoUser({ ...infoUser, cedula: e.target.value })
                          }
                        />
                        <Box pl={1} component="span">
                          <Label marginTop="15px" color="success">
                            Importante
                          </Label>
                        </Box>
                      </Text>
                    </Text>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2} mt={2}>
                      Apellido:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <TextField
                        id="standard-basic"
                        value={infoUser.apellido}
                        variant="standard"
                        onChange={(e) =>
                          (LETTER.test(e.target.value) ||
                            e.target.value === '') &&
                          setInfoUser({ ...infoUser, apellido: e.target.value })
                        }
                      />
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2} mt={2}>
                      Fecha de nacimiento:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
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
                                style={{ marginTop: '8px', width: '200px' }}
                                variant="standard"
                                {...params}
                              />
                            )}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Datos de contacto
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated email addresses
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} mt={2}>
                    Telefono:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <Text color="black">
                      <TextField
                        id="standard-basic"
                        value={infoUser.telefono}
                        variant="standard"
                        onChange={(e) =>
                          (LETTER.test(e.target.value) ||
                            e.target.value === '') &&
                          setInfoUser({ ...infoUser, telefono: e.target.value })
                        }
                      />
                      <Box pl={1} component="span">
                        <Label marginTop="15px" color="success">
                          Importante
                        </Label>
                      </Box>
                    </Text>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} mt={2}>
                    Correo:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <Text color="black">
                      <TextField
                        id="standard-basic"
                        value={infoUser.correo}
                        variant="standard"
                        onChange={(e) =>
                          (LETTER.test(e.target.value) ||
                            e.target.value === '') &&
                          setInfoUser({ ...infoUser, correo: e.target.value })
                        }
                      />
                    </Text>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} mt={2}>
                    Direccion:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <Text color="black">
                      <TextField
                        id="standard-basic"
                        value={client.direccion}
                        variant="standard"
                        onChange={(e) =>
                          (LETTER.test(e.target.value) ||
                            e.target.value === '') &&
                          setInfoUser({
                            ...infoUser,
                            direccion: e.target.value
                          })
                        }
                      />
                    </Text>
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Datos fisicos
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated email addresses
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} mt={2}>
                    Peso:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <Text color="black">
                      <TextField
                        id="standard-basic"
                        value={infoUser.peso}
                        variant="standard"
                        onChange={(e) =>
                          (NUMBER.test(e.target.value) ||
                            e.target.value === '') &&
                          setInfoUser({ ...infoUser, peso: e.target.value })
                        }
                      />
                      <Box pl={1} component="span">
                        <Label marginTop="15px" color="success">
                          Importante
                        </Label>
                      </Box>
                    </Text>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} mt={2}>
                    Altura:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <Text color="black">
                      <TextField
                        id="standard-basic"
                        label="Standard"
                        variant="standard"
                        value={infoUser.altura}
                        onChange={(e) =>
                          (NUMBER.test(e.target.value) ||
                            e.target.value === '') &&
                          setInfoUser({ ...infoUser, altura: e.target.value })
                        }
                      />
                    </Text>
                  </Text>
                </Grid>
                {/* <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} mt={2}>
                    Peso Deseado:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <Text color="black">
                      <TextField
                        id="standard-basic"
                        label="Standard"
                        variant="standard"
                      />
                    </Text>
                  </Text>
                </Grid> */}
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <Button
            variant="text"
            style={{ float: 'right', margin: '10px' }}
            startIcon={<EditTwoToneIcon />}
            onClick={updateClient}
          >
            Guardar
          </Button>

          <ModalMessage
            type={error.code === 100 ? 'success' : 'error'}
            showModal={showModal}
            value={open}
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;
