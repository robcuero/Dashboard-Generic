import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  Container
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';

function EditProfileTab() {
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
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
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
                        // style={{width:'150px'}}
                        id="standard-basic"
                        label="Standard"
                        variant="standard"
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
                          label="Standard"
                          variant="standard"
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
                      Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Text color="black">
                      <TextField
                        id="standard-basic"
                        label="Standard"
                        variant="standard"
                      />
                    </Text>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                    <Box pr={3} pb={2} mt={2}>
                      Date of birth:
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
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
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
                        label="Standard"
                        variant="standard"
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
                        label="Standard"
                        variant="standard"
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
                        label="Standard"
                        variant="standard"
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
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
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
                        label="Standard"
                        variant="standard"
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
                      />
                    </Text>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
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
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;
