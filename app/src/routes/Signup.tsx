import { Center, Container, Title } from "@mantine/core";
import { useNavigate } from "react-router";

import FormPage from "../components/form/FormPage";

export default () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/home/questionnaires");
  };

  return (
    <Container
      size="xs"
      sx={{
        padding: "1rem",
      }}
    >
      <Center>
        <Title order={3}>Sign up</Title>
      </Center>
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
          {
            name: "confirm-password",
            label: "Confirm password",
            initalValue: "",
            validator: (value, values) =>
              value !== values.password ? "Password fields don't match" : null,
            required: true,
          },
        ]}
        handleSubmit={handleSubmit}
        submitText="Sign up"
      />
    </Container>
  );
};
