import { Container } from "@mantine/core";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export default () => {
  return (
    <>
      <NavBar />
      <Container
        sx={{ paddingInline: "2rem", paddingBlock: "2rem", margin: 0 }}
      >
        <Outlet />
      </Container>
    </>
  );
};
