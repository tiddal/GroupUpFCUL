import React from "react";

import { useAuth } from "../../../hooks";

import { Container } from "./styles";
import { useTheme } from "../../../hooks";

import Navigation from "../../../components/Navigation";
import Separator from "../../../components/Separator";

import { FaBook } from "react-icons/fa";

function Dashboard() {
  const { logout } = useAuth();
  const { toggleTheme } = useTheme();

  const renderCadeiras = () => {};

  return (
    <Container>
      <Navigation
        items={[{ icon: <FaBook />, name: "Alunos", path: "/students" }]}
      />
      <h1>Dashboard</h1>
      <Separator texto="Informação"></Separator>
      <Separator texto="Cadeiras"></Separator>
      <Separator texto="Dúvidas"></Separator>
      <button onClick={logout}>Logout</button>
      <button onClick={toggleTheme}>Mudar tema</button>
    </Container>
  );
}

export default Dashboard;
