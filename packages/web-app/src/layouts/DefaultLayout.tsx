import React from 'react';
import { GlobalStyles } from 'twin.macro';

const Layout = ({ children }: React.PropsWithChildren<any>) => (
  <>
    <GlobalStyles />
    {children}
  </>
);

export default Layout;
