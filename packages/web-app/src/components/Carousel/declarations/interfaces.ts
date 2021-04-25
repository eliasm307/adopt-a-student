// originally cloned from https://github.com/leandrowd/react-responsive-carousel/blob/master/src/components/Carousel/types.ts

import { RenderThumbs } from './types';

export interface AnimationHandlerResponse {
  itemListStyle?: React.CSSProperties;
  prevStyle?: React.CSSProperties;
  selectedStyle?: React.CSSProperties;
  slideStyle?: React.CSSProperties;
}

export type AnimationHandler = (
  props: CarouselCustomProps,
  state: CarouselState
) => AnimationHandlerResponse;

export type SwipeAnimationHandler = (
  delta: {
    x: number;
    y: number;
  },
  props: CarouselCustomProps,
  state: CarouselState,
  setState: (...args: any) => any
) => AnimationHandlerResponse;

export type StopSwipingHandler = (
  props: CarouselCustomProps,
  state: CarouselState
) => AnimationHandlerResponse;

export interface CarouselCustomProps {
  animationHandler?: "slide" | "fade" | AnimationHandler;
  autoFocus?: boolean;
  autoPlay?: boolean;
  axis?: "horizontal" | "vertical";
  centerMode?: boolean;
  centerSlidePercentage?: number;
  children?: React.ReactChild[];
  className?: string;
  dynamicHeight?: boolean;
  emulateTouch?: boolean;
  infiniteLoop?: boolean;
  interval?: number;
  labels?: {
    leftArrow: string;
    rightArrow: string;
    item: string;
  };
  onChange?: (index: number, item: React.ReactNode) => void;
  onClickItem?: (index: number, item: React.ReactNode) => void;
  onClickThumb?: (index: number, item: React.ReactNode) => void;
  onSwipeEnd?: (event: React.TouchEvent) => void;
  onSwipeMove?: (event: React.TouchEvent) => boolean;
  onSwipeStart?: (event: React.TouchEvent) => void;
  preventMovementUntilSwipeScrollTolerance?: boolean;
  renderArrowNext?: (
    clickHandler: () => void,
    hasNext: boolean,
    label: string
  ) => React.ReactNode;
  renderArrowPrev?: (
    clickHandler: () => void,
    hasPrev: boolean,
    label: string
  ) => React.ReactNode;
  renderIndicator?: (
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string
  ) => React.ReactNode;
  /*
  // ! causes errors
  renderItem?: (
    item: React.ReactNode,
    options?: { isSelected: boolean; isPrevious: boolean }
  ) => React.ReactNode;
  */
  renderThumbs?: RenderThumbs;
  selectedItem?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  showStatus?: boolean;
  showThumbs?: boolean;
  statusFormatter?: (currentItem: number, total: number) => string;
  stopOnHover?: boolean;
  stopSwipingHandler?: StopSwipingHandler;
  swipeAnimationHandler?: SwipeAnimationHandler;
  swipeScrollTolerance?: number;
  swipeable?: boolean;
  thumbWidth?: number;
  transitionTime?: number;
  useKeyboardArrows?: boolean;
  verticalSwipe?: "natural" | "standard";
  width?: number | string;
}

export interface CarouselState {
  autoPlay?: boolean;
  cancelClick: boolean;
  hasMount: boolean;
  initialized: boolean;
  isMouseEntered: boolean;
  itemListStyle?: React.CSSProperties;
  itemSize: number;
  prevStyle?: React.CSSProperties;
  previousItem: number;
  selectedItem: number;
  selectedStyle?: React.CSSProperties;
  slideStyle?: React.CSSProperties;
  swipeMovementStarted: boolean;
  swiping?: boolean;
}
