import BaseService from './baseService';
import API from '../config/rest';

const getTransaksiParkir = (offset, limit, jenis) => {
  return BaseService.get(API.TRANSAKSI_PARKIR(offset, limit, jenis));
};

const addTransaksiParkir = (
  idPenjaga,
  idMember,
  nomorPolisi,
  jenisMobil,
  statusParkir,
  spotParkir,
  jamMasuk,
  jamKeluar,
  tarif
) => {
  return BaseService.post(API.TRANSAKSI_PARKIR_MASUK, {
    id_penjaga: idPenjaga,
    id_member: idMember,
    nomor_polisi: nomorPolisi,
    jenis_mobil: jenisMobil,
    status_parkir: statusParkir,
    spot_parkir: spotParkir,
    jam_masuk: jamMasuk,
    jam_keluar: jamKeluar,
    tarif,
  });
};

const getTransaksiParkirById = (id) => {
  return BaseService.get(API.TRANSAKSI_PARKIR_BY_ID(id));
};

const getTransaksiParkirByIdMember = (id) => {
  return BaseService.get(API.TRANSAKSI_PARKIR_BY_ID_MEMBER(id));
};

const editTransaksiParkirByID = (
  id,
  idPenjaga,
  idMember,
  nomorPolisi,
  jenisMobil,
  statusParkir,
  spotParkir,
  jamMasuk,
  jamKeluar,
  tarif
) => {
  return BaseService.put(API.TRANSAKSI_PARKIR_BY_ID(id), {
    id_penjaga: idPenjaga,
    id_member: idMember,
    nomor_polisi: nomorPolisi,
    jenis_mobil: jenisMobil,
    status_parkir: statusParkir,
    spot_parkir: spotParkir,
    jam_masuk: jamMasuk,
    jam_keluar: jamKeluar,
    tarif,
  });
};

const deleteTransaksiParkirById = (id) => {
  return BaseService.delete(API.TRANSAKSI_PARKIR_BY_ID(id));
};

export default {
  getTransaksiParkir,
  addTransaksiParkir,
  getTransaksiParkirById,
  getTransaksiParkirByIdMember,
  editTransaksiParkirByID,
  deleteTransaksiParkirById,
};
