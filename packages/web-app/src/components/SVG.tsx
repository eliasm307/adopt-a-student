import React from 'react';
import { ReactSVG } from 'react-svg';

interface Props {
  className?: string;
  path: string;
}

const SVG = ({ path, className }: Props) => (
  <ReactSVG src={path} className={className} style={{}} />
);

export default SVG;
