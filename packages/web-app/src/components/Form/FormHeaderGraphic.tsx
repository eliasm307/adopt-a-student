import React from 'react';

import Image from '../Image';

const FormHeaderGraphic = () => {
  return (
    <div
      className='rowx debug'
      style={{
        width: "100%",
        padding: "auto auto",
        margin: "auto",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Image src='logo-with-text.png' alt='Logo' />
      <Image
        src='connecting_students_and_teachers.png'
        alt='Connecting students and teachers text'
      />
      T
    </div>
  );
};

export default FormHeaderGraphic;
