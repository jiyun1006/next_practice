export default function ErrorMessage({
  id,
  error,
}: {
  id: string;
  error?: string;
}) {
  return (
    <p
      id={id}
      role="alert"
      className={`min-h-5 text-sm text-red-500 transition-opacity ${error ? "opacity-100" : "opacity-0"}`}
    >
      {error}
    </p>
  );
}
