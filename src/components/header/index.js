import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { isUserAuthenticated, setCookie } from '../../utils/cookie';
import './style.css';

const Logout = () => {
  const hapusCookie = (e) => {
    e.preventDefault();
    setCookie('userData', '', -1);
    setCookie('token', '', -1);
    window.location.replace('/');
  };

  return (
    <>
      <button onClick={hapusCookie} type="button" className="btn btn-danger">
        Logout
      </button>
    </>
  );
};

const Login = () => {
  return (
    <Link to="/loginmember" className="btn btn-primary">
      Log In
    </Link>
  );
};

const Header = ({ isPenjaga, show }) => {
  const listMenuMember = ['profilemember', 'myhistory', 'spotparkir'];

  const listMenuPenjaga = [
    'homepenjagaparkir',
    'transaksi',
    'spotparkir',
    'profilepenjagaparkir',
  ];

  useEffect(() => {
    // console.log(isPenjaga);
  });

  const RenderedA = ({ list }) => {
    return list.map((name) => {
      return (
        <Link to={`/${name}`} key={name} style={{ textDecoration: 'none' }}>
          <div className="nav-item">{name}</div>
        </Link>
      );
    });
  };

  const RenderNavbar = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          {/* <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          /> */}
          SiPaDi
        </Navbar.Brand>
        <Nav>
          <RenderedA
            list={isPenjaga !== true ? listMenuMember : listMenuPenjaga}
          />
        </Nav>
        <div>{isUserAuthenticated() ? <Logout /> : <Login />}</div>
      </Navbar>
    );
  };

  return (
    <div>
      {/* {show ? <RenderNavbar /> : (
        <div>
          <p>Haii</p>
        </div>
      )} */}
      {show && <RenderNavbar />}
    </div>
  );
};

export default Header;
