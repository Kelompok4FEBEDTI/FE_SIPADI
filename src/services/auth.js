import BaseService from './baseService';
import API from '../config/rest';

const loginMember = (username, password) => {
  return BaseService.post(API.LOGIN_MEMBER, {
    username_member: username,
    password_member: password,
  });
};
const loginPenjagaParkir = (username, password) => {
  return BaseService.post(API.LOGIN_PENJAGA_PARKIR, { username, password });
};

const registerMember = (username, password, nama, nik, jenisKelamin) => {
  return BaseService.post(API.REGISTER_MEMBER, {
    username_member: username,
    password_member: password,
    nik_member: nik,
    nama_member: nama,
    jeniskelamin_member: jenisKelamin,
  });
};

export default { loginMember, loginPenjagaParkir, registerMember };
