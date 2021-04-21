import { Link } from 'gatsby';
import React from 'react';
import useAuthData from 'src/hooks/useAuthData';
import { signOut } from 'src/services/auth';

export default function NavBar() {
  const user = useAuthData();
  let greetingMessage = "";
  if (user) {
    greetingMessage = `Hello ${user.displayName}`;
  } else {
    greetingMessage = "You are not logged in";
  }
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      <span>{greetingMessage}</span>
      <nav>
        <Link to='/'>Home</Link>
        {` `}
        <Link to='/app/profile'>Profile</Link>
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
