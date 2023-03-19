export interface Sale {
  idTarjeta?: any;
  subtotal?: number;
  correo?: any,
  nombre?: any;
  direccion?: any;
  apellido?: any;
  telefono?: any;
  cedula?: string;
  peso?: any;
  altura?: any;
  fechaNacimiento?: string;
  id_Cliente?: number;
  idCliente?: number;
  id_Suscripcion?: string;
  id_Producto?: any;
  message?: string;
  fechaInicio?: string,
  id_Promocion?: string
  nameSuscripcion?:string
}


export interface Sector {
  id_Sector: string;
  nombre?: string;
  cobrador?: string;
  message?: string;
}

export interface Suscripcion{
  idSuscripcion: string;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  dias?: number;
}



export interface Promotion{
  idPromocion: string;
  nombre?: string;
  porcentaje?: number;
}



