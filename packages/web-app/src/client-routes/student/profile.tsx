// allows setting user subjects
// allows seeing related tutors
// allows seeing and editting existing relationship data and removing them
// allows editting edittable data

import React from "react";
import { Badge, Col, Image, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import { localeEnglishNames } from "@adopt-a-student/common";

import StudentProfileForm from "../../components/StudentProfileForm";
import { usePrivateStudentData } from "../../providers/PrivateStudentDataProvider";
import { updateStudentUser } from "../../utils/api";

const StudentProfile = () => {
  const {
    userPrivateStudentData,
    setUserPrivateStudentData,
  } = usePrivateStudentData();

  if (!userPrivateStudentData) {
    console.error("student-profile", "private student data was null");
    return <div>There was an error </div>;
  }

  const {
    userName,
    imageUrl,
    prefferedLocales,
    introduction,
  } = userPrivateStudentData;

  /*
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
  */
  return (
    <Row className='justify-content-md-center mt-4'>
      <Col lg={4}>
        <StudentProfileForm
          existingData={userPrivateStudentData}
          title='Edit your profile'
          onValidSubmit={async (data) => {
            const student = (await updateStudentUser(data))?.result;

            if (student) {
              toast.info("Changes saved 💾");
            } else {
              toast.error("There was an issue saving your changes 😢");
            }
            return student || null;
          }}
          setUserPrivateStudentData={setUserPrivateStudentData}
        />
      </Col>
      <Col
        lg={4}
        className='justify-contents-center'
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Row>
          <h2>My Subjects</h2>
          <div>TBC</div>
        </Row>
      </Col>
      <Col
        lg={4}
        className='justify-contents-center'
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Row>
          <h2>My Teachers</h2>
          <div>TBC</div>
        </Row>
      </Col>
    </Row>
  );
};

export default StudentProfile;
