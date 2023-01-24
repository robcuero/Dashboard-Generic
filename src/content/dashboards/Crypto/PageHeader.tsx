import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { profile } from 'src/services/clientService';
function PageHeader() {
  const theme = useTheme();
  

  const [value, setValue] = useState({nombre:null, avatar:null})

  useEffect(() => {
    profile().then((data) => {
      setValue({...value,nombre:`${data.nombre} ${data.apellido}`,avatar:data.nombre})
    });
  }, []);
  const user = {
    name: value.nombre,
    avatar: `https://localhost:44396/files/${value.avatar}.png`,
    jobtitle: 'Gerente general'
  };
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenido, {user.name}!
        </Typography>
        <Typography variant="subtitle2">¡Hoy es un buen día!</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
