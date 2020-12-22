import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Avatar } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';
import { penjagaService } from '../../services';
import { EditFormPenjagaModals, Loading } from '../../components';
import { getCookie } from '../../utils/cookie';

const ProfileMember = () => {
  const [dataPenjaga, setDataPenjaga] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const penjagaData = JSON.parse(getCookie('userData'));

  useEffect(() => {
    setLoading(true);
    penjagaService
      .viewPenjagaByID(penjagaData.ID)
      .then((res) => {
        setDataPenjaga(res);
        // console.log(res[0]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      style={{
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '0',
        position: 'absolute',
        maxWidth: '500px',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {error && <p>{error}</p>}
      {/* {loading && <p>Loading...</p>} */}
      {dataPenjaga && !loading ? (
        <div
          style={{
            padding: '20px',
            margin: '20px',
          }}
        >
          <EditFormPenjagaModals data={dataPenjaga} />
          <Avatar
            size={180}
            style={{ backgroundColor: 'darkCyan' }}
            icon={<UserOutlined />}
          />
          <div
            style={{
              marginTop: '20px',
              textAlign: 'unset',
              justifyContent: 'center',
            }}
          >
            <Row className="ket">
              <Col style={{ textAlign: 'end' }} md={{ span: 5 }}>
                NIK
              </Col>
              <Col>:</Col>
              <Col style={{ textAlign: 'left' }} md={5}>
                {dataPenjaga.nik}
              </Col>
            </Row>
            <Row className="ket">
              <Col style={{ textAlign: 'end' }} md={{ span: 5 }}>
                Nama
              </Col>
              <Col>:</Col>
              <Col style={{ textAlign: 'left' }} md={5}>
                {dataPenjaga.nama}
              </Col>
            </Row>
            <Row className="ket">
              <Col style={{ textAlign: 'end' }} md={{ span: 5 }}>
                Username
              </Col>
              <Col>:</Col>
              <Col style={{ textAlign: 'left' }} md={5}>
                {dataPenjaga.username}
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ProfileMember;
