export interface Sale {
  idTarjeta?: any;
  total: number;
  abono: number;
  subtotal?: number;
  nombre?: any;
  apellido?: any;
  telefono?: any;
  cedula?: string;
  id_Cliente?: number;
  id_Sector: string;
  id_Producto?: any;
  message?: string;
}


export interface Sector {
  id_Sector: string;
  nombre?: string;
  cobrador?: string;
  message?: string;
}
