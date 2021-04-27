import React from 'react';
import { Badge, Button, Card, Col, Image, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import { toast } from 'react-toastify';

import {
  localeEnglishNames, PrivateStudentData, PublicStudentData, PublicTutorData,
} from '@adopt-a-student/common';

import { usePrivateStudentData } from '../providers/PrivateStudentDataProvider';
import { linkStudentAndTutor } from '../utils/api';

interface Props {
  studentId: string;
  tutor: PublicTutorData;
  updateStudent: (updates: Partial<PrivateStudentData>) => void;
}

// todo card should show count of students the teacher has

const TutorListItem = ({ tutor, studentId, updateStudent }: Props) => {
  const {
    id,
    available,
    imageUrl,
    introduction,
    userName,
    prefferedCountries,
    prefferedLocales,
  } = tutor;

  const languageItems = prefferedLocales.map((tutorLocale) => {
    const name = Object.keys(localeEnglishNames[tutorLocale])[0];

    return (
      <Badge
        variant='light'
        style={{
          marginLeft: "8px",
          padding: "8px",
          border: "1px solid --primary",
        }}
      >
        {name}
      </Badge>
    );
  });

  return (
    <>
      <Row>
        <Col sm={3}>
          <Image
            fluid
            src={imageUrl || undefined}
            roundedCircle
            style={{
              width: "clamp(100px, 100%, 300px) !important",
              border: "3px solid #33C4B3",
            }}
          />
        </Col>
        <Col>
          <h3>{userName}</h3>
          <div>
            {available && <strong>Available</strong>}
            {languageItems}
          </div>
          <div>{introduction}</div>
        </Col>
      </Row>

      <Row className='spacer-for-buttons' style={{ height: "50px" }} />
      <Row
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          padding: "0 10px",
          margin: 0,
          height: "40px",
          width: "100%",
        }}
        className='row'
      >
        <Button
          className='col'
          variant='outline-primary'
          onClick={() => toast.warn("Not yet implemented")}
        >
          Message
        </Button>
        <div className='mx-1' />
        <Button
          className='col'
          variant='outline-primary'
          onClick={async () => {
            toast.warn("Not yet implemented");
            // return;

            // todo implement
            /*
            const result = await linkStudentAndTutor({
              studentId,
              tutorId: id,
            });

            if (result) {
              // todo tutor data should also update for this specific tutor
              const { student: updatedStudent, tutor: updatedTutor } = result;
              updateStudent(updatedStudent);
              toast.info(`You are now following ${userName}`);
            } else {
              toast.error("There was an error following this teacher");
            }
            */
          }}
        >
          Follow
        </Button>
      </Row>
    </>
  );
};

export default TutorListItem;
