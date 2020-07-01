import React from "react";
import { useAuth, useYear } from "../../hooks";

import { Container, Menu, Logo, User, UserAvatar, UserName } from "./styles";

import logo from "../../assets/logo_icon_white.svg";

import { FaBars } from "react-icons/fa";

function Navbar({ toggleSidebar, setProfileBarState, profileBarState }) {
  const { user } = useAuth();
  const { yearList, changeYear, selectedYear } = useYear();

  return (
    <Container>
      <Menu onClick={toggleSidebar}>
        <FaBars />
      </Menu>
      <Logo to="/">
        <img src={logo} alt="Group Up Logo" />
      </Logo>

      {user.role === "admin" && (
        <select
          value={selectedYear}
          onChange={({ target }) => changeYear(target.value)}
        >
          {Object.keys(yearList).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )}
      <User onMouseDown={setProfileBarState} disabled={profileBarState}>
        <UserName>{user.first_name}</UserName>
        <UserAvatar>
          {user.avatar ? (
            <img src={user.avatar} alt="foto de perfil" />
          ) : (
            <div>
              <span>{user.first_name.charAt(0)}</span>
            </div>
          )}
        </UserAvatar>
      </User>
    </Container>
  );
}

export default Navbar;
