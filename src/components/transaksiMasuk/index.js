/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Alert,
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { Loading } from '..';
import { transaksiParkirService, memberService } from '../../services';
import { getCookie } from '../../utils/cookie';
// import { getDate, getTime } from '../../utils/baseFunction';
import './style.css';

const getDate = () => {
  const today = new Date();

  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  return date;
};

const getTime = () => {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return time;
};

const TransaksiMasuk = () => {
  const [infoMember, setInfoMember] = useState();
  const [error, setError] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [nopol, setNopol] = useState('');
  const [mobil, setMobil] = useState();
  const [jamMasuk, setJamMasuk] = useState('');
  const [status, setStatus] = useState('');
  const { ID } = JSON.parse(getCookie('userData'));
  const [sukses, setSukses] = useState('');

  const addParkir = () => {
    setLoadingData(true);
    transaksiParkirService
      .addTransaksiParkir({
        id_penjaga: ID,
        id_member: infoMember._id,
        nomor_polisi: nopol,
        jenis_mobil: mobil.jenis_mobil,
        status_parkir: status,
        spot_parkir: 'E27',
        jam_masuk: jamMasuk,
        jam_keluar: jamMasuk,
        tarif: 4000,
      })
      .then((res) => {
        setSukses(`No Karcis : ${res._id}`);
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

  const verivikasiNopol = () => {
    setError(false);
    setLoadingData(true);
    if (nopol.length > 0) {
      memberService
        .viewMemberByNopol(nopol)
        .then((res) => {
          setInfoMember(res[0]);
          res[0].mobil.map((e) => {
            if (e.nomor_polisi === nopol) {
              setMobil(e);
            }
            return false;
          });
          setJamMasuk(`${getDate()} ${getTime()}`);
          setStatus('ParkirMasuk');
        })
        .catch((err) => {
          setError(err);
          setNopol('');
        })
        .finally(() => {
          setLoadingData(false);
        });
    } else {
      setError('Please Isi Form !');
      setLoadingData(false);
    }
  };

  const hideError = () => {
    setError(false);
  };

  return (
    <Container
      style={{
        border: '1px solid lightgray',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        minHeeight: '400px',
        maxHeight: '600px',
      }}
    >
      {error && (
        <div>
          <Alert onClick={hideError} variant="danger">
            {error}
          </Alert>
        </div>
      )}
      {sukses && (
        <div>
          <Alert onClick={hideError} variant="info">
            {sukses}
          </Alert>
        </div>
      )}
      {!error && loadingData ? (
        <Loading />
      ) : (
        <Row style={{ padding: '10px' }}>
          {/* Kolom 1: Untuk Cek Data */}
          <div
            style={{
              backgroundColor: 'white',
            }}
          >
            <Col xs={12} md={{}}>
              {!infoMember && (
                <div>
                  <Form>
                    <Form.Group>
                      <Form.Label>Nomor Kendaraan</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="ex B 2397 CH"
                        value={loadingData ? 'Loading...' : nopol}
                        onChange={(e) => {
                          setNopol(e.target.value.toUpperCase());
                        }}
                        required
                      />
                      <Form.Text className="text-muted">
                        Pastikan anda bukan buronan polisi!
                      </Form.Text>
                    </Form.Group>
                  </Form>
                  <Row style={{ padding: '20px' }}>
                    <Button
                      variant="info"
                      type="button"
                      disabled={loadingData}
                      onClick={verivikasiNopol}
                    >
                      Check Mobil
                    </Button>
                  </Row>
                </div>
              )}
            </Col>
            {infoMember && mobil && (
              <Col>
                <Card>
                  <Card.Header>User Verivied !</Card.Header>
                  <Card.Body>
                    <Card.Title>{infoMember.nama_member}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the cards content.
                    </Card.Text>
                    <Card.Text>{`${mobil.jenis_mobil} - ${nopol}`}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </div>

          {/* Kolom 2: Untuk Confirm Add Data */}
          <Col
            style={{
              backgroundColor: 'white',
              padding: '20px',
            }}
            xs={12}
            md={{}}
          >
            <div>
              {infoMember && (
                <div>
                  <Row className="ket">
                    <Col md={{ span: 4 }}>ID Petugas</Col>
                    <Col md={-1}>:</Col>
                    <Col className="value" md={5}>
                      {ID}
                    </Col>
                  </Row>
                  <Row className="ket">
                    <Col md={{ span: 4 }}>Nomor Polisi</Col>
                    <Col md={-1}>:</Col>
                    <Col className="value" md={5}>
                      {nopol}
                    </Col>
                  </Row>
                  <Row className="ket">
                    <Col md={{ span: 4 }}>Tanggal</Col>
                    <Col md={-1}>:</Col>
                    <Col className="value" md={5}>
                      26 December 2020
                    </Col>
                  </Row>
                  <Row className="ket">
                    <Col md={{ span: 4 }}>Jam Masuk</Col>
                    <Col md={-1}>:</Col>
                    <Col className="value" md={5}>
                      {jamMasuk}
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: '0' }} className="ket">
                    <Col md={{ span: 4 }}>Status</Col>
                    <Col md={-1}>:</Col>
                    <Col md={{ span: 5 }} className="value">
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
                          marginTop: '10px',
                        }}
                        type="button"
                        disabled={loadingData}
                        onClick={() => {
                          setNopol('');
                          setMobil('');
                          setJamMasuk('');
                          setStatus('');
                          setInfoMember(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        style={{
                          border: '0',
                          width: '100%',
                          marginTop: '10px',
                          backgroundColor: '#16D9D0',
                        }}
                        type="button"
                        disabled={loadingData}
                        onClick={() => {
                          addParkir();
                        }}
                      >
                        Add Parkir
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TransaksiMasuk;
