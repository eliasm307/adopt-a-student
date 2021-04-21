// users choose what role they want to use the app in for this session

import { navigate } from 'gatsby';
import React, { useContext } from 'react';
import { UserContext } from 'src/providers/UserProvider';

// todo shows public data

// ! shows private data

const RoleSelect = () => {
  const { setUserRole, user } = useContext(UserContext);

  if (user?.role) navigate("/app/home");

  const pathStyle: React.CSSProperties = {
    padding: "50px",
    border: "1px solid red",
  };

  return (
    <>
      <h1>Select a role: {typeof user?.role}</h1>
      <div>
        <button
          type='button'
          style={pathStyle}
          onClick={(e) => {
            alert("student");
            setUserRole("Student");
          }}
        >
          Student
        </button>
        <button
          type='button'
          style={pathStyle}
          onClick={() => setUserRole("Tutor")}
        >
          Tutor
        </button>
      </div>
    </>
  );
};

export default RoleSelect;
