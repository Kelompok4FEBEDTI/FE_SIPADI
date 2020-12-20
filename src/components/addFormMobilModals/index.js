import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Form, Alert } from 'react-bootstrap';
import { memberService } from '../../services';

const AddFormMobilModals = ({ idMember }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nopol, setNopol] = useState('');
  const [jenis, setJenis] = useState('');
  const [error, setError] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setLoading(true);
    memberService
      .addMobilById(idMember, nopol, jenis)
      .then(() => {
        handleCancel();
        window.location.replace('/profilemember');
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: '#16D9D0',
          color: 'white',
        }}
        onClick={showModal}
      >
        Add
      </Button>
      <Modal
        centered
        visible={visible}
        title="Tambah Mobil"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            type="primary"
            danger
            key="back"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOk}
            disabled={loading}
          >
            Add
          </Button>,
        ]}
      >
        <div
          style={{
            padding: '20px',
            margin: '20px',
          }}
        >
          {error && (
            <div style={{ margin: '20px' }}>
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
          <Form>
            <Form.Group controlId="formNopol">
              <Form.Control
                type="text"
                placeholder="Nomor Kendaraan"
                value={nopol}
                onChange={(e) => {
                  setNopol(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formJenis">
              <Form.Control
                type="text"
                placeholder="Jenis"
                value={jenis}
                onChange={(e) => {
                  setJenis(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddFormMobilModals;
