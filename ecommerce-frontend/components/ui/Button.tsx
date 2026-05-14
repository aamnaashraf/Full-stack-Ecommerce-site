import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-medium rounded-[6px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  const variants = {
    primary: 'bg-gradient-to-br from-[#0D6EFD] to-[#0052CC] text-white hover:shadow-lg hover:scale-105',
    secondary: 'bg-[#F7FAFC] text-[#1C1C1C] border border-[#DEE2E7] hover:bg-[#EDF2F7] hover:shadow-md hover:scale-105',
    outline: 'border-2 border-[#0D6EFD] text-[#0D6EFD] hover:bg-[#0D6EFD] hover:text-white hover:shadow-md hover:scale-105',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:scale-105',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm',
    md: 'px-4 py-2 text-sm sm:text-base',
    lg: 'px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
