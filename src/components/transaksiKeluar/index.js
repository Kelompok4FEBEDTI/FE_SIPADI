/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Loading } from '..';
import {
  transaksiParkirService,
  memberService,
  penjagaService,
} from '../../services';

const TransaksiKeluar = () => {
  const [jamMasuk, setJamMasuk] = useState('');
  const [biaya, setBiaya] = useState('');
  const [dataTransaksi, setDataTransaksi] = useState();
  const [status, setStatus] = useState('');
  const [karcis, setKarcis] = useState('');
  const [namaPetugas, setNamaPetugas] = useState('');
  const [nama, setNama] = useState('');
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const hideError = () => {
    setError(false);
  };

  useEffect(() => {
    setDataTransaksi();
    setNamaPetugas();
    setNama('');
    setStatus('');
    setLoadingData(false);
  }, [karcis]);

  const getData = () => {
    if (karcis.length > 0) {
      // setLoadingData(true);
      transaksiParkirService
        .getTransaksiParkirById(karcis)
        .then((res) => {
          setDataTransaksi(res);
          setJamMasuk(new Date(0).toISOString());
          setBiaya(6000);
        })
        .catch((err) => {
          setError(err);
        });
      memberService
        .viewMemberByNopol('DD 1453 SS')
        .then((res) => {
          setNama(res[0].nama_member);
        })
        .catch((err) => {
          setError(err);
        });
      penjagaService
        .viewPenjagaByID('5fdd7b80e3531a0017ed297a')
        .then((res) => {
          setNamaPetugas(res.nama);
          setStatus('ParkirKeluar');
        })
        .catch((err) => {
          setError(err);
        });
      // .finally(() => {
      //   setLoadingData(true);
      // });
    }
    setDataTransaksi();
    setNamaPetugas();
    setNama('');
    setStatus('');
  };

  useEffect(() => {});

  const onsubmitKeluar = () => {
    const data = {
      id_penjaga: dataTransaksi.id_penjaga,
      id_member: dataTransaksi.id_member,
      nomor_polisi: dataTransaksi.nomor_polisi,
      jenis_mobil: dataTransaksi.jenis_mobil,
      status_parkir: 'ParkirKeluar',
      spot_parkir: dataTransaksi.spot_parkir,
      jam_masuk: dataTransaksi.jam_masuk,
      jam_keluar: new Date(0),
      tari: biaya,
    };
    transaksiParkirService
      .editTransaksiParkirByID(dataTransaksi._id, data)
      .then(() => {
        setMsg('Transaksi Berhasil');
      })
      .catch((err) => {
        setError(err);
      });
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
      {msg && (
        <div>
          <Alert onClick={hideError} variant="danger">
            {msg}
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
              <Form onSubmit={onsubmitKeluar()}>
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
            <Row className="ket">
              <Col md={{ span: 5 }}>Nomor Kendaraan</Col>
              <Col md={1}>:</Col>
              <Col className="value" md={5}>
                {dataTransaksi ? dataTransaksi.nomor_polisi : ''}
              </Col>
            </Row>
            <Row className="ket">
              <Col md={{ span: 5 }}>Jenis Mobil</Col>
              <Col md={1}>:</Col>
              <Col className="value" md={5}>
                {dataTransaksi ? dataTransaksi.jenis_mobil : ''}
              </Col>
            </Row>
            <Row className="ket">
              <Col md={{ span: 5 }}>Nama Pemilik</Col>
              <Col md={1}>:</Col>
              <Col className="value" md={5}>
                {nama}
              </Col>
            </Row>
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
              {/* <Row className="ket">
                <Col md={{ span: 5 }}>Tanggal</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={{ span: 5 }}>
                  {}
                </Col>
              </Row> */}
              <Row className="ket">
                <Col md={{ span: 5 }}>Waktu</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {jamMasuk}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>Petugas</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {namaPetugas || ''}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>Status</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {status}
                </Col>
              </Row>
              <Row style={{ marginBottom: '0' }} className="ket">
                <Col md={{ span: 5 }}>Total Biaya</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {biaya}
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
                      setKarcis('');
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
                      onsubmitKeluar();
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

export default TransaksiKeluar;
