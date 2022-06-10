import { useMemo, useReducer, useState } from "react";
import { Question } from "../../layouts/create-questionnaire/types";
import {
  addItemAtIndex,
  removeItemAtIndex,
  updateItemAtIndex,
} from "../../utils/array";

interface Props<T extends Record<string, any>> {
  initialValues: T;
}

type ArrayActions<T> = {
  addItem: (payload: { item: T }) => void;
  updateItem: (payload: { index: number; item: T }) => void;
  removeItem: (payload: { index: number }) => void;
};

const createArrayActions = <T extends Array<any>>(
  cbs: [
    (item: T[number]) => void,
    (index: number, item: T[number]) => void,
    (index: number) => void
  ]
): ArrayActions<T> => {
  const [addItemFunc, updateItemFunc, removeItemFunc] = cbs;

  return {
    addItem: (payload) => addItemFunc(payload.item),
    updateItem: (payload) => updateItemFunc(payload.index, payload.item),
    removeItem: (payload) => removeItemFunc(payload.index),
  };
};

type Actions<T> = { update: (payload: { value: T }) => void };

type ActionCreatorMap<T> = {
  [Key in keyof T]: T[Key] extends Array<any>
    ? ArrayActions<T[Key][number]>
    : Actions<T[Key]>;
};

export default <T extends Record<string, any>>(props: Props<T>) => {
  const { initialValues } = props;
  const [formState, setFormState] = useState(initialValues);

  const actions = useMemo(() => {
    const map: Partial<ActionCreatorMap<T>> = {};
    Object.keys(formState).forEach((key) => {
      const typedKey = key as keyof T;
      if (Array.isArray(formState[typedKey])) {
        map[typedKey] = createArrayActions<typeof formState[typeof typedKey]>([
          (item) => {
            setFormState((state) => ({
              ...state,
              [typedKey]: addItemAtIndex(state[typedKey], item),
            }));
          },
          (index, item) => {
            setFormState((state) => ({
              ...state,
              [typedKey]: updateItemAtIndex(state[typedKey], index, item),
            }));
          },
          (index) => {
            setFormState((state) => ({
              ...state,
              [typedKey]: removeItemAtIndex<T[keyof T]>(state[typedKey], index),
            }));
          },
        ]) as ActionCreatorMap<T>[keyof T];
      } else {
        map[typedKey] = {
          update: (payload) => {
            setFormState((state) => ({ ...state, [typedKey]: payload.value }));
          },
        } as ActionCreatorMap<T>[keyof T];
      }
    });
    return map as ActionCreatorMap<T>;
  }, [formState, setFormState]);

  return { actions, values: formState };
};
