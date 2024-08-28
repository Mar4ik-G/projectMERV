import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../components/templates/PageLayout';
import { authService } from '../services/authService';

interface ResetPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Retrieve the token from the URL
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormInputs>();

  const newPassword = watch('newPassword');

  // Validate the reset token when the component mounts
  useEffect(() => {
    const validateToken = async () => {
      try {
        await authService.validateResetToken(token!); // Check if the token is valid
        setIsTokenValid(true);
      } catch (err) {
        setIsTokenValid(false);
        setError('Invalid or expired token.');
      }
    };

    validateToken();
  }, [token]);

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await authService.resetPassword(token!, data.newPassword); // Submit the new password
      navigate('/login'); // Redirect to login after successful password reset
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    }
  };

  // Show loading while validating the token
  if (isTokenValid === null) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Validating token...</p>
        </div>
      </PageLayout>
    );
  }

  // Show error if token is invalid
  if (!isTokenValid) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </PageLayout>
    );
  }

  // Render form if the token is valid
  return (
    <PageLayout>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
        >
          <h2 className="text-center text-2xl font-bold mb-6">
            Reset Password
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              {...register('newPassword', {
                required: 'New password is required',
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === newPassword || 'Passwords do not match',
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default ResetPassword;
