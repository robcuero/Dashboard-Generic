import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import Footer from 'src/components/Footer';
import { Cancel, CheckCircle } from '@mui/icons-material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useEffect, useState } from 'react';
import PageTitle from './title';
import { getSuscripcion } from 'src/services/clientService';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
function Suscription() {
  const [open, setOpen] = useState(false);
  const showModal = (value: boolean) => {
    setOpen(value);
  };
  const [suscripcion, setSuscripcion] = useState<any>();
  useEffect(() => {
    getSuscripcion().then((res) => {
      setSuscripcion(res);
    });
    // eslint-disable-next-line
  }, []);
  const theme = useTheme();
  const updateSus = () => {
    getSuscripcion().then((res) => {
      setSuscripcion(res);
    });
  };
  return (
    <>
      <Helmet>
        <title>Configuracion - Suscripcion</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Suscripcion"
          subHeading="Buttons allow users to take actions, and make choices, with a single tap."
          docs="https://material-ui.com/components/buttons/"
          genericFunction={updateSus}
          
        />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center">
          {suscripcion?.map((data: any, index: number) => (
            <Grid item xs={12} md={3} margin={1} key={index}>
              <Card>
                <div
                  style={{
                    display: 'flex',
                    padding: '14px',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="h4">{data.nombre}</Typography>
                  <div>
                    <Tooltip title="Editar Promocion" arrow>
                      <IconButton color="inherit" size="small">
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar Promocion" arrow>
                      <IconButton
                        // onClick={() => showModalDelete(true)}
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>

                <Divider />
                <CardContent>
                  <div
                    style={{
                      display: 'flex',
                      columnGap: '5px',
                      marginBottom: '7px'
                    }}
                  >
                    {' '}
                    <Typography>Cantidad: </Typography>{' '}
                    <Typography>{data.dias} dias</Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      columnGap: '5px',
                      marginBottom: '7px'
                    }}
                  >
                    {' '}
                    <Typography>Precio: </Typography>{' '}
                    <Typography>${data.precio}</Typography>
                  </div>
                  {data.estado ? (
                    <Typography
                      style={{ display: 'flex', marginBottom: '7px' }}
                    >
                      <CheckCircle color="success" />
                      Activo
                    </Typography>
                  ) : (
                    <Typography
                      style={{ display: 'flex', marginBottom: '7px' }}
                    >
                      <Cancel color="error" />
                      Inactivo
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default Suscription;
