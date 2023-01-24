import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'nombre',
		headerName: 'Nombre',
		width: 150,
		editable: true
	},
	{
		field: 'apellido',
		headerName: 'Apellido',
		width: 150,
		editable: true
	},
	{
		field: 'total',
		headerName: 'Total',
		type: 'number',
		width: 150,
		editable: true
	},
	{
		field: 'abono',
		headerName: 'Abonos',
		type: 'number',
		width: 150,
		editable: true
	},
	{
		field: 'subtotal',
		headerName: 'Subtotal',
		type: 'number',
		width: 150,
		editable: true
	}
	,
	{
		field: 'opciones',
		headerName: 'Opciones',
		type: 'number',
		width: 300,
		editable: true
	}
];


export const SEPARATOR = /^\d+(.\d{0,2})?$/;

export const LETTER = /^[ñíóáéú a-zA-Z ]+$/


export const NUMBER = /^[0-9]+$/