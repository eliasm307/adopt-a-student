import "../style/global.scss";

import React from "react";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";

const AppLayout = ({ children }: React.PropsWithChildren<any>) => (
  <>
    <Container fluid style={{ padding: 0, margin: 0 }}>
      {children}
    </Container>
    <ToastContainer
      autoClose={3000}
      pauseOnHover
      limit={2}
      position='bottom-center'
      style={{ marginBottom: 20 }}
    />
  </>
);

export default AppLayout;
