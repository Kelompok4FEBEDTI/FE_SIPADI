import React, { useState, useEffect } from 'react';
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
      <h3>Spot Parkir</h3>
      {loading && Loading}
      {error && renderError}
      {data ? <SpotParkirComponent data={data} /> : ''}
    </div>
  );
};

export default SpotParkir;
