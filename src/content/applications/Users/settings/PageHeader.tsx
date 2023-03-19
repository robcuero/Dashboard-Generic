import { Typography } from '@mui/material';

function PageHeader() {
  const user = {
    name: sessionStorage.getItem('user'),
    avatar: `https://localhost:44396/files/${sessionStorage.getItem("img")}.png`
  };

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Detalles de Usuario
      </Typography>
      <Typography variant="subtitle2">
        {user.name}, este es el panel de configuración de usuario.
      </Typography>
    </>
  );
}

export default PageHeader;
