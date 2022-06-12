export type QuestionValidator = (
  value: string,
  values: Record<string, string>
) => string | null;

export interface TextQuestion {
  type: "text";
  label: string;
  required: boolean;
  placeholder: string;
  validator?: QuestionValidator;
}

export interface LargeTextQuestion {
  type: "text_large";
  label: string;
  required: boolean;
  placeholder: string;
  defaultValue: string | null;
  validator?: QuestionValidator;
}

export interface SelectQuestion {
  type: "select";
  label: string;
  required: boolean;
  values: string[];
  defaultValue: string | null;
  validator?: QuestionValidator;
}

export type Question = {
  type: "text_large" | "text" | "select";
  label: string;
  required: boolean;
  placeholder: string;
  defaultValue?: string | null;
  validator?: QuestionValidator;
};

export type ActionCreator<Actions extends Record<string, any>> = {
  [Key in keyof Actions]: Actions[Key] extends null
    ? {
        type: Key;
      }
    : { type: Key; payload: Actions[Key] };
}[keyof Actions];
