import { Center, Stack, Text, Title } from "@mantine/core";

export default () => {
  return (
    <Center>
      <Stack>
        <Title order={3}>New questionnaire</Title>
        <Text> Create your questionnaire by adding questions below:</Text>
      </Stack>
    </Center>
  );
};
