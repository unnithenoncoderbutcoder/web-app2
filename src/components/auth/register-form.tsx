'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AuthFormField } from './auth-form-field';
import { useAuth } from '@/hooks/use-auth';
import { getAuthErrorMessage } from '@/lib/utils/auth-errors';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .transform(val => val.toLowerCase().trim()),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(72, 'Password must be less than 72 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await signUp(data.email, data.password, data.username);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(getAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="space-y-4 rounded-md shadow-sm">
        <AuthFormField
          id="username"
          label="Username"
          type="text"
          error={errors.username?.message}
          register={register}
          placeholder="Choose a username"
        />

        <AuthFormField
          id="email"
          label="Email address"
          type="email"
          error={errors.email?.message}
          register={register}
          placeholder="Enter your email"
        />

        <AuthFormField
          id="password"
          label="Password"
          type="password"
          error={errors.password?.message}
          register={register}
          placeholder="Choose a password"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>

      <p className="mt-2 text-center text-sm text-gray-600">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}