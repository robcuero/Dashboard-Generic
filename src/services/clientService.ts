// import { Pokemon } from "../interface";
import { Sale, Sector } from 'src/interface';
import api from '../services/api/jericoApi';

export const getSector = async () => {
  try {
    const { data } = await api.get('/sector');
    return data;
  } catch (error) {}
};


export const postSector = async (target: Sector) => {
  try {
    console.log(target)
    const { status } = await api.post(`/Sector`, target);
    return status;
  } catch (error) {
    return error.code;
  }
};

export const getUser = async (id: string) => {
  try {
    const { data } = await api.get(`/Tarjeta/${id}`);
    return data;
  } catch (error) {}
};

export const postSale = async (target: Sale) => {
  try {
    const { status } = await api.post(`/Tarjeta`, target);
    return status;
  } catch (error) {
    return error.code;
  }
};

export const postEdit = async (target: Sale) => {
  try {
    const { status } = await api.post(`/Tarjeta`, target);
    return status;
  } catch (error) {
    return error.code;
  }
};

export const deleteTarget = async (id: any) => {
  try {
    const { status } = await api.delete(`/Tarjeta/${id}`);
    return status;
  } catch (error) {
    return error.code;
  }
};

export const login = async (user: any) => {
  try {
    const { data } = await api.post(`/Auth/Authenticate`, user);
    return data;
  } catch (error) {
    return error.code;
  }
};

export const total = async () => {
  try {
    const { data } = await api.get(`/Metricas/Total`);
    return data;
  } catch (error) {
    return error.code;
  }
};

export const profile = async () => {
  try {
    const { data } = await api.get(`/Usuarios/Profile`);
    return data;
  } catch (error) {
    return error.code;
  }
};

export const sales = async () => {
  try {
    const { data } = await api.get(`/Metricas/Ventas`);
    return data;
  } catch (error) {
    return error.code;
  }
};
