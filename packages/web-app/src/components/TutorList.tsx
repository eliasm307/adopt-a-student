import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';

import { PublicTutorData } from '@adopt-a-student/common';

import TutorListItem from './TutorListItem';

interface Props {
  className?: string;
  tutors: PublicTutorData[];
}

const TutorList = ({ tutors, className }: Props) => {
  const itemsJsx = tutors.map((tutor) => (
    <Col sm={6} md={3} lg={2}>
      <TutorListItem tutor={tutor} />
    </Col>
  ));

  return <Row>{itemsJsx}</Row>;
};

export default TutorList;
