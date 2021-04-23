import '../style/global.scss';

import React from 'react';
import Container from 'react-bootstrap/Container';
import { GlobalStyles } from 'twin.macro';

import NavBar from '../components/NavBar';

const Layout = ({ children }: React.PropsWithChildren<any>) => (
  <Container fluid>
    <GlobalStyles />
    {children}
  </Container>
);

export default Layout;
