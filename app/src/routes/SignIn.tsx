import { Center, Container, Stack, Title } from "@mantine/core";
import { useNavigate } from "react-router";

import FormPage from "../components/form/FormPage";

export default () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/home/questionnaires");
  };

  return (
    <Container size="xs">
      <Center>
        <Title order={3}>Sign in </Title>
      </Center>
      <Stack>
        <FormPage
          fields={[
            {
              name: "email",
              label: "Email",
              initalValue: "",
              validator: (value) =>
                !value ? "Email field must not be empty" : null,
              required: true,
            },
            {
              name: "password",
              label: "Password",
              initalValue: "",
              validator: (value) =>
                !value ? "Password field must not be empty" : null,
              required: true,
            },
          ]}
          handleSubmit={handleSubmit}
          submitText="Sign in"
        />
      </Stack>
    </Container>
  );
};
