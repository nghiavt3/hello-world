interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
  }
  
  export function Input({ label, className, ...props }: InputProps) {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        <input
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          {...props}
        />
      </div>
    );
  }
  