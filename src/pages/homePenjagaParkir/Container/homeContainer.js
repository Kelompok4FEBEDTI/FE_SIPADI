import React from 'react';
import { Button } from 'react-bootstrap';
import './homeContainer.css';

function HomeContainer() {
  return (
    <>
      <div className="hero-container">
        {/* <video src="/videos/video-1.mp4" autoPlay loop muted /> */}
        <h1>SISTEM PARKIR DIGITAL</h1>
        <p>Tempat parkir aman andalanmu, asikkk eaaa</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            onClick={console.log('hey')}
          >
            WATCH TRAILER
            <i className="far fa-play-circle" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomeContainer;
