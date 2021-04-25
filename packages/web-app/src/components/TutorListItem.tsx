import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';

import { PublicTutorData } from '@adopt-a-student/common';

interface Props {
  className?: string;
  tutor: PublicTutorData;
}

const TutorListItem = ({ tutor, className }: Props) => {
  const { available, imageUrl, introduction, userName } = tutor;

  return (
    <>
      <Card body className='col'>
        <Row>
          <Col md={2}>
            <Image src={imageUrl || undefined} roundedCircle />
          </Col>
          <Col>{userName}</Col>
        </Row>
        <Row>{introduction}</Row>
      </Card>
    </>
  );
};

export default TutorListItem;
