import React from 'react';
import { Table } from 'react-bootstrap';

const ListTransaksi = ({ data, index }) => {
  const masuk = new Date(data.jam_masuk);
  const keluar = new Date(data.jam_keluar);
  const menitMasuk = masuk.getUTCMinutes();
  const menitKeluar = keluar.getUTCMinutes();
  const jamMasuk = `${masuk.getUTCHours()}.${menitMasuk}`;
  const jamKeluar = `${keluar.getUTCHours()}.${menitKeluar}`;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{data.nomor_polisi}</td>
      <td>{data.jenis_mobil}</td>
      <td>{data.spot_parkir}</td>
      <td>{jamMasuk}</td>
      <td>{jamKeluar}</td>
      <td>{data.tarif}</td>
      <td>{data.status_parkir}</td>
    </tr>
  );
};

const TableTransaksi = ({ data }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>No Polisi</th>
            <th>Jenis Mobil</th>
            <th>Spot Parkir</th>
            <th>Jam Masuk</th>
            <th>Jam Keluar</th>
            <th>Tarif</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((e, index) => {
              return <ListTransaksi data={e} index={index} />;
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableTransaksi;
