export interface Sale {
  idTarjeta?: any;
  subtotal?: number;
  correo?: any,
  nombre?: any;
  apellido?: any;
  telefono?: any;
  cedula?: string;
  fechaNacimiento?: string;
  id_Cliente?: number;
  id_Suscripcion?: string;
  id_Producto?: any;
  message?: string;
  fechaInicio?: string,
  id_Promocion?: string
}


export interface Sector {
  id_Sector: string;
  nombre?: string;
  cobrador?: string;
  message?: string;
}
