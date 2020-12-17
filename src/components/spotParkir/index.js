import React from 'react';
import { Table } from 'react-bootstrap';

const ListSpotParkir = ({ data, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{data.lantai}</td>
      <td>{data.no_parkir}</td>
      <td>{data.status}</td>
    </tr>
  );
};

const SpotParkirComponent = ({ data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Lantai</th>
          <th>No Parkir</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, index) => {
          return <ListSpotParkir data={e} index={index} />;
        })}
      </tbody>
    </Table>
  );
};

export default SpotParkirComponent;
