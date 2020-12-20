export default {
  LOGIN_MEMBER: '/auth/login',
  LOGIN_PENJAGA_PARKIR: '/auth/loginPenjaga',
  REGISTER_MEMBER: '/member',
  SHOW_SPOT_PARKIR: '/spotparkir',
  TRANSAKSI_PARKIR: (offset, limit, jenis) => {
    let endpoint = '/transaksi';
    if (jenis && limit) {
      endpoint += `?jenis=${jenis}&offset=${offset}&limit=${limit}`;
    } else if (offset) {
      endpoint += `?offset=${offset}&limit=${limit}`;
    } else if (jenis) {
      endpoint += `?jenis=${jenis}`;
    }
    return endpoint;
  },
  TRANSAKSI_PARKIR_MASUK: '/transaksi',
  TRANSAKSI_PARKIR_BY_ID: (id) => {
    return `/transaksi/${id}`;
  },
  MEMBER: '/member',
  MEMBER_BY_ID: (id) => {
    return `/member/${id}`;
  },
  MEMBER_BY_NOPOL: (nopol) => {
    return `/member/getmemberbynopol/${nopol}`;
  },
  MOBIL_BY_MEMBER_ID: (id) => {
    return `/member/${id}/mobil`;
  },
  PENJAGA: '/penjaga',
  PENJAGA_BY_ID: (id) => {
    return `/penjaga/${id}`;
  },
};
