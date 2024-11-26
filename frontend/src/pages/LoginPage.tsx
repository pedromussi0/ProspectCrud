import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <LoginForm />
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <a href="/register" className="link link-primary">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};



