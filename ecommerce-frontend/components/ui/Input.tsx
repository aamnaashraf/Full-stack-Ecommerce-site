import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs sm:text-sm font-medium text-[#1C1C1C] mb-1.5 sm:mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#DEE2E7] rounded-[6px] text-sm sm:text-base text-[#1C1C1C] placeholder:text-[#8B96A5] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent hover:border-[#0D6EFD] hover:shadow-md transition-all duration-300',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs sm:text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
