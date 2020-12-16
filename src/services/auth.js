import BaseService from './baseService';
import API from '../config/rest';

const loginMember = (username, password) => {
  return BaseService.post(API.LOGIN_MEMBER, { username, password });
};
const loginPenjagaParkir = (username, password) => {
  return BaseService.post(API.LOGIN_PENJAGA_PARKIR, { username, password });
};

const registerMember = (username, password) => {
  return BaseService.post(API.REGISTER_MEMBER, { username, password });
};

export default { loginMember, loginPenjagaParkir, registerMember };
