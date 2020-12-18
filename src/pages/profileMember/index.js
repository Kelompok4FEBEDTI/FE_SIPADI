import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Avatar } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';
import { memberService } from '../../services';
import { EditFormMemberModals, Loading } from '../../components';
import { getCookie } from '../../utils/cookie';

const ProfileMember = () => {
  const [dataMember, setDataMember] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

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
  }, []);

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
            <p>{`NIK : ${dataMember.nik_member}`}</p>
            <p>{`Nama : ${dataMember.username_member}`}</p>
          </div>
          <div>
            {dataMember.mobil && (
              <Table
                style={{ maxHeight: '50px', overflow: 'scroll' }}
                responsive
                bordered
                hover
              >
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
                  <tr>
                    <td />
                    <td />
                    <td>
                      <Button type="button">Add</Button>
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
