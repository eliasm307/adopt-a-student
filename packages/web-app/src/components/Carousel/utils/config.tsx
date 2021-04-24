import React from 'react';

import { CarouselCustomProps } from '../declarations/interfaces';
import { RenderArrowNext, RenderArrowPrev } from '../declarations/types';
import Arrow from '../sub-components/Arrow';

const RenderCarouselArrowNext: RenderArrowNext = (
  onClickHandler,
  hasArrow,
  label
) => (
  <Arrow
    isPrev={false}
    onClickHandler={onClickHandler}
    hasArrow={hasArrow}
    label={label}
  />
);

const RenderCarouselArrowPrev: RenderArrowPrev = (
  onClickHandler,
  hasArrow,
  label
) => (
  <Arrow
    isPrev
    onClickHandler={onClickHandler}
    hasArrow={hasArrow}
    label={label}
  />
);

const CarouselConfigProps: CarouselCustomProps = {
  showArrows: true,
  showStatus: true,
  showIndicators: false,
  infiniteLoop: true,
  showThumbs: true,
  useKeyboardArrows: true,
  autoPlay: true,
  stopOnHover: true,
  swipeable: true,
  dynamicHeight: false,
  emulateTouch: true,
  thumbWidth: 60,
  selectedItem: 0,
  interval: 3000,
  transitionTime: 500,
  swipeScrollTolerance: 5,
  renderArrowPrev: RenderCarouselArrowPrev,
  renderArrowNext: RenderCarouselArrowNext,
  statusFormatter: (current, total) => `${current} / ${total}`,
  // onChange: (index, item) => console.log(__filename, "onChange", { index, item }),
};

export default CarouselConfigProps;
