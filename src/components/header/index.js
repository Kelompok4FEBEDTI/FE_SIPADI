import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => {
  const listMenu = [
    'home',
    'homemember',
    'homepenjagaparkir',
    'profilemember',
    'profilepenjagaparkir',
    'transaksi',
    'myhistory',
    'spotparkir',
    'loginmember',
    'loginpenjagaparkir',
    'registermember',
  ];

  return (
    <div className="header">
      <div className="navbar">
        {listMenu.map((name) => {
          return (
            <Link to={`/${name}`} key={name} style={{ textDecoration: 'none' }}>
              <div className="navbar-item">{name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
