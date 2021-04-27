import React from "react";
import { Badge, Button, Card, Col, Image, Row } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";

import { localeEnglishNames, PublicTutorData } from "@adopt-a-student/common";

interface Props {
  tutor: PublicTutorData;
}

// todo add a dummy contact button

const TutorListItem = ({ tutor }: Props) => {
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
          onClick={() => toast.warn("Not yet implemented")}
        >
          Follow
        </Button>
      </Row>
    </>
  );
};

export default TutorListItem;
