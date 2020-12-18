import BaseService from './baseService';
import API from '../config/rest';

const addMember = (data) => {
  return BaseService.post(API.MEMBER, { data });
};

const viewMember = () => {
  return BaseService.get(API.MEMBER);
};

const viewMemberByID = (id) => {
  return BaseService.get(API.MEMBER_BY_ID(id));
};

const viewMemberByNopol = (nopol) => {
  return BaseService.get(API.MEMBER_BY_NOPOL(nopol));
};

const editMemberById = (id, data) => {
  return BaseService.put(API.MEMBER_BY_ID(id), {
    nik_member: data.nik_member,
    nama_member: data.nama_member,
    jeniskelamin_member: data.jeniskelamin_member,
    username_member: data.username_member,
    password_member: data.password_member,
  });
};

const viewAllMobilById = (id) => {
  return BaseService.get(API.MOBIL_BY_MEMBER_ID(id));
};

const addMobilById = (id, nomorPolisi, jenisMobil) => {
  return BaseService.post(API.MOBIL_BY_MEMBER_ID(id), {
    nomor_polisi: nomorPolisi,
    jenis_mobil: jenisMobil,
  });
};

const editMobilById = (id, data) => {
  return BaseService.put(API.MOBIL_BY_MEMBER_ID(id), { data });
};

const deleteMemberByID = (id) => {
  return BaseService.delete(API.MEMBER_BY_ID(id));
};

const deleteMobilByID = (id) => {
  return BaseService.delete(API.MOBIL_BY_MEMBER_ID(id));
};

export default {
  addMember,
  viewMember,
  viewMemberByID,
  editMemberById,
  viewAllMobilById,
  addMobilById,
  editMobilById,
  deleteMemberByID,
  viewMemberByNopol,
  deleteMobilByID,
};
