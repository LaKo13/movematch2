import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import type { z } from 'zod';
import { signupSchema } from '../lib/schemas';
import { Button } from '../components/Button';
import { FormInput } from '../components/FormInput';
import { AuthLayout } from '../components/AuthLayout';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

type SignupForm = z.infer<typeof signupSchema>;

export function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: 'customer',
    },
  });

  const userType = watch('userType');

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setValue('userType', 'customer')}
              className={cn(
                'w-1/2 py-2 px-4 text-sm font-medium rounded-l-md focus:outline-none',
                userType === 'customer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-300'
              )}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setValue('userType', 'mover')}
              className={cn(
                'w-1/2 py-2 px-4 text-sm font-medium rounded-r-md focus:outline-none',
                userType === 'mover'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-300'
              )}
            >
              Mover
            </button>
          </div>

          <FormInput
            label="Full name"
            {...register('name')}
            error={errors.name?.message}
          />

          <FormInput
            label="Email address"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <FormInput
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          {userType === 'mover' && (
            <FormInput
              label="Company name"
              {...register('companyName')}
              error={errors.companyName?.message}
            />
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}