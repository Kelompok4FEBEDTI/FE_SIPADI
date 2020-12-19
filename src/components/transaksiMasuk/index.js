/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Loading } from '..';
import {
  spotParkirService,
  penjagaService,
  memberService,
  transaksiParkirService,
} from '../../services';
import { getCookie } from '../../utils/cookie';
import './style.css';

const TransaksiMasuk = () => {
  const [jamMasuk, setJamMasuk] = useState('');
  const [petugas, setPetugas] = useState('');
  const [status, setStatus] = useState('');
  const [nopol, setNopol] = useState('');
  const [mobil, setMobil] = useState();
  const [infoMember, setInfoMember] = useState();
  const [slot, setSlot] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState();
  const [error, setError] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [message, setMessage] = useState(false);
  const dataPetugas = JSON.parse(getCookie('userData'));

  useEffect(() => {
    setLoadingData(true);
    spotParkirService
      .showSpotParkir()
      .then((res) => {
        setSlot(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }, []);

  useEffect(() => {
    setPetugas('');
    setInfoMember('');
    setMobil('');
    setJamMasuk('');
    setStatus('');
  }, [nopol]);

  const getData = () => {
    if (nopol.length > 0) {
      memberService
        .viewMemberByNopol(nopol)
        .then((res) => {
          setInfoMember(res[0]);
          setMobil(
            res[0].mobil.filter((x) => {
              return x.nomor_polisi === nopol;
            })
          );
        })
        .catch((err) => {
          setError(err);
        });
      penjagaService
        .viewPenjagaByID(dataPetugas.ID)
        .then((ress) => {
          setPetugas(ress.nama);
          setJamMasuk(new Date(0));
          setStatus('Sedang Parkir');
        })
        .catch((err) => {
          setError(err);
        });
    }
    setPetugas('');
    setInfoMember('');
    setMobil('');
    setJamMasuk('');
    setStatus('');
  };

  const handleSubmitMasuk = () => {
    setLoadingData(true);
    const data = {
      id_penjaga: dataPetugas.ID,
      id_member: infoMember._id,
      nomor_polisi: nopol,
      jenis_mobil: mobil && mobil[0].jenis_mobil,
      status_parkir: 'Sudah Parkir',
      spot_parkir: selectedSlot,
      jam_masuk: jamMasuk,
      jam_keluar: new Date(0),
      tarif: 10,
    };
    transaksiParkirService
      .addTransaksiParkir(data)
      .then((res) => {
        setMessage(
          `Transaksi Masuk ${res.jenis_mobil} dengan plat Nomer ${res.nomo_polisi}`
        );
        setPetugas('');
        setInfoMember('');
        setMobil();
        setJamMasuk('');
        setStatus('');
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };
  const hideError = () => {
    setError(false);
  };

  return (
    <Container
      style={{
        border: '1px solid lightgray',
        paddingTop: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '500px',
      }}
    >
      {error && (
        <div>
          <Alert onClick={hideError} variant="danger">
            {error}
          </Alert>
        </div>
      )}
      {message && <Alert variant="danger">{message}</Alert>}
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
              <Form onSubmit={handleSubmitMasuk}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Nomor Kendaraan"
                    value={loadingData ? 'Loading...' : nopol}
                    onChange={(e) => {
                      setNopol(e.target.value.toUpperCase());
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Jenis Kendaraan"
                    value={mobil ? mobil[0].jenis_mobil : ''}
                    readOnly
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Nama Pemilik"
                    value={infoMember ? infoMember.nama_member : ''}
                    readOnly
                  />
                </Form.Group>
                <Form.Control
                  as="select"
                  required
                  value={selectedSlot}
                  onChange={(e) => {
                    setSelectedSlot(e.target.value);
                  }}
                >
                  <option>Pilih Slot Parkir</option>
                  {slot.map((e) => {
                    return (
                      <option
                        key={e.lantai.toString(2) + e.no_parkir.toString(2)}
                      >
                        {`${e.lantai.toString()}${e.no_parkir.toString()}`}
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
                <Col md={{ span: 4 }}>Jam Masuk</Col>
                <Col md={-1}>:</Col>
                <Col className="value" md={5}>
                  {jamMasuk}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 4 }}>Petugas</Col>
                <Col md={-1}>:</Col>
                <Col className="value" md={5}>
                  {petugas}
                </Col>
              </Row>
              <Row style={{ marginBottom: '0' }} className="ket">
                <Col md={{ span: 4 }}>Status</Col>
                <Col md={-1}>:</Col>
                <Col md={{ span: 5 }} className="value">
                  {status}
                </Col>
              </Row>
              <Row style={{ margin: '1px', marginBottom: '2px' }}>
                <Button
                  variant="info"
                  style={{
                    border: '0',
                    width: '100%',
                    marginTop: '10px',
                  }}
                  type="button"
                  disabled={loadingData}
                  onClick={() => {
                    getData();
                  }}
                >
                  Get Data
                </Button>
              </Row>
              <Row>
                <Col>
                  <Button
                    variant="danger"
                    style={{
                      border: '0',
                      width: '100%',
                      marginTop: '10px',
                    }}
                    type="button"
                    disabled={loadingData}
                    onClick={() => {
                      setNopol('');
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    // variant="danger"
                    style={{
                      border: '0',
                      width: '100%',
                      marginTop: '10px',
                      backgroundColor: '#16D9D0',
                    }}
                    type="button"
                    disabled={loadingData}
                    onClick={() => {
                      handleSubmitMasuk();
                    }}
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
