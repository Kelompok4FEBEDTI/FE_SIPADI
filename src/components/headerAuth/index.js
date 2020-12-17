import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets';

const HeaderAuth = () => {
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
          <Link to="/registermember" style={{ marginLeft: '20px' }}>
            Sign Up
          </Link>
        </Row>
      </Col>
    </Row>
  );
};

export default HeaderAuth;
