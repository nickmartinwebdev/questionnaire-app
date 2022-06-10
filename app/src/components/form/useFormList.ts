import { Dispatch, useReducer } from "react";
import {
  ActionCreator,
  Question,
} from "../../layouts/create-questionnaire/types";
import { removeItemAtIndex, updateItemAtIndex } from "../../utils/array";

type Validate<T extends Array<object>> = {
  [Key in keyof T[number]]?: (value: T[number][Key]) => string | null;
};

const items = [
  { name: "nick", age: 10 },
  { text: "zac", age: 20 },
];

const validator: Validate<typeof items> = {
  name: (value) => (!value ? "required" : null),
};

interface Props<T> {
  initialValue: T;
}

interface FormListActions<T> {
  ADD_ITEM: { item: T };
  REMOVE_ITEM: { index: number };
  UPDATE_ITEM: { index: number; item: T };
}

const createFormListReducer =
  <T>() =>
  (state: T[], action: ActionCreator<FormListActions<T>>): T[] => {
    switch (action.type) {
      case "ADD_ITEM":
        return [...state, action.payload.item];
      case "REMOVE_ITEM":
        return removeItemAtIndex(state, action.payload.index);
      case "UPDATE_ITEM":
        return updateItemAtIndex(
          state,
          action.payload.index,
          action.payload.item
        );
      default:
        return state;
    }
  };

type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T
    ? string
    : T extends `${infer F}_${infer R}`
    ? `${F}${Capitalize<CamelizeString<R>>}`
    : T
  : T;

type CamelToSnake<T extends string, P extends string = ""> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
  ? CamelToSnake<
      R,
      `${P}${C0 extends Lowercase<C0> ? "" : "_"}${Lowercase<C0>}`
    >
  : P;

type FormListActionCreatorNames = CamelizeString<
  Lowercase<keyof FormListActions<Question>>
>;

type ActionCreatorMap<Actions extends Record<string, any>> = {
  [Key in keyof Actions]: Actions[Key] extends null
    ? {
        type: Key;
        payload: {};
      }
    : { type: Key; payload: Actions[Key] };
};

type Actions<Actions extends Record<string, any>> = {
  [Key in keyof Actions]: (
    value: ActionCreatorMap<Actions>[Key]["payload"]
  ) => void;
};

type ActionCreators<A extends Record<string, any>> = {
  [Key in keyof A as CamelizeString<
    Lowercase<Key extends string ? Key : never>
  >]: Actions<A>[Key];
};

export const useFormList = <T>(items: T[]) => {
  const [state, dispatch] = useReducer(createFormListReducer<T>(), items);

  const formListActions: ActionCreators<FormListActions<T>> = {
    addItem: (payload) => {
      dispatch({ type: "ADD_ITEM", payload });
    },
    updateItem: (payload) => {
      dispatch({ type: "UPDATE_ITEM", payload });
    },
    removeItem: (payload) => {
      dispatch({ type: "REMOVE_ITEM", payload });
    },
  };

  return {
    ...formListActions,
  };
};
