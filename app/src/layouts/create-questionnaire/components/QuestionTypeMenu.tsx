import { Button, Menu } from "@mantine/core";

import { Question } from "../types";

type QuestionType =
  | "text"
  | "test_large"
  | "select"
  | "multiple_choice"
  | "checkbox";

const newTextQuestion = (index: number): Question => {
  return {
    type: "text",
    label: `Question ${index}`,
    placeholder: "",
    required: false,
  };
};

const newLargeTextQuestion = (index: number): Question => {
  return {
    type: "text_large",
    label: `Question ${index}`,
    placeholder: "",
    required: false,
  };
};

const newSelectQuestion = (index: number): Question => {
  return {
    type: "select",
    values: [],
    label: `Question ${index}`,
    defaultValue: null,
    required: false,
  };
};

interface Props {
  index: number;
  selectQuestionType: (question: Question) => void;
}

export default (props: Props) => {
  const { index, selectQuestionType } = props;

  return (
    <Menu control={<Button color="green">Add question</Button>}>
      <Menu.Item onClick={() => selectQuestionType(newTextQuestion(index))}>
        Text
      </Menu.Item>
      <Menu.Item
        onClick={() => selectQuestionType(newLargeTextQuestion(index))}
      >
        Large text
      </Menu.Item>
      <Menu.Item onClick={() => selectQuestionType(newSelectQuestion(index))}>
        Select
      </Menu.Item>
      {/* <Menu.Item>Multiple choice</Menu.Item>
      <Menu.Item>Checkbox</Menu.Item> */}
    </Menu>
  );
};
