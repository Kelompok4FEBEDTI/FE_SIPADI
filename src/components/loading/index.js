import React from 'react';
// import { Spinner } from 'react-bootstrap';
const Loading = () => {
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     margin: '40px',
    //     backgroundColor: 'rgb(255, 255, 255, 0.4)',
    //     borderRadius: '100',
    //   }}
    // >
    //   <Spinner
    //     style={{ width: '20px', height: '20px' }}
    //     animation="grow"
    //     variant="info"
    //   />
    //   <Spinner
    //     style={{ width: '20px', height: '20px' }}
    //     animation="grow"
    //     variant="dark"
    //   />
    //   <Spinner
    //     style={{ width: '20px', height: '20px' }}
    //     animation="grow"
    //     variant="info"
    //   />
    //   <Spinner
    //     style={{ width: '20px', height: '20px' }}
    //     animation="grow"
    //     variant="dark"
    //   />
    //   <Spinner
    //     style={{ width: '20px', height: '20px' }}
    //     animation="grow"
    //     variant="info"
    //   />
    //   <Spinner
    //     style={{ width: '20px', height: '20px' }}
    //     animation="grow"
    //     variant="dark"
    //   />
    //   <Spinner
    //     style={{ width: '20px', height: '20px' }}
    //     animation="grow"
    //     variant="info"
    //   />
    //   <Spinner
    //     style={{ width: '20px', height: '20px' }}
    //     animation="grow"
    //     variant="dark"
    //   />
    // </div>
    <div
      style={{
        // display: 'flex',
        justifyContent: 'center',
        // margin: '40px',
        backgroundColor: 'rgb(255, 255, 255, 0.3)',
        borderRadius: '100',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* <lottie-player
        src="https://assets1.lottiefiles.com/packages/lf20_mdbdc5l7.json"
        background="transparent"
        speed="1"
        style={{ width: '400px', height: '400px' }}
        loop
        // controls
        autoplay
      /> */}
      <lottie-player
        src="https://assets6.lottiefiles.com/packages/lf20_ttzb2nok.json"
        background="transparent"
        speed="1"
        style={{ width: '300px', height: '300px' }}
        loop
        autoplay
      />
    </div>
  );
};

export default Loading;
