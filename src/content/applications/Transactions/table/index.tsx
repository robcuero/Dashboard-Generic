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
import { getSector, getUser } from '../../../../services/clientService';
import { DataGrid, GridCellParams, GridSelectionModel } from '@mui/x-data-grid';
import './index.css';
import { GridColDef } from '@mui/x-data-grid';
import { ModalEdit } from 'src/components/ModalEdit';
import { ModalDelete } from 'src/components/ModalDelete';
export const Tables = () => {
  const [data, setData] = useState<any>();
  const [user, setUser] = useState<any>([]);
  const theme = useTheme();
  const [age, setAge] = useState('');
  const [selectTarget, setSelectTarget] = useState<any>([]);
  const [sector, setSector] = useState<string>();

  useEffect(() => {
    getSector().then((res) => {
      setData(res);
    });
    // eslint-disable-next-line
  }, []);

  const getUserFilter = (id: string) => {
    setSector(id);
    getUser(id).then((res) => {
      setUser(res);
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const Edit = () => {
    return (
      <div>
        <Tooltip title="Edit Order" arrow>
          <IconButton
            onClick={() => showModalEdit(true)}
            sx={{
              '&:hover': {
                background: theme.colors.primary.lighter
              },
              color: theme.palette.primary.main
            }}
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
    const selectedRows = user.filter((r) => selectedIDs.has(r.id));
    setSelectTarget(selectedRows);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const showModalEdit = (value: boolean) => {
    setOpenEdit(value);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const showModalDelete = (value: boolean) => {
    setOpenDelete(value);
  };
  var today = new Date();

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
    ,
    {
      field: 'cedula',
      headerName: 'Cedula',
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
      field: 'total',
      headerName: 'Total',
      type: 'number',
      width: 120,
      valueFormatter: ({ value }) => `$ ${value}`,
      editable: false
    },
    {
      field: 'abono',
      headerName: 'Abonos',
      type: 'number',
      width: 100,
      editable: false,
      valueFormatter: ({ value }) => `$ ${value}`
    },
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      type: 'number',
      width: 100,
      valueFormatter: ({ value }) => `$ ${value}`,
      editable: false
    },
    ,
    {
      field: 'fecha',
      headerName: 'Fecha',
      type: 'date',
      width: 120,
      editable: false,
      cellClassName: (params: GridCellParams<number>) => {
        if (params.value == null) {
          return '';
        }

        return clsx('super-app', {
          positive:
            (today.getTime() - new Date(params.value).getTime()) /
              (1000 * 60 * 60 * 24) <
            7,
          negative:
            (today.getTime() - new Date(params.value).getTime()) /
              (1000 * 60 * 60 * 24) >
            7
        });
      }
    },
    {
      field: 'opciones',
      headerName: 'Opciones',
      type: 'number',
      width: 100,
      editable: false,
      renderCell: Edit
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

          {user.length>0 ? `Esta ruta tiene ${user.length} tarjetas`:' Escoje un sector que tenga ventas'}
         
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sector</InputLabel>
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
                onClick={() => getUserFilter(data.idSector)}
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
          }
        }}
      >
        <DataGrid
          rows={user}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(newSelection) => {
            showInfo(newSelection);
          }}
        />{' '}
      </Box>
      {selectTarget.length > 0 && (
        <div>
          <ModalEdit
            showModal={showModalEdit}
            value={openEdit}
            selectTarget={selectTarget}
            updateUser={getUserFilter}
            sector={sector}
          />
        </div>
      )}

      {selectTarget.length > 0 || openDelete ? (
        <ModalDelete
          showModal={showModalDelete}
          value={openDelete}
          selectTarget={selectTarget}
          updateUser={getUserFilter}
          sector={sector}
        />
      ) : (
        ''
      )}
    </div>
  );
};
