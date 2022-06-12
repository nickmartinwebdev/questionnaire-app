import { TextInput, Text, Stack, Switch } from "@mantine/core";
import { ObjectError } from "../../../components/form/useForm";
import { TextQuestion } from "../types";

interface Props {
  question: TextQuestion;
  updateQuestion: (question: TextQuestion) => void;
  errors: ObjectError<TextQuestion>;
}

export default (props: Props) => {
  const { question, updateQuestion, errors } = props;

  return (
    <Stack>
      <TextInput
        label="Label"
        value={question.label}
        onChange={(event) =>
          updateQuestion({
            ...question,
            label: event.currentTarget.value,
          })
        }
        error={errors.label.error}
      />
      <Text>Type: Text</Text>
      <TextInput
        label="Placeholder text"
        value={question.placeholder}
        onChange={(event) =>
          updateQuestion({
            ...question,
            placeholder: event.currentTarget.value,
          })
        }
        error={errors.placeholder.error}
      />
      <Switch
        label="Required"
        checked={question.required}
        onChange={(event) =>
          updateQuestion({
            ...question,
            required: event.currentTarget.checked,
          })
        }
      />
    </Stack>
  );
};
