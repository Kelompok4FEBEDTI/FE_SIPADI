import React from 'react';
import { Link } from 'react-router-dom';
// import { Navbar, Nav } from 'react-bootstrap';
import { Navbar, Nav, Container, NavItem, NavLink } from 'reactstrap';
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
  const listMenuMember = ['Profile Member', 'My History', 'Spot Parkir'];

  const listMenuPenjaga = [
    'Home Penjaga Parkir',
    'Transaksi',
    'Spot Parkir',
    'Profile Penjaga Parkir',
  ];

  const RenderedA = ({ list }) => {
    return list.map((name) => {
      return (
        <Link
          to={`/${name.toLowerCase().replace(' ', '').replace(' ', '')}`}
          key={name}
          style={{ textDecoration: 'none' }}
        >
          <NavItem>
            <NavLink
              style={{ fontSize: '18px', color: 'black' }}
              href="/components/"
            >
              {name === 'Home Penjaga Parkir' ||
              name === 'Profile Penjaga Parkir' ||
              name === 'Profile Member' ?
                name.split(' ')[0] :
                name}
            </NavLink>
          </NavItem>
        </Link>
      );
    });
  };

  const RenderNavbar = () => {
    return (
      <Navbar style={{ backgroundColor: 'white' }} color="white" expand="md">
        <Container
          style={{
            display: 'flex',
            justifyContent: 'spacebeetwen',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Link to={isPenjaga ? '/homepenjagaparkir' : '/profilemember'}>
              <img style={{ width: '130px' }} alt="brand" src={Logo} />
            </Link>
            <Nav className="mr-auto" navbar style={{ marginLeft: '20px' }}>
              <RenderedA
                list={isPenjaga !== true ? listMenuMember : listMenuPenjaga}
              />
            </Nav>
          </div>
          <div>{isUserAuthenticated() ? <Logout /> : <Login />}</div>
        </Container>
      </Navbar>
    );
  };

  return <div>{show && <RenderNavbar />}</div>;
};

export default Header;
