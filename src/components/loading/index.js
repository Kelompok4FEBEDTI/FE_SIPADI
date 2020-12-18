import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '40px',
        backgroundColor: 'rgb(255, 255, 255, 0.4)',
        borderRadius: '100',
      }}
    >
      <Spinner
        style={{ width: '20px', height: '20px' }}
        animation="grow"
        variant="info"
      />
      <Spinner
        style={{ width: '20px', height: '20px' }}
        animation="grow"
        variant="dark"
      />
      <Spinner
        style={{ width: '20px', height: '20px' }}
        animation="grow"
        variant="info"
      />
      <Spinner
        style={{ width: '20px', height: '20px' }}
        animation="grow"
        variant="dark"
      />
      <Spinner
        style={{ width: '20px', height: '20px' }}
        animation="grow"
        variant="info"
      />
      <Spinner
        style={{ width: '20px', height: '20px' }}
        animation="grow"
        variant="dark"
      />
      <Spinner
        style={{ width: '20px', height: '20px' }}
        animation="grow"
        variant="info"
      />
      <Spinner
        style={{ width: '20px', height: '20px' }}
        animation="grow"
        variant="dark"
      />
    </div>
  );
};

export default Loading;
