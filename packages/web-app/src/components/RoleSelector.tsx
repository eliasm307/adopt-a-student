// users choose what role they want to use the app in for this session

import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { RoutePath } from "src/constants";
import { UserContext } from "src/providers/UserAuthProvider";

import styled from "@emotion/styled";

import { UserRoleContext } from "../providers/UserRoleProvider";
import log from "../utils/log";
import Image from "./Image";
import NavBar from "./NavBar";
import { SignOutNavbarLink } from "./NavBar/utils/navbarLinkItems";

export interface RoleSelectProps {
  /** Route to redirect to after role select */
  redirectAfterSelect?: RoutePath;
}

const RoleButton = styled.button`
  padding: 50px;
  border: none;
  background: transparent;
  div {
    border-radius: 500px;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const RoleSelector = ({ redirectAfterSelect: redirect }: RoleSelectProps) => {
  const { updateUserRole: setUserRole } = useContext(UserRoleContext);

  console.warn("role", "user role not defined, staying on role select screen");

  return (
    <>
      <Row noGutters>
        <Col
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <RoleButton
            type='button'
            onClick={() => {
              return toast.warn("Tutor route tbc");
              // todo implement
              /*
            setUserRole("Tutor");
            log(
              "RoleSelector",
              `Tutor Role selected, redirecting to ${String(redirect)}`
            );
            if (redirect) navigate(redirect);
            */
            }}
          >
            <StaticImage src='../../static/assets/tutor-role.png' alt='' />
          </RoleButton>
        </Col>
        <Col
          md={12}
          lg={1}
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              placeItems: "center",
              background: `rgba(0,0,0,0.1)`,
              borderRadius: `100%`,
              padding: `30px`,
            }}
          >
            <StaticImage src='../../static/assets/logo-only.png' alt='' />
          </div>
        </Col>
        <Col
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <RoleButton
            type='button'
            onClick={() => {
              log(
                "RoleSelector",
                `Student Role selected, redirecting to ${String(redirect)}`
              );
              setUserRole("Student");

              if (redirect) navigate(redirect);
            }}
          >
            <StaticImage src='../../static/assets/student-role.png' alt='' />
          </RoleButton>
        </Col>
      </Row>
    </>
  );
};

export default RoleSelector;
