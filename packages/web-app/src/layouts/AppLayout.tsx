import "../style/global.scss";

import React from "react";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";

const AppLayout = ({ children }: React.PropsWithChildren<any>) => (
  <>
    <Container fluid style={{ padding: 0, margin: 0 }}>
      {children}
    </Container>
    <ToastContainer />
  </>
);

export default AppLayout;
