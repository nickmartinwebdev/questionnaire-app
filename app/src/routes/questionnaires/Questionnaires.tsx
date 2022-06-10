import {
  Button,
  Center,
  Container,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";

export default () => {
  const [questionnaires, setQuestionnaires] = useState([
    "questionnaire_1",
    "questionnaire_2",
  ]);

  return (
    <Container>
      <Container>
        <Title order={3}>My questionnaires</Title>
        <Space h="md" />
        <Button component={Link} to="new">
          Create questionnaire{" "}
        </Button>
        <Stack>
          {questionnaires.map((questionnaire) => (
            <Text
              component={Link}
              to={questionnaire}
              sx={{
                width: "fit-content",
              }}
            >
              {questionnaire}
            </Text>
          ))}
        </Stack>
      </Container>
      <Outlet />
    </Container>
  );
};
