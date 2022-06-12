import {
  Button,
  Center,
  Container,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router";

import FormPage from "../components/form/FormPage";
import useForm from "../components/form/useForm";

export default () => {
  const navigate = useNavigate();

  const { values, actions, errors, onSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validation: {
      email: (value) => (!value ? "Email required" : null),
      password: (value) => {
        if (!value) return "Password required";
        if (value.length < 8) return "Password must be at least 8 characters";

        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Password fields must match" : null,
    },
  });

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
      <form
        noValidate
        style={{ flex: 1 }}
        onSubmit={(event) => onSubmit(event, handleSubmit)}
      >
        <Stack>
          <TextInput
            label="Email"
            value={values.email}
            error={errors.email.error}
            onChange={(event) =>
              actions.email.update({ value: event.currentTarget.value })
            }
            required
          />
          <TextInput
            label="Password"
            value={values.password}
            error={errors.password.error}
            onChange={(event) =>
              actions.password.update({ value: event.currentTarget.value })
            }
            required
            type="password"
          />
          <TextInput
            label="Confirm password"
            value={values.confirmPassword}
            error={errors.confirmPassword.error}
            onChange={(event) =>
              actions.confirmPassword.update({
                value: event.currentTarget.value,
              })
            }
            required
            type="password"
          />
          <Button type="submit">Sign up</Button>
        </Stack>
      </form>
    </Container>
  );
};
