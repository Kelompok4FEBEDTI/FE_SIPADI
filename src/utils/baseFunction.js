const convertISO = (tanggal) => {
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  // const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const time = tanggal.match(/\d\d:\d\d/);
  const date = new Date(tanggal);
  let day = date.getDay() - 1;
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  let dt = date.getDate();

  if (tanggal.includes('T17')) {
    dt -= 1;
    day -= 1;
  }
  if (day < 0) {
    day = 6;
  }
  if (dt < 10) {
    dt = `0${dt}`;
  }

  return `${dt}-${month}-${year}, ${time}`;
};

const range = (end) => {
  const ans = [];
  for (let i = 0; i <= end; i += 1) {
    ans.push(i);
  }
  return ans;
};

const formatRupiah = (angka) => {
  const sisa = angka.length % 3;
  let rupiah = angka.substr(0, sisa);
  const ribuan = angka.substr(sisa).match(/\d{3}/g);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  return `Rp${rupiah}`;
};

export default { convertISO, range, formatRupiah };
