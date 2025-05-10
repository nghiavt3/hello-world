interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
  }
  
  export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition duration-200";
    const variants = {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  