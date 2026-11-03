"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function loginAction(
  prevState: { message: string },
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      userId: formData.get("userId"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "아이디 또는 비밀번호가 틀렸습니다." };
    }
    throw error;
  }
  redirect("/mypage");
}
