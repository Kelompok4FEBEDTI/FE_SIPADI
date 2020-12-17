import React from 'react';
import { Row, Col } from 'react-bootstrap';

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
        <a href="/">SiPadi Logo</a>
      </Col>
      <Col>
        <Row className="justify-content-md-end">
          <a href="/">Log In</a>
          <a href="/" style={{ margin: '0 20px' }}>
            Sign Up
          </a>
        </Row>
      </Col>
    </Row>
  );
};

export default HeaderAuth;
