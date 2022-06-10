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
              type: "text",
              name: "email",
              label: "Email",
              initialValue: "",
              validator: (value) =>
                !value ? "Email field must not be empty" : null,
              required: true,
            },
            {
              type: "custom",
              name: "password",
              label: "Password",
              initialValue: ["test"],
              validator: (value) =>
                !value ? "Password field must not be empty" : null,
              component: null,
            },
          ]}
          handleSubmit={handleSubmit}
          submitText="Sign in"
        />
      </Stack>
    </Container>
  );
};
