import React, { useState, useEffect } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Loading } from '..';

const TransaksiKeluar = () => {
  //   const [tanggal, setTanggal] = useState('');
  //   const [jamMasuk, setJamMasuk] = useState('');
  //   const [petugas, setPetugas] = useState('');
  const [status, setStatus] = useState('');
  const [karcis, setKarcis] = useState('');
  const [jenis, setJenis] = useState('');
  const [nama, setNama] = useState('');
  const [error, setError] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const hideError = () => {
    setError(false);
  };

  useEffect(() => {
    setLoadingData(false);
    setStatus('Keluar');
    setNama(nama);
    setJenis(jenis);
  }, [karcis]);

  const onsubmitMasuk = () => {
    // setLoading(true);
  };

  return (
    <Container style={{ border: '1px solid lightgray', paddingTop: '20px' }}>
      {error && (
        <div>
          <Alert onClick={hideError} variant="danger">
            {error}
          </Alert>
        </div>
      )}
      {loadingData ? (
        <Loading />
      ) : (
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
            <div style={{ paddingLeft: '10px' }}>
              <Form onSubmit={onsubmitMasuk()}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Nomor Karcis"
                    value={karcis}
                    onChange={(e) => {
                      setKarcis(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </div>
          </Col>
          <Col
            style={{
              backgroundColor: 'white',
              paddingBottom: '20px',
              paddingLeft: '25px',
            }}
            xs={12}
            md={{}}
          >
            <div style={{ paddingLeft: '10px' }}>
              <Row className="ket">
                <Col md={{ span: 5 }}>Tanggal</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={{ span: 5 }}>
                  {}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>Waktu</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>Petugas</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {}
                </Col>
              </Row>
              <Row style={{ marginBottom: '0' }} className="ket">
                <Col md={{ span: 5 }}>Status</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {status}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    variant="danger"
                    style={{
                      border: '0',
                      width: '100%',
                      marginTop: '20px',
                    }}
                    type="button"
                    disabled={loadingData}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{
                      backgroundColor: '#16D9D0',
                      border: '0',
                      width: '100%',
                      marginTop: '20px',
                    }}
                    type="submit"
                    onSubmit={onsubmitMasuk()}
                    disabled={loadingData}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TransaksiKeluar;
