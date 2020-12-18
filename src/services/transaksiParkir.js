import BaseService from './baseService';
import API from '../config/rest';

const getTransaksiParkir = (offset, limit, jenis) => {
  return BaseService.get(API.TRANSAKSI_PARKIR(offset, limit, jenis));
};

const addTransaksiParkir = (data) => {
  return BaseService.post(API.TRANSAKSI_PARKIR, { data });
};

const getTransaksiParkirById = (id) => {
  return BaseService.get(API.TRANSAKSI_PARKIR_BY_ID(id));
};

const editTransaksiParkirByID = (id, data) => {
  return BaseService.put(API.TRANSAKSI_PARKIR_BY_ID(id), { data });
};

const deleteTransaksiParkirById = (id) => {
  return BaseService.delete(API.TRANSAKSI_PARKIR_BY_ID(id));
};

export default {
  getTransaksiParkir,
  addTransaksiParkir,
  getTransaksiParkirById,
  editTransaksiParkirByID,
  deleteTransaksiParkirById,
};
