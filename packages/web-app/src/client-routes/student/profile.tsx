// allows setting user subjects
// allows seeing related tutors
// allows seeing and editting existing relationship data and removing them
// allows editting edittable data

import React from 'react';
import { Badge, Col, Image, Row } from 'react-bootstrap';

import { localeEnglishNames } from '@adopt-a-student/common';

import { usePrivateStudentData } from '../../providers/PrivateStudentDataProvider';

const StudentProfile = () => {
  const { userPrivateStudentData: privateData } = usePrivateStudentData();

  if (!privateData) {
    console.error("student-profile", "private student data was null");
    return <div>There was an error </div>;
  }

  const { userName, imageUrl, prefferedLocales, introduction } = privateData;

  const languageItems = prefferedLocales.map((tutorLocale) => {
    const name = Object.keys(localeEnglishNames[tutorLocale])[0];

    return (
      <Badge
        variant='light'
        style={{
          marginLeft: "8px",
          padding: "8px",
        }}
      >
        {name}
      </Badge>
    );
  });

  const countryItems = prefferedLocales.map((country) => {
    return (
      <Badge
        variant='secondary'
        style={{
          marginLeft: "8px",
          padding: "8px",
        }}
      >
        {country}
      </Badge>
    );
  });
  return (
    <Row className='justify-content-md-center mt-4'>
      <Col
        lg={10}
        className='justify-contents-center'
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Row>
          <Col xs={4}>
            <Image
              fluid
              src={imageUrl || "/assets/logo-only.png"}
              roundedCircle
              style={{
                width: "clamp(200px, 100%, 300px) !important",
                border: "3px solid #33C4B3",
              }}
            />
          </Col>
          <Col>
            <h1>{userName}</h1>
          </Col>
        </Row>

        <Row>
          <h2>Introduction</h2>
          {introduction}
        </Row>
        <Row>
          <h2>Languages</h2>
          {languageItems}
        </Row>

        <Row>
          <h2>Countries</h2>
          {countryItems}
        </Row>
      </Col>
    </Row>
  );
};

export default StudentProfile;
