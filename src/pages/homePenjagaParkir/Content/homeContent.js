import React from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import './homeContent.css';

function HomeContent() {
  const listData = [
    {
      id: 'background1',
      gambar:
        'https://w7.pngwing.com/pngs/1000/644/png-transparent-google-maps-google-search-google-map-maker-computer-icons-map-angle-search-engine-optimization-map.png',
      title: 'Park Management',
      desc: 'Memberikan informasi lokasi lahan parkir yang tersedia',
    },
    {
      id: 'background2',
      gambar:
        'https://w7.pngwing.com/pngs/1000/644/png-transparent-google-maps-google-search-google-map-maker-computer-icons-map-angle-search-engine-optimization-map.png',
      title: 'Vehicle Counter',
      desc: 'Menampilkan informasi jumlah lahan parkir yang tersedia',
    },
    {
      id: 'background3',
      gambar:
        'https://w7.pngwing.com/pngs/1000/644/png-transparent-google-maps-google-search-google-map-maker-computer-icons-map-angle-search-engine-optimization-map.png',
      title: '24-hours of Service',
      desc: 'Tempat parkir dapat digunakan 24 jam dengan biaya per jam',
    },
  ];

  return (
    <>
      <div style={({ textAlign: 'center' }, { padding: '5% 10%' })}>
        <h1>Check out these EPIC Destinations!</h1>
        <CardDeck>
          {listData.map((pic) => {
            return (
              // <div className="edu-content">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={pic.gambar} alt={pic.id} />
                <Card.Body>
                  <Card.Title>{pic.title}</Card.Title>
                  <Card.Text>{pic.desc}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardDeck>
        {/* <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </Card.Text>
        </Card.Body> */}
      </div>
      {/* <div className="cards">
        <div className="cards__container">
          <div className="cards__wrapper">
            {listData.map((pic) => {
              return (
                // <div className="edu-content">
                <img className="content-Pic" src={pic.gambar} alt={pic.id} />
                // </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </>
  );
}

export default HomeContent;
