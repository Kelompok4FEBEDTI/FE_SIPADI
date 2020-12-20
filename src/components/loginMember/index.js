import React, { useState } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { authService } from '../../services';
import { setCookie } from '../../utils/cookie';
import { HeaderAuth, Loading } from '..';
import { GambarLogin } from '../../assets';

const LoginMember = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validation = () => {
    if (username && password) {
      return true;
    }
    return false;
  };

  const handleLoginSubmit = (e) => {
    setLoading(true);
    if (validation()) {
      authService
        .loginMember(username, password)
        .then((res) => {
          const cookieToken = res.token;
          const cookieUser = {
            username: res.nama,
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
          window.location.replace('/profilemember');
        });
    } else {
      setError('Please isi seluruh Form!');
      setUsername('');
      setPassword('');
      setLoading(false);
    }
    e.preventDefault();
  };

  const hideError = () => {
    setError(false);
  };

  return (
    <Container style={{ border: '1px solid lightgray', paddingRight: '0' }}>
      {error && (
        <div style={{ margin: '20px' }}>
          <Alert onClick={hideError} variant="danger">
            {error}
          </Alert>
        </div>
      )}
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
          <HeaderAuth />
          <div style={{ paddingLeft: '10px' }}>
            <p style={{ fontWeight: 'lighter' }}>
              Log In to Your SiPaDi Member Account!
            </p>
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group controlId="formBasicEmail">
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
          {loading && <Loading />}
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

export default LoginMember;
