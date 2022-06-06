import { Container, Text, TextInput } from "@mantine/core";
import { Question, TextQuestion } from "../types";
import TextQuestionEdit from "./TextQuestionEdit";

interface Props {
  question: Question;
  updateQuestion: (question: Question) => void;
}

export default (props: Props) => {
  const { question, updateQuestion } = props;

  const renderQuestion = () => {
    switch (question.type) {
      case "text":
        return (
          <TextQuestionEdit
            question={question}
            updateQuestion={updateQuestion}
          />
        );
      default:
        return <div>Other</div>;
    }
  };

  return <>{renderQuestion()}</>;
};
