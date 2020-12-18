import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Container,
  Pagination,
  Form,
  Button,
  FormControl,
  Alert,
} from 'react-bootstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { TableTransaksi, Loading } from '../../components';
import { transaksiParkirService, memberService } from '../../services';

const JudulTransaksi = (props) => {
  const { totalData } = props;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '20px',
      }}
    >
      <div>
        <h3>Transaksi Parkir</h3>
        <p style={{ marginBottom: '20px', marginTop: '10px', color: 'red' }}>
          {`Total Data ${totalData}`}
        </p>
      </div>
      <div>
        <Link to="/homepenjagaparkir" className="btn btn-info">
          Add Transaksi
        </Link>
      </div>
    </div>
  );
};

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState('');

  const handleSearch = (e) => {
    setError(false);
    setLoading(true);
    transaksiParkirService
      .getTransaksiParkirById(search)
      .then((detail) => {
        setData(detail);
        memberService
          .viewMemberByID(detail.id_member)
          .then((res) => {
            setMember(res);
          })
          .catch((err) => {
            setError(err);
          });
      })
      .catch((err) => {
        setError('ID Tidak Ditemukan', err.message);
      })
      .finally(() => {
        setSearch('');
        setLoading(false);
      });
    e.preventDefault();
  };

  return (
    <div>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button variant="outline-info" onClick={handleSearch}>
          Search
        </Button>
      </Form>
      {loading && <Loading />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data && (
        <div
          style={{
            border: '2px solid black',
            margin: '20px',
            padding: '20px',
            backgroundColor: '#fff312',
            borderRadius: '10px',
          }}
        >
          <h4>{`${data.jenis_mobil} - ${data.nomor_polisi}`}</h4>
          <p>{data.status_parkir}</p>
          <p>{data.spot_parkir}</p>
          {member && (
            <div
              style={{
                border: '2px solid black',
                margin: '20px 5px',
                padding: '20px 10px',
              }}
            >
              <p>{member.nama_member}</p>
              <p>{member.nik_member}</p>
            </div>
          )}
          <Button
            onClick={() => {
              setData('');
            }}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

const TransaksiParkir = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [totalData, setTotalData] = useState('');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fetchDataTransaksiAll = () => {
    transaksiParkirService
      .getTransaksiParkir()
      .then((res) => {
        setDataTransaksi(res.data);
        setTotalData(res.total);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDataTransaksiMasuk = () => {
    transaksiParkirService
      .getTransaksiParkir(0, 2, 'ParkirMasuk')
      .then((res) => {
        setDataTransaksi(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDataTransaksiKeluar = () => {
    transaksiParkirService
      .getTransaksiParkir(0, 2, 'ParkirKeluar')
      .then((res) => {
        setDataTransaksi(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchDataTransaksiAll();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <Loading />}
      <Container style={{ marginTop: '20px' }}>
        <JudulTransaksi totalData={totalData} />
        <Search />
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  toggle('1');
                }}
              >
                All Transaksi
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  toggle('2');
                  fetchDataTransaksiMasuk();
                }}
              >
                Parkir Masuk
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  toggle('3');
                  fetchDataTransaksiKeluar();
                }}
              >
                Parkir Keluar
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {dataTransaksi && <TableTransaksi data={dataTransaksi} />}
            </TabPane>
            <TabPane tabId="2">
              {dataTransaksi && <TableTransaksi data={dataTransaksi} />}
            </TabPane>
            <TabPane tabId="3">
              {dataTransaksi && <TableTransaksi data={dataTransaksi} />}
            </TabPane>
          </TabContent>
        </div>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
    </div>
  );
};

export default TransaksiParkir;
