export default {
  LOGIN_MEMBER: '/loginmember',
  LOGIN_PENJAGA_PARKIR: '/loginpenjagaparkir',
  REGISTER_MEMBER: '/registermember',
  SHOW_SPOT_PARKIR: '/spotparkir',
  TRANSAKSI_PARKIR: '/transaksi',
  TRANSAKSI_PARKIR_BY_ID: (id) => {
    return `/transaksi/${id}`;
  },
};
