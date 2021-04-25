import { Link } from 'gatsby';
import React from 'react';
import { Button } from 'react-bootstrap';

import { navigate } from '@reach/router';

import { NavBarLinkData } from '../../declarations/interfaces';
import { useAuthData } from '../../hooks';

interface Props {
  links?: NavBarLinkData[];
  title: string;
}

export default function NavBar({ links, title }: Props) {
  const user = useAuthData();
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
    links.map(({ text, action, route: url }) => {
      if (action)
        return (
          <Button type='Button' onClick={action} key={`${text}-${url || ""}`}>
            {text}
          </Button>
        );
      if (url)
        return (
          <Button key={`${url}-${text || ""}`} onClick={() => navigate(url)}>
            {text}
          </Button>
        );
      return null;
    });
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
        height: "60px",
        padding: "auto",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <span>{title}</span>
      <nav>{linksJsx}</nav>
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
