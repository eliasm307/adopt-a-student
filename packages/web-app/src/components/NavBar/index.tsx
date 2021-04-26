import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { Button, Navbar } from 'react-bootstrap';

import styled from '@emotion/styled';
import { navigate } from '@reach/router';

import { NavBarLinkData } from '../../declarations/interfaces';
import { useAuthData } from '../../hooks';

interface Props {
  links?: NavBarLinkData[];
  title: string;
}

const NavBarItem = styled(Button)`
  margin-left: 5px;
`;

export default function NavBar({ links, title }: Props) {
  // const user = useAuthData();
  // let greetingMessage = "";
  /*
  if (user) {
    greetingMessage = `Hello ${user.displayName}`;
  } else {
    greetingMessage = "You are not logged in";
  }
  */

  const linksJsx =
    links &&
    links.map(({ text, action, route: url, variant = "outline-primary" }) => {
      if (action)
        return (
          <NavBarItem
            type='Button'
            variant={variant}
            onClick={action}
            key={`${text}-${url || ""}`}
          >
            {text}
          </NavBarItem>
        );
      if (url)
        return (
          <NavBarItem
            variant={variant}
            key={`${url}-${text || ""}`}
            onClick={() => navigate(url)}
          >
            {text}
          </NavBarItem>
        );
      return null;
    });
  return (
    <div style={{ height: "60px", zIndex: 10 }}>
      <div
        style={{
          left: "0",
          width: "100%",
          top: "0",
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flex: "1",
          justifyContent: "space-between",
          borderBottom: "1px solid #d1c1e0",
          height: "60px",
          margin: 0,
          padding: "10px",
          boxShadow: "0px 5px 5px 0px rgb(0 0 0 / 10%)",
        }}
      >
        <StaticImage
          src='../../../static/assets/logo-only.png'
          alt='logo'
          style={{
            width: "40px",
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
          }}
          imgStyle={{}}
        />
        <span
          style={{ marginLeft: "50px", fontSize: "1.9em", lineHeight: "60px" }}
        >
          {title}
        </span>
        <nav>{linksJsx}</nav>
      </div>
    </div>
  );
}

// todo delete
/*
  {}
        <Link to='/'>Home</Link>
        {` `}
        <Link to={RoutePath.Profile}>Profile</Link>
        {linksJsx}
        {` `}
        {user ? (
          <a
            href='/'
            onClick={(event) => {
              event.preventDefault();
              signOut();
            }}
          >
            Logout
          </a>
        ) : null}

*/
