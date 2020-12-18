/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { Avatar } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';
import { memberService } from '../../services';
import './style.css';
import {
  EditFormMemberModals,
  AddFormMobilModals,
  Loading,
} from '../../components';
import { getCookie } from '../../utils/cookie';

const ProfileMember = () => {
  const [dataMember, setDataMember] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState(false);

  const memberData = JSON.parse(getCookie('userData'));

  useEffect(() => {
    setLoading(true);
    memberService
      .viewMemberByID(memberData.ID)
      .then((res) => {
        setDataMember(res);
        // console.log(res[0]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [memberData]);

  const deleteMobil = (idMobil) => {
    memberService
      .deleteMobilByID(idMobil)
      .then((res) => {
        setMessage(`Data mobil si ${res.nama_member} berhasil di hapus.`);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Container
      style={{
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        border: '1px solid darkgray',
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
      {message && <p>{message}</p>}
      {/* {loading && <p>Loading...</p>} */}
      {dataMember && !loading ? (
        <div
          style={{
            padding: '20px',
            margin: '20px',
          }}
        >
          <EditFormMemberModals data={dataMember} />
          <Avatar
            size={180}
            style={{ backgroundColor: 'darkCyan' }}
            icon={<UserOutlined />}
          />
          <div style={{ marginTop: '20px' }}>
            <Row className="ket">
              <Col style={{ textAlign: 'end' }} md={{ span: 5 }}>
                NIK
              </Col>
              <Col>:</Col>
              <Col style={{ textAlign: 'left' }} md={5}>
                {dataMember.nik_member}
              </Col>
            </Row>
            <Row className="ket">
              <Col style={{ textAlign: 'end' }} md={{ span: 5 }}>
                Nama
              </Col>
              <Col>:</Col>
              <Col style={{ textAlign: 'left' }} md={5}>
                {dataMember.nama_member}
              </Col>
            </Row>
            {/* <p>{`NIK : ${dataMember.nik_member}`}</p>
            <p>{`Nama : ${dataMember.nama_member}`}</p> */}
          </div>
          <div>
            {dataMember.mobil && (
              <Table
                style={{
                  maxHeight: '50px',
                  overflow: 'scroll',
                  fontFamily: 'poppins',
                }}
                responsive
                // bordered
                hover
              >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>No Polisi</th>
                    <th>Jenis Mobil</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMember.mobil.map((data, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.nomor_polisi}</td>
                        <td>{data.jenis_mobil}</td>
                        <td>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => {
                              deleteMobil(data._id);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr
                    style={{
                      borderTop: '1px solid darkgray',
                    }}
                  >
                    <td />
                    <td />
                    <td>
                      <AddFormMobilModals />
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ProfileMember;
