// path to fully initialise student user but optional,
// ie they can leave the site and it wont break their experience when they come back
//
// todo use xstate to manage states

import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { Row } from 'react-bootstrap';

import Carousel from '../../components/Carousel';
import Image from '../../components/Image';
import UserSignUpForm from '../../components/UserSignUpForm';

const slidesData: ImageSlideData[] = [
  {
    src: "student-signup-slide1.png",
    title: "Connect",
    text:
      "Adopt a Student allows you to connect and learn from teachers around the world ",
  },
  {
    src: "student-signup-slide2.png",
    title: "Learn",
    text:
      "Choose from hundreds of school subjects and we’ll find you a teacher to learn from   ",
  },
  {
    src: "student-signup-slide3.png",
    title: "Explore",
    text:
      "Learn for free art, science, maths, computer programming and more from teacher created courses",
  },
];

interface ImageSlideData {
  src: string;
  text: string;
  title: string;
}

const imageHeight = "50vh";

const slidesContentJsx = slidesData.map(({ src, text, title }) => (
  <>
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

    <h2>{title}</h2>
    <p style={{ paddingBottom: 50 }}>{text}</p>
  </>
));

slidesContentJsx.push(<UserSignUpForm />);

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
