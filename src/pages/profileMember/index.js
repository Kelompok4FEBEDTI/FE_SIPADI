import React, { useState, useEffect } from 'react';
import { memberService } from '../../services';

const ProfileMember = () => {
  const [dataMember, setDataMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    memberService
      .viewMember()
      .then((res) => {
        setDataMember(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {error && <p>{error}</p>}
      <h3>Profile Member</h3>
      {loading && <p>Loading...</p>}
      {dataMember.map((e, index) => {
        return (
          <p>
            {index + 1}
            .
            {e.username_member}
          </p>
        );
      })}
    </div>
  );
};

export default ProfileMember;
