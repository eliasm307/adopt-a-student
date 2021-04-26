import '../style/global.scss';

import React from 'react';
import Container from 'react-bootstrap/Container';

const Layout = ({ children }: React.PropsWithChildren<any>) => (
  <Container fluid style={{ padding: 0, margin: 0 }}>
    {children}
  </Container>
);

export default Layout;
