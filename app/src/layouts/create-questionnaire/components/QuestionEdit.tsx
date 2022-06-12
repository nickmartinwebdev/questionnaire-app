import { Container, Text, TextInput } from "@mantine/core";
import { ObjectError } from "../../../components/form/useForm";
import { Question, TextQuestion } from "../types";
import TextQuestionEdit from "./TextQuestionEdit";

interface Props {
  question: Question;
  updateQuestion: (question: Question) => void;
  errors: ObjectError<Question>;
}

export default (props: Props) => {
  const { question, updateQuestion, errors } = props;

  const renderQuestion = () => {
    switch (question.type) {
      case "text":
        return (
          <TextQuestionEdit
            question={{ ...question, type: "text" }}
            updateQuestion={updateQuestion}
            errors={errors}
          />
        );
      default:
        return <div>Other</div>;
    }
  };

  return <>{renderQuestion()}</>;
};
