import React, { useState, useEffect } from 'react';
import { penjagaService } from '../../services';

const ProfilePenjagaParkir = () => {
  const [dataPenjaga, setDataPenjaga] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    penjagaService
      .viewAllPenjaga()
      .then((res) => {
        setDataPenjaga(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <h3>Profile Penjaga Parkir</h3>
      {loading && <p>Loading...</p>}
      {dataPenjaga.map((e) => {
        return <p>{e.username}</p>;
      })}
    </div>
  );
};

export default ProfilePenjagaParkir;
