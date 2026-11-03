"use client";

import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import loginSchema, {
  loginFieldMessage,
  type LoginPayload,
} from "@/schema/loginSchema";
import FormField from "@/components/form/FormField";
import { loginAction } from "./actions";
import Link from "next/link";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    message: "",
  });
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
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
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

      <Button type="submit" disabled={!isValid || isPending}>
        {isPending ? "로그인 중..." : "Login"}
      </Button>
      <Link href="/signup" className="text-sm text-gray-500 underline">
        계정이 없나요? 회원가입
      </Link>
    </form>
  );
}
