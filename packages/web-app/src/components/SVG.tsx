import React from 'react';
import { ReactSVG } from 'react-svg';

interface Props {
  path: string;
}

const SVG = ({ path }: Props) => <ReactSVG src={path} />;

export default SVG;
