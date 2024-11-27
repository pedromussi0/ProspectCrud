import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './ui/Form';
import { authApi } from '../services/api';
import axios from 'axios';

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    try {
      const { confirmPassword, ...registrationData } = formData;
      await authApi.register(registrationData);
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      {error && <p className="text-error">{error}</p>}
      <button type="submit" className="btn btn-primary w-full">
        Register
      </button>
    </Form>
  );
};



