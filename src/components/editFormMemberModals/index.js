import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Form } from 'react-bootstrap';

const EditFormMemberModals = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('Man');
  const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
    console.log(nik);
    console.log(nama);
    console.log(jenisKelamin);
    console.log(username);
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
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={data.nama_member}
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formNik">
              <Form.Control
                type="text"
                placeholder="NIK"
                value={data.nik_member}
                onChange={(e) => {
                  setNik(e.target.value);
                }}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formGridState">
              <Form.Control
                as="select"
                defaultValue="Choose Gender . . ."
                value={data.jeniskelamin_member}
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
              <Form.Control
                type="text"
                placeholder="Username"
                value={data.username_member}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            {/* <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={data.password_member}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group> */}
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
