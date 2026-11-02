import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-4">
      <h1 className="text-2xl font-bold">로그인</h1>
      <Input type="text" name="userId" placeholder="ID" />
      <Input type="text" name="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
