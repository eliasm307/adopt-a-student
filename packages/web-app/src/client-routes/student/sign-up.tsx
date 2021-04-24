// path to fully initialise student user but optional,
// ie they can leave the site and it wont break their experience when they come back
//
// todo use xstate to manage states

import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { Row } from 'react-bootstrap';

import Carousel from '../../components/Carousel';

const slidesJSX: React.ReactElement[] = [
  <div>item1</div>,
  <div>item2</div>,
  <div>item3</div>,
  <div style={{ width: "20%", height: "100%", objectFit: "cover" }}>
    <StaticImage
      src='../../../static/assets/student-signup-slide2.png'
      alt=''
    />
  </div>,
];

const slidesData: ImageSlideData[] = [
  {
    src: "../../../static/assets/student-signup-slide1.png",
    text: "Slide 1",
  },
  {
    src: "../../../static/assets/student-signup-slide2.png",
    text: "Slide 2",
  },
];

interface ImageSlideData {
  src: string;
  text: string;
  title?: string;
}

const slidesContentJsx = slidesData.map(({ src, text, title }) => (
  <div style={{ width: "20%", height: "100%", objectFit: "cover" }}>
    <StaticImage src={src} alt='' />
  </div>
));

const img = `../../../../../static/assets/student-signup-slide2.png`;

const StudentSignUp = () => {
  return (
    <>
      <h1>Student Sign up</h1>

      <div>
        <Carousel>{slidesJSX}</Carousel>
      </div>
      <div>
        <Carousel>{slidesContentJsx}</Carousel>
      </div>
    </>
  );
};

export default StudentSignUp;
