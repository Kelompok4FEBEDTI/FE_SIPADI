import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { spotParkirService } from '../../services';
import { Loading } from '../../components';

const SpotParkir = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lantai, setLantai] = useState();
  const [allState, setAllState] = useState();

  useEffect(() => {
    setLoading(true);
    spotParkirService
      .showSpotParkir()
      .then((e) => {
        setAllState(e);
        setLantai(true);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleChange = () => {
    setData(0);
    if (lantai === 1) {
      for (let i = 0; i < 20; i += 1) {
        data.push(allState[i]);
      }
    } else {
      for (let i = 21; i < 40; i += 1) {
        data.push(allState[i]);
      }
    }
  };

  const renderError = () => {
    return <p>{error}</p>;
  };

  return (
    <div>
      <Container style={{ marginTop: '20px' }}>
        {loading && Loading}
        {error && renderError}

        {data && lantai && (
          <Row style={{ backgroundColor: '#C4C4C4', borderRadius: '10px' }}>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[0].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[0].lantai}
                ,
                {data[0].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[1].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[1].lantai}
                ,
                {data[1].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[2].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[2].lantai}
                ,
                {data[2].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[3].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[3].lantai}
                ,
                {data[3].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[4].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[4].lantai}
                ,
                {data[4].status}
              </div>
            </Col>
            <Col style={{ marginTop: '20px' }}>
              <p>1</p>
            </Col>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[5].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[5].lantai}
                ,
                {data[5].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[6].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[6].lantai}
                ,
                {data[6].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[7].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[7].lantai}
                ,
                {data[7].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[8].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[8].lantai}
                ,
                {data[8].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[9].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[9].lantai}
                ,
                {data[9].status}
              </div>
            </Col>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[10].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[10].lantai}
                ,
                {data[10].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[11].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[11].lantai}
                ,
                {data[11].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[12].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[12].lantai}
                ,
                {data[12].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[13].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[13].lantai}
                ,
                {data[13].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[14].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[14].lantai}
                ,
                {data[14].status}
              </div>
            </Col>
            <Col style={{ marginTop: '20px' }}>
              <p>1</p>
            </Col>
            <Col style={{ marginTop: '20px', marginBottom: '20px' }}>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[15].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[15].lantai}
                ,
                {data[15].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[16].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[16].lantai}
                ,
                {data[16].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[17].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[17].lantai}
                ,
                {data[17].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[18].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[18].lantai}
                ,
                {data[18].status}
              </div>
              <div
                style={{
                  height: '100px',
                  width: '200px',
                  backgroundColor: `${
                    data[19].status === 'Tersedia' ? '#16ACA5' : '#D92116'
                  }`,
                  margin: '5px',
                  borderRadius: '5px',
                }}
              >
                {data[19].lantai}
                ,
                {data[19].status}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default SpotParkir;
