import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { Loading } from '../../components';

const Table1 = () => {
  const dummy = [
    {
      tanggal: '18-12-2020',
      nama: 'Rahma1',
      no_kendaraan: 'B 4023 CF',
      mobil: 'Nissan',
      jam_masuk: '08.00',
      jam_keluar: '10.00',
      petugas: 'Daffa',
      biaya: 'Rp 20.000',
    },
    {
      tanggal: '18-12-2020',
      nama: 'Rahma2',
      no_kendaraan: 'B 4023 CF',
      mobil: 'Nissan',
      jam_masuk: '08.00',
      jam_keluar: '10.00',
      petugas: 'Daffa',
      biaya: 'Rp 19.000',
    },
    {
      tanggal: '18-12-2020',
      nama: 'Rahma3',
      no_kendaraan: 'B 4023 CF',
      mobil: 'Nissan',
      jam_masuk: '08.00',
      jam_keluar: '10.00',
      petugas: 'Daffa',
      biaya: 'Rp 18.000',
    },
    {
      tanggal: '18-12-2020',
      nama: 'Rahma4',
      no_kendaraan: 'B 4023 CF',
      mobil: 'Nissan',
      jam_masuk: '08.00',
      jam_keluar: '10.00',
      petugas: 'Daffa',
      biaya: 'Rp 16.000',
    },
  ];
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
        border: '1px solid darkgray',
        // overflow: 'scroll'
      }}
    >
      {dummy && (
        <div
          style={{
            padding: '0',
            margin: '0',
            // border: '2px solid green',
          }}
        >
          <Table striped hover className="text-center">
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
              {dummy.map((data, index) => {
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
      )}
    </Container>
  );
};

const HistoryParkirMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(false);
    setError(false);
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <Loading />}
      <Container style={{ marginTop: '20px' }}>
        <Table1 />
      </Container>
    </div>
  );
};

export default HistoryParkirMember;
