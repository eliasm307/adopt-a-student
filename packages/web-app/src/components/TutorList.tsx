import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { PublicTutorData } from '@adopt-a-student/common';

import TutorListItem from './TutorListItem';

interface Props {
  className?: string;
  tutors: PublicTutorData[];
}

// className='col-sm-12 col-md-6 col-lg-4 col-xl-3'
// < className='m-2 p-2 debug col' style={{ minHeight: "200px" }}></Card>
const TutorList = ({ tutors }: Props) => {
  const itemsJsx = tutors.map((tutor) => (
    <Col sm={12} md={6} lg={6} xl={4} style={{ padding: "10px" }}>
      <Card
        body
        className='m-2'
        style={{
          height: "100%",
          position: "relative",
          boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.1)",
        }}
      >
        <TutorListItem tutor={tutor} />
      </Card>
    </Col>
  ));

  return <Row style={{ padding: "0 20px" }}>{itemsJsx}</Row>;
};

export default TutorList;
