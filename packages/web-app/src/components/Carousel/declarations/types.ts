import React from 'react';

export type RenderThumbs<
  P extends any = any,
  T extends string = string | "CarouselThumb"
> = (
  children: (React.ReactElement<P, T> | React.ReactChild)[]
) => React.ReactElement<P, T>[];

export type RenderArrowPrev = (
  clickHandler: () => void,
  hasPrev: boolean,
  label: string
) => React.ReactNode;

export type RenderArrowNext = (
  clickHandler: () => void,
  hasNext: boolean,
  label: string
) => React.ReactNode;
