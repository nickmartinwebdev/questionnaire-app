import {
  Container,
  TextInput,
  Text,
  Group,
  Stack,
  Switch,
} from "@mantine/core";
import { TextQuestion } from "../types";

interface Props {
  question: TextQuestion;
  updateQuestion: (question: TextQuestion) => void;
}

export default (props: Props) => {
  const { question, updateQuestion } = props;

  return (
    <Stack justify="left">
      <TextInput
        label="Label"
        value={question.label}
        onChange={(event) =>
          updateQuestion({
            ...question,
            label: event.currentTarget.value,
          })
        }
      />
      <Text>Type: Text</Text>
      <TextInput
        label="Placeholder"
        value={question.placeholder}
        onChange={(event) =>
          updateQuestion({
            ...question,
            placeholder: event.currentTarget.value,
          })
        }
      />
      <Switch
        label="Required"
        checked={question.required}
        onChange={(event) =>
          updateQuestion({ ...question, required: event.currentTarget.checked })
        }
      />
    </Stack>
  );
};
