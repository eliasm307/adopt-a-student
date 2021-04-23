import { Link } from 'gatsby';
import React, { MouseEventHandler } from 'react';
import { RoutePath } from 'src/constants';
import useAuthData from 'src/hooks/useAuthData';
import { signOut } from 'src/utils/auth';

import { NavBarLinkData } from '../declarations/interfaces';

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
    links.map(({ text, action, url }) => {
      if (action)
        return (
          <button type='button' onClick={action}>
            {text}
          </button>
        );
      if (url) return <Link to={url}>{text}</Link>;
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
      <nav>
        <Link to='/'>Home</Link>
        {` `}
        <Link to={RoutePath.profile}>Profile</Link>
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
      </nav>
    </div>
  );
}
