import React from 'react';

import SVG from '../SVG';

interface Props {
  hideTextImage?: boolean;
}

const FormHeaderGraphic = ({ hideTextImage }: Props) => {
  return (
    <div
      className=''
      style={{
        width: "100%",
        padding: "40px auto",
        margin: "auto",
        display: "grid",
        placeItems: "center",
      }}
    >
      <SVG path='/assets/logo-with-text.svg' />
      {!hideTextImage && (
        <SVG path='/assets/connecting_students_and_teachers.svg' />
      )}
    </div>
  );
};

export const LogoWithTextGraphic = () => {
  return (
    <div
      className=''
      style={{
        width: "100%",
        padding: "40px auto",
        margin: "auto",
        display: "grid",
        placeItems: "center",
      }}
    >
      <SVG path='/assets/logo-with-text.svg' />
    </div>
  );
};

export const ConnectingStudentsAndTeachersGraphic = () => {
  return (
    <div
      className=''
      style={{
        width: "100%",
        padding: "40px auto",
        margin: "auto",
        display: "grid",
        placeItems: "center",
        position: "relative",
      }}
    >
      <SVG path='/assets/connecting_students_and_teachers.svg' />
    </div>
  );
};

export default FormHeaderGraphic;
