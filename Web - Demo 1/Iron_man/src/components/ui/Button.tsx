'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  asChild = false,
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: `bg-${variant === 'primary' ? 'indigo-600' : 'violet-600'} hover:bg-${variant === 'primary' ? 'indigo-700' : 'violet-700'} text-white ${variant === 'primary' ? 'focus-visible:ring-indigo-500' : 'focus-visible:ring-violet-500'}`,
    secondary: `bg-${variant === 'secondary' ? 'violet-600' : 'indigo-600'} hover:bg-${variant === 'secondary' ? 'violet-700' : 'indigo-700'} text-white ${variant === 'secondary' ? 'focus-visible:ring-violet-500' : 'focus-visible:ring-indigo-500'}`,
    outline: `border border-${variant === 'outline' ? 'indigo-600' : 'violet-600'} hover:bg-${variant === 'outline' ? 'indigo-50' : 'violet-50'} text-${variant === 'outline' ? 'indigo-600' : 'violet-600'} hover:text-${variant === 'outline' ? 'indigo-800' : 'violet-800'} ${variant === 'outline' ? 'focus-visible:ring-indigo-500' : 'focus-visible:ring-violet-500'}`,
  }[variant];

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  }[size];

  const Component = asChild ? 'span' : 'button';

  return (
    <Component
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Component>
  );
}

export default Button;