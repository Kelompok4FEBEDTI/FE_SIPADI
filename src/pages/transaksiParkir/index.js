import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Container,
  Form,
  Button,
  FormControl,
  Alert,
  Card,
} from 'react-bootstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { TableTransaksi, Loading } from '../../components';
import { transaksiParkirService, memberService } from '../../services';
import './style.css';

const JudulTransaksi = (props) => {
  const { totalData } = props;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '5px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <p style={{ marginTop: '8px', marginLeft: '50px', color: 'green' }}>
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
      {error && <Alert variant="danger">{error}</Alert>}
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

  const [totalData, setTotalData] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState('');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fetchDataTransaksiAll = () => {
    setLoading(true);
    transaksiParkirService
      .getTransaksiParkir(offset, limit)
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
    setLoading(true);
    transaksiParkirService
      .getTransaksiParkir(offset, limit, 'ParkirMasuk')
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

  const fetchDataTransaksiKeluar = () => {
    setLoading(true);
    transaksiParkirService
      .getTransaksiParkir(offset, limit, 'ParkirKeluar')
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

  useEffect(() => {
    setLoading(true);
    transaksiParkirService
      .getTransaksiParkir(offset, limit)
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
  }, [dataTransaksi, limit, offset]);

  // const handlePageClick = (e) => {
  //   const selectedPage = e.selected;
  //   setOffset(selectedPage * limit);
  //   if (dataTransaksi[0].jenis === 'ParkirMasuk') {
  //     fetchDataTransaksiMasuk(offset, limit);
  //   } else if (dataTransaksi[0].jenis === 'ParkirKeluar') {
  //     fetchDataTransaksiKeluar(offset, limit);
  //   } else {
  //     fetchDataTransaksiAll(offset, limit);
  //   }
  // };

  return (
    <div>
      <Container style={{ marginTop: '8px', padding: '20px', paddingTop: '0' }}>
        <JudulTransaksi totalData={totalData} />
        <Search />
        <div style={{ fontSize: '15px' }}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  setOffset(0);
                  setLimit(10);
                  toggle('1');
                  fetchDataTransaksiAll();
                }}
              >
                All Transaksi
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  setOffset(0);
                  setLimit(10);
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
                  setOffset(0);
                  setLimit(10);
                  toggle('3');
                  fetchDataTransaksiKeluar();
                }}
              >
                Parkir Keluar
              </NavLink>
            </NavItem>
          </Nav>
          {loading ? (
            <div style={{ margin: '40px', jsutifyContent: 'center' }}>
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
        </div>
        {/* <ReactPaginate
          previousLabel="<<<"
          nextLabel=">>>"
          breakLabel="..."
          breakClassName="breakme"
          pageCount={pageCount}
          marginPageDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        /> */}
      </Container>
    </div>
  );
};

export default TransaksiParkir;
