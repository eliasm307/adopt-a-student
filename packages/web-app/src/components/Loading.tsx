import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => (
  <div
    style={{
      display: "grid",
      placeItems: "center",
      width: "100%",
      height: "100%",
    }}
  >
    <Spinner animation='border' />
  </div>
);

export default Loading;
