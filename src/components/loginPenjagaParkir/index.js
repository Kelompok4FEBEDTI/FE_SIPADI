import React, { useState } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { authService } from '../../services';
import { setCookie } from '../../utils/cookie';
import { HeaderAuth, Loading } from '..';
import { GambarLogin } from '../../assets';

const LoginPenjagaParkir = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    setLoading(true);
    authService
      .loginPenjagaParkir(username, password)
      .then((res) => {
        const cookieToken = res.token;
        const cookieUser = {
          username: res.nama,
          user_role: 'penjaga',
          ID: res.ID,
        };
        setCookie('userData', JSON.stringify(cookieUser), 10000);
        setCookie('token', JSON.stringify(cookieToken), 10000);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setUsername('');
        setPassword('');
        setLoading(false);
        window.location.replace('/homepenjagaparkir');
      });
    e.preventDefault();
  };

  const hideError = () => {
    setError(false);
  };

  return (
    <Container style={{ border: '1px solid lightgray', paddingRight: '0' }}>
      {error && (
        <div>
          <Alert onClick={hideError} variant="danger">
            {error}
          </Alert>
        </div>
      )}
      {loading && <Loading />}
      <Row>
        <Col
          style={{
            backgroundColor: 'white',
            paddingBottom: '20px',
            paddingLeft: '25px',
          }}
          xs={12}
          md={{}}
        >
          <HeaderAuth hide />
          <div style={{ paddingLeft: '10px' }}>
            <p style={{ fontWeight: 'lighter' }}>
              Log In to Your SiPaDi Penjaga Parkir Account!
            </p>
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group controlId="formBasicEmail">
                {/* <Form.Label>Username</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Button
                style={{
                  backgroundColor: '#16D9D0',
                  border: '0',
                  width: '100%',
                }}
                type="submit"
              >
                Log In
              </Button>
            </Form>
          </div>
        </Col>
        <Col
          xs={12}
          md={{}}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            style={{ width: '400px' }}
            alt="gambar login"
            src={GambarLogin}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPenjagaParkir;
