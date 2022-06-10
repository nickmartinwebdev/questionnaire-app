import {
  Center,
  Stack,
  Title,
  Divider,
  TextInput,
  Textarea,
} from "@mantine/core";

import useForm from "../../components/form/useForm";
import QuestionEdit from "./components/QuestionEdit";
import QuestionTypeMenu from "./components/QuestionTypeMenu";
import { Question } from "./types";

export default () => {
  const { actions, values } = useForm({
    initialValues: {
      title: "",
      description: "",
      questions: [] as Question[],
    },
  });

  return (
    <Center sx={{ maxWidth: "500px", justifySelf: "center" }}>
      <Stack sx={{ width: "100%" }}>
        <TextInput
          label="Title"
          value={values.title}
          onChange={(event) =>
            actions.title.update({ value: event.currentTarget.value })
          }
          placeholder="The title for your questionnaire"
          required
        />
        <Textarea
          label="Description"
          value={values.description}
          onChange={(event) =>
            actions.description.update({ value: event.currentTarget.value })
          }
          minRows={6}
          placeholder="The description for your questionnarie"
        />
        <Divider />
        {values.questions.map((question, index) => (
          <Stack key={index}>
            <Title order={5}>{`Question ${index + 1}`}</Title>
            <QuestionEdit
              question={question}
              updateQuestion={(question) =>
                actions.questions.updateItem({ item: question, index })
              }
            />
            <Divider />
          </Stack>
        ))}
        <QuestionTypeMenu
          index={values.questions.length + 1}
          selectQuestionType={(question) =>
            actions.questions.addItem({ item: question })
          }
        />
      </Stack>
    </Center>
  );
};
