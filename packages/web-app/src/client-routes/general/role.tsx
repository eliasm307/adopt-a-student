// users choose what role they want to use the app in for this session

import { navigate } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import { UserContext } from 'src/providers/UserProvider';

// todo shows public data

// ! shows private data

const RoleSelect = () => {
  const { setUserRole, user } = useContext(UserContext);

  useEffect(() => {
    navigate("/app");
  }, [user.role]);

  const pathStyle: React.CSSProperties = {
    padding: "50px",
    border: "1px solid red",
  };

  return (
    <>
      <h1>Select a role</h1>
      <div>
        <div style={pathStyle} onClick={() => setUserRole("Student")}>
          Student
        </div>
        <div style={pathStyle} onClick={() => setUserRole("Tutor")}>
          Tutor
        </div>
      </div>
    </>
  );
};

export default RoleSelect;
