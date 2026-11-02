"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import loginSchema, {
  loginFieldMessage,
  type LoginPayload,
} from "@/schema/loginSchema";
import FormField from "@/components/form/FormField";

export default function LoginForm({
  handleSubmit,
}: {
  handleSubmit: (formData: FormData) => Promise<void>;
}) {
  const [payload, setPayload] = useState<LoginPayload>({
    userId: "",
    password: "",
  });
  const [errors, setErrors] = useState({ userId: "", password: "" });
  const isValid = loginSchema.safeParse(payload).success;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name !== "userId" && name !== "password") return;
    setPayload((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({
      ...current,
      [name]: loginFieldMessage(name, value),
    }));
  };

  return (
    <form action={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <h1 className="text-2xl font-bold">로그인</h1>

      <FormField
        id="userId"
        name="userId"
        type="text"
        placeholder="ID"
        value={payload.userId}
        onChange={handleChange}
        error={errors.userId}
      />

      <FormField
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={payload.password}
        onChange={handleChange}
        error={errors.password}
      />

      <Button type="submit" disabled={!isValid}>
        Login
      </Button>
    </form>
  );
}
