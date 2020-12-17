import React from 'react';
import { Table } from 'react-bootstrap';

const ListTransaksi = ({ data, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{data.nomor_polisi}</td>
      <td>{data.jenis_mobil}</td>
      <td>{data.spot_parkir}</td>
      <td>{data.jam_masuk}</td>
      <td>{data.jam_keluar}</td>
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
          {data.map((e, index) => {
            return <ListTransaksi data={e} index={index} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableTransaksi;
