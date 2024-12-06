interface AuthFormFieldProps {
  id: string;
  label: string;
  type: string;
  error?: string;
  register: any;
  placeholder?: string;
}

export function AuthFormField({
  id,
  label,
  type,
  error,
  register,
  placeholder,
}: AuthFormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        {...register(id)}
        id={id}
        type={type}
        className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        placeholder={placeholder || label}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}