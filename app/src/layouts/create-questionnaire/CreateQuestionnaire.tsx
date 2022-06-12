import {
  Center,
  Stack,
  Title,
  Divider,
  TextInput,
  Textarea,
  Button,
  Container,
  Text,
} from "@mantine/core";

import useForm from "../../components/form/useForm";
import QuestionEdit from "./components/QuestionEdit";
import QuestionTypeMenu from "./components/QuestionTypeMenu";
import { Question } from "./types";

export default () => {
  const { actions, values, onSubmit, errors } = useForm({
    initialValues: {
      title: "",
      description: "",
      questions: [] as Question[],
    },
    validation: {
      title: (value) => (!value ? "Title is required" : null),
      questions: {
        validator: (value) =>
          !value.length ? "Form must have at least one question" : null,
        fields: {
          label: (value) => (!value ? "Question must have a label" : null),
        },
      },
    },
  });

  console.log("errors", errors.questions);

  return (
    <Container size="sm">
      <form
        style={{ flex: 1 }}
        noValidate
        onSubmit={(event) => onSubmit(event, (values) => console.log(values))}
      >
        <Stack sx={{ width: "100%" }}>
          <TextInput
            label="Title"
            value={values.title}
            onChange={(event) =>
              actions.title.update({ value: event.currentTarget.value })
            }
            placeholder="The title for your questionnaire"
            required
            error={errors.title.error}
          />
          <Textarea
            label="Description"
            value={values.description}
            onChange={(event) =>
              actions.description.update({ value: event.currentTarget.value })
            }
            minRows={6}
            placeholder="The description for your questionnarie"
            error={errors.description.error}
          />
          <Divider />
          <Text size="sm">Questions</Text>
          {errors.questions && (
            <Text size="sm" color="red">
              {errors.questions.error}
            </Text>
          )}
          {values.questions.map((question, index) => (
            <Stack key={index}>
              <Title order={5}>{`Question ${index + 1}`}</Title>
              <QuestionEdit
                question={question}
                updateQuestion={(question) =>
                  actions.questions.updateItem({ item: question, index })
                }
                errors={errors.questions.fieldErrors[index]}
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
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Container>
  );
};
