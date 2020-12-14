import React from 'react';
import { setCookie } from '../../utils/cookie';

const Logoout = () => {
  const hapusCookie = (e) => {
    e.preventDefault();
    setCookie('userData', '', -1);
    setCookie('token', '', -1);
    window.location.replace('/');
  };

  return (
    <>
      <button onClick={hapusCookie} type="button" className="btn btn-danger">
        Logout
      </button>
    </>
  );
};

export default Logoout;
