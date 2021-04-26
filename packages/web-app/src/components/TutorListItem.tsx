import React from 'react';
import { Badge, Button, Card, Col, Image, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';

import { localeEnglishNames, PublicTutorData } from '@adopt-a-student/common';

interface Props {
  className?: string;
  tutor: PublicTutorData;
}

// todo add a dummy contact button

const TutorListItem = ({ tutor, className }: Props) => {
  const {
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
      {false && (
        <div
          style={{
            position: "relative",
            bottom: 0,
            paddingTop: "auto",
            height: "100%",
          }}
        >
          <Col className='debug'>
            <Button style={{ bottom: 0 }}>Action</Button>
          </Col>
        </div>
      )}
    </>
  );
};

export default TutorListItem;
