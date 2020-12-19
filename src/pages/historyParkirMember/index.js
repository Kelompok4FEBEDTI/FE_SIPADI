import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { transaksiParkirService } from '../../services';
import { getCookie } from '../../utils/cookie';
import { Loading } from '../../components';

const Table1 = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState('');
  const memberData = JSON.parse(getCookie('userData'));
  useEffect(() => {
    setLoading(true);
    transaksiParkirService
      .getTransaksiParkirById(memberData.ID)
      .then((res) => {
        setHistory(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log(loading);
        setLoading(false);
      });
  }, [memberData.ID]);
  return (
    <div
      style={{
        border: '1px solid darkgray',
      }}
    >
      {loading && <Loading />}
      {history ? (
        <div
          style={{
            padding: '0',
            margin: '0',
            // border: '2px solid green',
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
                <th>Action</th>
                <th>Tanggal</th>
                <th>Nama</th>
                <th>No Kendaraan</th>
                <th>Mobil Type</th>
                <th>Jam Masuk</th>
                <th>Jam Keluar</th>
                <th>Petugas</th>
                <th>Biaya</th>
              </tr>
            </thead>
            <tbody>
              {history &&
                history.map((data, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>ACTION</td>
                      <td>{data.tanggal}</td>
                      <td>{data.nama}</td>
                      <td>{data.no_kendaraan}</td>
                      <td>{data.mobil}</td>
                      <td>{data.jam_masuk}</td>
                      <td>{data.jam_keluar}</td>
                      <td>{data.petugas}</td>
                      <td>{data.biaya}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          {!loading && (
            <p
              style={{
                fontWeight: 'lighter',
                fontSize: '12px',
                marginTop: '15px',
              }}
              className="text-center"
            >
              History tidak ditemukan
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const HistoryParkirMember = () => {
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
        // overflow: 'scroll'
      }}
    >
      <h5 className="text-center">History Parkir</h5>
      <Table1 />
    </Container>
  );
};

export default HistoryParkirMember;
