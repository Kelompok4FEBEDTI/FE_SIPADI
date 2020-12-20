/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Loading } from '..';
import { transaksiParkirService } from '../../services';
import Func from '../../utils/baseFunction';

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

const TransaksiKeluar = ({ isError }) => {
  const [dataTransaksi, setDataTransaksi] = useState();
  const [error, setError] = useState(isError);
  const [loadingData, setLoadingData] = useState(false);
  const [karcis, setKarcis] = useState('');
  // const [modal, setModal] = useState(false);
  // const [dataTransaksiSukses, setDataTransaksiSukses] = useState(false);

  const hideError = () => {
    setError(false);
  };

  const checkCarcis = () => {
    setLoadingData(true);
    if (karcis.length > 0) {
      transaksiParkirService
        .getTransaksiParkirById(karcis)
        .then((res) => {
          setDataTransaksi(res);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoadingData(false);
          setKarcis();
        });
    } else {
      setError('Please Isi Form ID Karcis!');
      setLoadingData(false);
    }
  };

  const cariTarif = (a) => {
    const masuk = new Date(a);
    const now = new Date();
    const jamMasuk = masuk.getUTCHours();
    const menitMasuk = masuk.getUTCMinutes();
    const jamSekarang = now.getHours();
    const menitSekarang = now.getMinutes();
    const tarif = 4000;
    const selisihJam = jamSekarang - jamMasuk;
    const totalMenit = menitSekarang + menitMasuk;
    let total = selisihJam;
    if (Math.floor(totalMenit / 60) === 1) {
      total += 1;
    }
    return tarif * total;
  };

  const modalSuccess = (nopol, jam, tarif) => {
    Modal.success({
      title: 'Berhasil!!!',
      centered: true,
      content: `Mobil ${nopol} keluar pada jam ${jam} dengan tarif ${tarif}`,
      onOK: setDataTransaksi(),
    });
  };

  const bayarTransaksi = () => {
    // setModal(true);
    setLoadingData(true);
    const jamSekarang = `${getDate()} ${getTime()}`;
    const tarifParkir = cariTarif(dataTransaksi.jam_masuk);
    if (dataTransaksi) {
      transaksiParkirService
        .editTransaksiParkirByID(
          dataTransaksi._id,
          dataTransaksi.id_penjaga,
          dataTransaksi.id_member,
          dataTransaksi.nomor_polisi,
          dataTransaksi.jenis_mobil,
          'ParkirKeluar',
          dataTransaksi.spot_parkir,
          dataTransaksi.jam_masuk,
          jamSekarang,
          tarifParkir
        )
        .then(
          // eslint-disable-next-line camelcase
          ({ nomor_polisi, tarif }) => {
            // setDataTransaksiSukses(res);
            modalSuccess(nomor_polisi, getTime(), tarif);
            // setModal(true);
          }
        )
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoadingData(false);
        });
    } else {
      setLoadingData(false);
      setError('Nomor karcis tidak boleh kosong');
    }
  };

  return (
    <Container
      style={{
        border: '1px solid lightgray',
        paddingTop: '20px',
        height: 'fit-content',
      }}
    >
      {error && (
        <div>
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
          {dataTransaksi ? (
            <div style={{ paddingLeft: '10px' }}>
              <Row className="ket">
                <Col md={{ span: 5 }}>Nomor Polisi</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {dataTransaksi.nomor_polisi}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>Jenis Mobil</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {dataTransaksi.jenis_mobil}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>ID Member</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {dataTransaksi.id_member}
                </Col>
              </Row>
              {/* <Row className="ket">
                <Col md={{ span: 5 }}>Tanggal</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={{ span: 5 }}>
                  {dataTransaksi.jam_masuk}
                </Col>
              </Row> */}
              <Row className="ket">
                <Col md={{ span: 5 }}>Waktu</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {Func.convertISO(dataTransaksi.jam_masuk)}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>ID Penjaga</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {dataTransaksi.id_penjaga}
                </Col>
              </Row>
              <Row className="ket">
                <Col md={{ span: 5 }}>Spot Parkir</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {dataTransaksi.spot_parkir}
                </Col>
              </Row>
              <Row style={{ marginBottom: '0' }} className="ket">
                <Col md={{ span: 5 }}>Tarif</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                  {cariTarif(dataTransaksi.jam_masuk)}
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
                      setDataTransaksi('');
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
                    onClick={bayarTransaksi}
                  >
                    Bayar
                  </Button>
                </Col>
              </Row>
            </div>
          ) : (
            <div style={{ paddingLeft: '10px' }}>
              <Form>
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
              <Button
                variant="info"
                style={{
                  border: '0',
                  width: '100%',
                  marginTop: '10px',
                }}
                type="button"
                disabled={loadingData}
                onClick={checkCarcis}
              >
                Check Karcis
              </Button>
            </div>
          )}
        </Col>
        {/* <Col
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
            <Col md={{ span: 5 }}>Nomor Polisi</Col>
            <Col md={1}>:</Col>
            <Col className="value" md={5}>
            {dataTransaksi.nomor_polisi}
            </Col>
            </Row>
            <Row className="ket">
            <Col md={{ span: 5 }}>Jenis Mobil</Col>
              <Col md={1}>:</Col>
              <Col className="value" md={5}>
                {dataTransaksi.jenis_mobil}
                </Col>
                </Row>
                <Row className="ket">
                <Col md={{ span: 5 }}>ID Member</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                {dataTransaksi.id_member}
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
                <Row className="ket">
                <Col md={{ span: 5 }}>Tanggal</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={{ span: 5 }}>
                {dataTransaksi.jam_masuk}
                </Col>
                </Row>
                <Row className="ket">
                <Col md={{ span: 5 }}>Waktu</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                {dataTransaksi.jam_masuk}
                </Col>
                </Row>
                <Row className="ket">
                <Col md={{ span: 5 }}>ID Penjaga</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                {dataTransaksi.id_penjaga}
                </Col>
                </Row>
                <Row className="ket">
                <Col md={{ span: 5 }}>Spot Parkir</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                {dataTransaksi.spot_parkir}
                </Col>
                </Row>
                <Row style={{ marginBottom: '0' }} className="ket">
                <Col md={{ span: 5 }}>Tarif</Col>
                <Col md={1}>:</Col>
                <Col className="value" md={5}>
                {dataTransaksi.tarif}
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
                onClick={checkCarcis}
                >
                Check Karcis
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
                      addTransaksiKeluar();
                    }}
                  >
                  Submit
                  </Button>
                  </Col>
                  </Row>
                  </div>
                </Col> */}
      </Row>
      {loadingData && <Loading />}
    </Container>
  );
};

export default TransaksiKeluar;
