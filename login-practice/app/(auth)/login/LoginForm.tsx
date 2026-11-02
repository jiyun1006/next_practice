"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginForm({
  handleSubmit,
}: {
  handleSubmit: (formData: FormData) => void;
}) {
  const [payload, setPayload] = useState({ userId: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((current) => ({ ...current, [name]: value }));
  };
  console.log("렌더링", payload);
  return (
    <form action={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <h1 className="text-2xl font-bold">로그인</h1>
      <Input
        type="text"
        name="userId"
        placeholder="ID"
        value={payload.userId}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="password"
        placeholder="Password"
        value={payload.password}
        onChange={handleChange}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
