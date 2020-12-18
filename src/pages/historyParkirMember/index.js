import React from 'react';
import { Table } from 'react-bootstrap';

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
    <div>
      {dummy && (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            border: '2px solid green',
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
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
    </div>
  );
};

const HistoryParkirMember = () => {
  return (
    <div>
      <h3>HistoryParkirMember</h3>
      <Table1 />
    </div>
  );
};

export default HistoryParkirMember;
