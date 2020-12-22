/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Table, Container, Alert } from 'react-bootstrap';
import { transaksiParkirService } from '../../services';
import { getCookie } from '../../utils/cookie';
import { Loading } from '../../components';

const Table1 = ({ history }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          padding: '0',
          margin: '0',
          backgroundColor: 'white',
        }}
      >
        <Table
          style={{ overflow: 'scroll' }}
          striped
          hover
          className="text-center"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>No Kendaraan</th>
              <th>Mobil Type</th>
              <th>Jam Masuk</th>
              <th>Jam Keluar</th>
              <th>Petugas</th>
              <th>Biaya</th>
            </tr>
          </thead>
          <tbody>
            {history.map((data, index) => {
              const jamMasuk = new Date(data.jam_masuk);
              const jamKeluar = new Date(data.jam_keluar);
              const date = `${jamMasuk.getUTCDate()}-${jamMasuk.getUTCMonth()}-${jamMasuk.getUTCFullYear()}`;

              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{date}</td>
                  <td>{data.nomor_polisi}</td>
                  <td>{data.jenis_mobil}</td>
                  <td>{jamMasuk.getUTCHours()}</td>
                  <td>{jamKeluar.getUTCHours()}</td>
                  <td>{data.id_penjaga}</td>
                  <td>{data.tarif}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const HistoryParkirMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { ID } = JSON.parse(getCookie('userData'));
  const [history, setHistory] = useState('');

  useEffect(() => {
    setLoading(false);
    setError(false);

    transaksiParkirService
      .getTransaksiParkirByIdMember(ID)
      .then((res) => {
        setHistory(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container
      style={{
        backgroundColor: 'unset',
        margin: '0',
        position: 'absolute',
        maxWidth: '1000px',
        top: '50%',
        left: '50%',
        padding: '0',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {loading && <Loading />}
      {error && (
        <div style={{ margin: '20px' }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
      <h5 className="text-center">History Parkir</h5>
      {history && <Table1 history={history} />}
    </Container>
  );
};

export default HistoryParkirMember;
