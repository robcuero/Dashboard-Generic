import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  Button,
  IconButton,
  Container,
  Grid,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import RecentActivity from './RecentActivity';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

function ActivityTab(resume: any) {
debugger
  const client = resume.resume[0]
  return (
    <>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <Box display="flex" mb={3}>
              <Tooltip arrow placement="top" title="Go back">
                <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
                  <ArrowBackTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Box>
                <Typography variant="h3" component="h3" gutterBottom>
                  Perfil de {client.nombre} 
                </Typography>
                <Typography variant="subtitle2">
                  Esta es una página de perfil. Fácil de modificar, siempre
                  ultrarrápido
                </Typography>
              </Box>
            </Box>
            {/* <CardCover>
  <CardMedia image={user.coverImg} />
  <CardCoverAction>
    <Input accept="image/*" id="change-cover" multiple type="file" />
    <label htmlFor="change-cover">
      <Button
        startIcon={<UploadTwoToneIcon />}
        variant="contained"
        component="span"
      >
        Change cover
      </Button>
    </label>
  </CardCoverAction>
</CardCover> */}
            <AvatarWrapper style={{ marginTop: '0px' }}>
              <Avatar variant="rounded" alt={'user.name'} src={'user.avatar'} />
              <ButtonUploadWrapper>
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  name="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton component="span" color="primary">
                    <UploadTwoToneIcon />
                  </IconButton>
                </label>
              </ButtonUploadWrapper>
            </AvatarWrapper>
            <Box py={2} pl={2} mb={3}>
              <Typography gutterBottom variant="h4">
                {client.nombre} {client.apellido}
              </Typography>

              <Box alignItems="center">
                <Box style={{ display: 'flex', columnGap: '5px' }}>
                  <Alert
                    variant="outlined"
                    severity="success"
                    style={{ width: '124px' }}
                  >
                    Activo
                  </Alert>
                  <Button size="small" variant="contained">
                    <WhatsAppIcon />
                    {'Mensaje '}
                  </Button>
                  <Button size="small" variant="outlined">
                    <ShareIcon />
                  </Button>
                </Box>
              </Box>

              <Typography
                sx={{ py: 2 }}
                variant="subtitle2"
                color="text.primary"
              >
                {client.direccion}
              </Typography>

              <Box
                display={{ xs: 'block', md: 'flex' }}
                alignItems="center"
                style={{ columnGap: '10px' }}
              >
                <Typography gutterBottom variant="h4">
                  {'Contacto: '}
                </Typography>
                <Typography
                  sx={{ py: 2 }}
                  variant="subtitle2"
                  color="text.primary"
                >
                  {client.telefono}  | {client.correo}{' '}
                </Typography>
              </Box>

              <Box
                display={{ xs: 'block', md: 'flex' }}
                alignItems="center"
                style={{ columnGap: '10px' }}
              >
                <Typography gutterBottom variant="h4">
                  {'Cedula: '}
                </Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {client.cedula}
                </Typography>
              </Box>
              <Box
                display={{ xs: 'block', md: 'flex' }}
                alignItems="center"
                style={{ columnGap: '10px' }}
              >
                <Typography gutterBottom variant="h4">
                  {'Fecha de nacimiento: '}
                </Typography>
                <Typography
                  sx={{ py: 2 }}
                  variant="subtitle2"
                  color="text.primary"
                >
                  {client.fechaNacimiento}
                </Typography>
              </Box>

              <Box
                display={{ xs: 'block', md: 'flex' }}
                alignItems="center"
                style={{ columnGap: '10px' }}
              >
                <Typography gutterBottom variant="h4">
                  {'Tipo de Suscripcion: '}
                </Typography>
                <Typography variant="subtitle2" color="text.primary">
                  {'Mensual'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ActivityTab;
