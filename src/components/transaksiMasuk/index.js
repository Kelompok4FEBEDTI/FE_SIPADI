import React, { useState, useEffect } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Loading } from '..';
import {
  spotParkirService,
  penjagaService,
  memberService,
  transaksiParkirService,
} from '../../services';
import func from '../../utils/baseFunction';
import { getCookie } from '../../utils/cookie';
import './style.css';

const TransaksiMasuk = () => {
  const [tanggal, setTanggal] = useState('');
  const [jamMasuk, setJamMasuk] = useState('');
  const [petugas, setPetugas] = useState('');
  const [status, setStatus] = useState('');
  const [nopol, setNopol] = useState('');
  const [mobil, setMobil] = useState();
  const [infoMember, setInfoMember] = useState({});
  const [slot, setSlot] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState();
  const [error, setError] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  // const [loading, setLoading] = useState(false);

  const dataPetugas = JSON.parse(getCookie('userData'));

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
    if (nopol.length > 0) {
      memberService
        .viewMemberByNopol(nopol)
        .then((res) => {
          setInfoMember(res[0]);
          console.log(res[0]);
          setMobil(
            res[0].mobil.filter((x) => {
              return x.nomor_polisi === nopol;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
      penjagaService
        .viewPenjagaByID(dataPetugas.ID)
        .then((ress) => {
          setPetugas(ress.nama);
          setTanggal(func.getDate());
          setJamMasuk(func.getTime());
          setStatus('Sedang Parkir');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setPetugas(selectedSlot);
    setInfoMember(infoMember);
    setMobil();
    setTanggal('');
    setJamMasuk('');
    setStatus('');
  }, [nopol]);

  const onsubmitMasuk = () => {
    // setLoading(true);
    const data = JSON.stringify({
      id_penjaga: dataPetugas.ID,
      id_member: infoMember.nik,
      nomor_polisi: nopol,
      jenis_mobil: mobil ? mobil[0].jenis_mobil : '',
      status_parkir: 'Sudah Parkir',
      spot_parkir: selectedSlot,
      jam_masuk: jamMasuk,
      jam_keluar: '-',
      tarif: 0,
    });
    console.log(data);
    transaksiParkirService
      .addTransaksiParkir(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
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
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Nomor Kendaraan"
                    value={loadingData ? 'Loading...' : nopol}
                    onChange={(e) => {
                      setNopol(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="text"
                    placeholder="Jenis Kendaraan"
                    value={mobil ? mobil[0].jenis_mobil : ''}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="text"
                    placeholder="Nama Pemilik"
                    value={nopol ? infoMember.nama_member : ''}
                    readOnly
                  />
                </Form.Group>
                <Form.Control
                  as="select"
                  required
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
                    onClick={onsubmitMasuk()}
                    // disabled={loading}
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
