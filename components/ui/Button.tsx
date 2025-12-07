import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm";
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/20 disabled:bg-gray-700",
    secondary: "bg-secondary text-white hover:bg-secondary-600 hover:shadow-lg hover:shadow-secondary/20 disabled:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 disabled:bg-gray-700",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className} disabled:cursor-not-allowed`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
