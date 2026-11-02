import { Input } from "@base-ui/react";
import ErrorMessage from "./ErrorMessage";

type FormFieldProps = {
  id: string;
  name: string;
  type: "text" | "password";
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormField({
  id,
  name,
  type,
  placeholder,
  value,
  error,
  onChange,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      <ErrorMessage id={errorId} error={error} />
    </div>
  );
}
