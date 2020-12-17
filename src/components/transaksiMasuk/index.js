import React, { useState, useEffect } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Loading } from '..';
import { spotParkirService, penjagaService } from '../../services';
import func from '../../utils/baseFunction';
import { getCookie } from '../../utils/cookie';
import './style.css';

const TransaksiMasuk = () => {
  const [tanggal, setTanggal] = useState('');
  const [jamMasuk, setJamMasuk] = useState('');
  const [petugas, setPetugas] = useState('');
  const [status, setStatus] = useState('');
  const [nopol, setNopol] = useState('');
  const [jenis, setJenis] = useState('');
  const [nama, setNama] = useState('');
  const [slot, setSlot] = useState([]);
  const [error, setError] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const dataPetugas = getCookie('userData');

  const hideError = () => {
    setError(false);
  };

  useEffect(() => {
    setLoadingData(true);
    spotParkirService
      .showSpotParkir()
      .then((res) => {
        setSlot(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }, []);

  useEffect(() => {
    console.log(dataPetugas.ID);
    penjagaService
      .viewPenjagaByID(dataPetugas.ID)
      .then((res) => {
        setPetugas(res.nama);
        // console.log(res.nama);
      })
      .catch((err) => {
        console.log(err);
      });
    setTanggal(func.getDate());
    setJamMasuk(func.getTime());
    setPetugas('');
    setStatus('Sedang Parkir');
    setNopol(nopol);
    setNama(nama);
    setJenis(jenis);
  }, [nopol]);

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
                    placeholder="Nomor Kendaraan"
                    value={nopol}
                    onChange={(e) => {
                      setNopol(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="text"
                    placeholder="Jenis Kendaraan"
                    value={jenis}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="text"
                    placeholder="Nama Pemilik"
                    value={nama}
                    readOnly
                  />
                </Form.Group>
                <Form.Control as="select">
                  <option>Pilih Slot Parkir</option>
                  {slot.map((e) => {
                    return (
                      <option
                        key={e.lantai.toString(2) + e.no_parkir.toString(2)}
                      >
                        {`${e.lantai.toString()}-${e.no_parkir.toString()}`}
                      </option>
                    );
                  })}
                </Form.Control>
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
                  {tanggal}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>Jam Masuk</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {jamMasuk}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>Petugas</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {petugas}
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

export default TransaksiMasuk;
