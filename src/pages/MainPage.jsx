import { Container } from "@mui/material";
import React from "react";
import News from "../components/TodoList";

const MainPage = () => {
  return (
    <div>
      <Container>
        <h2>Main Page</h2>
        <News />
      </Container>
    </div>
  );
};

export default MainPage;
