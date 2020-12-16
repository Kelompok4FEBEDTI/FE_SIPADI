import React from 'react';

const SpotParkirComponent = (e) => {
  const { _id, lantai, noParkir, status } = e;

  return (
    <div>
      <h3>{_id}</h3>
      <h2>{lantai}</h2>
      <p>{noParkir}</p>
      <p>{status}</p>
    </div>
  );
};

export default SpotParkirComponent;
