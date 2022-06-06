import { Center, Stack, Title, Text, Divider } from "@mantine/core";
import { useReducer } from "react";
import QuestionEdit from "./components/QuestionEdit";

import QuestionTypeMenu from "./components/QuestionTypeMenu";
import { ActionCreator, Question } from "./types";

interface CreateQuestionnaireState {
  questions: Question[];
}

type CreateQuestionnaireActions = {
  ADD_QUESTION: Question;
  UPDATE_QUESTION: { position: number; question: Question };
  DELETE_QUESTION: number;
};

const removeItemAtIndex = <T,>(array: T[], index: number): T[] => {
  const newArray = [...array];
  newArray.splice(index);
  return newArray;
};

const updateItemAtIndex = <T,>(array: T[], index: number, item: T): T[] => {
  const newArray = [...array];
  newArray.splice(index, 1, item);
  return newArray;
};

const createQuestionnaireReducer = (
  state: CreateQuestionnaireState,
  action: ActionCreator<CreateQuestionnaireActions>
): CreateQuestionnaireState => {
  switch (action.type) {
    case "ADD_QUESTION":
      return { questions: [...state.questions, action.payload] };
    case "DELETE_QUESTION":
      return { questions: removeItemAtIndex(state.questions, action.payload) };
    case "UPDATE_QUESTION":
      return {
        questions: updateItemAtIndex(
          state.questions,
          action.payload.position,
          action.payload.question
        ),
      };
    default:
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(createQuestionnaireReducer, {
    questions: [],
  });

  return (
    <Center>
      <Stack>
        <Title order={3}>New questionnaire</Title>
        <Text> Create your questionnaire by adding questions below:</Text>
        {state.questions.map((question, index) => (
          <Stack key={index}>
            <QuestionEdit
              question={question}
              updateQuestion={(question) =>
                dispatch({
                  type: "UPDATE_QUESTION",
                  payload: { position: index, question },
                })
              }
            />
            <Divider />
          </Stack>
        ))}
        <QuestionTypeMenu
          index={state.questions.length + 1}
          selectQuestionType={(question) =>
            dispatch({ type: "ADD_QUESTION", payload: question })
          }
        />
      </Stack>
    </Center>
  );
};
