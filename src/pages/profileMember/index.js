import React, { useState, useEffect } from 'react';
import { Button, Image, Table, Form } from 'react-bootstrap';
import { memberService } from '../../services';

const ProfileMember = () => {
  const [dataMember, setDataMember] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [formEdit, setFormEdit] = useState();
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('Man');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setLoading(true);
    memberService
      .viewMember()
      .then((res) => {
        setDataMember(res[0]);
        // console.log(res[0]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEditButton = () => {
    setFormEdit(true);
    // console.log('Edit Button Nihhhh');
  };

  const handleEditFormSubmit = () => {
    // console.log('Berhasil Edit');
    setFormEdit(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {error && <p>{error}</p>}
      <h3>Profile Member</h3>
      {loading && <p>Loading...</p>}
      {formEdit && (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            border: '2px solid green',
          }}
        >
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="formNama">
              {/* <Form.Label>Password</Form.Label> */}
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
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="NIK"
                value={nik}
                onChange={(e) => {
                  setNik(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formGridState">
              {/* <Form.Label>State</Form.Label> */}
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
              {/* <Form.Label>Username</Form.Label> */}
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
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: '#16D9D0',
                border: '0',
                width: '100%',
              }}
              type="submit"
            >
              Edit
            </Button>
          </Form>
        </div>
      )}
      {dataMember && (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            border: '2px solid green',
          }}
        >
          <Button onClick={handleEditButton} variant="info">
            Edit
          </Button>
          <div
            style={{
              width: '171px',
              height: '180px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="https://i.ibb.co/tP09Rvf/undraw-profile-pic-ic5t.png"
              roundedCircle
              style={{
                width: 'inherit',
                height: 'inherit',
                boxShadow: '1px 1px 10px rgba(0,0,0,0.5)',
              }}
            />
          </div>
          <div>
            <p>{`NIK : ${dataMember.nik_member}`}</p>
            <p>{`Nama : ${dataMember.username_member}`}</p>
          </div>
          <div>
            {dataMember.mobil && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>No Polisi</th>
                    <th>Jenis Mobil</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMember.mobil.map((data, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.nomor_polisi}</td>
                        <td>{data.jenis_mobil}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMember;
