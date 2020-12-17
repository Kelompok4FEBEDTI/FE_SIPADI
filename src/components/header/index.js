import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Navbar, Nav } from 'react-bootstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { isUserAuthenticated, setCookie } from '../../utils/cookie';
import { Logo } from '../../assets';
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
      <button
        style={{
          position: 'absolute',
          right: '0',
          marginRight: '10px',
          top: '0',
          marginTop: '6px',
        }}
        onClick={hapusCookie}
        type="button"
        className="btn btn-danger"
      >
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
  const listMenuMember = ['Profile Member', 'My History', 'Spot Parkir'];
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    return setIsOpen(!isOpen);
  };

  const listMenuPenjaga = [
    'Home Penjaga Parkir',
    'Transaksi',
    'Spot Parkir',
    'Profile Penjaga Parkir',
  ];

  useEffect(() => {
    // console.log(isPenjaga);
  });

  const RenderedA = ({ list }) => {
    return list.map((name) => {
      return (
        <Link
          to={`/${name.toLowerCase().replace(' ', '')}`}
          key={name}
          style={{ textDecoration: 'none' }}
        >
          <NavItem>
            <NavLink
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              href="/components/"
            >
              {name}
            </NavLink>
          </NavItem>
        </Link>
      );
    });
  };

  const RenderNavbar = () => {
    return (
      <Navbar color="light" light expand="md">
        <Link to={isPenjaga ? '/homepenjagaparkir' : '/profilemember'}>
          <img style={{ width: '130px' }} alt="brand" src={Logo} />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse
          isOpen={isOpen}
          navbar
          style={{ position: 'absolute', right: '0', marginRight: '120px' }}
        >
          <Nav className="mr-auto" navbar>
            <RenderedA
              list={isPenjaga !== true ? listMenuMember : listMenuPenjaga}
            />
          </Nav>
        </Collapse>
        <div>{isUserAuthenticated() ? <Logout /> : <Login />}</div>
      </Navbar>
    );
  };

  return <div>{show && <RenderNavbar />}</div>;
};

export default Header;
