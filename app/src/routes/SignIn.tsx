import {
  Button,
  Center,
  Container,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router";

import useForm from "../components/form/useForm";

export default () => {
  const navigate = useNavigate();

  const { actions, errors, onSubmit, values } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = () => {
    navigate("/home/questionnaires");
  };

  return (
    <Container size="xs">
      <Center>
        <Title order={3}>Sign in </Title>
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
          />
          <TextInput
            label="Password"
            value={values.password}
            error={errors.password.error}
            onChange={(event) =>
              actions.password.update({ value: event.currentTarget.value })
            }
            type="password"
          />
          <Button type="submit">Sign in</Button>
        </Stack>
      </form>
    </Container>
  );
};
