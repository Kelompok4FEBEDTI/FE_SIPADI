export default {
  LOGIN_MEMBER: '/auth/login',
  LOGIN_PENJAGA_PARKIR: '/auth/loginPenjaga',
  REGISTER_MEMBER: '/member',
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
