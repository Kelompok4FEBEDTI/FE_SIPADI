import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { spotParkirService } from '../../services';
import { SpotParkirComponent, Loading } from '../../components';

const SpotParkir = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    spotParkirService
      .showSpotParkir()
      .then((e) => {
        setData(e);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderError = () => {
    return <p>{error}</p>;
  };

  return (
    <div>
      <Container
        style={{
          marginTop: '20px',
          backgroundColor: 'unset',
          margin: '0',
          position: 'absolute',
          maxWidth: '700px',
          top: '50%',
          left: '50%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        {loading && <Loading />}
        {error && renderError}
        {data && <SpotParkirComponent data={data} />}
      </Container>
    </div>
  );
};

export default SpotParkir;
