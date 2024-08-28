import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import PageLayout from '../components/templates/PageLayout';
import { authService } from '../services/authService.ts';
import { tokenService } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const { accessToken, refreshToken } = await authService.login(data);
      tokenService.setAccessToken(accessToken);
      tokenService.setRefreshToken(refreshToken);

      // Redirect to home after successful login
      window.location.href = '/';
    } catch (error) {
      setLoginError(
        'Login failed. Please check your credentials and try again.'
      );
      console.error('Login failed', error);
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
        >
          <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

          {/* Display login error if present */}
          {loginError && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {loginError}
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <button
              type="button"
              className="text-sm text-blue-500 hover:text-blue-700"
              onClick={() => navigate('/reset-password')}
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default Login;
