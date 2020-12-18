import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { Form } from 'react-bootstrap';
import { getCookie } from '../../utils/cookie';
import { memberService } from '../../services';

const EditFormMemberModals = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('Man');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const memberData = JSON.parse(getCookie('userData'));
  // console.log(data);
  // // data.mobil = [];
  // console.log('INI', data);

  useEffect(() => {
    setNama(data.nama_member);
    setUsername(data.username_member);
    setJenisKelamin(data.jeniskelamin_member);
    setPassword(data.password_member);
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    data.jeniskelamin_member = jenisKelamin;
    data.nama_member = nama;
    data.username_member = username;
    console.log(data);
    memberService
      .editMemberById(memberData.ID, data)
      .then((res) => {
        console.log(res);
        window.location.replace('/profilemember');
      })
      .catch((err) => {
        console.log(err);
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
                value={data.nik_member}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formGridState">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose Gender . . ."
                value={jenisKelamin}
                onChange={(e) => {
                  setJenisKelamin(e.target.value);
                }}
              >
                <option disabled>Choose Gender . . .</option>
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
              </Form.Control>
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
            {/* <Button
              style={{
                backgroundColor: '#16D9D0',
                border: '0',
                width: '100%',
              }}
              type="submit"
            >
              Edit
            </Button> */}
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default EditFormMemberModals;
