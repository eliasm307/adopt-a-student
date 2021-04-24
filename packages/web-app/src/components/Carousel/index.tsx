import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import clsx from 'clsx';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { Carousel } from 'react-responsive-carousel';

import { CarouselCustomProps } from './declarations/interfaces';
import CarouselConfigProps from './utils/config';

interface Props
  extends CarouselCustomProps,
    Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "onChange"> {
  children: React.ReactChild[];
  className?: string;
}

const MyCarousel = ({
  className,
  children,
  renderThumbs,
  ...restProps
}: Props) => {
  return (
    <Row noGutters className='debug'>
      <Carousel
        className={clsx("carousel-container col", className)}
        renderThumbs={renderThumbs}
        {...CarouselConfigProps}
        {...restProps}
      >
        {children}
      </Carousel>
    </Row>
  );
};

export default MyCarousel;
