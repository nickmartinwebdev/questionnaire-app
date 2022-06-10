import { FormEvent, useCallback, useState } from "react";

export type Validator<T> = (
  value: T,
  values: Record<string, T>
) => string | null;

interface Props<T> {
  initialValue: Record<string, T>;
  validation?: Record<string, Validator<T>>;
}

type ErrorMap = Record<string, string>;

type FormInputProps<T> = Record<
  string,
  {
    value: T;
    error: string | undefined;
    onChange: (value: T) => void;
  }
>;

const useForm = <T>(props: Props<T>) => {
  const { initialValue, validation = {} } = props;

  const [validationErrors, setValidationErrors] = useState<ErrorMap>({});
  const [state, setState] = useState(initialValue);

  const validate = useCallback(() => {
    const errors = Object.entries(validation).reduce<ErrorMap>(
      (errors, [key, validator]) => {
        const result = validator(state[key], state);
        if (result) {
          return { ...errors, [key]: result };
        }
        return errors;
      },
      {}
    );
    setValidationErrors(errors);
    return errors;
  }, [validation, setValidationErrors, state]);

  const setValues = (stateToUpdate?: Record<string, T>) => {
    setState((state) => ({ ...state, ...stateToUpdate }));
  };

  const onSubmit = (
    event: FormEvent,
    func: (values: Record<string, T>) => void
  ): boolean => {
    event.preventDefault();
    if (!Object.keys(validate()).length) {
      func(state);
      return true;
    }
    return false;
  };

  const formInputProps: FormInputProps<T> = Object.keys(initialValue).reduce<
    FormInputProps<T>
  >((props, name) => {
    props[name] = {
      value: state[name],
      error: validationErrors[name],
      onChange: (value) => {
        setValues({ [name]: value });
      },
    };
    return props;
  }, {});

  return {
    values: state,
    setValues,
    errors: validationErrors,
    onSubmit,
    formInputProps,
    validate,
  };
};

export default useForm;
