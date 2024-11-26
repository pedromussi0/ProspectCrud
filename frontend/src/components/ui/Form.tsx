import React from 'react';
import { ReactNode } from 'react'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export default function Form({ children, ...props }: FormProps) {
  return (
    <form {...props} className="space-y-4 w-full max-w-md mx-auto">
      {children}
    </form>
  );
};


