import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import PageLayout from '../components/templates/PageLayout';
import { authService } from '../services/authService'; // Ensure the correct service method is imported

interface RequestPasswordResetFormInputs {
  email: string;
}

const RequestPasswordReset: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestPasswordResetFormInputs>();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RequestPasswordResetFormInputs> = async (
    data
  ) => {
    try {
      // Call requestPasswordReset instead of resetPassword
      const response = await authService.requestPasswordReset(data.email);
      setMessage(response.message); // Success message from the backend
      setError(null);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      setMessage(null);
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
        >
          <h2 className="text-center text-2xl font-bold mb-6">
            Request Password Reset
          </h2>

          {message && (
            <p className="text-green-500 text-sm mb-4 text-center">{message}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
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

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default RequestPasswordReset;
