// path to fully initialise student user but optional,
// ie they can leave the site and it wont break their experience when they come back
//
// todo use xstate to manage states

import React from 'react';
import useAuthData from 'src/hooks/useAuthData';

import Carousel from '../../components/Carousel';

const slidesJSX: React.ReactElement[] = [
  <div>item1</div>,
  <div>item2</div>,
  <div>item3</div>,
];

const StudentSignUp = () => {
  const user = useAuthData();

  return (
    <>
      <h1>Sign up</h1>
      <Carousel>{slidesJSX}</Carousel>
    </>
  );
};

export default StudentSignUp;
