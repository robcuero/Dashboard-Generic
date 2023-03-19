import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  IconButton,
  useTheme,
  Typography
} from '@mui/material';
import clsx from 'clsx';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import React, { useEffect, useState } from 'react';
import {
  getSuscripcionAll,
  getUser
} from '../../../../services/clientService';
import { DataGrid, GridSelectionModel, esES } from '@mui/x-data-grid';
import './index.css';
import { GridColDef } from '@mui/x-data-grid';
import { ModalDelete } from 'src/components/Modal/ModalDelete';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { statusUser } from 'src/util/status';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetail } from 'src/store/slices/userDetail/structureSlice';
import { setIdSelect } from 'src/store/slices/userDetail/formSlice';
import { formatdate } from 'src/util/formatDate';
import {
  setSuscription,
  setUserSuscription
} from 'src/store/slices/userDetail/allUserSlice';
export const Tables = () => {
  const [data, setData] = useState<any>();
  const theme = useTheme();
  const [age, setAge] = useState('');
  const [selectTarget, setSelectTarget] = useState<any>([]);
  var today = new Date();
  const [openDelete, setOpenDelete] = useState(false);
  const { userSuscription, idSuscription,suscription  } = useSelector(
    (state: any) => state.allUser
  );
  useEffect(() => {
    getSuscripcionAll().then((res) => {
      setData(res);
    });
    // eslint-disable-next-line
  }, []);

  const getUserFilter = (id: string, nombre?: string) => {
    if (nombre) {
      dispatch(setSuscription({ id, nombre }));
    }
    getUser(id).then((res) => {
      dispatch(setUserSuscription(res));
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event)
    setAge(event.target.value as string);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toDescription = (id: any) => {
    dispatch(setUserDetail(true));
    dispatch(setIdSelect(id));
    navigate('/management/user', {
      replace: true
    });
  };

  const Edit = (id) => {
    return (
      <div>
        <Tooltip title="Edit Order" arrow>
          <IconButton
            onClick={() => toDescription(id)}
            color="inherit"
            size="small"
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Order" arrow>
          <IconButton
            onClick={() => showModalDelete(true)}
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
    );
  };
  const showInfo = (id: GridSelectionModel) => {
    const selectedIDs = new Set(id);
    const selectedRows = userSuscription.filter((r) => selectedIDs.has(r.id));
    setSelectTarget(selectedRows);
  };

  const showModalDelete = (value: boolean) => {
    setOpenDelete(value);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: false
    },
    {
      field: 'apellido',
      headerName: 'Apellido',
      width: 150,
      editable: false
    },
    {
      field: 'telefono',
      headerName: 'Telefono',
      width: 150,
      editable: false
    },
    {
      field: 'cedula',
      headerName: 'Cedula',
      width: 140,
      editable: false
    },

    {
      field: 'fechaInicio',
      headerName: 'Fecha Inicio',
      width: 150,
      editable: false,
      renderCell({ row }) {
        return <div>{formatdate(row.fechaInicio)}</div>;
      }
    },
    {
      field: 'fechaFin',
      headerName: 'Fecha Fin',
      type: 'date',
      width: 150,
      editable: false,
      renderCell({ row }) {
        return <div>{formatdate(row.fechaFin)}</div>;
      }
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      editable: false,
      cellClassName: ({ row }) => {
        if (row.fechaFin == null) {
          return '';
        }
        let total =
          (new Date(row.fechaFin).getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24);
        return clsx('super-app', {
          positive:
            (total > 3 && (idSuscription === '2' || idSuscription === '3' || idSuscription ==='5')) ||
            (idSuscription === '1' && statusUser(row.fechaFin)),
          negative: total < 0,
          alert:
            total < 3 &&
            statusUser(row.fechaFin) &&
            (idSuscription === '2' || idSuscription === '3' || idSuscription ==='5')
        });
      },
      renderCell({ row }) {
        return <div>{row.estado}</div>;
      }
    },
    {
      field: 'opciones',
      headerName: 'Opciones',
      type: 'number',
      width: 100,
      editable: false,
      renderCell({ id }) {
        return Edit(id);
      }
    }
  ];

  return (
    <div className="size-info">
      <Box
        sx={{
          minWidth: 120
        }}
        m={2}
      >
        <Typography
          sx={{
            pb: 3
          }}
          variant="h4"
        >
          {userSuscription.length > 0
            ? `Esta suscripciones tiene ${userSuscription.length} personas`
            : ' Escoje una opcion con suscripciones'}
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{suscription? suscription: "Suscripcion"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            {data?.map((data: any, index: number) => (
              <MenuItem
                key={index}
                value={index}
                onClick={() => getUserFilter(data.idSuscripcion, data.nombre)}
              >
                {data.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          height: 400,
          width: '100%',
          '& .super-app.positive': {
            backgroundColor: 'rgba(157, 255, 118, 0.49)',
            color: '#1a3e72',
            fontWeight: '600'
          },
          '& .super-app.negative': {
            backgroundColor: '#d47483',
            color: '#1a3e72',
            fontWeight: '600'
          },
          '& .super-app.alert': {
            backgroundColor: '#f2ed82',
            color: '#1a3e72',
            fontWeight: '600'
          }
        }}
      >
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={userSuscription}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(newSelection) => {
            showInfo(newSelection);
          }}
        />{' '}
      </Box>

      {selectTarget.length > 0 || openDelete ? (
        <ModalDelete
          showModal={showModalDelete}
          value={openDelete}
          selectTarget={selectTarget}
          updateUser={getUserFilter}
          sector={idSuscription}
        />
      ) : (
        ''
      )}
    </div>
  );
};
