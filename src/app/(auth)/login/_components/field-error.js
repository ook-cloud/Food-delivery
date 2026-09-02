export function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 pt-1">{message}</p>;
}
