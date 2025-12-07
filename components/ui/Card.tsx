import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-dark-50 rounded-lg shadow-lg border border-gray-800 p-6 theme-card ${className}`}>
      {children}
    </div>
  );
}
