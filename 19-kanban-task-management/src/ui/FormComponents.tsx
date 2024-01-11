export function Label({
  caption: label,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <label>
      <p className="mb-2 text-body-md text-neutral-400">{label}</p>
      {children}
    </label>
  );
}

export function Input({
  value,
  placeholder,
  autofocus,
  onChange,
}: {
  value?: string;
  placeholder?: string;
  autofocus?: boolean;
  onChange(value: string): void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autofocus}
      className="border-neutral-400-25 w-full rounded-[0.25rem] border px-4 py-2 text-body-lg text-neutral-900 placeholder:text-neutral-400"
    />
  );
}
