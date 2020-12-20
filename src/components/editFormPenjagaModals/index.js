import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { Form } from 'react-bootstrap';
import { getCookie } from '../../utils/cookie';
import { penjagaService } from '../../services';

const EditFormPenjagaModals = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const penjagaData = JSON.parse(getCookie('userData'));
  const [error, setError] = useState();
  const [pesan, setPesan] = useState();

  useEffect(() => {
    setNama(data.nama);
    setNik(data.nik);
    setUsername(data.username);
    setPassword(data.password);
  }, [data]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    data.nama = nama;
    data.username = username;
    penjagaService
      .editPenjagaByID(penjagaData.ID, data)
      .then(() => {
        setPesan('Berhasil Edit');
        window.location.replace('/profilepenjagaparkir');
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {error && <p>{error}</p>}
      {pesan && <p>{pesan}</p>}
      <Button
        style={{
          position: 'absolute',
          right: '0',
          marginRight: '20px',
          top: '0',
          marginTop: '20px',
          backgroundColor: '#16D9D0',
          color: 'white',
        }}
        onClick={showModal}
      >
        Edit
      </Button>
      <Modal
        centered
        visible={visible}
        title="Edit Profile"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" danger key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        <div
          style={{
            padding: '20px',
            margin: '20px',
          }}
        >
          <Form>
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
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
              <Form.Label>NIK</Form.Label>
              <Form.Control
                type="text"
                placeholder="NIK"
                value={nik}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                // readOnly
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default EditFormPenjagaModals;
