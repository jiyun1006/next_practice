"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import loginSchema, {
  loginFieldMessage,
  type LoginPayload,
} from "@/schema/loginSchema";
import FormField from "@/components/form/FormField"; // ← 기존 경로 그대로

export default function SignupForm() {
  const router = useRouter();
  const [payload, setPayload] = useState<LoginPayload>({
    userId: "",
    password: "",
  });
  const [errors, setErrors] = useState({ userId: "", password: "" });
  const [serverMessage, setServerMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 브라우저 기본 제출(새로고침) 막기
    setIsPending(true);
    setServerMessage("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setServerMessage(data.message); // 400, 409 메시지
        return;
      }

      router.push("/login"); // 201이면 로그인 페이지로
    } catch {
      setServerMessage("네트워크 오류가 발생했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">회원가입</h1>

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

      {serverMessage && <p className="text-sm text-red-500">{serverMessage}</p>}

      <Button type="submit" disabled={!isValid || isPending}>
        {isPending ? "가입 중..." : "회원가입"}
      </Button>

      <Link href="/login" className="text-sm text-gray-500 underline">
        이미 계정이 있나요? 로그인
      </Link>
    </form>
  );
}
