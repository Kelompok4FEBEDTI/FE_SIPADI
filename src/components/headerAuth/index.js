import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets';

const HeaderAuth = ({ hide, back }) => {
  return (
    <Row
      className="justify-content-md-beetween align-item-center"
      style={{
        marginBottom: '20px',
        padding: '20px 10px',
      }}
    >
      <Col>
        <img alt="logo" src={Logo} style={{ width: '130px' }} />
      </Col>
      <Col>
        <Row className="justify-content-md-end">
          {/* <Link to="/loginmember">Log In</Link> */}
          {!hide ? (
            <Link to="/registermember" style={{ marginLeft: '20px' }}>
              Sign Up
            </Link>
          ) : (
            <div />
          )}
          {back ? (
            <Link style={{ marginRight: '20px' }} to="/">
              Log In
            </Link>
          ) : (
            <div />
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default HeaderAuth;
