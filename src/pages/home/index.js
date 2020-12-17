import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h3>Home</h3>
      <Link to="/loginmember">Login Member</Link>
      <Link to="/loginpenjagaparkir">Login Penjaga Parkir</Link>
    </div>
  );
};

export default Home;
