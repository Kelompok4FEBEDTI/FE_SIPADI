import React, { useEffect, useState } from 'react';
import { transaksiParkirService } from '../../services';
import { TableTransaksi } from '../../components';

const TransaksiParkir = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    transaksiParkirService
      .getTransaksiParkir()
      .then((res) => {
        setDataTransaksi(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {error && <p>{error}</p>}
      <h3>Transaksi Parkir</h3>
      {loading ? <p>Loading...</p> : <TableTransaksi data={dataTransaksi} />}
    </div>
  );
};

export default TransaksiParkir;
