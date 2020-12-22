import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { spotParkirService } from '../../services';
import { Loading } from '../../components';

const SpotParkir = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lantai, setLantai] = useState();
  const [allState, setAllState] = useState();

  const editDataLantai = (lt) => {
    console.log('Edir data lantai', lt);
    const awal = 20 * lt;
    const akhir = awal + 20;
    const arrData = [];
    for (let i = awal; i < akhir; i += 1) {
      arrData.push(allState[i]);
    }
    setData(arrData);
    setLoading(false);
    console.log('Edir data lantai 2', lt);
  };

  useEffect(() => {
    setLoading(true);
    spotParkirService
      .showSpotParkir()
      .then((e) => {
        setAllState(e);
        setData(e);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        console.log('HAIIIII GINAL NIH');
      });
  }, []);

  const handleLantai = async (e) => {
    setLoading(true);
    setLantai(e.target.value);
    setData(0);
    // console.log('Haiiii', e.target.value, lantai);
    editDataLantai(e.target.value);
    console.log('hmmm', lantai);
    e.preventDefault();
  };

  const renderError = () => {
    return <p>{error}</p>;
  };

  return (
    <div>
      <Container
        style={{
          backgroundColor: '#C4C4C4',
          borderRadius: '10px',
          marginTop: '40px',
          padding: '20px',
        }}
      >
        {loading && Loading}
        {error && renderError}
        <div>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Lantai</Form.Label>
            <Form.Control onChange={handleLantai} as="select" defaultValue="0">
              <option value="0">1</option>
              <option value="1">2</option>
            </Form.Control>
          </Form.Group>
        </div>
        {data && (
          <Row>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[0].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[0].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[1].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[1].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[2].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[2].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[3].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[3].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[4].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[4].no_parkir}
              </div>
            </Col>
            <Col style={{ marginTop: '20px' }}>
              <p> </p>
            </Col>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div
                style={{
                  height: '100px',

                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[5].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[5].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[6].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[6].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[7].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[7].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[8].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[8].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[9].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[9].no_parkir}
              </div>
            </Col>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[10].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[10].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[11].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[11].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[12].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[12].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[13].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[13].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[14].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[14].no_parkir}
              </div>
            </Col>
            <Col style={{ marginTop: '20px' }}>
              <p> </p>
            </Col>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[15].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[15].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[16].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[16].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[17].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[17].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[18].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[18].no_parkir}
              </div>
              <div
                style={{
                  height: '100px',
                  textAlign: 'center',
                  lineHeight: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[19].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[19].no_parkir}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default SpotParkir;
