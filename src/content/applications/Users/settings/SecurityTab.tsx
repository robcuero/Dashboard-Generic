import { useState, MouseEvent, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  ListItemAvatar,
  Avatar,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  styled
} from '@mui/material';

import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { statusUser } from 'src/util/status';
import { formatdate } from 'src/util/formatDate';
import { ModalActive } from 'src/components/ModalActiveSuscription';
import { ModalDeleteSuscription } from 'src/components/ModalDeleteSus';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const ButtonSuccess = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.success.main};
     color: ${theme.palette.success.contrastText};

     &:hover {
        background: ${theme.colors.success.dark};
     }
    `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.error.main};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

function SecurityTab(user) {
  const theme = useTheme();
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteSus, setOpenDeleteSus] = useState(false);
  const status = statusUser(user.user.suscripciones[0].fechaFin);
  const idSuscripcion = user.user.suscripciones[0].idUsuarioSuscripcion;
  console.log(idSuscripcion);
  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const showModalDelete = (value: boolean) => {
    setOpenDeleteSus(value);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  const [openDelete, setOpenDelete] = useState(false);
  const showModalActive = (value: boolean) => {
    setOpenDelete(value);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Social Accounts</Typography>
          <Typography variant="subtitle2">
            Manage connected social accounts options
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                {status ? (
                  <AvatarSuccess>
                    <DoneTwoToneIcon />
                  </AvatarSuccess>
                ) : (
                  <AvatarError>
                    <CloseOutlinedIcon />
                  </AvatarError>
                )}
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary={status ? 'Activo' : 'Inactivo'}
                secondary={formatdate(user.user.suscripciones[0].fechaFin)}
              />
              {status ? (
                <ButtonError
                  size="large"
                  variant="contained"
                  onClick={() => showModalDelete(true)}
                >
                  Finalizar Suscripcion
                </ButtonError>
              ) : (
                <ButtonSuccess
                  size="large"
                  variant="contained"
                  onClick={() => showModalActive(true)}
                >
                  Activar Suscripcion
                </ButtonSuccess>
              )}
              <ModalDeleteSuscription
                showModal={showModalDelete}
                value={openDeleteSus}
                id={idSuscripcion}
                // updateUser={getUserFilter}
                // sector={sector}
              />
              <ModalActive
                showModal={showModalActive}
                value={openDelete}
                id={user.user.cliente[0].idCliente}
              />
            </ListItem>
          </List>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="Access Logs"
            subheader="Recent sign in activity logs"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>Id</TableCell> */}
                  <TableCell align="center">Fecha inicio</TableCell>
                  <TableCell align="center">Fecha fin</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.user.suscripciones.map((log, item) => (
                  <TableRow key={item} hover>
                    <TableCell align="center">
                      {formatdate(log.fechaInicio)}
                    </TableCell>
                    <TableCell align="center">
                      {' '}
                      {formatdate(log.fechaFin)}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip placement="top" title="Delete" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={3}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SecurityTab;
