import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import { Modal } from 'src/components/Modal/ModalCreate';

function PageHeader() {
  const info = {
    name: sessionStorage.getItem('user'),
    avatar: `https://localhost:44396/files/${sessionStorage.getItem('img')}.png`
  };
  const [open, setOpen] = useState(false);
  const showModal = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Suscripciones
        </Typography>
        <Typography variant="subtitle2">
          {info.name}, estas son las Suscripciones recientes
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={() => showModal(true)}
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Nueva Suscripción
        </Button>
        <Modal showModal={showModal} value={open} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
