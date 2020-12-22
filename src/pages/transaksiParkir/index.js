import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Container,
  Form,
  Button,
  FormControl,
  Alert,
  Card,
  Pagination,
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
        margin: '20px',
      }}
    >
      <div>
        <Link to="/homepenjagaparkir" className="btn btn-info">
          Add Transaksi
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <p style={{ marginTop: '8px', marginLeft: '50px', color: 'green' }}>
          {`Total Data ${totalData}`}
        </p>
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
            setError(err.message);
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
  const hideError = () => {
    setError(false);
  };

  return (
    <div style={{ marginTop: '-8px' }}>
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
      {error && (
        <div style={{ margin: '20px' }}>
          <Alert onClick={hideError} variant="danger">
            {error}
          </Alert>
        </div>
      )}
      {data && (
        <div>
          <Card style={{ margin: '20px 0' }}>
            <Card.Header>Member Verivied !</Card.Header>
            <Card.Body>
              <Card.Title>{`${data.jenis_mobil} - ${data.nomor_polisi}`}</Card.Title>
              <Card.Text>{`Status: ${data.status_parkir} - ${data.spot_parkir}`}</Card.Text>
              {member && (
                <div>
                  <Card.Text>{`Pemilik : ${member.nama_member}`}</Card.Text>
                  <Card.Text>{`Identiti : ${member.nik_member}`}</Card.Text>
                </div>
              )}
            </Card.Body>
            <Button
              onClick={() => {
                setData('');
              }}
              style={{ margin: '20px' }}
            >
              OK
            </Button>
          </Card>
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
  const [jenis, setJenis] = useState('All');
  const [totalData, setTotalData] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [active, setActive] = useState();
  const [totalPage, setTotalPage] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderItems = [];

  for (let number = 0; number < totalPage; number += 1) {
    renderItems.push(
      <Pagination.Item
        onClick={() => {
          setOffset(number * 10);
          setLimit(number * 10 + 10);
          setActive(number);
        }}
        key={number}
        active={number === active}
      >
        {number + 1}
      </Pagination.Item>
    );
  }

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    const fetchAPI = () => {
      transaksiParkirService
        .getTransaksiParkir(offset, limit, jenis)
        .then((res) => {
          for (let number = 0; number <= totalPage; number += 1) {
            renderItems.push({ index: number });
          }
          setDataTransaksi(res.data);
          setTotalData(res.total);
          const total = Math.floor(res.total / 10);
          setTotalPage(total);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    setLoading(true);
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jenis, offset]);

  const handlePage = (tab, jenisTransaksi) => {
    setOffset(0);
    setLimit(10);
    setJenis(jenisTransaksi);
    toggle(tab);
    setDataTransaksi('');
  };

  return (
    <div>
      <Container
        style={{
          borderRadius: '10px',
          marginTop: '40px',
          padding: '20px',
        }}
      >
        <JudulTransaksi totalData={totalData} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Search />
        </div>
        <div
          style={{
            background: 'white',
            margin: '20px 0',
            padding: '0 20px',
            fontSize: '12px',
            borderRadius: '20px',
          }}
        >
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  return handlePage('1', 'All');
                }}
              >
                All Transaksi
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  return handlePage('2', 'ParkirMasuk');
                }}
              >
                Parkir Masuk
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  return handlePage('3', 'ParkirKeluar');
                }}
              >
                Parkir Keluar
              </NavLink>
            </NavItem>
          </Nav>
          {loading ? (
            <div
              style={{
                display: 'flex',
                margin: '40px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {error && <Alert variant="danger">{error}</Alert>}
              {loading && <Loading />}
            </div>
          ) : (
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
          )}
          {renderItems && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Pagination>
                <Pagination.First
                  onClick={() => {
                    setOffset(0);
                    setLimit(10);
                    setActive(0);
                  }}
                />
                <Pagination.Prev
                  onClick={() => {
                    // eslint-disable-next-line eqeqeq
                    if (active != 0) {
                      setActive(active - 1);
                      setOffset((active - 1) * 10);
                      setLimit((active - 1) * 10 + 10);
                    }
                  }}
                />
                {renderItems}
                <Pagination.Next
                  onClick={() => {
                    // eslint-disable-next-line eqeqeq
                    if (active != totalPage) {
                      setActive(active + 1);
                      setOffset((active + 1) * 10);
                      setLimit((active + 1) * 10 + 10);
                    }
                  }}
                />
                <Pagination.Last
                  onClick={() => {
                    setOffset(totalPage);
                    setLimit(totalPage + 10);
                    setActive(totalPage);
                  }}
                />
              </Pagination>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TransaksiParkir;
