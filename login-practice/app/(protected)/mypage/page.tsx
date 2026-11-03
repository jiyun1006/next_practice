import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="flex flex-col gap-4 p-8">
      <p>{session.user?.name}님 환영합니다</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <Button type="submit">로그아웃</Button>
      </form>
    </main>
  );
}
