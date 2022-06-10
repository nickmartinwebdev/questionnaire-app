import { ReactNode } from "react";

type FormFieldType = "text" | "custom";

type TextFormField = {
  type: "text";
  name: string;
  initialValue: string;
  label?: string;
  validator?: (value: string) => string | null;
  required?: boolean;
};

type CustomFormField<T> = {
  type: "custom";
  validator?: (value: T) => string | null;
  label?: string;
  name: string;
  initialValue: T;
  required?: boolean;
  component: ReactNode;
};

type FormField<T> = TextFormField | CustomFormField<T>;
