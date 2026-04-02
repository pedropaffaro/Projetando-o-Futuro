interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={id}
        className="font-bold uppercase tracking-wide text-black text-sm md:text-base"
      >
        {label}
      </label>

      <input
        id={id}
        className="w-full border-[3px] border-black p-4 text-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:bg-gray-50 transition-colors"
        {...props}
      />
    </div>
  );
}

export default Input;
