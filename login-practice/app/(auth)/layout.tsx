export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="felx min-h-screen items-center justify-center">
      {children}
    </main>
  );
}
