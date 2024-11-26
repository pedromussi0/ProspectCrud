import React from 'react';
import { Link } from 'react-router-dom';
import  RegistrationForm  from '../components/RegistrationForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Register</h2>
          <RegistrationForm />
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


