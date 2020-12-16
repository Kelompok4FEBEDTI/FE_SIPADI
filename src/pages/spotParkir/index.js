import React, { useState, useEffect } from 'react';
import { spotParkirService } from '../../services';
import { SpotParkirComponent } from '../../components';

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
  }, [data]);

  const renderLoading = () => {
    return <p>Loading . . .</p>;
  };

  const renderError = () => {
    return <p>{error}</p>;
  };

  return (
    <div>
      <h3>Spot Parkir</h3>
      {loading && renderLoading}
      {error && renderError}
      {data ?
        data.map((e) => {
            return <SpotParkirComponent data={e} />;
          }) :
        'Data Kosong'}
    </div>
  );
};

export default SpotParkir;
