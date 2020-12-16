export default {
  LOGIN_MEMBER: '/loginmember',
  LOGIN_PENJAGA_PARKIR: '/loginpenjagaparkir',
  REGISTER_MEMBER: '/registermember',
  SHOW_SPOT_PARKIR: '/spotparkir',
  TRANSAKSI_PARKIR: '/transaksi',
  TRANSAKSI_PARKIR_BY_ID: (id) => {
    return `/transaksi/${id}`;
  },
  MEMBER: '/member',
  MEMBER_BY_ID: (id) => {
    return `/member/${id}`;
  },
  MOBIL_BY_MEMBER_ID: (id) => {
    return `/member/${id}/mobil`;
  },
};
