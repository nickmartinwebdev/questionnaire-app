import { FormEvent, useCallback, useState } from "react";

export type Validator = (
  value: string,
  values: Record<string, string>
) => string | null;

interface Props {
  initialValue: Record<string, any>;
  validation?: Record<string, Validator>;
}

type ErrorMap = Record<string, string>;

type FormInputProps = Record<
  string,
  {
    value: string;
    error: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
>;

const useForm = (props: Props) => {
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

  const setValues = (stateToUpdate?: Record<string, string>) => {
    setState((state) => ({ ...state, ...stateToUpdate }));
  };

  const onSubmit = (
    event: FormEvent,
    func: (values: Record<string, string>) => void
  ): boolean => {
    event.preventDefault();
    if (!Object.keys(validate()).length) {
      func(state);
      return true;
    }
    return false;
  };

  const formInputProps: FormInputProps = Object.keys(
    initialValue
  ).reduce<FormInputProps>((props, name) => {
    props[name] = {
      value: state[name],
      error: validationErrors[name],
      onChange: (event) => {
        setValues({ [name]: event.currentTarget.value });
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
