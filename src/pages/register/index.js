import React, { useState } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { authService } from '../../services';
import { HeaderAuth, Loading } from '../../components';
import { GambarRegister } from '../../assets';

const RegisterMember = () => {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('Man');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validation = () => {
    if (username && password && nama && nik && jenisKelamin) {
      return true;
    }
    return false;
  };

  const handleRegisterSubmit = (e) => {
    setError(false);
    setSuccess(false);
    setLoading(true);
    if (validation()) {
      authService
        .registerMember(username, password, nama, nik, jenisKelamin)
        .then((res) => {
          setSuccess(res.data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setUsername('');
          setPassword('');
          setNama('');
          setJenisKelamin('');
          setNik('');
          setLoading(false);
        });
    } else {
      setUsername('');
      setPassword('');
      setNama('');
      setJenisKelamin('');
      setNik('');
      setError('Please isi seluruh Form!');
      setLoading(false);
    }
    e.preventDefault();
  };

  const hideError = () => {
    setError(false);
  };

  return (
    <Container
      style={{
        border: '1px solid lightgray',
        paddingRight: '0',
        width: 'fit-content',
        height: 'fit-content',
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {error && (
        <div style={{ margin: '20px' }}>
          <Alert onClick={hideError} variant="danger">
            {error}
          </Alert>
        </div>
      )}
      {success && (
        <div style={{ margin: '20px' }}>
          <Alert onClick={hideError} variant="success">
            {`Congratulation
            ${success}
            ! Succes Register Account!`}
          </Alert>
        </div>
      )}
      <Row>
        <Col
          style={{
            backgroundColor: 'white',
            paddingBottom: '20px',
            paddingLeft: '25px',
            maxWidth: '400px',
            overflow: 'hidden',
          }}
          xs={12}
          md={{}}
        >
          <HeaderAuth hide back />
          <p style={{ fontWeight: 'lighter' }}>Sign Up and Start Parking!</p>
          <Form onSubmit={handleRegisterSubmit}>
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
            <Form.Group controlId="formNama">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formNik">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="NIK"
                value={nik}
                onChange={(e) => {
                  setNik(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formGridState">
              {/* <Form.Label>State</Form.Label> */}
              <Form.Control
                as="select"
                defaultValue="Choose Gender . . ."
                value={jenisKelamin}
                onChange={(e) => {
                  setJenisKelamin(e.target.value);
                }}
              >
                <option disabled>Choose Gender . . .</option>
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Yes! I want to get the most out of SiPaDi by receiving
                emails with exclusive deals, personal recommendations and learning tips!"
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: '#16D9D0', border: '0', width: '100%' }}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Col>
        <Col
          xs={12}
          md={{}}
          className="d-flex justify-content-center align-items-center"
          style={{ padding: '0', margin: '0' }}
        >
          {GambarRegister ? (
            <img
              style={{ width: '550px', height: '550px' }}
              alt="gambar login"
              src={GambarRegister}
            />
          ) : (
            <Loading />
          )}
        </Col>
      </Row>
      {loading && (
        <div
          style={{
            margin: '0',
            position: 'absolute',
            top: '45%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Loading />
        </div>
      )}
    </Container>
  );
};

export default RegisterMember;
