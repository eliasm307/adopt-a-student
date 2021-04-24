import React from 'react';

import Image from '../Image';
import SVG from '../SVG';

interface Props {
  hideTextImage?: boolean;
}

const FormHeaderGraphic = ({ hideTextImage }: Props) => {
  return (
    <div
      className='  '
      style={{
        width: "100%",
        padding: "auto auto",
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

export default FormHeaderGraphic;
