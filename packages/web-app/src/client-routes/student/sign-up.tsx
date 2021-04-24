// path to fully initialise student user but optional,
// ie they can leave the site and it wont break their experience when they come back
//
// todo use xstate to manage states

import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { Row } from 'react-bootstrap';

import Carousel from '../../components/Carousel';
import Image from '../../components/Image';

const slidesData: ImageSlideData[] = [
  {
    src: "student-signup-slide1.png",
    text: "Slide 1",
  },
  {
    src: "student-signup-slide2.png",
    text: "Slide 2",
  },
  {
    src: "student-signup-slide3.png",
    text: "Slide 3",
  },
];

interface ImageSlideData {
  src: string;
  text: string;
  title?: string;
}

const imageHeight = "50vh";

const slidesContentJsx = slidesData.map(({ src, text, title }) => (
  <div
    key={src}
    style={{
      height: imageHeight,
      width: "auto",
      margin: "auto",
      position: "relative",
    }}
  >
    <Image
      src={src}
      alt=''
      className='debugx'
      imgStyle={{
        objectFit: "contain",
        maxHeight: imageHeight,
        objectPosition: "center center",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    />
  </div>
));

const StudentSignUp = () => {
  return (
    <>
      <h1>Student Sign up</h1>

      <div>
        <Carousel>{slidesContentJsx}</Carousel>
      </div>
    </>
  );
};

export default StudentSignUp;
