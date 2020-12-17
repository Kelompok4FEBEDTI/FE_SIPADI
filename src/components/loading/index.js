import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '40px' }}>
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="dark" />
    </div>
  );
};

export default Loading;
