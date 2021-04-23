// users choose what role they want to use the app in for this session

import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { RoutePath } from 'src/constants';
import { UserContext } from 'src/providers/UserProvider';

import SVG from '../../components/SVG';

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
    <Row noGutters className='debug'>
      <Col
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <button
          type='button'
          style={pathStyle}
          onClick={() => {
            setUserRole("Tutor");
            navigate(RoutePath.Home);
          }}
        >
          <SVG path='../../../static/assets/tutor-role.svg' />
          Tutor
        </button>
      </Col>
      <Col
        md={12}
        lg={1}
        className='debug'
        style={{
          display: "grid",
          placeItems: "center",
          minWidth: "150px",
        }}
      >
        <div
          style={{
            display: "grid",
            placeItems: "center",
            background: `rgba(0,0,0,0.1)`,
            borderRadius: `100%`,
            padding: `50px`,
          }}
        >
          <StaticImage src='/assets/logo-only.png' alt='' />
        </div>
      </Col>
      <Col
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <button
          type='button'
          style={pathStyle}
          onClick={() => {
            setUserRole("Student");
            navigate(RoutePath.Home);
          }}
        >
          <SVG path='/assets/student-role.svg' />
          Student
        </button>
      </Col>
    </Row>
  );
};

export default RoleSelect;
