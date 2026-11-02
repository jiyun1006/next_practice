import LoginForm from "./LoginForm";

export default function LoginPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const userId = formData.get("userId");
    const password = formData.get("password");
    console.log(userId, password);
  }

  return <LoginForm handleSubmit={handleSubmit} />;
}
