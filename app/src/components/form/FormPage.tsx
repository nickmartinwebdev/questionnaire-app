import { Button, Stack, TextInput } from "@mantine/core";
import { ReactNode, useMemo } from "react";
import useForm, { Validator } from "../../hooks/useForm";
import { useFormList } from "./useFormList";

interface TextFormField {
  type: "text";
  name: string;
  initialValue: string;
  label?: string;
  validator?: Validator<string>;
  required?: boolean;
}

interface CustomFormField {
  type: "custom";
  name: string;
  label?: string;
  initialValue: any;
  component: ReactNode;
  validator?: Validator<any>;
}

type FormField = TextFormField | CustomFormField;

interface Props {
  fields: FormField[];
  handleSubmit: (values: Record<string, string | any>) => void;
  submitText?: string;
}

export default (props: Props) => {
  const { fields, handleSubmit, submitText = "Submit" } = props;

  const formFieldValuesRecord: Record<string, string | any> = {};
  const initialFormFieldValues = useMemo(() => {
    return fields.reduce<Record<string, string | any>>(
      (initialValues, field) => {
        return { ...initialValues, [field.name]: field.initialValue };
      },
      formFieldValuesRecord
    );
  }, [fields]);

  const validators = useMemo(() => {
    return fields.reduce<Record<string, Validator<string>>>(
      (validators, field) => {
        if (field.validator) {
          return {
            ...validators,
            [field.name]: field.validator,
          };
        }
        return validators;
      },
      {}
    );
  }, [fields]);

  const form = useForm({ initialValue: initialFormFieldValues });

  return (
    <form onSubmit={(event) => form.onSubmit(event, handleSubmit)} noValidate>
      <Stack>
        {fields.map((field, index) => {
          if (field.type === "text") {
            return (
              <TextInput
                key={index}
                label={field.label}
                value={form.formInputProps[field.name].value}
                required={field.required}
              />
            );
          }
        })}
        <Button type="submit">{submitText}</Button>
      </Stack>
    </form>
  );
};
