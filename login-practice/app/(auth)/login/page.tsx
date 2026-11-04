// app/(auth)/login/page.tsx
import LoginForm from "./LoginForm";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <LoginForm />

      <p className="text-center text-sm text-gray-400">또는</p>

      <form
        action={async () => {
          "use server";
          await signIn("kakao", { redirectTo: "/mypage" });
        }}
      >
        <Button type="submit" variant="outline" className="w-full">
          카카오로 로그인
        </Button>
      </form>

      {/* <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/mypage" });
        }}
      >
        <Button type="submit" variant="outline" className="w-full">
          구글로 로그인
        </Button>
      </form> */}
    </div>
  );
}
