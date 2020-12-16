import React, { useState, useEffect } from 'react';

const LoginMembeR = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    setUsername('ichlas');
    setPassword('1234');
  }, [username]);

  return (
    <div>
      <h3>
        Login Member,
        {username}
        {password}
      </h3>
    </div>
  );
};

export default LoginMembeR;
