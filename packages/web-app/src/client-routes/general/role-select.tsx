// users choose what role they want to use the app in for this session

import { navigate } from 'gatsby';
import React, { useContext } from 'react';
import { RoutePath } from 'src/constants';
import { UserContext } from 'src/providers/UserProvider';

// todo shows public data

// ! shows private data

const RoleSelect = (props: any) => {
  const { setUserRole, user } = useContext(UserContext);

  /*
  if (user?.role) {
    navigate(RoutePath.home);
    console.log("role", "user role defined, navigating to home");
    return null;
  }
  */
  console.warn("role", "user role not defined, staying on role select screen");

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
            setUserRole("Student");
            navigate(RoutePath.Home);
          }}
        >
          Student
        </button>
        <button
          type='button'
          style={pathStyle}
          onClick={() => {
            setUserRole("Tutor");
            navigate(RoutePath.Home);
          }}
        >
          Tutor
        </button>
      </div>
    </>
  );
};

export default RoleSelect;
