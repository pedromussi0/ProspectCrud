import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, LoginCredentials } from '../services/api';
import Form from './ui/Form';

export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authApi.login(credentials);
      // Redirect to dashboard or home page after successful login
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
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
          value={credentials.username}
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
          value={credentials.password}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>
      {error && <p className="text-error">{error}</p>}
      <button type="submit" className="btn btn-primary w-full">
        Login
      </button>
    </Form>
  );
};



