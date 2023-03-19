import { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  ListItemAvatar,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer
} from '@mui/material';

import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { formatdate } from 'src/util/formatDate';
import { ModalActive } from 'src/components/Modal/ModalActiveSusUser';
import {
  AvatarError,
  AvatarSuccess,
  ButtonError,
  ButtonSuccess
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSuscription,
  getUser,
  getUserDetail
} from 'src/services/clientService';
import { setAll } from 'src/store/slices/userDetail/formSlice';
import { setUserSuscription } from 'src/store/slices/userDetail/allUserSlice';
import { ModalDeleteGeneric } from 'src/components/Modal/ModalDeleteGeneric';

function SecurityTab(user) {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteSus, setOpenDeleteSus] = useState(false);
  const [status, setStatus] = useState(false);
  const statusSus = user.user.suscripciones[0].estado;
  const idSuscripcion = user.user.suscripciones[0].idUsuarioSuscripcion;

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
  const { idSuscription } = useSelector((state: any) => state.allUser);
  const dispatch = useDispatch();
  const insertTarget = () => {
    deleteSuscription(idSuscripcion).then((status: number) => {
      if (status === 200) {
        setStatus(true);
        getUserDetail(user.user.cliente.idCliente).then((res) => {
          dispatch(setAll(res));
        });
        getUser(idSuscription).then((res) => {
          dispatch(setUserSuscription(res));
        });
      } else {
        setStatus(false);
      }
    });
    return status;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Lista de Suscripciones</Typography>
          <Typography variant="subtitle2">
            Administrar las suscripciones pasadas y actuales
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                {statusSus === 'ACTIVO' ? (
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
                primary={statusSus === 'ACTIVO' ? 'Activo' : 'Inactivo'}
                secondary={formatdate(user.user.suscripciones[0].fechaFin)}
              />
              {statusSus === 'ACTIVO' ? (
                <ButtonError
                  size="large"
                  variant="contained"
                  onClick={() => showModalDelete(true)}
                >
                  Eliminar Suscripcion
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

              <ModalDeleteGeneric
                showModal={showModalDelete}
                value={openDeleteSus}
                send={insertTarget}
              />
              <ModalActive
                showModal={showModalActive}
                value={openDelete}
                id={user.user.cliente.idCliente}
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
            title="Todas las sucripciones"
            subheader="Registros actualizados del usuario"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Suscripcion</TableCell>
                  <TableCell align="center">Precio</TableCell>
                  <TableCell align="center">Promocion</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Fecha inicio</TableCell>
                  <TableCell align="center">Fecha fin</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  {/* <TableCell align="center">Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {user.user.suscripciones.map((log, item) => (
                  <TableRow key={item} hover>
                    <TableCell align="center">
                      {log.nombreSuscripcion}
                    </TableCell>
                    <TableCell align="center">$ {log.total}</TableCell>
                    <TableCell align="center">{log.promocion}</TableCell>
                    <TableCell align="center">$ {log.descuento}</TableCell>
                    <TableCell align="center">
                      {formatdate(log.fechaInicio)}
                    </TableCell>
                    <TableCell align="center">
                      {' '}
                      {formatdate(log.fechaFin)}
                    </TableCell>
                    <TableCell align="center">{log.estado}</TableCell>
                    {/* <TableCell align="center">
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
                    </TableCell> */}
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
