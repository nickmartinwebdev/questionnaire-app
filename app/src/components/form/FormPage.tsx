import { Button, Stack, TextInput } from "@mantine/core";
import { useMemo } from "react";
import useForm, { Validator } from "../../hooks/useForm";

interface TextFormField {
  name: string;
  initalValue: string;
  label?: string;
  validator?: Validator;
  required?: boolean;
}

interface Props {
  fields: TextFormField[];
  handleSubmit: (values: Record<string, string>) => void;
  submitText?: string;
}

export default (props: Props) => {
  const { fields, handleSubmit, submitText = "Submit" } = props;

  const initialFormFieldValues = useMemo(() => {
    return fields.reduce<Record<string, string>>((initialValues, field) => {
      return { ...initialValues, [field.name]: field.initalValue };
    }, {});
  }, [fields]);

  const validators = useMemo(() => {
    return fields.reduce<Record<string, Validator>>((validators, field) => {
      if (field.validator) {
        return { ...validators, [field.name]: field.validator };
      }
      return validators;
    }, {});
  }, [fields]);

  const form = useForm({
    initialValue: initialFormFieldValues,
    validation: validators,
  });
  return (
    <form onSubmit={(event) => form.onSubmit(event, handleSubmit)} noValidate>
      <Stack>
        {fields.map((field, index) => (
          <TextInput
            key={index}
            label={field.label}
            {...form.formInputProps[field.name]}
            required={field.required}
          />
        ))}
        <Button type="submit">{submitText}</Button>
      </Stack>
    </form>
  );
};
