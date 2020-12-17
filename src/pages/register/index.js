import React, { useState } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authService } from '../../services';
import { HeaderAuth, Loading } from '../../components';

const RegisterMember = () => {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('Man');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegisterSubmit = (e) => {
    setLoading(true);
    authService
      .registerMember(username, password, nama, nik, jenisKelamin)
      .then((res) => {
        console.log('Hello Iklas 2 ', res);
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
    e.preventDefault();
  };

  const hideError = () => {
    setError(false);
  };

  return (
    <Container>
      {error && (
        <div>
          <Alert onClick={hideError} variant="danger">
            {error}
          </Alert>
        </div>
      )}
      {success && (
        <div>
          <Alert onClick={hideError} variant="success">
            {`Congratulation
            ${success}
            ! Succes Register Account!`}
            <Link to="/loginmember">Click here to Login!</Link>
          </Alert>
        </div>
      )}
      {loading && <Loading />}

      <Row style={{ marginBottom: '40px' }}>
        <Col
          style={{ backgroundColor: '#FFFF34', paddingBottom: '20px' }}
          xs={12}
          md={{ span: 5, offset: 7 }}
        >
          <HeaderAuth />
          <p>Sign Up and Start Parking!</p>
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
      </Row>
    </Container>
  );
};

export default RegisterMember;
