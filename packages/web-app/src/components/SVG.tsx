import React from 'react';
import { ReactSVG } from 'react-svg';

interface Props {
  path: string;
}

const SVG = ({ path }: Props) => (
  <ReactSVG
    src={path}
    className=' '
    style={{ margin: "auto", padding: "auto" }}
  />
);

export default SVG;
