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
  return BaseService.put(API.MEMBER_BY_ID(id), { data });
};

const viewAllMobilById = (id) => {
  return BaseService.get(API.MOBIL_BY_MEMBER_ID(id));
};

const addAllMobilById = (id, data) => {
  return BaseService.post(API.MOBIL_BY_MEMBER_ID(id), { data });
};

const editMobilById = (id, data) => {
  return BaseService.put(API.MOBIL_BY_MEMBER_ID(id), { data });
};

const deleteMemberByID = (id) => {
  return BaseService.del(API.MEMBER_BY_ID(id));
};

export default {
  addMember,
  viewMember,
  viewMemberByID,
  editMemberById,
  viewAllMobilById,
  addAllMobilById,
  editMobilById,
  deleteMemberByID,
  viewMemberByNopol,
};
