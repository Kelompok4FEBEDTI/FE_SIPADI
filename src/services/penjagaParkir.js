import BaseService from './baseService';
import API from '../config/rest';

const viewAllPenjaga = () => {
  return BaseService.get(API.PENJAGA);
};

const addPenjaga = (data) => {
  return BaseService.post(API.PENJAGA, { data });
};

const viewPenjagaByID = (id) => {
  return BaseService.get(API.PENJAGA_BY_ID(id));
};

const editPenjagaByID = (id, data) => {
  return BaseService.put(API.PENJAGA_BY_ID(id), { data });
};

const deletePenjagaByID = (id) => {
  return BaseService.del(API.MEMBER_BY_ID(id));
};

export default {
  viewAllPenjaga,
  addPenjaga,
  viewPenjagaByID,
  editPenjagaByID,
  deletePenjagaByID,
};
