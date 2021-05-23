import React from "react";
import { useAuth } from "../../hooks/auth";
import logoImg from "../../assets/rocket.png";
import { BiCookie } from "react-icons/bi";
import { FiPower } from "react-icons/fi";

import { Container, HeaderContent, Profile, Menu } from "./styles";

const Header = ({ children }) => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <Profile>
          <img src={logoImg} alt="engaj!" />
          <div>
            <span>Bem vindo,</span>
            <p>{user.name}</p>
            <strong
              style={{
                justifySelf: "center",
                display: "flex",
                alignItems: "flex-end",
                marginTop: "10px",
              }}
            >
              <BiCookie size={24} color="#ff9000" />
              <strong style={{ paddingLeft: "8px" }}>{user.balance}</strong>
            </strong>
          </div>
        </Profile>
        <Menu>{children}</Menu>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </Container>
  );
};

export default Header;
